"use client";
import { useEffect, useRef } from "react";

const experiences = [
  {
    company: "Freelancer — Graphic Designer",
    role: "Professional GD",
    period: "2017 — Present",
    items: [
      "Membuat publikasi sosial media (Flyer, Story, Feed, Reels, katalog, menu, kartu bisnis)",
      "Membuat identitas visual termasuk brand positioning, promosi, dan digital marketing",
      "Desain logo, t-shirt, Mockup, Poster, Banner",
      "Editing Video & Photos",
    ],
    active: true,
  },
  {
    company: "Indonesia Beramal Sholeh (IBS)",
    role: "Freelance Graphic Designer",
    period: "2023 — Present",
    items: [
      "Membuat publikasi sosial media (Flyer, Story, Feed, Reels, Carousel, Tiktok Inspiration, dll.)",
      "Membuat konten cetak (Banner, X-Banner, Poster)",
      "Editing Video & Photos",
      "Identitas visual, promosi, dan digital marketing untuk web",
    ],
  },
  {
    company: "PT Memori Netindo Jaya (Ultimo Solution)",
    role: "Quality Control — AutoCAD",
    period: "2021 — Present",
    items: [
      "Memeriksa Technical Drawing untuk pekerjaan jalan",
      "Konsultan dalam pengerjaan proyek jalan",
      "Membuat Traffic Control Plan dan Layout pemasangan kabel di jalan",
    ],
  },
  {
    company: "Yayasan Indonesia Berkah",
    role: "Development Program Staff",
    period: "12/2020 — 03/2021",
    items: [
      "Membuat publikasi sosial media (Flyer, Story, Feed, Reels, dll.)",
      "Menjadi Talent sosial media untuk kebutuhan promosi",
      "Membuat pelatihan desain grafis dan menjadi coach",
      "Pengembangan program yayasan",
    ],
  },
];

function Card({ exp, delay }: { exp: typeof experiences[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = "1";
              ref.current.style.transform = "translateY(0)";
            }
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        background: "#111009",
        border: "1px solid rgba(201,168,76,0.12)",
        borderRadius: "2px",
        padding: "2rem",
        opacity: 0,
        transform: "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease, border-color 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)");
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)");
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "3px", height: "0",
          background: "#c9a84c",
          transition: "height 0.4s ease",
        }}
        className="accent-bar"
      />

      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.2rem",
          fontWeight: 600,
          color: "#f2e8d6",
          marginBottom: "0.2rem",
        }}
      >
        {exp.company}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#c9a84c",
          marginBottom: "0.3rem",
        }}
      >
        {exp.role}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.6rem",
          color: "#6b6254",
          marginBottom: "1.2rem",
        }}
      >
        {exp.period}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {exp.items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: "0.85rem",
              color: "rgba(242,232,214,0.65)",
              paddingLeft: "1.2rem",
              position: "relative",
              lineHeight: 1.6,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                color: "#c9a84c",
                fontSize: "0.8rem",
              }}
            >
              ›
            </span>
            {item}
          </li>
        ))}
      </ul>

      <style jsx>{`
        div:hover .accent-bar { height: 100% !important; }
      `}</style>
    </div>
  );
}

export default function Experience() {
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
      id="experience"
      style={{
        background: "#0a0906",
        padding: "7rem 3rem",
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
            01 — Work Experience
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
            Pengalaman{" "}
            <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Kerja</em>
          </h2>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#c9a84c",
              marginTop: "1rem",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1.2rem",
          }}
          className="exp-grid"
        >
          {experiences.map((exp, i) => (
            <Card key={i} exp={exp} delay={i * 100} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
