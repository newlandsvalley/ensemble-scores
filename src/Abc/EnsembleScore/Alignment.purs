module Abc.EnsembleScore.Alignment
  ( centeredTitleXPos
  , justifiedScoreConfig
  , rightJustify
  )
  where

-- | align the multi-voice staves on the right hand side
-- |
-- | When we receive the set of ABC voices, we need to align each bar to the
-- | maximum across all the voices for that bar.  We then need to calculate the 
-- | maximum overall stave width and then enlarge each bar to reach that size.
-- |
-- | this module provides a function for doing that.
-- |
-- | We measure the staves in VexFlow stave units and scale them when writing to
-- | the canvas.

import Abc.EnsembleScore.Types

import Control.Monad.State (State, evalStateT, get, put)
import Data.Array (singleton)
import Data.Array.NonEmpty (head, length) as NEA
import Data.Foldable (foldl, foldM)
import Data.Int (floor, toNumber)
import Data.Maybe (Maybe(..))
import Data.Newtype (unwrap)
import Prelude (bind, map, max, mempty, min, pure, ($), (*), (+), (-), (/), (<>), (>=))
import VexFlow.Types (Config, Titling(..), scoreMarginBottom, staveSeparation, titleDepth)

type Alignment a = State Int a

-- | right-justify the core
rightJustify :: Int -> Number -> EnsembleScore -> EnsembleScore
rightJustify maxCanvasWidth scale score =
  alignStaves maxCanvasWidth scale score

-- | recalculate the canvas config based on the dimensions of the justified score
justifiedScoreConfig :: EnsembleScore -> Config -> Config
justifiedScoreConfig score config =
  let
    justifiedScoreWidth :: Int
    justifiedScoreWidth =
      justifiedScoreCanvasWidth config.scale score

    justifiedScoreHeight :: Int
    justifiedScoreHeight =
      justifiedScoreCanvasHeight config.scale config.titling score
  in
    config
      { width = justifiedScoreWidth
      , height = justifiedScoreHeight
      }

-- | where possible, align all staves so that they are aligned at the right-hand
-- | side of the score (as well, of course, as at the left).
-- |
-- | If the widest stave is wider than the maximum stave width (and hence
-- | truncated) then align to this maximum width.
alignStaves :: Int -> Number -> EnsembleScore -> EnsembleScore
alignStaves maxCanvasWidth scale multiStaves =
  let
    maxWidth = maxStaveWidth maxCanvasWidth scale
    alignmentWidth = alignmentStaveWidth maxWidth multiStaves
    -- _ = spy "maxWidth" maxWidth 
    -- _ = spy "alignmentWidth" alignmentWidth
    mapf staveSpec =
      let
        maybeFactor = incrementFactor alignmentWidth staveSpec.staveWidth
        -- _ = spy "next unaligned stave width" staveSpec.staveWidth
      in
        case maybeFactor of
          Just n ->
            growStaveSpec n staveSpec
          _ ->
            staveSpec
  in
    map mapf multiStaves

-- | find the widest stave
-- | (if any stave is greater than the maximum width then this max is taken as the
-- | maximum)
alignmentStaveWidth :: Int -> EnsembleScore -> Int
alignmentStaveWidth maxWidth mss =
  foldl staveWidthf 0 mss

  where 
  staveWidthf :: Int -> MultiStaveSpec -> Int
  staveWidthf acc multiStaveSpec =
    min maxWidth (max acc multiStaveSpec.staveWidth)  

-- | find the increase required to grow each bar in a stave so that
-- | it reaches the required alignment width
incrementFactor :: Int -> Int -> Maybe Number
incrementFactor alignmentWidth staveWidth =  
  if (staveWidth >= alignmentWidth) then
    Nothing
  else
    Just $ (toNumber alignmentWidth) / (toNumber staveWidth)

-- | grow the stave spec to make the stave fit the alignment width
growStaveSpec :: Number -> MultiStaveSpec -> MultiStaveSpec
growStaveSpec enlargement multiStaveSpec =
  unwrap $ evalStateT (growMultiStaveSpec enlargement multiStaveSpec) multiStaveIndentation
 
growMultiStaveSpec :: Number -> MultiStaveSpec -> Alignment MultiStaveSpec
growMultiStaveSpec enlargement mss = do
  multiStaveLine <- growStaveLine enlargement mss.multiStaveLine 
  pure $ 
    { staveWidth : mss.staveWidth
    , staveStarts : mss.staveStarts 
    , multiStaveLine
    }

growStaveLine :: Number -> MultiStaveLine -> Alignment MultiStaveLine
growStaveLine enlargement msl =
  foldM foldf mempty msl
  
  where
  foldf :: MultiStaveLine -> MultiStaveBarSpec -> Alignment MultiStaveLine
  foldf mbs b = do
    newPositioning <- growPositioning enlargement b.positioning
    let 
      newStaveBar = b { positioning = newPositioning }
    pure $ mbs <> singleton newStaveBar

-- | grow a stave bar to help make the stave fit the alignment width
growPositioning :: Number -> Positioning -> Alignment Positioning
growPositioning enlargement barSpec =
  let
    width = floor $ (toNumber barSpec.width) * enlargement
  in
    do
      xOffset <- get
      _ <- put $ xOffset + width
      pure $ 
        { xOffset: xOffset - multiStaveIndentation
        , width
        }

-- | the maximum stave width depends on the max canvas width and the scale
maxStaveWidth :: Int -> Number -> Int
maxStaveWidth canvasWidth scale =
  floor $ (toNumber canvasWidth) / scale

-- | the canvas width that contains the justified score
justifiedScoreCanvasWidth :: Number -> EnsembleScore -> Int
justifiedScoreCanvasWidth scale staves =
  floor $ (toNumber staveWidth) * scale
  
  where
  staveWidth = (alignmentStaveWidth 10000 staves) + (2 * multiStaveIndentation)

-- | the canvas height that contains the justified score
justifiedScoreCanvasHeight :: Number -> Titling -> EnsembleScore -> Int
justifiedScoreCanvasHeight scale titling staves =
  let
    firstStave = NEA.head staves
    voiceCount = NEA.length firstStave.staveStarts
    staveCount = NEA.length staves * voiceCount
    titleSeparation = case titling of 
      NoTitle -> 0 
      _ -> titleDepth
    staveHeight = (staveCount * staveSeparation) + scoreMarginBottom + titleSeparation
  in
    floor $ (toNumber staveHeight) * scale

centeredTitleXPos :: Config -> Int -> Int
centeredTitleXPos config titleLength =
  (staveWidth - titlePixelWidth) / 2
  
  where
  -- we use 24pt font size == 18px 
  -- px = pt * ( 72pt / 96 ) = 24 * 72 / 96 = 18
  titlePixelWidth = floor $ toNumber titleLength * 18.0
  staveWidth = floor $ (toNumber config.width) / config.scale
