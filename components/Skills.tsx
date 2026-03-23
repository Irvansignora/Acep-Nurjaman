"use client";
import { useEffect, useRef, useMemo, useState } from "react";

const groups = [
  { title: "Adobe Suite",   tags: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro"] },
  { title: "Affinity",      tags: ["Affinity Designer"] },
  { title: "AutoDesk",      tags: ["AutoCAD"] },
  { title: "Coding",        tags: ["HTML", "C++"] },
  { title: "Visual Design", tags: ["Brand Identity", "Logo Design", "Social Media", "Print", "Mockup"] },
  { title: "Content",       tags: ["Video Editing", "Photo Editing", "Digital Marketing"] },
];

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function SkillWord({ tag, index }: { tag: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const { size, rx, ry, dur, delay } = useMemo(() => ({
    size:  index % 3 === 0 ? "clamp(1.6rem,3.5vw,3.2rem)"
         : index % 2 === 0 ? "clamp(1.3rem,2.8vw,2.6rem)"
         :                   "clamp(1.1rem,2.2vw,2rem)",
    rx:    (sr(index * 3)     * 14 - 7).toFixed(1),
    ry:    (sr(index * 3 + 1) * 14 - 7).toFixed(1),
    dur:   (sr(index * 3 + 2) * 3 + 3).toFixed(1),
    delay: (sr(index * 7)     * 2).toFixed(2),
  }), [index]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 50); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <span
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Bebas Neue',sans-serif",
        fontSize: size,
        lineHeight: 0.9,
        textTransform: "uppercase",
        display: "inline-block",
        cursor: "crosshair",
        userSelect: "none",
        color: hovered ? "#C4A77D" : "transparent",
        WebkitTextStroke: hovered ? "0px" : "1px rgba(196,167,125,0.35)",
        textShadow: hovered
          ? "0 0 18px rgba(196,167,125,0.9), 0 0 40px rgba(196,167,125,0.4)"
          : "none",
        opacity: visible ? 1 : 0,
        transform: hovered
          ? "perspective(500px) scale(1.25) translateY(-8px) rotateX(0) rotateY(0)"
          : visible
          ? `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg)`
          : "perspective(500px) translateY(20px) scale(0.85)",
        zIndex: hovered ? 10 : 1,
        position: "relative",
        transition: hovered
          ? "all 0.3s cubic-bezier(0.34,1.56,0.64,1)"
          : "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.3s",
        animation: visible && !hovered
          ? `skillFloat ${dur}s ease-in-out ${delay}s infinite alternate`
          : "none",
      }}
    >
      {tag}
    </span>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const allSkills  = useMemo(() => groups.flatMap((g) => g.tags), []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          sectionRef.current
            ?.querySelectorAll(".r-up, .r-clip")
            .forEach((el, i) => setTimeout(() => el.classList.add("on"), i * 120));
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ background: "var(--ink)", padding: "10rem 3rem", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "5rem",
          borderBottom: "1px solid rgba(196,167,125,0.15)",
          paddingBottom: "2.5rem",
          flexWrap: "wrap",
          gap: "2rem",
        }}>
          <div>
            <p className="r-up" style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(196,167,125,0.45)",
              marginBottom: "0.8rem",
            }}>
              03 — Arsenal
            </p>
            <h2 className="r-up" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3.5rem,7vw,7rem)",
              letterSpacing: "0.04em",
              color: "#C4A77D",
              lineHeight: 0.88,
            }}>
              Keahlian
              <br />
              <span style={{ WebkitTextStroke: "1px rgba(196,167,125,0.45)", color: "transparent" }}>
                Teknis
              </span>
            </h2>
          </div>
          <p className="r-up" style={{
            fontFamily: "'DM Serif Display',serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "rgba(245,240,232,0.3)",
            maxWidth: "260px",
            textAlign: "right",
            lineHeight: 1.7,
          }}>
            Hover untuk mengaktifkan glow — setiap kata melayang dalam ruang 3D.
          </p>
        </div>

        {/* Skill cloud — dibatasi dalam kotak, tidak menyebar */}
        <div style={{
          border: "1px solid rgba(196,167,125,0.1)",
          padding: "3.5rem 3rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.2rem 2rem",
        }}>
          {allSkills.map((tag, i) => (
            <SkillWord key={tag} tag={tag} index={i} />
          ))}
        </div>

        {/* Group legend */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.7rem",
          justifyContent: "center",
          marginTop: "3rem",
          paddingTop: "2.5rem",
          borderTop: "1px solid rgba(196,167,125,0.08)",
        }}>
          {groups.map((g) => (
            <span key={g.title} style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(196,167,125,0.35)",
              padding: "0.35rem 0.85rem",
              border: "1px solid rgba(196,167,125,0.12)",
            }}>
              {g.title} · {g.tags.length}
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes skillFloat {
          0%   { transform: perspective(500px) translateY(0px)   rotateX(-3deg); }
          100% { transform: perspective(500px) translateY(-14px) rotateX(3deg);  }
        }
        @media (prefers-reduced-motion: reduce) {
          span[style*="skillFloat"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
