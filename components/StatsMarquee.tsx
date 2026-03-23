"use client";
import { useEffect, useRef } from "react";

const items = [
  "Adobe Suite","Illustrator","Photoshop","After Effects","Premiere Pro",
  "Affinity Designer","AutoCAD","Brand Identity","Logo Design",
  "Social Media","Digital Marketing","Video Editing","Print Design",
];

const stats: [string, number, string][] = [
  ["Years Experience", 5, "5+"],
  ["Projects Delivered", 100, "100+"],
  ["Tools Mastered", 8, "8+"],
  ["Companies & Clients", 4, "4"],
];

export default function StatsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          ref.current?.querySelectorAll(".r-up,.r-clip").forEach((el, i) =>
            setTimeout(() => el.classList.add("on"), i * 100)
          );

          // Animated counter — fires once
          if (!animated.current && !prefersReduced) {
            animated.current = true;
            ref.current?.querySelectorAll<HTMLElement>("[data-stat]").forEach((el) => {
              const target = parseInt(el.getAttribute("data-stat") || "0");
              const suffix = el.getAttribute("data-suffix") || "";
              const duration = 1600;
              const steps = 60;
              const increment = target / steps;
              let current = 0;
              let step = 0;
              const timer = setInterval(() => {
                step++;
                current = Math.min(Math.round(increment * step), target);
                // Ease out: slow down near end
                const progress = step / steps;
                const eased = 1 - Math.pow(1 - progress, 3);
                current = Math.round(eased * target);
                el.textContent = current + suffix;
                if (step >= steps) clearInterval(timer);
              }, duration / steps);
            });
          }

          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Stats row */}
      <div style={{ background: "var(--ink)", padding: "5rem 3rem" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1px",
            background: "rgba(245,240,232,0.06)",
          }}
          className="stats-grid"
        >
          {stats.map(([label, count, display]) => (
            <div
              key={label}
              className="r-up stat-cell"
              style={{
                background: "var(--ink)",
                padding: "3rem 2rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.3s",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(184,146,42,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--ink)";
              }}
            >
              {/* Gold accent top bar — reveals on hover */}
              <div
                className="stat-bar"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "var(--gold)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s ease",
                }}
              />
              <div
                data-stat={count}
                data-suffix="+"
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(3rem,5vw,5.5rem)",
                  color: "var(--bg)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                {display}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.3)",
                  marginTop: "0.6rem",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div style={{ background: "var(--gold)", padding: "0.9rem 0", overflow: "hidden" }}>
        <div className="mq-inner">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#fff",
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

      <style jsx>{`
        .stat-cell:hover .stat-bar {
          transform: scaleX(1) !important;
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .r-up {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
