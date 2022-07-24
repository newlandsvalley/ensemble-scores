module Abc.EnsembleScore.Generator 
  ( buildEnsembleScore
  , runBuildEnsembleScore
  ) where

import Abc.EnsembleScore.Types
import Prelude

import Control.Monad.Except.Trans (ExceptT, runExceptT, throwError)
import Control.Monad.State (State, evalStateT, get, put)
import Data.Array ((:), all, head, foldl, index, last, length, mapMaybe, reverse, singleton, tail, zipWith)
import Data.Either (Either)
import Data.Foldable (maximumBy)
import Data.Maybe (Maybe(..), fromJust, fromMaybe)
import Data.Newtype (unwrap)
import Data.Traversable (traverse)
import Data.TraversableWithIndex (traverseWithIndex)
import Partial.Unsafe (unsafePartial)
import VexFlow.Abc.Alignment (removeStaveExtensions)
import VexFlow.Types (BarSpec, MonophonicScore, StaveSpec)

-- Associate all the voices of an individual bar of music 
-- and then provide a line of these that represent one stave line of associated bars
type MergedStaveLine = Array (Array BarSpec)

-- | the Monad translation context
type Translation a = ExceptT String (State EnsembleContext) a

runBuildEnsembleScore :: Array MonophonicScore -> Either String EnsembleScore 
runBuildEnsembleScore staveSpecs = 
  unwrap $ evalStateT (runExceptT $ buildEnsembleScore staveSpecs) { nextStaveNo : 0 }

buildEnsembleScore :: Array MonophonicScore -> Translation EnsembleScore 
buildEnsembleScore scores = do 
  _ <- checkCompatibleScores scores
  traverseWithIndex buildMultiStaveSpec (transpose etioalatedSpecs)  
  where
  -- remove any final empty bar with stave lines extending to the canvas width
  etioalatedSpecs = map removeStaveExtensions scores

mergeVoiceLines :: Int -> Array StaveSpec -> Translation MergedStaveLine
mergeVoiceLines staveLineNo [s1, s2] = do
  _ <- checkCompatibleStaves staveLineNo [s1, s2]
  pure $ merge2VoiceLines s1.barSpecs s2.barSpecs
mergeVoiceLines staveLineNo [s1, s2, s3] = do
  _ <- checkCompatibleStaves staveLineNo [s1, s2, s3]
  pure $ mergeFurtherVoiceLine s1.barSpecs (merge2VoiceLines s2.barSpecs s3.barSpecs)
mergeVoiceLines staveLineNo [s1, s2, s3, s4] = do
  _ <- checkCompatibleStaves staveLineNo [s1, s2, s3, s4]
  pure $ mergeFurtherVoiceLine s1.barSpecs (mergeFurtherVoiceLine s2.barSpecs
    (merge2VoiceLines s3.barSpecs s4.barSpecs))
mergeVoiceLines _staveLineNo x =
  throwError ("This module only supports polyphony with between 2 and 4 voices - we got: "
                <> (show $ length x))

merge2VoiceLines :: Array BarSpec -> Array BarSpec -> MergedStaveLine
merge2VoiceLines  a1 a2 = 
    zipWith (\x y -> x : (singleton y)) a1 a2

mergeFurtherVoiceLine :: Array BarSpec -> MergedStaveLine -> MergedStaveLine
mergeFurtherVoiceLine  a2 a3 = 
    zipWith (:) a2 a3

-- build a multi-stave bar spec from an array of individual bar specs
-- i.e. the positioning of the multi stave bar must be constant across all the voices
-- so choose the maximum width and we'll need to keep a running total of the xOffset
buildMultiStaveBarSpec :: Int -> Array BarSpec -> MultiStaveBarSpec
buildMultiStaveBarSpec xOffset multiBars = 
  let 
    width :: Int
    width = fromMaybe 0 $ maximumBy compare $ map _.width multiBars
    positioning = {width, xOffset}
    voices = map buildVoiceBarSpec multiBars 
  in 
    { positioning, voices }   

