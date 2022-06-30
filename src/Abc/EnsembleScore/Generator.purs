module Abc.EnsembleScore.Generator 
  ( buildEnsembleScore
  , runBuildEnsembleScore
  ) where

import Prelude

import Control.Monad.Except.Trans (ExceptT, runExceptT, throwError)

import Control.Monad.State (State, evalStateT, get, put)
import Abc.EnsembleScore.Types
import Data.Array ((:), head, foldl, last, reverse, singleton, zipWith)
import Data.Either (Either)
import Data.Foldable (maximumBy)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Newtype (unwrap)
import Data.Traversable (traverse, sequenceDefault)
import VexFlow.Types (BarSpec, MonophonicScore, StaveSpec)

import Debug (spy)

-- Associate all the voices of an individual bar of music 
-- and then provide a line of these that represent one stave line of associated bars
type MergedStaveLine = Array (Array BarSpec)

-- | the Monad translation context
type Translation a = ExceptT String (State EnsembleContext) a

runBuildEnsembleScore :: Array MonophonicScore -> Either String EnsembleScore 
runBuildEnsembleScore staveSpecs = 
  unwrap $ evalStateT (runExceptT $ buildEnsembleScore staveSpecs) { nextStaveNo : 0 }

buildEnsembleScore :: Array MonophonicScore -> Translation EnsembleScore 
buildEnsembleScore staveSpecs =
  traverse buildMultiStaveSpec (sequenceDefault staveSpecs)

mergeVoiceLines :: Array StaveSpec -> Translation MergedStaveLine
mergeVoiceLines [s1, s2] = 
  pure $ merge2VoiceLines s1.barSpecs s2.barSpecs
mergeVoiceLines [s1, s2, s3] = 
  pure $ mergeFurtherVoiceLine s1.barSpecs (merge2VoiceLines s2.barSpecs s3.barSpecs)
mergeVoiceLines [s1, s2, s3, s4] = 
  pure $ mergeFurtherVoiceLine s1.barSpecs (mergeFurtherVoiceLine s2.barSpecs
    (merge2VoiceLines s3.barSpecs s4.barSpecs))
mergeVoiceLines _ =
  throwError "This module only supports polyphony with between 2 and 4 voices"

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
buildMultiStaveSpec :: Array StaveSpec -> Translation MultiStaveSpec
buildMultiStaveSpec ss = do
  mergedVoiceLines <- mergeVoiceLines ss
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

      pure { staveNo : ensembleContext.nextStaveNo
           , keySignature : s.keySignature
           , isNewTimeSignature : s.isNewTimeSignature
           , mTempo : s.mTempo
           , clefString : s.clefString
           }




   
