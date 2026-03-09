import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Andri Amaro · Full Stack Developer · Pulse Ecosystem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(145deg, #0f0d1f 0%, #16132d 40%, #1e1b4b 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Avatar circle */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: 800,
              color: "white",
              boxShadow: "0 0 40px rgba(99,102,241,0.4)",
            }}
          >
            A
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.02em",
              display: "flex",
              gap: "16px",
            }}
          >
            <span>Andri</span>
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Amaro
            </span>
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "rgba(165, 180, 252, 0.9)",
              letterSpacing: "0.05em",
            }}
          >
            Full Stack Developer
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)",
              margin: "4px 0",
            }}
          />

          {/* Metrics row */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "8px",
            }}
          >
            {[
              { value: "3", label: "SaaS Apps" },
              { value: "100+", label: "Componentes" },
              { value: "380+", label: "Testes" },
              { value: "56", label: "Paginas" },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {m.value}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Ecosystem badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "12px",
              padding: "8px 20px",
              borderRadius: "999px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#818cf8",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(165,180,252,0.9)",
                letterSpacing: "0.05em",
              }}
            >
              Criador do Pulse Ecosystem
            </span>
          </div>
        </div>

        {/* Bottom tech bar */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"].map(
            (tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
