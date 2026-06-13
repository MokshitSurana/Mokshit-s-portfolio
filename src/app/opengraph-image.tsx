import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} · ${profile.role}`;

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
          background: "#07070a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#8a8a93",
            textTransform: "uppercase",
          }}
        >
          {profile.location} · {profile.status}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 130,
              fontWeight: 700,
              color: "#ededed",
              lineHeight: 1,
            }}
          >
            {profile.name}
            <span style={{ color: "#c6f24e" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 38,
              color: "#c6f24e",
              letterSpacing: 2,
            }}
          >
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#8a8a93",
          }}
        >
          LLM evaluation · healthcare AI · core ML
        </div>
      </div>
    ),
    size
  );
}
