import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "SUMMIT — Beyond the Horizon.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const image = await readFile(join(process.cwd(), "public/summit/hero.jpg"));
  const src = `data:image/jpeg;base64,${image.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0B0C13",
          color: "#F4EFE8",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1200} height={630} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 64,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 92, lineHeight: 0.86, letterSpacing: -3 }}>SUMMIT</div>
          <div style={{ marginTop: 16, fontSize: 32, color: "#FFD1AD", fontStyle: "italic" }}>Beyond the Horizon.</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
