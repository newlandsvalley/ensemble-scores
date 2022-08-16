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

## Formatting Issues

The problem is this:  we analyse the entire score and generate the data structure required in order to hand it to ```VexFlow```.  In order to right-align the staves, we need to know the width of each multi-bar during the analysis.  However, when we eventually ask VexFlow to render it, it seems as if we need to use the ```FULL``` voice mode and to get VexFlow to estimate each bar width itself if we are going to have any chance of vertically aligning notes properly for any given bar across each of the staves.  This width differs from our estimate and consequently there tends to be a good deal of empty space padding the right-hand side of many of the bars.

And in any case, I prefer the look and feel of the score when we don't attempt this alignment and just use VexFlow's ```SOFT``` voice mode.  Maybe we need to abandon this branch and just accept that we can't achieve vertical alignments of notes across the voices.
