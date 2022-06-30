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
import Debug (spy)

config :: Config
config =
  defaultConfig 
    { width = 1200 }

main :: Effect (Maybe String)
main =
  case (parse serra) of
    Right abcTune -> do
      renderer <- initialiseCanvas config
      renderPolyphonicTune config renderer abcTune
    Left e -> do 
      let 
        _ = spy "render error" e
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

serra :: String 
serra = 
     "X:1\r\n"
  <> "T:Serra\r\n"
  <> "R:polska\r\n"
  <> "M:3/4\r\n"
  <> "L:1/8\r\n"
  <> "K:C\r\n"
  <> "V:1\r\n"
  <> "|:e2 fedc|a2a4|g2 agfe|f2 gfed|efe2c2:|\r\n"
  <> "M:3/4\r\n"
  <> "|:e2 fedc|d2d4|c2dcBA|B2B4|e2fedc|d2edcB|c2c4:|\r\n"
  <> "V:2\r\n"
  <> "|:C2A,4|F2fedc|e2c2A2|D2B2G2|c2C4:|\r\n"
  <> "M:3/4\r\n"
  <> "|:C2C4|G,2 GABG|A2^F4|G,2GFED|C2A,4|B,2G,4|C2C,4:|\r\n"


