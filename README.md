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

The problem is this:  we analyse the entire score and generate the data structure required in order to hand it to ```VexFlow```.  In order to right-align the staves, we need to know the width of each multi-bar during the analysis. We do this by means of a heuristic in ```abc-scores``` and take the maximum width of the given bar in each multi-stave. However, when we eventually ask VexFlow to render it, it seems as if we need to use the ```FULL``` voice mode and to get VexFlow to estimate each bar width itself if we are going to have any chance of vertically aligning notes properly for any given bar across each of the staves.  This width differs from our estimate and consequently there tends to be a good deal of empty space padding the right-hand side of many of the bars.

I don't really want to attempt to display each multi-bar immediately after analysis.  So we are left with either fiddling with our heuristic to make it more like ```VexFlow```'s or somehow to use its estimate but without wasting cycles in unnecessary rendering. 

