import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "SUMMIT — Beyond the Horizon.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const image = await readFile(join(process.cwd(), "public/summit/peak-wide-1600.jpg"));
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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1200} height={675} style={{ position: "absolute", top: -20, left: 0, width: 1200, height: 675 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(0deg, rgba(11,12,19,0.9) 0%, rgba(11,12,19,0) 50%), linear-gradient(90deg, rgba(11,12,19,0.88) 0%, rgba(11,12,19,0.55) 38%, rgba(11,12,19,0) 62%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 72,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#A88BFF" }}>
            ASCEND ECOSYSTEM · CONTRACT PENDING
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 132, fontWeight: 700, lineHeight: 0.9, letterSpacing: -6 }}>
            SUMMIT
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 36, color: "#FFD1AD" }}>Beyond the Horizon.</div>
          <div style={{ display: "flex", marginTop: 18, maxWidth: 520, fontSize: 22, lineHeight: 1.4, color: "#C9C3BB" }}>
            Trading fees, intended for SUMMIT buybacks and KNTQ distributions to eligible holders.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
