"use client";
import { useEffect, useRef, useState } from "react";

const REVEAL_STEPS = [
  ["Graphic"],
  ["Graphic", "Designer"],
  ["Graphic", "Designer", "&"],
  ["Graphic", "Designer", "&", "Visual"],
  ["Graphic", "Designer", "&", "Visual", "Storyteller"],
];

const STEP_DURATION = 360;
const HOLD_LAST     = 800;

export default function Hero() {
  const secRef          = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => {
      setLoaded(true);
      let s = 0;
      const advance = () => {
        s++;
        setStep(s);
        if (s < REVEAL_STEPS.length - 1) setTimeout(advance, STEP_DURATION);
        else setTimeout(() => setDone(true), HOLD_LAST);
      };
      setTimeout(advance, STEP_DURATION);
    }, 1900);
    return () => clearTimeout(start);
  }, []);

  // Parallax — hanya foto bergerak
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      const photo = el.querySelector<HTMLDivElement>(".hero-portrait");
      if (photo) photo.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Counter
  useEffect(() => {
    if (!done) return;
    secRef.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const target = parseInt(el.getAttribute("data-count") || "0");
      let s = 0; const N = 50;
      const t = setInterval(() => {
        s++;
        el.textContent = Math.round((1 - Math.pow(1 - s / N, 3)) * target) + "+";
        if (s >= N) clearInterval(t);
      }, 1200 / N);
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
        minHeight: "680px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "80px 3rem 8vh",
      }}
    >

      {/* ── BACKGROUND: gradient emas sebagai base warna ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        /* Gradient emas — dari pojok kiri-bawah warm gold ke dark ink */
        background: `
          radial-gradient(ellipse 90% 80% at 0% 100%,  rgba(184,146,42,0.55) 0%,  transparent 55%),
          radial-gradient(ellipse 60% 50% at 100% 0%,  rgba(184,146,42,0.18) 0%,  transparent 60%),
          linear-gradient(160deg, #1a1610 0%, #0e0d0a 40%, #1c1508 100%)
        `,
      }} />

      {/* ── FOTO PORTRAIT — posisi kanan, tidak crop, terkontrol ── */}
      <div
        className="hero-portrait"
        style={{
          position: "absolute",
          /* Foto di sebelah kanan, dari bawah ke atas */
          right: "4%",
          bottom: 0,
          zIndex: 1,
          /* Tinggi = 95% viewport, lebar proporsional (foto 3:4 ratio) */
          height: "95%",
          aspectRatio: "3/4",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {/* Foto asli — tidak crop, posisi natural dari bawah */}
        <img
          src="https://res.cloudinary.com/dyhvx9wit/image/upload/v1774235590/Acep-removebg-preview_iikds5.png"
          alt="Acep Nurjaman"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom center",
            display: "block",
          }}
        />
        {/* Fade bawah foto menyatu ke bg */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "35%",
          background: "linear-gradient(to top, #0e0d0a 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        {/* Fade kanan foto menyatu */}
        <div style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0,
          width: "25%",
          background: "linear-gradient(to left, #0e0d0a 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── OVERLAY kiri — pastikan teks kontras di atas foto ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        background: "linear-gradient(to right, rgba(14,13,10,0.75) 0%, rgba(14,13,10,0.35) 55%, transparent 80%)",
        pointerEvents: "none",
      }} />
      {/* Overlay bawah ringan */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        background: "linear-gradient(to top, rgba(14,13,10,0.8) 0%, transparent 45%)",
        pointerEvents: "none",
      }} />

      {/* ── TOP RIGHT INFO ── */}
      <div style={{
        position: "absolute",
        top: "6.5rem",
        right: "3rem",
        zIndex: 4,
        textAlign: "right",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
      }}>
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.45)" }}>
          Jakarta, Indonesia
        </p>
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold-lt)", marginTop: "0.25rem" }}>
          ● Available for Freelance
        </p>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ position: "relative", zIndex: 4 }}>

        {/* Eyebrow */}
        <div style={{ overflow: "hidden", marginBottom: "1rem", opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.1s" }}>
          <p style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.45)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            transform: loaded ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}>
            {/* Gold line — sesuai visual system */}
            <span style={{ width: "40px", height: "1px", background: "var(--gold)", display: "inline-block", flexShrink: 0 }} />
            Acep Nurjaman
          </p>
        </div>

        {/* WORD-BY-WORD HEADLINE */}
        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(3rem,7.5vw,8.5rem)",
          lineHeight: 0.88,
          letterSpacing: "-0.01em",
          display: "flex",
          flexWrap: "wrap",
          gap: "0 0.22em",
          minHeight: "unset",
          alignContent: "flex-end",
          maxWidth: "70vw", // tidak overlap ke foto
        }}>
          {REVEAL_STEPS[REVEAL_STEPS.length - 1].map((word, wi) => {
            const isVisible = wi < currentWords.length;
            const isOutline = word === "&" || word === "Visual" || word === "Storyteller";
            return (
              <span key={word + wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span style={{
                  display: "inline-block",
                  transform: isVisible ? "translateY(0)" : "translateY(110%)",
                  transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${wi * 0.05}s`,
                  // Outline words: pakai gold stroke bukan putih
                  color: isOutline ? "transparent" : "var(--bg)",
                  WebkitTextStroke: isOutline ? "1.5px rgba(184,146,42,0.7)" : "none",
                }}>
                  {word}
                </span>
              </span>
            );
          })}
        </h1>

        {/* BOTTOM BAR */}
        <div style={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
          opacity: done ? 1 : 0,
          transform: done ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(0.82rem,1.2vw,0.96rem)", fontStyle: "italic", color: "rgba(245,240,232,0.5)", maxWidth: "260px", lineHeight: 1.65 }}>
            Mewujudkan ide menjadi visual yang berbicara — 5+ tahun pengalaman.
          </p>

          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button
              onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
              style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.56rem", letterSpacing: "0.15em", textTransform: "uppercase", background: "var(--gold)", color: "#fff", padding: "0.75rem 1.8rem", border: "none", cursor: "none", fontWeight: 700, transition: "background 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#fff"; }}
            >
              See Work
            </button>
            <a
              href="mailto:acman2602@gmail.com"
              style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.56rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.75)", padding: "0.75rem 1.8rem", border: "1px solid rgba(184,146,42,0.4)", cursor: "none", textDecoration: "none", transition: "border-color 0.25s, color 0.25s, background 0.25s", background: "transparent" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold-lt)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(184,146,42,0.4)"; e.currentTarget.style.color = "rgba(245,240,232,0.75)"; }}
            >
              Contact
            </a>
          </div>

          {/* Mini stats */}
          <div style={{ display: "flex", gap: "2rem", marginLeft: "auto" }} className="hero-stats">
            {[{ count: 5, label: "Years" }, { count: 100, label: "Projects" }, { count: 8, label: "Tools" }].map(({ count, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div data-count={count} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.6rem,2.2vw,2.2rem)", lineHeight: 1, color: "var(--gold-lt)" }}>{count}+</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.46rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginTop: "0.15rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GOLD ACCENT LINE — konsisten dengan nav/section lines */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(to right, var(--gold) 0%, rgba(184,146,42,0.3) 50%, transparent 100%)",
        zIndex: 4,
        opacity: done ? 1 : 0,
        transition: "opacity 0.8s ease 0.5s",
      }} />

      {/* SCROLL CUE */}
      <div style={{
        position: "absolute",
        bottom: "2.2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.4rem",
        zIndex: 4,
        opacity: done ? 1 : 0,
        transition: "opacity 0.8s ease 0.4s",
      }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.44rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>Scroll</span>
        <div style={{ width: "1px", height: "30px", background: "linear-gradient(to bottom, var(--gold), transparent)", animation: "scrollDrop 2s ease infinite" }} />
      </div>

      <style jsx>{`
        @keyframes scrollDrop {
          0%,100% { opacity: 0.4; transform: scaleY(1);   }
          50%      { opacity: 1;   transform: scaleY(0.5); }
        }
        @media (max-width: 640px) {
          .hero-stats { display: none !important; }
        }
        @media (max-width: 768px) {
          .hero-portrait { right: -5% !important; height: 80% !important; opacity: 0.5 !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
}