-- just copy across the boring stuff from the bar spec
buildVoiceBarSpec :: BarSpec -> VoiceBarSpec 
buildVoiceBarSpec bs = 
  { startLine : bs.startLine
  , endLineThickness : bs.endLineThickness
  , endLineRepeat : bs.endLineRepeat
  , isFull : bs.isFull
  , volta : bs.volta
  , timeSignature : bs.timeSignature
  , beamSpecs : bs.beamSpecs
  , curves : bs.curves
  , musicSpec : bs.musicSpec
  }

-- build a single line with multiple staves
buildMultiStaveLine :: MergedStaveLine -> MultiStaveLine
buildMultiStaveLine mergedStaveLine = 
  reverse $ foldl f [] mergedStaveLine

  where 
  f :: MultiStaveLine -> Array BarSpec -> MultiStaveLine
  f acc barSpecs = 
    let  
      nextXOffset = 
        case head acc of 
          Nothing -> 
            0 
          Just bs ->
            bs.positioning.width + bs.positioning.xOffset 
    in 
      (buildMultiStaveBarSpec nextXOffset barSpecs) : acc      

calculateStaveLineWidth :: MultiStaveLine -> Int 
calculateStaveLineWidth multiStaveLine = 
  case (last multiStaveLine) of 
    Nothing -> 
      0
    Just msBarSpec ->
      msBarSpec.positioning.width + msBarSpec.positioning.xOffset

-- build a complete multi-stave spec
buildMultiStaveSpec :: Int -> Array StaveSpec -> Translation MultiStaveSpec
buildMultiStaveSpec staveLineNo ss = do
  mergedVoiceLines <- mergeVoiceLines staveLineNo ss
  let 
    multiStaveLine = buildMultiStaveLine mergedVoiceLines
    staveWidth = calculateStaveLineWidth multiStaveLine
  staveStarts <- traverse f ss
  pure { staveWidth, staveStarts, multiStaveLine}

  where 
    f :: StaveSpec -> Translation StaveStart 
    f s = do       
      ensembleContext <- get
      _ <- put ensembleContext { nextStaveNo = ensembleContext.nextStaveNo + 1 }

      pure  { staveNo : ensembleContext.nextStaveNo
            , keySignature : s.keySignature
            , isNewTimeSignature : firstVoiceStaveSpec.isNewTimeSignature -- we must inherit from voice 0
            , mTempo : s.mTempo
            , clefString : s.clefString
            }  

    firstVoiceStaveSpec = unsafePartial $ fromJust $ index ss 0

-- | generalised Array transpose 

transpose :: forall a. Array (Array a) -> Array (Array a)
transpose [] = []
transpose x = 
  case (mapMaybe head x) of 
    [] -> 
      transpose (mapMaybe tail x)
    start ->       
      start : transpose (mapMaybe tail x)      

-- | check that each stave across all voices has an identical number of bars
checkCompatibleStaves :: Int -> Array StaveSpec -> Translation (Array StaveSpec)
checkCompatibleStaves multiStaveNo staveSpecs = 
  if (identicalBarNumbers staveSpecs) then 
    pure staveSpecs 
  else 
    throwError ("Stave " <> show (multiStaveNo + 1) <> " has incompatible voices")

  where

  -- | check that all the bars of a given stave line are of the same length
  identicalBarNumbers :: Array StaveSpec -> Boolean
  identicalBarNumbers sss = 
    all (\l -> l == first) lengths

    where 
    lengths = map (\ss -> length ss.barSpecs) sss

    first = fromMaybe 0 $ head lengths

-- | check that each voice has the same number of staves
checkCompatibleScores :: Array MonophonicScore -> Translation (Array MonophonicScore)
checkCompatibleScores scores = 
  if (identicalStaveCount scores) then 
    pure scores 
  else 
    throwError ("The voices have different numbers of staves")

  where

  identicalStaveCount :: Array MonophonicScore -> Boolean
  identicalStaveCount ms = 
    all (\l -> l == first) lengths

    where 
    lengths = map (\score -> length score) ms

    first = fromMaybe 0 $ head lengths

   
