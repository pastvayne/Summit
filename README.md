# SUMMIT

Beyond the Horizon. A cinematic site in the visual weather of Ascend.

The mountain is a real photograph: "Snowy mountains under a starry night sky" by
[Marek Piwnicki](https://unsplash.com/photos/SumjjLhysZM), used under the
[Unsplash License](https://unsplash.com/license) (free for commercial use; credited in the footer anyway).

## Plates

| File | Size | Used by |
| --- | --- | --- |
| `peak-wide-{960,1600,2560}.webp` | 16:9 | desktop hero, close, page headers (picked by `srcset`) |
| `peak-tall-{780,1170}.webp` | 9:16 | phone hero and close |
| `peak-wide-1600.jpg` | 16:9 | Open Graph image and `<img>` fallback |

Both plates are cropped straight from the 5374x3587 original (no upscaling) and regraded into the
site palette: the sky is repainted as an ink-to-violet gradient that follows the photo's own airglow
and keeps its real stars, with a soft violet glow behind the summit; rock and snow are mapped from ink
through slate to lavender white. The hero canvas renders at the screen's real pixel density (up to 2x)
with mipmapped textures, and uses whichever plate the browser already chose for the `<img>`, so nothing
downloads twice.

`components/summit/ridge.ts` (the Record section's elevation profile) is traced from the desktop
plate's skyline. The build script that makes the plates and the ridge lives outside this repo
(`site-factory/runs/summit/tools/photo_plates.py`).

```bash
npm run dev
```

The public site is [summitascend.site](https://summitascend.site).
