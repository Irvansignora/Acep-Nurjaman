"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { num: "5+", label: "Years Experience" },
  { num: "4", label: "Companies & Clients" },
  { num: "8+", label: "Tools Mastered" },
  { num: "100+", label: "Projects Delivered" },
];

const marqueeItems = [
  "Adobe Photoshop",
  "Illustrator",
  "After Effects",
  "Premiere Pro",
  "Affinity Designer",
  "AutoCAD",
  "Brand Identity",
  "Social Media",
  "Digital Marketing",
  "Logo Design",
  "Video Editing",
  "Print Design",
];

function Counter({ target }: { target: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {target}
    </span>
  );
}

export default function StatsMarquee() {
  return (
    <>
      {/* Stats bar */}
      <section
        style={{
          background: "#111009",
          borderTop: "1px solid rgba(201,168,76,0.12)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          padding: "3.5rem 3rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "2rem",
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem,4vw,4rem)",
                  fontWeight: 700,
                  color: "#c9a84c",
                  lineHeight: 1,
                }}
              >
                <Counter target={s.num} />
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#6b6254",
                  marginTop: "0.4rem",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div
        style={{
          background: "#c9a84c",
          padding: "0.85rem 0",
          overflow: "hidden",
        }}
      >
        <div className="marquee-track">
          <div className="marquee-inner">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#0a0906",
                  padding: "0 2.5rem",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "2.5rem",
                }}
              >
                {item}
                <span style={{ opacity: 0.4 }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
