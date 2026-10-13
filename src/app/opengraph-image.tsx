import { ImageResponse } from "next/og";

/**
 * Social share card, generated at request time. Shares the site's colour
 * language so links look like they belong to the brand.
 */

export const alt = "Velorex Studio — Digital Products, Software & Technology";
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
          background: "#050507",
          padding: 80,
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -120,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(124,92,255,0.45), rgba(5,5,7,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -140,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(42,212,255,0.32), rgba(5,5,7,0) 70%)",
          }}
        />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="40" height="40" viewBox="0 0 30 30" fill="none">
            <path
              d="M15 3 L25.4 21 H4.6 Z"
              stroke="#9d85ff"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="15" cy="15" r="2.6" fill="#2ad4ff" />
          </svg>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#f5f6fa",
              fontWeight: 700,
            }}
          >
            VELOREX STUDIO
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1,
            color: "#f5f6fa",
          }}
        >
          <div>WE BUILD</div>
          <div>DIGITAL PRODUCTS</div>
          <div style={{ color: "#9d85ff" }}>THAT MATTER.</div>
        </div>

        {/* Footer line */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            color: "#6b7086",
          }}
        >
          DESIGN · ENGINEERING · PRODUCTS
        </div>
      </div>
    ),
    size,
  );
}
