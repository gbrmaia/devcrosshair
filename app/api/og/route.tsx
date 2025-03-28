import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "white",
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12c0 5.52-4.48 10-10 10s-10-4.48-10-10 4.48-10 10-10 10 4.48 10 10z"></path>
            <path d="M22 12h-4"></path>
            <path d="M6 12H2"></path>
            <path d="M12 6V2"></path>
            <path d="M12 22v-4"></path>
          </svg>
          <div
            style={{ marginLeft: "20px", fontSize: "60px", fontWeight: "bold" }}
          >
            Dev<span style={{ color: "#a0a0a0" }}>Crosshair</span>
          </div>
        </div>
        <div style={{ fontSize: "24px", color: "#a0a0a0", maxWidth: "700px" }}>
          Ferramenta de precisão para desenvolvedores web e profissionais de QA
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
