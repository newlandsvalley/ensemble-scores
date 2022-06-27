module Main where


import Prelude (($), (<>), bind, pure)
import Data.Maybe (Maybe(..))
import Data.Either (Either(..))
import Effect (Effect)
import VexFlow.Score (initialiseCanvas)
import VexFlow.Types (Config, RenderingError, defaultConfig)
import Data.Abc.Parser (parse)
import Data.Abc (AbcTune)
import Abc.EnsembleScore.Renderer

config :: Config
config =
  defaultConfig 
    { width = 1200 }

main :: Effect (Maybe String)
main =
  case (parse oneBar) of
    Right abcTune -> do
      renderer <- initialiseCanvas config
      renderPolyphonicTune config renderer abcTune
    _ ->
      pure $ Just "ABC failed to parse"

oneBar :: String 
oneBar = 
     "X: 1\r\n"
  <> "T: one bar\r\n"
  <> "R: Polska\r\n"
  <> "M: 3/4\r\n"
  <> "L: 1/8\r\n"
  <> "K: Gdor\r\n"
  <> "V:1\r\n"
  <> "d2 d2 _B>c |\r\n" 
  <> "V:2\r\n"
  <> "B2 B2 G>A |\r\n"
