# Loop health check extension

This extension is for localizing the causes of lags. The browser game part should perform 60 frames per second or one frame in 16.6 milliseconds. Due to lack of performance the frames may be dropped.

This extension shows you when the latest frame drop was and how much drops were in total. If you feel lags, compare the time of these lags to the time of the last frame drop. If it matches (within a second due to rounding), there's probably not the connection quality problem.

For clean tests it is recommended to use the [hit circles theme](https://github.com/fabiospampinato/airmash-swam-extensions#hit-circles) with the layers turned off (all "Backgrounds" in StarMash Mod settings) and the hidden UI (F4 hotkey).

## Install URL

```
https://wight-airmash.github.io/starmash-loop-health-check/dist/loop-health-check.js
```
