module Abc.EnsembleScore.Renderer
  ( renderPolyphonicTune 
  , renderPolyphonicVoices
  ) where

import Prelude

import Abc.EnsembleScore.Generator (runBuildEnsembleScore)
import Abc.EnsembleScore.Alignment (rightJustify, justifiedScoreConfig)
import Abc.EnsembleScore.Types 
import Data.Abc (AbcTune)
import Data.Abc.Metadata (getTitle)
import Data.Abc.Voice (partitionVoices)
import Data.Array (index, null)
import Data.Array.NonEmpty (NonEmptyArray, length)
import Data.Array.NonEmpty (index) as NEA
import Data.Maybe (Maybe(..), fromJust, fromMaybe)
import Data.String (length) as String
import Effect (Effect)
import Data.Either (Either(..))
import Data.Traversable (sequenceDefault, traverse, traverse_)
import Data.TraversableWithIndex (traverseWithIndex)
import Data.FoldableWithIndex (traverseWithIndex_)
import Partial.Unsafe (unsafePartial)
import VexFlow.Score (Renderer, Stave, createScore, resizeCanvas)
import VexFlow.Abc.Slur (VexCurves)
import VexFlow.Abc.Alignment (centeredTitleXPos)
import VexFlow.ApiBindings (newStave, renderStave, addTempoMarking, addTimeSignature, displayContextChange, processBarBeginRepeat, processBarEndRepeat, processVolta, renderTuneTitle)
import VexFlow.Types (BeamSpec, Config, LineThickness(..), MonophonicScore, MusicSpec(..), MusicSpecContents, StaveConfig, staveSeparation, titleDepth)

-- | a stave connector
foreign import data StaveConnector :: Type

-- | render a polyphonic tune as an ensemble score where the tune contains 
-- | separate voice parts
renderPolyphonicTune :: Config -> Renderer -> AbcTune -> Effect (Maybe String)
renderPolyphonicTune config renderer tune = do
  let 
    voices = partitionVoices tune 
    title = fromMaybe "untitled" $ getTitle tune
  renderPolyphonicVoices config renderer title voices

-- | render a polyphonic tune as an ensemble score presented as an array of voices
renderPolyphonicVoices :: Config -> Renderer -> String -> NonEmptyArray AbcTune -> Effect (Maybe String)
renderPolyphonicVoices config renderer title voices = do
  if (length voices <= 1) then     
    pure (Just "There are not multiple voicea in the tune")
  else 
    let 
      eVoiceScores :: Either String (NonEmptyArray MonophonicScore)
      eVoiceScores = sequenceDefault $ map (createScore config) voices      
    in
      case eVoiceScores of 
        Right voiceScores -> 
          case (runBuildEnsembleScore voiceScores) of
            Right ensembleScore -> do
              let 
                 -- justify the score on the right-hand side
                 score = rightJustify config.width config.scale ensembleScore
                 -- recalculate the config dimensions now on the justified score
                 config' = justifiedScoreConfig score config
              _ <- resizeCanvas renderer config'
              _ <- init
              _ <- renderTitle config' renderer title
              _ <- renderScore renderer score                     
              pure Nothing
            Left e -> 
              pure (Just e)

        Left e -> 
          pure (Just e)

renderScore :: Renderer -> EnsembleScore -> Effect Unit 
renderScore renderer score = do
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
  _ <- populateBarVoices renderer staves multiBar.voices
  pure unit

makeStaveBar :: Array StaveStart -> Positioning -> Int -> Int  -> VoiceBarSpec -> Effect Stave
makeStaveBar staveStarts positioning barNo voiceNo barSpec = do
  let 
    staveStart = unsafePartial $ fromJust $ index staveStarts voiceNo
    config = staveConfig staveStart.staveNo barNo positioning barSpec 
    (MusicSpec musicSpec) = barSpec.musicSpec
    -- _ = spy "positioning" positioning
    -- _ = spy "stave config" config
  stave <- newStave config staveStart.clefString staveStart.keySignature

  traverse_ (displayContextChange stave) musicSpec.contextChanges
  when ((staveStart.isNewTimeSignature) && (barNo == 0)) do
    addTimeSignature stave barSpec.timeSignature
  when ((barNo == 0) && (staveStart.staveNo == 0)) do
    addTempoMarking stave staveStart.mTempo
  _ <- processBarBeginRepeat stave barSpec.startLine
  _ <- processBarEndRepeat stave barSpec.endLineRepeat
  _ <- processVolta stave barSpec.volta
  pure stave

populateBarVoices :: Renderer -> NonEmptyArray Stave -> NonEmptyArray VoiceBarSpec -> Effect Unit
populateBarVoices renderer staves voiceBars = 
  traverseWithIndex_ (populateBarVoice renderer staves) voiceBars

populateBarVoice :: Renderer -> NonEmptyArray Stave -> Int -> VoiceBarSpec -> Effect Unit
populateBarVoice renderer staves staveNo voiceBar = do
  let 
    stave = unsafePartial $ fromJust $ NEA.index staves staveNo
    (MusicSpec musicSpec) = voiceBar.musicSpec
  when (not $ null musicSpec.noteSpecs) do
    renderBarContents renderer stave voiceBar.beamSpecs voiceBar.curves musicSpec
  pure unit  

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

renderTitle :: Config -> Renderer -> String -> Effect Unit
renderTitle config renderer title = do
  let
    yPos :: Int
    yPos = div (titleDepth * 3) 4

    xPos :: Int
    xPos = centeredTitleXPos config (String.length title)
  renderTuneTitle renderer title xPos yPos

foreign import init :: Effect Unit
foreign import drawStaveConnector :: Renderer -> NonEmptyArray Stave -> Effect Unit
-- | display all the contents of the bar, using explicit beaming for the notes
foreign import renderBarContents :: Renderer -> Stave -> Array BeamSpec -> VexCurves -> MusicSpecContents -> Effect Unit

        