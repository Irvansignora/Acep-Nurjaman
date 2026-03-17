"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Staggered word reveal
    const words = el.querySelectorAll<HTMLSpanElement>(".word");
    words.forEach((w, i) => {
      setTimeout(() => {
        w.style.transform = "translateY(0)";
        w.style.opacity = "1";
      }, 400 + i * 110);
    });

    // Parallax on scroll
    const onScroll = () => {
      const y = window.scrollY;
      const bg = el.querySelector<HTMLDivElement>(".hero-bg");
      if (bg) bg.style.transform = `translateY(${y * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToPortfolio = () => {
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "0 3rem",
      }}
    >
      {/* BG overlay gradient */}
      <div
        className="hero-bg"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Vertical line accent */}
      <div
        style={{
          position: "absolute",
          left: "3rem",
          top: "15%",
          bottom: "15%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, rgba(201,168,76,0.35), transparent)",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "6rem",
        }}
        className="hero-grid"
      >
        {/* LEFT */}
        <div>
          {/* eyebrow */}
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "1.4rem",
              opacity: 0,
              transition: "opacity 0.6s ease",
            }}
            className="word"
          >
            ✦ Graphic Designer · Jakarta
          </p>

          {/* Big name */}
          <div
            style={{
              overflow: "hidden",
              marginBottom: "0.2rem",
            }}
          >
            <h1
              className="word"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(4rem, 9vw, 8rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                color: "#f2e8d6",
                opacity: 0,
                transform: "translateY(60px)",
                transition: "opacity 0.9s ease, transform 0.9s ease",
              }}
            >
              Acep
            </h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
            <h1
              className="word"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(4rem, 9vw, 8rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 0.95,
                color: "#c9a84c",
                opacity: 0,
                transform: "translateY(60px)",
                transition: "opacity 0.9s ease, transform 0.9s ease",
              }}
            >
              Nurjaman
            </h1>
          </div>

          {/* subtitle */}
          <p
            className="word"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6b6254",
              marginBottom: "1.8rem",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            Visual Identity · Digital Content · Brand Design
          </p>

          <p
            className="word"
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "rgba(242,232,214,0.6)",
              maxWidth: "420px",
              marginBottom: "2.5rem",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            Graphic designer dengan pengalaman 5+ tahun yang terbiasa membuat
            desain untuk berbagai macam kebutuhan — dari identitas visual hingga
            konten digital yang berdampak.
          </p>

          <div
            className="word"
            style={{
              display: "flex",
              gap: "1rem",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <button
              onClick={scrollToPortfolio}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "#c9a84c",
                color: "#0a0906",
                padding: "0.75rem 2rem",
                border: "none",
                cursor: "none",
                borderRadius: "1px",
                fontWeight: 700,
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e8c97a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#c9a84c")}
            >
              View Portfolio
            </button>
            <a
              href="mailto:acman2602@gmail.com"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "transparent",
                color: "#c9a84c",
                padding: "0.75rem 2rem",
                border: "1px solid rgba(201,168,76,0.35)",
                cursor: "none",
                borderRadius: "1px",
                textDecoration: "none",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9a84c")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)")}
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* RIGHT — photo */}
        <div
          className="word"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 1s ease, transform 1s ease",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", width: "340px" }}>
            {/* Decorative frame offset */}
            <div
              style={{
                position: "absolute",
                inset: "-16px",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "2px",
                zIndex: 0,
              }}
            />
            {/* Photo */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                aspectRatio: "3/4",
                background: "#111009",
                border: "1px dashed rgba(201,168,76,0.25)",
                borderRadius: "2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.8rem",
                overflow: "hidden",
              }}
            >
              {/*
                GANTI DENGAN: <img src="URL_CLOUDINARY" alt="Acep Nurjaman" style={{ width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0 }} />
              */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(201,168,76,0.3)"
                strokeWidth="0.8"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="12" cy="10" r="3" />
                <path d="M6 21v-1a6 6 0 0112 0v1" />
              </svg>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: "rgba(201,168,76,0.35)",
                  textAlign: "center",
                  padding: "0 1rem",
                }}
              >
                PASTE CLOUDINARY URL
                <br />
                AS img src
              </span>
            </div>

            {/* Badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-14px",
                left: "-14px",
                zIndex: 2,
                background: "#c9a84c",
                color: "#0a0906",
                padding: "0.55rem 1rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              5+ Tahun Exp.
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#6b6254",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
            animation: "scrollPulse 2s ease infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.6); }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            padding-top: 8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
