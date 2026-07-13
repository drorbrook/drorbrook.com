import { ImageResponse } from "next/og";

// Favicon: "DB" monogram on the brand gradient. Generated dynamically so it
// stays in sync with the palette; Next wires it in as the site icon.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          color: "#fff",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "sans-serif",
          background: "linear-gradient(135deg, #635BFF, #A855F7)",
        }}
      >
        DB
      </div>
    ),
    size,
  );
}
