import { ImageResponse } from "next/og";

export const runtime = "edge";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const pages: Record<string, { title: string; category: string }> = {
  default: { title: "Nexus", category: "Digital Innovation Agency" },
  work: { title: "Our Work", category: "Case Studies" },
  about: { title: "About Us", category: "The Team" },
  contact: { title: "Contact", category: "Get In Touch" },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "default";
  const title = searchParams.get("title");
  const category = searchParams.get("category");

  const data = title
    ? { title, category: category || "Nexus" }
    : pages[page] || pages.default;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          backgroundColor: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Logo square */}
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#ccff00",
              borderRadius: "6px",
              transform: "rotate(45deg)",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#ededed",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Nexus
          </span>
        </div>

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "#ccff00",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {data.category}
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#ededed",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {data.title}
          </span>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "#666",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            nexus-agency.com
          </span>
          <div
            style={{
              width: "80px",
              height: "2px",
              backgroundColor: "#ccff00",
            }}
          />
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
    }
  );
}
