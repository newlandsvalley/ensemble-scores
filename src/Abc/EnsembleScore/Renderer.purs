module Abc.EnsembleScore.Renderer where

import Prelude

import Abc.EnsembleScore.Generator (buildEnsembleScore, runBuildEnsembleScore)
import Data.Abc (AbcTune)
import Data.Abc.Voice (partitionVoices)
import Data.Array (length)
import Effect (Effect)
import Data.Either (Either(..))
import Data.Traversable (sequenceDefault)
import VexFlow.Score (Renderer, createScore)
import VexFlow.Types (Config, MonophonicScore, StaveSpec)

renderPolyphonicTune :: Config -> Renderer -> AbcTune -> Effect Boolean 
renderPolyphonicTune config renderer tune = do
  let 
    voices = partitionVoices tune 
  if (length voices <= 1) then     
    pure false
  else 
    let 
      eVoiceScores :: Either String (Array MonophonicScore)
      eVoiceScores = sequenceDefault $ map (createScore config) voices
    in
      case eVoiceScores of 
        Right voiceScores -> 
          let 
            ensembleScore = runBuildEnsembleScore voiceScores
          in 
            pure true 
        _ -> 
          pure false
        