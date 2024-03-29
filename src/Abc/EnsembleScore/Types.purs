module Abc.EnsembleScore.Types where

import Data.Array.NonEmpty (NonEmptyArray)
import Data.Abc (BarLine, KeySignature, TimeSignature)
import Data.Maybe (Maybe)
import VexFlow.Abc.Slur (VexCurve)
import VexFlow.Types (BarFill, BeamSpec, LineThickness, MusicSpec, Tempo)
import VexFlow.Abc.Volta (VexVolta)

-- | Positioning of the stave bar. This is an aspect of a bar common to each voice
-- | note we have to regulate them to common values across the voices
type Positioning =
  { width  :: Int
  , xOffset :: Int
  }

-- | aspects of a bar particular to an individual voice
type VoiceBarSpec =  
  { startLine :: BarLine                  -- the Left bar line (always present)
  , endLineThickness :: LineThickness     -- right bar line type (default Single)?
  , endLineRepeat :: Boolean              -- does it have an end repeat? important for end repeat markers
  , fill :: BarFill                       -- what complement of notes according to the time signature?
  , volta :: Maybe VexVolta
  , timeSignature :: TimeSignature
  , beamSpecs :: Array BeamSpec
  , curves :: Array VexCurve              --  curves representing slurs
  , musicSpec :: MusicSpec
  }

-- | a single bar spanning all voices
type MultiStaveBarSpec = 
  { positioning :: Positioning
  , voices :: NonEmptyArray VoiceBarSpec 
  }

-- | a line of such bar specs
type MultiStaveLine = Array MultiStaveBarSpec

type StaveStart = 
  { staveNo :: Int 
  , keySignature :: KeySignature
  , isNewTimeSignature :: Boolean 
  , mTempo :: Maybe Tempo
  , clefString :: String 
  }

-- a line of a score with multiple staves for each part
type MultiStaveSpec =
  { staveWidth :: Int
  , staveStarts :: NonEmptyArray StaveStart
  , multiStaveLine :: MultiStaveLine
  }

type EnsembleScore = NonEmptyArray MultiStaveSpec 

type EnsembleContext = 
  { nextStaveNo :: Int }

-- staves must be indented further to allow for a stave connector
multiStaveIndentation :: Int 
multiStaveIndentation = 40
