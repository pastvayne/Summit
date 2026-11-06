# SUMMIT

Beyond the Horizon. A cinematic site in the visual weather of Ascend.

The opening scene uses original mountain plates in `public/summit/`. They are generated artwork, not a photograph of a real peak, and can be replaced with a painted final without changing the scene.

## Plates

| File | Size | Used by |
| --- | --- | --- |
| `peak-wide-{960,1600,2560}.webp` | 16:9 | desktop hero, close, page headers (picked by `srcset`) |
| `peak-tall-{900,1440}.webp` | 9:16 | phone hero and close |
| `peak-wide-1600.jpg` | 16:9 | Open Graph image and `<img>` fallback |

The plates are 2x rebuilds of the original 1280x720 / 720x1280 renders: baked-in stars removed and
re-drawn as sharp points, Lanczos upscale, rock-only sharpening, and dithering against banding.
The hero canvas renders at the screen's real pixel density (up to 2x) with mipmapped textures, and
uses whichever plate the browser already chose for the `<img>`, so nothing downloads twice.

To swap in a painted final, export it at 2560x1440 (and 1440x2560 for phones) under the same names.
If the skyline changes, regenerate `components/summit/ridge.ts`, which draws the Record section's
elevation profile from the plate's ridge line.

```bash
npm run dev
```

The public site is [summitascend.site](https://summitascend.site).
