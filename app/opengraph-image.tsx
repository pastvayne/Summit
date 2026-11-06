import { ImageResponse } from "next/og";

export const alt = "PaperMill — The Mill Never Stops";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4ecd8",
          color: "#241f1a",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", letterSpacing: "0.22em", fontSize: 22, color: "#6d6256" }}>
          PAPERMILL · SOLANA
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 0.92, letterSpacing: -3 }}>
          <span>THE MILL</span>
          <span>NEVER STOPS.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#5c564c" }}>Every trade feeds the mill.</div>
      </div>
    ),
    { ...size },
  );
}
