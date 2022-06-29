module Abc.EnsembleScore.Renderer where

import Prelude

import Abc.EnsembleScore.Generator (buildEnsembleScore, runBuildEnsembleScore)
import Abc.EnsembleScore.Types 
import Data.Abc (AbcTune)
import Data.Abc.Voice (partitionVoices)
import Data.Array (index, length)
import Data.Maybe (Maybe(..), fromJust)
import Effect (Effect)
import Data.Either (Either(..))
import Data.Traversable (sequenceDefault, traverse, traverse_)
import Data.TraversableWithIndex (traverseWithIndex)
import Data.FoldableWithIndex (traverseWithIndex_)
import Partial.Unsafe (unsafePartial)
import VexFlow.Score (Renderer, Stave, createScore)
import VexFlow.ApiBindings (newStave, renderStave)
import VexFlow.Types (Config, LineThickness(..), MonophonicScore, StaveConfig, StaveSpec, staveIndentation, staveSeparation, titleDepth)

import Debug (spy)

-- | a stave connector
foreign import data StaveConnector :: Type

renderPolyphonicTune :: Config -> Renderer -> AbcTune -> Effect (Maybe String)
renderPolyphonicTune config renderer tune = do
  let 
    voices = partitionVoices tune 
    _ = spy "renderPolyphonicTune voice count" (length voices)
  if (length voices <= 1) then     
    pure (Just "There are not multiple voicea in the tune")
  else 
    let 
      eVoiceScores :: Either String (Array MonophonicScore)
      eVoiceScores = sequenceDefault $ map (createScore config) voices
    in
      case eVoiceScores of 
        Right voiceScores -> 
          case (runBuildEnsembleScore voiceScores) of
            Right ensembleScore -> do
              _ <- init
              _ <- renderScore renderer ensembleScore
              pure Nothing
            Left e ->
              pure (Just e)
        Left e -> 
          pure (Just e)

renderScore :: Renderer -> EnsembleScore -> Effect Unit 
renderScore renderer score = do
  let 
    _ = spy "score lines" (length score)
  traverse_ (renderMultiStave renderer) score

renderMultiStave :: Renderer -> MultiStaveSpec -> Effect Unit
renderMultiStave renderer mss = do
  renderLine renderer mss.staveStarts mss.multiStaveLine

renderLine :: Renderer -> Array StaveStart -> MultiStaveLine -> Effect Unit
renderLine renderer staveStarts line = 
  traverseWithIndex_ (renderMultiBar renderer staveStarts) line

renderMultiBar :: Renderer -> Array StaveStart -> Int -> MultiStaveBarSpec -> Effect Unit 
renderMultiBar renderer staveStarts barNo multiBar = do
  staves <- traverseWithIndex 
              (makeStaveBar staveStarts multiBar.positioning barNo) 
              multiBar.voices
  _ <- traverse (renderStave renderer) staves
  when (barNo == 0) do
    drawStaveConnector renderer staves
  pure unit

makeStaveBar :: Array StaveStart -> Positioning -> Int -> Int  -> VoiceBarSpec -> Effect Stave
makeStaveBar staveStarts positioning barNo voiceNo barSpec = do
  let 
    staveStart = unsafePartial $ fromJust $ index staveStarts voiceNo
    config = staveConfig staveStart.staveNo barNo positioning barSpec 
    _ = spy "positioning" positioning
  newStave config staveStart.clefString staveStart.keySignature
  

staveConfig :: Int -> Int -> Positioning -> VoiceBarSpec -> StaveConfig
staveConfig staveNo barNo positioning barSpec =
  { x: positioning.xOffset + multiStaveIndentation
  , y: (staveSeparation * staveNo) + titleDepth
  , width: positioning.width
  , barNo: barNo
  , lineColour: "#1a1a1a" -- vexflow default seems to be a Dark Slate Gray - #999999
  , hasRightBar: (barSpec.endLineThickness /= NoLine)
  , hasDoubleRightBar: (barSpec.endLineThickness == Double)
  }  

foreign import init :: Effect Unit
foreign import drawStaveConnector :: Renderer -> Array Stave -> Effect Unit

        