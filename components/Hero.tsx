"use client";
import { useEffect, useRef, useState } from "react";

// Urutan reveal ala Locomotive — setiap step MENAMBAH kata
const REVEAL_STEPS = [
  ["Graphic"],
  ["Graphic", "Designer"],
  ["Graphic", "Designer", "&"],
  ["Graphic", "Designer", "&", "Visual"],
  ["Graphic", "Designer", "&", "Visual", "Storyteller"],
];

const STEP_DURATION = 380; // ms antar step
const HOLD_LAST     = 900; // ms tahan di step terakhir sebelum selesai

export default function Hero() {
  const secRef          = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Mulai sequence setelah loader (~1.9s)
  useEffect(() => {
    const start = setTimeout(() => {
      setLoaded(true);
      let s = 0;
      const advance = () => {
        s++;
        setStep(s);
        if (s < REVEAL_STEPS.length - 1) {
          setTimeout(advance, STEP_DURATION);
        } else {
          setTimeout(() => setDone(true), HOLD_LAST);
        }
      };
      setTimeout(advance, STEP_DURATION);
    }, 1900);
    return () => clearTimeout(start);
  }, []);

  // Scroll parallax on photo
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onScroll = () => {
      const y = window.scrollY;
      const photo = el.querySelector(".hero-photo") as HTMLDivElement | null;
      if (photo) photo.style.transform = `scale(1.08) translateY(${y * 0.22}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Counter animation
  useEffect(() => {
    if (!done) return;
    const counters = secRef.current?.querySelectorAll<HTMLElement>("[data-count]");
    counters?.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count") || "0");
      let s = 0;
      const steps = 55;
      const timer = setInterval(() => {
        s++;
        const eased = 1 - Math.pow(1 - s / steps, 3);
        counter.textContent = Math.round(eased * target) + "+";
        if (s >= steps) clearInterval(timer);
      }, 1400 / steps);
    });
  }, [done]);

  const currentWords = REVEAL_STEPS[Math.min(step, REVEAL_STEPS.length - 1)];

  return (
    <section
      ref={secRef}
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 3rem 4rem",
      }}
    >
      {/* FULL-SCREEN PHOTO BACKGROUND */}
      <div
        className="hero-photo"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          transform: "scale(1.08) translateY(0px)",
          willChange: "transform",
        }}
      >
        <img
          src="https://res.cloudinary.com/dyhvx9wit/image/upload/v1773726410/Acep_aidjlb.png"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />
      </div>

      {/* CINEMATIC OVERLAYS */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to top, rgba(14,13,10,0.92) 0%, rgba(14,13,10,0.5) 40%, rgba(14,13,10,0.15) 75%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(14,13,10,0.6) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* TOP RIGHT */}
      <div
        style={{
          position: "absolute",
          top: "6.5rem",
          right: "3rem",
          zIndex: 3,
          textAlign: "right",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}
      >
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)" }}>
          Jakarta, Indonesia
        </p>
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold-lt)", marginTop: "0.25rem" }}>
          ● Available for Freelance
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ position: "relative", zIndex: 3 }}>

        {/* Eyebrow */}
        <div style={{ overflow: "hidden", marginBottom: "1.2rem", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}>
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              transform: loaded ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <span style={{ width: "36px", height: "1px", background: "var(--gold)", display: "inline-block" }} />
            Acep Nurjaman
          </p>
        </div>

        {/* WORD-BY-WORD HEADLINE ala Locomotive */}
        <h1
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(4.5rem,11vw,12rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.01em",
            color: "var(--bg)",
            display: "flex",
            flexWrap: "wrap",
            gap: "0 0.22em",
            minHeight: "1.8em",
          }}
        >
          {REVEAL_STEPS[REVEAL_STEPS.length - 1].map((word, wi) => {
            const isVisible = wi < currentWords.length;
            const isOutline = word === "&" || word === "Visual" || word === "Storyteller";
            return (
              <span key={word + wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span
                  style={{
                    display: "inline-block",
                    transform: isVisible ? "translateY(0)" : "translateY(110%)",
                    transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${wi * 0.05}s`,
                    color: isOutline ? "transparent" : "var(--bg)",
                    WebkitTextStroke: isOutline ? "1.5px rgba(245,240,232,0.65)" : "none",
                  }}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </h1>

        {/* Bottom bar — muncul setelah semua kata terreveal */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(0.85rem,1.3vw,1rem)", fontStyle: "italic", color: "rgba(245,240,232,0.55)", maxWidth: "280px", lineHeight: 1.65 }}>
            Mewujudkan ide menjadi visual yang berbicara — 5+ tahun pengalaman.
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
              style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", background: "var(--bg)", color: "var(--ink)", padding: "0.8rem 2rem", border: "none", cursor: "none", fontWeight: 700, transition: "background 0.25s, color 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.color = "var(--ink)"; }}
            >
              See Work
            </button>
            <a
              href="mailto:acman2602@gmail.com"
              style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", background: "transparent", color: "rgba(245,240,232,0.8)", padding: "0.8rem 2rem", border: "1px solid rgba(245,240,232,0.25)", cursor: "none", textDecoration: "none", transition: "border-color 0.25s, color 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.7)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.25)"; e.currentTarget.style.color = "rgba(245,240,232,0.8)"; }}
            >
              Contact
            </a>
          </div>

          {/* Mini stats */}
          <div style={{ display: "flex", gap: "2rem", marginLeft: "auto" }} className="hero-stats">
            {[{ count: 5, label: "Years" }, { count: 100, label: "Projects" }, { count: 8, label: "Tools" }].map(({ count, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div data-count={count} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.6rem,2.5vw,2.4rem)", lineHeight: 1, color: "var(--bg)" }}>{count}+</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.48rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", marginTop: "0.15rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SCROLL CUE */}
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
          zIndex: 3,
          opacity: done ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>Scroll</span>
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, rgba(245,240,232,0.6), transparent)", animation: "scrollDrop 2s ease infinite" }} />
      </div>

      <style jsx>{`
        @keyframes scrollDrop {
          0%,100% { opacity: 0.3; transform: scaleY(1); }
          50%      { opacity: 1;   transform: scaleY(0.5); }
        }
        @media (max-width: 640px) {
          .hero-stats { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
}
