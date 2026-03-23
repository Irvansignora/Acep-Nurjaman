"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Animasi masuk untuk elemen r-up
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current?.querySelectorAll(".r-up").forEach((el, i) => {
          setTimeout(() => el.classList.add("on"), i * 150);
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "var(--ink)", padding: "15rem 4rem 10rem 4rem", overflow: "hidden" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "start", gap: "5rem" }}>
        
        {/* --- LEFT SIDE: Massive Vertically Stacked Gold Name (Brutalist) --- */}
        <div style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", textAlign: "right", borderLeft: "2px solid rgba(196,167,125,0.2)", paddingRight: "1rem" }}>
          <p className="r-up" style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(196,167,125,0.4)", marginBottom: "1.5rem" }}>
            01 — ABOUT
          </p>
          <h1 className="r-up" style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(6rem, 15vw, 12rem)", // Raksasa!
            lineHeight: 0.8,
            letterSpacing: "-0.02em",
            color: "#C4A77D", // Desaturated Gold dari Konsep
            textTransform: "uppercase",
            fontWeight: 400
          }}>
            ACEP NURJAMAN
          </h1>
        </div>

        {/* --- RIGHT SIDE: Raw Editorial Intro & Sketch Pair --- */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginTop: "4rem" }}>
          
          {/* Editorial Paragraph */}
          <div className="r-up" style={{ borderLeft: "1px solid rgba(245,240,232,0.1)", paddingLeft: "2rem" }}>
            <p style={{
              fontFamily: "'DM Serif Display',serif",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              lineHeight: 1.4,
              color: "var(--bg)", // Off-white
              maxWidth: "800px",
              marginBottom: "1rem"
            }}>
              Acep Nurjaman is a graphic designer & technical artist specializing in AutoCAD Technical Drawing.
            </p>
            <p style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              color: "rgba(245,240,232,0.6)",
              maxWidth: "600px"
            }}>
              Consistently translating complex concepts into precise technical documents and impactful visual identities. A fusion of technical rigor and creative fluency.
            </p>
          </div>

          {/* Sketch Section */}
          <div className="r-up" style={{ display: "flex", alignItems: "center", gap: "3rem", alignSelf: "flex-end" }}>
            <p style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "rgba(245,240,232,0.3)",
              maxWidth: "150px",
              textAlign: "right"
            }}>
              HAND-DRAWN VECTOR SKETCH: ACEP N.
            </p>
            {/* Ganti URL_SKETCH_VEKTOR_KAMU dengan link gambar sketsa yang ada di visual baru */}
            <img src="/sketch_acep.png" alt="Acep Nurjaman Vektor Sketsa" style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
              opacity: 0.9,
              filter: "brightness(1.1) contrast(0.9)" // Sedikit kaku (raw)
            }}/>
          </div>
        </div>

      </div>
    </section>
  );
}
