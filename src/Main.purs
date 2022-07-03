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
    { width = 1500 }

main :: Effect (Maybe String)
main =
  case (parse peckets) of
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
  <> "Q:1/4=120\r\n"
  <> "K:C\r\n"
  <> "V:1\r\n"
  <> "|:e2 fedc|a2a4|g2 agfe|f2 gfed|efe2c2:|\r\n"
  <> "M:3/4\r\n"
  <> "|:e2 fedc|d2d4|c2dcBA|B2B4|e2fedc|d2edcB|c2c4:|\r\n"
  <> "V:2\r\n"
  <> "|:C2A,4|F2fedc|e2c2A2|D2B2G2|c2C4:|\r\n"
  <> "M:3/4\r\n"
  <> "|:C2C4|G,2 GABG|A2^F4|G,2GFED|C2A,4|B,2G,4|C2C,4:|\r\n"

peckets :: String 
peckets =
     "X:1\r\n"
  <> "T:Pecket's Hornpipe\r\n"
  <> "L:1/8\r\n"
  <> "M:3/2\r\n"
  <> "R:Triple Hornpipe\r\n"
  <> "K:D\r\n"
  <> "V:1 clef=treble\r\n"
  <> "gfed cdec d2 D2 | FGAF E2 e2 c4   | BAGB AGFA d2 F2| GFED A,2 C2 D4 :|\r\n"
  <> "|: FAFD FAFD C2 E2 | GBGE GBGE  F2 A2| egec dfdB cecA | gfed Adce  d4 :|]\r\n"
  <> "V:2 clef=treble\r\n"
  <> "E2 E2 A2 c2 d4 | D2 F2 G2 B2 A4 | G2 G2 A2 F2 D4 | C2 D2 E2 E2 D4 :|\r\n"
  <> "|: F2 F4 D2 C2 E2 | G2 G4 E2 D2 F2 | B2 c2 A2 B2 G2 A2 | C2 D2 E2 E2 D4 :|\r\n"
  <> "V:3 clef=bass\r\n"
  <> "A,,2 A,,4 A,,2 D,C,B,,A,, | D,,2 D,,4 A,,2 C,D,E,F, | G,2 G,4 F,2 D,E,F,G, | A,2 A,4 A,2 D,4 :|\r\n"
  <> "|: D,,2 D,,4 D,,2 A,,2 A,,2 | |E,2 E,4 E,2 D,2 F,2 | G,2 A,2 F,2 G,2 E,2 A,2 | A,2 A,4 A,2 D,4 :|\r\n"