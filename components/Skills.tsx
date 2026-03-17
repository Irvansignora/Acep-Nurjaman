"use client";
import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    title: "Adobe Suite",
    sub: "Industry-standard tools",
    tags: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro"],
    level: 95,
  },
  {
    title: "Affinity",
    sub: "Alternative design suite",
    tags: ["Affinity Designer"],
    level: 80,
  },
  {
    title: "AutoDesk",
    sub: "Technical drawing",
    tags: ["AutoCAD"],
    level: 85,
  },
  {
    title: "Coding",
    sub: "Web & programming",
    tags: ["HTML", "C++"],
    level: 55,
  },
  {
    title: "Visual Design",
    sub: "Core competencies",
    tags: ["Brand Identity", "Logo Design", "Social Media", "Print Design", "Mockup"],
    level: 95,
  },
  {
    title: "Content Creation",
    sub: "Multimedia & digital",
    tags: ["Video Editing", "Photo Editing", "Digital Marketing"],
    level: 90,
  },
];

function SkillCard({ skill, delay }: { skill: typeof skillGroups[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
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
        background: "#0a0906",
        border: "1px solid rgba(201,168,76,0.12)",
        borderRadius: "2px",
        padding: "1.8rem",
        opacity: 0,
        transform: "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease, border-color 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)")}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.15rem",
          fontWeight: 600,
          color: "#c9a84c",
          marginBottom: "0.2rem",
        }}
      >
        {skill.title}
      </div>
      <div
        style={{
          fontSize: "0.78rem",
          color: "rgba(242,232,214,0.45)",
          marginBottom: "1rem",
        }}
      >
        {skill.sub}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: "2px",
          background: "rgba(201,168,76,0.12)",
          marginBottom: "1.2rem",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            height: "100%",
            background: "linear-gradient(to right, #c9a84c, #e8c97a)",
            borderRadius: "1px",
            width: visible ? `${skill.level}%` : "0%",
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {skill.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "rgba(201,168,76,0.07)",
              border: "1px solid rgba(201,168,76,0.2)",
              color: "#c9a84c",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.08em",
              padding: "0.28rem 0.7rem",
              borderRadius: "1px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (titleRef.current) {
            titleRef.current.style.opacity = "1";
            titleRef.current.style.transform = "translateY(0)";
          }
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      style={{
        background: "#111009",
        padding: "7rem 3rem",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          ref={titleRef}
          style={{
            marginBottom: "3.5rem",
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
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
            02 — Technical Skills
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem,4vw,3.2rem)",
              fontWeight: 600,
              color: "#f2e8d6",
              lineHeight: 1.1,
            }}
          >
            Keahlian{" "}
            <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Teknis</em>
          </h2>
          <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginTop: "1rem" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.2rem",
          }}
          className="skills-grid"
        >
          {skillGroups.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} delay={i * 80} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
