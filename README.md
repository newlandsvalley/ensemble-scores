# ensemble-scores

This is an attempt to produces an ensemble score from an ABC notation tune containing multiple voices.

![example](https://github.com/newlandsvalley/ensemble-scores/blob/main/peckets.png)

This branch is a (currently failing) attempt to ensure that notes are laid out sensibly in each bar and that, for a given bar, the notes for each voice are aligned vertically in a proper manner.

Up to now, scores can be created using [purescript-abc-scores](https://github.com/newlandsvalley/purescript-abc-scores) but these are produced as a set of individual scores, one for each part.  What we want is an ensemble score where the staves are joined with connectors and the bars and notes therein are properly aligned.

In order for an ensemble score to be produced, there must be more than one voice, each voice must have the same number of staves, and each stave must have the same number of bars across the set of voices.

## To build the library

```
   spago build
```

## To build the example

```
   npm run example
```

## To do

   * Try to find out what to do to align individual notes within a multi-bar
