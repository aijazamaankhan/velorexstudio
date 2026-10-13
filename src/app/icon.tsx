import { ImageResponse } from "next/og";

/** Generated favicon — the Velorex mark, no binary asset to maintain. */

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
          background: "#050507",
          borderRadius: 7,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
          <path
            d="M15 4 L25 21 H5 Z"
            stroke="#9d85ff"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="15" cy="15.5" r="2.6" fill="#2ad4ff" />
        </svg>
      </div>
    ),
    size,
  );
}
