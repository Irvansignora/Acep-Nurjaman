"use client";
import { useEffect, useRef } from "react";

const trainings = [
  {
    org: "BMKA Masjid Salman ITB",
    name: "Impact Class — Graphic Designer Class",
    date: "08 Agustus 2020",
  },
  {
    org: "Talenthub Kemnaker",
    name: "UI/UX Design Batch 3",
    date: "14 Oktober 2022",
  },
];

const interests = [
  { icon: "🎮", name: "Video Games" },
  { icon: "📷", name: "Photography" },
  { icon: "🤖", name: "Artificial Intelligence" },
  { icon: "⚡", name: "Renewable Energy" },
];

function RevealDiv({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = "1";
              ref.current.style.transform = "translateY(0)";
            }
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Training() {
  return (
    <section
      id="training"
      style={{
        background: "#111009",
        padding: "7rem 3rem",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}
        className="training-layout"
      >
        {/* LEFT — Training */}
        <div>
          <RevealDiv>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "0.6rem",
              }}
            >
              04 — Training & Certifications
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem,3.5vw,2.8rem)",
                fontWeight: 600,
                color: "#f2e8d6",
                lineHeight: 1.1,
                marginBottom: "0.8rem",
              }}
            >
              Pelatihan{" "}
              <em style={{ color: "#c9a84c", fontStyle: "italic" }}>& Sertifikasi</em>
            </h2>
            <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "2.5rem" }} />
          </RevealDiv>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {trainings.map((t, i) => (
              <RevealDiv key={i} delay={i * 100}>
                <div
                  style={{
                    background: "#0a0906",
                    border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: "2px",
                    padding: "1.5rem",
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)")
                  }
                >
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.58rem",
                      color: "#c9a84c",
                      minWidth: "100px",
                      letterSpacing: "0.06em",
                      paddingTop: "0.2rem",
                    }}
                  >
                    {t.date}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: "#f2e8d6",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#6b6254" }}>
                      {t.org}
                    </div>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>

          {/* Personal Project */}
          <RevealDiv delay={250} style={{ marginTop: "2.5rem" }}>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "0.6rem",
              }}
            >
              Personal Project
            </p>
            <div
              style={{
                background: "#0a0906",
                border: "1px solid rgba(201,168,76,0.12)",
                borderRadius: "2px",
                padding: "1.5rem",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)")
              }
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#f2e8d6",
                  marginBottom: "0.3rem",
                }}
              >
                Al-Qudwah Mahabbatul Quran
              </div>
              <div style={{ fontSize: "0.82rem", color: "rgba(242,232,214,0.55)", lineHeight: 1.6 }}>
                Talent, Editor, Graphic Design &amp; Digital Marketing dari
                Sosial Media AQM
              </div>
            </div>
          </RevealDiv>
        </div>

        {/* RIGHT — Interests */}
        <div>
          <RevealDiv>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "0.6rem",
              }}
            >
              05 — Interests
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem,3.5vw,2.8rem)",
                fontWeight: 600,
                color: "#f2e8d6",
                lineHeight: 1.1,
                marginBottom: "0.8rem",
              }}
            >
              Minat{" "}
              <em style={{ color: "#c9a84c", fontStyle: "italic" }}>&amp; Passion</em>
            </h2>
            <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "2.5rem" }} />
          </RevealDiv>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {interests.map((item, i) => (
              <RevealDiv key={i} delay={100 + i * 80}>
                <div
                  style={{
                    background: "#0a0906",
                    border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: "2px",
                    padding: "2rem 1.5rem",
                    textAlign: "center",
                    transition: "border-color 0.3s, background 0.3s",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
                    e.currentTarget.style.background = "rgba(201,168,76,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)";
                    e.currentTarget.style.background = "#0a0906";
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.7rem" }}>
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6b6254",
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>

          {/* Quote */}
          <RevealDiv delay={400} style={{ marginTop: "2.5rem" }}>
            <blockquote
              style={{
                borderLeft: "2px solid #c9a84c",
                paddingLeft: "1.5rem",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(242,232,214,0.6)",
                lineHeight: 1.7,
              }}
            >
              "Design bukan hanya tentang estetika — ini tentang bagaimana
              sebuah pesan hadir dan dirasakan."
            </blockquote>
          </RevealDiv>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .training-layout {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
