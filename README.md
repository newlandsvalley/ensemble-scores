# ensemble-scores

Work-in-progress.

This is an attempt to produces an ensemble score from an ABC notation tune containing multiple voices.  Up to now, scores can be created using [purescript-abc-scores](https://github.com/newlandsvalley/purescript-abc-scores) but these are produced as a set of individual scores, one for each part.  What we want is an ensemble score where the staves are joined with connectors and the bars and notes therein are properly aligned.

I am expecting this to be a fairly slow process.  It involves a fair bit of tedious reconstruction of the data to associate the bars together that are returned from abc-scores.

## To do

  * Complete alignment algorithm for staves and bars
  * Add the rest of the score markings (voltas, time signatures, anotations etc.)
  * Return an error if the parts are mismatched
  * Work out the best scaling factor
  * Try to find out what to do to align individual notes within a multi-bar
  * Convert to a library and add examples