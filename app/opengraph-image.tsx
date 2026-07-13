import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Branded social share card (LinkedIn, X, Slack, etc.). Generated dynamically
// so there's no binary asset to maintain; Next wires it into og:image (and
// twitter:image falls back to it) automatically - no metadata edits needed.
export const alt = `${site.name} - ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 90,
          color: "#f0f0f8",
          fontFamily: "sans-serif",
          backgroundColor: "#0c0c12",
          // Aurora glow, matching the site's fixed background layer. Uses the
          // "circle at" form Satori supports (not the CSS ellipse-size syntax).
          backgroundImage:
            "radial-gradient(circle at 8% 0%, rgba(99,91,255,0.45), transparent 45%), radial-gradient(circle at 100% 18%, rgba(168,85,247,0.38), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 3,
            color: "#a5a1ff",
          }}
        >
          {"// drorbrook.com"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 132, fontWeight: 700, lineHeight: 1 }}>
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 44,
              color: "#c4c4d4",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 32 }}>
          <div
            style={{
              display: "flex",
              width: 52,
              height: 52,
              marginRight: 22,
              borderRadius: 14,
              background: "linear-gradient(135deg, #635BFF, #A855F7)",
            }}
          />
          The first mentoring call is on me.
        </div>
      </div>
    ),
    size,
  );
}
