"use client";
import { useEffect, useRef, useState } from "react";

const portfolioItems = [
  {
    tag: "Brand Identity",
    title: "Visual Identity & Branding",
    desc: "Logo, brand guide, dan seluruh elemen visual brand.",
    wide: true,
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_brand.jpg", // ← ganti URL ini
  },
  {
    tag: "Social Media",
    title: "Feed & Story Design",
    desc: "Desain konten sosial media yang konsisten.",
    wide: false,
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_social.jpg", // ← ganti URL ini
  },
  {
    tag: "Logo Design",
    title: "Logo & Icon System",
    desc: "Logo yang memorable dan scalable.",
    wide: false,
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_logo.jpg", // ← ganti URL ini
  },
  {
    tag: "Print Design",
    title: "Poster & Banner",
    desc: "Material cetak berkualitas tinggi.",
    wide: false,
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_print.jpg", // ← ganti URL ini
  },
  {
    tag: "Digital Marketing",
    title: "Al-Qudwah AQM",
    desc: "Sosial media & digital marketing AQM.",
    wide: true,
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_aqm.jpg", // ← ganti URL ini
  },
  {
    tag: "AutoCAD",
    title: "Technical Drawing",
    desc: "Traffic Control Plan & Layout Jalan.",
    wide: false,
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_cad.jpg", // ← ganti URL ini
  },
];

function PortCard({
  item,
  delay,
}: {
  item: (typeof portfolioItems)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = "1";
              ref.current.style.transform = "scale(1)";
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
        gridColumn: item.wide ? "span 2" : "span 1",
        aspectRatio: item.wide ? "16/7" : "4/3",
        position: "relative",
        overflow: "hidden",
        borderRadius: "2px",
        background: "#111009",
        border: "1px solid rgba(201,168,76,0.1)",
        cursor: "none",
        opacity: 0,
        transform: "scale(0.97)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ✅ Foto dari Cloudinary — ganti URL di portfolioItems[n].imgUrl di atas */}
      <img
        src={item.imgUrl}
        alt={item.title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,9,6,0.95) 0%, rgba(10,9,6,0.2) 60%, transparent 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1.6rem",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c9a84c",
            marginBottom: "0.35rem",
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "transform 0.35s ease",
          }}
        >
          {item.tag}
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "#f2e8d6",
            marginBottom: "0.3rem",
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "transform 0.35s ease 0.04s",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(242,232,214,0.6)",
            transform: hovered ? "translateY(0)" : "translateY(12px)",
            transition: "transform 0.35s ease 0.08s",
          }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
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
      id="portfolio"
      style={{
        background: "#0a0906",
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
            03 — Portfolio
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
            Karya{" "}
            <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Terpilih</em>
          </h2>
          <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginTop: "1rem" }} />
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(242,232,214,0.5)",
              marginTop: "1rem",
              maxWidth: "480px",
            }}
          >
            Koleksi proyek desain grafis — dari identitas visual hingga konten
            digital dan cetak.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
          className="port-grid"
        >
          {portfolioItems.map((item, i) => (
            <PortCard key={i} item={item} delay={i * 80} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .port-grid { grid-template-columns: 1fr 1fr !important; }
          div[style*="span 2"] { grid-column: span 1 !important; aspect-ratio: 4/3 !important; }
        }
        @media (max-width: 600px) {
          .port-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
