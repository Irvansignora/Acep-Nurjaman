"use client";
import { useEffect, useRef, useMemo, useState } from "react";

const groups = [
  { title: "Adobe Suite", tags: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro"] },
  { title: "Affinity", tags: ["Affinity Designer"] },
  { title: "AutoDesk", tags: ["AutoCAD"] },
  { title: "Coding", tags: ["HTML", "C++"] },
  { title: "Visual Design", tags: ["Brand Identity", "Logo Design", "Social Media", "Print", "Mockup"] },
  { title: "Content", tags: ["Video Editing", "Photo Editing", "Digital Marketing"] },
];

// Seeded pseudo-random — konsisten antar render, tidak berubah
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface SkillItemProps {
  tag: string;
  index: number;
}

function SkillItem({ tag, index }: SkillItemProps) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // ✅ FIX: Gunakan seededRand bukan Math.random() — hasil STABIL antar render
  const { fontSize, rotateX, rotateY, floatDuration, floatDelay } = useMemo(() => {
    const r1 = seededRand(index * 3);
    const r2 = seededRand(index * 3 + 1);
    const r3 = seededRand(index * 3 + 2);
    return {
      fontSize: index % 3 === 0 ? 6 : index % 2 === 0 ? 4.5 : 3.2,
      rotateX: r1 * 20 - 10,
      rotateY: r2 * 20 - 10,
      floatDuration: r3 * 4 + 3,
      floatDelay: seededRand(index * 7) * 2,
    };
  }, [index]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), index * 55);
          obs.disconnect();
        }
      },
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
        fontSize: `clamp(1.8rem, ${fontSize}vw, ${fontSize + 1}rem)`,
        lineHeight: 0.9,
        textTransform: "uppercase",
        display: "inline-block",
        cursor: "crosshair",
        color: hovered ? "#C4A77D" : "transparent",
        WebkitTextStroke: hovered ? "0px" : "1px rgba(196,167,125,0.3)",
        transform: hovered
          ? "perspective(600px) scale(1.3) translateY(-12px) rotateX(0deg) rotateY(0deg)"
          : visible
          ? `perspective(600px) scale(1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : "perspective(600px) scale(0.8) translateY(30px)",
        opacity: visible ? 1 : 0,
        textShadow: hovered
          ? "0 0 20px rgba(196,167,125,0.9), 0 0 40px rgba(196,167,125,0.5), 0 0 80px rgba(196,167,125,0.2)"
          : "none",
        zIndex: hovered ? 20 : 1,
        position: "relative",
        transition: hovered
          ? "color 0.25s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), text-shadow 0.3s, opacity 0.4s"
          : "color 0.35s, transform 0.5s cubic-bezier(0.16,1,0.3,1), webkit-text-stroke 0.35s, opacity 0.5s",
        animation:
          visible && !hovered
            ? `skillFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite alternate`
            : "none",
      }}
    >
      {tag}
    </span>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const allSkills = useMemo(() => groups.flatMap((g) => g.tags), []);

  return (
    <section
      id="skills"
      ref={ref}
      style={{ background: "var(--ink)", padding: "12rem 3rem", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "8rem",
            borderBottom: "1px solid rgba(196,167,125,0.15)",
            paddingBottom: "3rem",
          }}
        >
          <div>
            <p
              className="r-up"
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(196,167,125,0.4)",
                marginBottom: "1rem",
              }}
            >
              03 — Arsenal
            </p>
            <h2
              className="r-up"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(4rem,8vw,8rem)",
                letterSpacing: "0.04em",
                color: "#C4A77D",
                lineHeight: 0.85,
              }}
            >
              Keahlian
              <br />
              <span style={{ WebkitTextStroke: "1px rgba(196,167,125,0.5)", color: "transparent" }}>
                Teknis
              </span>
            </h2>
          </div>
          <p
            className="r-up"
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "rgba(245,240,232,0.35)",
              maxWidth: "280px",
              textAlign: "right",
              lineHeight: 1.7,
            }}
          >
            Hover untuk mengaktifkan — setiap skill melayang dalam ruang 3D.
          </p>
        </div>

        {/* Skill cloud — stably randomized, no hydration mismatch */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem 3rem",
            padding: "4rem 0",
          }}
        >
          {allSkills.map((tag, i) => (
            <SkillItem key={tag} tag={tag} index={i} />
          ))}
        </div>

        {/* Group legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "6rem",
            paddingTop: "4rem",
            borderTop: "1px solid rgba(196,167,125,0.1)",
          }}
        >
          {groups.map((g) => (
            <div
              key={g.title}
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(196,167,125,0.4)",
                padding: "0.4rem 1rem",
                border: "1px solid rgba(196,167,125,0.15)",
                borderRadius: "1px",
              }}
            >
              {g.title} · {g.tags.length}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes skillFloat {
          0% {
            transform: perspective(600px) translateY(0px) rotateX(-3deg);
          }
          100% {
            transform: perspective(600px) translateY(-18px) rotateX(3deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span[style*="skillFloat"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
