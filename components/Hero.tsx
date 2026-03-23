"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Skew on scroll
    const onScroll = () => {
      if (prefersReduced) return;
      const y = window.scrollY;
      const skew = Math.min(y * 0.012, 3);
      el.style.transform = `skewY(-${skew}deg)`;
      const bg = el.querySelector<HTMLDivElement>(".hero-img-wrap");
      if (bg) bg.style.transform = `translateY(${y * 0.28}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Stagger reveal after loader
    const els = el.querySelectorAll<HTMLElement>(".r-up,.r-clip,.r-fade");
    setTimeout(() => {
      els.forEach((e, i) => setTimeout(() => e.classList.add("on"), i * 120));
    }, 1900);

    // Animated counter for stats
    const counters = el.querySelectorAll<HTMLElement>("[data-count]");
    setTimeout(() => {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-count") || "0");
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current) + "+";
        }, 16);
      });
    }, 2200);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={secRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 3rem 4rem",
        willChange: "transform",
        overflow: "hidden",
      }}
    >
      {/* Big background number */}
      <div
        style={{
          position: "absolute",
          right: "-0.05em",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(28vw,40vw,55vw)",
          lineHeight: 1,
          color: "rgba(14,13,10,0.04)",
          letterSpacing: "-0.02em",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        GD
      </div>

      {/* Top right — location + availability */}
      <div
        style={{
          position: "absolute",
          top: "6.5rem",
          right: "3rem",
          zIndex: 2,
        }}
      >
        <div className="r-up" style={{ animationDelay: "0.1s", textAlign: "right" }}>
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Jakarta, Indonesia
          </p>
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginTop: "0.2rem",
            }}
          >
            ● Available for Freelance
          </p>
        </div>
      </div>

      {/* Grid layout */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "flex-end",
        }}
        className="hero-inner"
      >
        {/* LEFT — giant name */}
        <div>
          {/* Eyebrow */}
          <div className="r-clip" style={{ marginBottom: "1.5rem", overflow: "hidden" }}>
            <p
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                color: "var(--ink)",
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "1px",
                  background: "var(--ink)",
                  display: "inline-block",
                }}
              />
              Graphic Designer
            </p>
          </div>

          {/* Name */}
          <div style={{ overflow: "hidden" }}>
            <h1
              className="r-up"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(5rem,13vw,14rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
              }}
            >
              Acep
              <br />
              <span style={{ WebkitTextStroke: "1.5px var(--ink)", color: "transparent" }}>
                Nurjaman
              </span>
            </h1>
          </div>

          {/* Bottom bar */}
          <div
            className="r-up"
            style={{
              marginTop: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: "clamp(0.9rem,1.5vw,1.1rem)",
                fontStyle: "italic",
                color: "var(--muted)",
                maxWidth: "320px",
                lineHeight: 1.6,
              }}
            >
              Mewujudkan ide menjadi visual yang berbicara — 5+ tahun pengalaman.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                className="magnetic-btn"
                onClick={() =>
                  document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "var(--ink)",
                  color: "var(--bg)",
                  padding: "0.8rem 2rem",
                  border: "none",
                  cursor: "none",
                  fontWeight: 700,
                  transition: "background 0.25s, transform 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
              >
                See Work
              </button>
              <a
                href="mailto:acman2602@gmail.com"
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "transparent",
                  color: "var(--ink)",
                  padding: "0.8rem 2rem",
                  border: "1px solid rgba(14,13,10,0.25)",
                  cursor: "none",
                  textDecoration: "none",
                  transition: "border-color 0.25s, background 0.25s, color 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--ink)";
                  e.currentTarget.style.background = "var(--ink)";
                  e.currentTarget.style.color = "var(--bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14,13,10,0.25)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--ink)";
                }}
              >
                Contact
              </a>
            </div>
          </div>

          {/* Animated mini stats row */}
          <div
            className="r-fade"
            style={{
              display: "flex",
              gap: "3rem",
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--line)",
            }}
          >
            {[
              { count: 5, label: "Years Exp." },
              { count: 100, label: "Projects" },
              { count: 8, label: "Tools" },
            ].map(({ count, label }) => (
              <div key={label}>
                <div
                  data-count={count}
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(1.8rem,3vw,2.8rem)",
                    lineHeight: 1,
                    color: "var(--ink)",
                  }}
                >
                  0+
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "0.52rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — photo */}
        <div
          className="hero-img-wrap r-fade"
          style={{
            width: "clamp(160px,18vw,280px)",
            aspectRatio: "3/4",
            overflow: "hidden",
            borderRadius: "2px",
            position: "relative",
            flexShrink: 0,
            alignSelf: "flex-end",
          }}
        >
          <img
            src="https://res.cloudinary.com/dyhvx9wit/image/upload/v1773726410/Acep_aidjlb.png"
            alt="Acep Nurjaman"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
          {/* Gold tag */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              background: "var(--gold)",
              color: "#fff",
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.52rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.3rem 0.7rem",
              fontWeight: 700,
            }}
          >
            5+ Yrs
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="r-fade"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "36px",
            background: "linear-gradient(to bottom,var(--ink),transparent)",
            animation: "scrollDrop 2s ease infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scrollDrop {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleY(1);
          }
          50% {
            opacity: 1;
            transform: scaleY(0.5);
          }
        }
        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr !important;
          }
          .hero-img-wrap {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .r-up,
          .r-clip,
          .r-fade {
            animation: none !important;
            opacity: 1 !important;
            clip-path: none !important;
          }
        }
      `}</style>
    </section>
  );
}
