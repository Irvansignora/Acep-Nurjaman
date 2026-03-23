"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────
// Ganti imgUrl dengan URL Cloudinary kamu yang sebenarnya
const items = [
  {
    id: 1,
    tag: "Brand Identity",
    title: "Visual Identity & Branding",
    year: "2024",
    client: "Various Clients",
    desc: "Membangun identitas visual yang kohesif — dari logo hingga brand guideline lengkap. Memastikan konsistensi di semua touchpoint.",
    tools: ["Illustrator", "Photoshop"],
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_brand.jpg",
    color: "#1a1a2e",
  },
  {
    id: 2,
    tag: "Social Media",
    title: "Feed & Story Design",
    year: "2023–2024",
    client: "Indonesia Beramal Sholeh",
    desc: "Konten sosial media yang konsisten secara visual — carousel, reels, story, flyer digital untuk meningkatkan engagement organik.",
    tools: ["Photoshop", "Premiere Pro"],
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_social.jpg",
    color: "#0d1b2a",
  },
  {
    id: 3,
    tag: "Logo Design",
    title: "Logo & Icon System",
    year: "2022–2024",
    client: "Multiple Brands",
    desc: "Desain logo yang scalable dan timeless. Dari sketsa konseptual hingga vector final yang siap produksi di semua medium.",
    tools: ["Illustrator", "Affinity Designer"],
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_logo.jpg",
    color: "#1c1c1c",
  },
  {
    id: 4,
    tag: "Print Design",
    title: "Poster & Banner",
    year: "2021–2024",
    client: "Various",
    desc: "Material cetak berkualitas tinggi — poster event, banner X-banner, brosur, kartu nama dengan perhatian penuh pada tipografi.",
    tools: ["Photoshop", "Illustrator"],
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_print.jpg",
    color: "#2d1b00",
  },
  {
    id: 5,
    tag: "Digital Marketing",
    title: "Al-Qudwah AQM Campaign",
    year: "2023–2025",
    client: "Al-Qudwah Mahabbatul Quran",
    desc: "Full digital marketing ecosystem — konten Tiktok, carousel Instagram, thumbnail YouTube, dan strategi visual brand yang konsisten.",
    tools: ["Photoshop", "Premiere Pro", "After Effects"],
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_aqm.jpg",
    color: "#0a1628",
  },
  {
    id: 6,
    tag: "AutoCAD",
    title: "Technical Drawing",
    year: "2021–Present",
    client: "PT Memori Netindo Jaya",
    desc: "Technical drawing untuk infrastruktur jalan dan kabel. Traffic control plan, layout pemasangan, dan dokumen teknis proyek.",
    tools: ["AutoCAD"],
    imgUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_cad.jpg",
    color: "#0f1923",
  },
];

// ─── LIGHTBOX MODAL ───────────────────────────────────────────────
function CaseStudyModal({
  item,
  onClose,
}: {
  item: (typeof items)[0] | null;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(14,13,10,0.92)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        animation: "modalIn 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        style={{
          background: "var(--bg)",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
          animation: "modalSlide 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
        className="modal-scroll"
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "sticky",
            top: "1.5rem",
            float: "right",
            marginRight: "1.5rem",
            zIndex: 10,
            background: "var(--ink)",
            color: "var(--bg)",
            border: "none",
            width: "36px",
            height: "36px",
            fontSize: "1.1rem",
            cursor: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
        >
          ×
        </button>

        {/* Image hero */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/7",
            background: item.color,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={item.imgUrl}
            alt={item.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Overlay tag */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "2rem",
              background: "var(--gold)",
              color: "#fff",
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.35rem 0.9rem",
              fontWeight: 700,
            }}
          >
            {item.tag}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "3rem" }}>
          {/* Meta */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              marginBottom: "2.5rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid var(--line)",
              flexWrap: "wrap",
            }}
          >
            {[
              ["Client", item.client],
              ["Year", item.year],
              ["Category", item.tag],
            ].map(([k, v]) => (
              <div key={k}>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "0.5rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "1.1rem",
                    letterSpacing: "0.05em",
                    color: "var(--ink)",
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2rem,5vw,4rem)",
              letterSpacing: "0.02em",
              color: "var(--ink)",
              lineHeight: 0.9,
              marginBottom: "1.5rem",
            }}
          >
            {item.title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1rem",
              color: "var(--ink2)",
              lineHeight: 1.8,
              maxWidth: "600px",
              marginBottom: "2.5rem",
            }}
          >
            {item.desc}
          </p>

          {/* Tools */}
          <div>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.8rem",
              }}
            >
              Tools Used
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {item.tools.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    padding: "0.4rem 0.9rem",
                    border: "1px solid var(--gold)",
                    opacity: 0.8,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .modal-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .modal-scroll::-webkit-scrollbar-thumb {
          background: var(--gold);
        }
      `}</style>
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────
function Card({
  item,
  index,
  onOpen,
}: {
  item: (typeof items)[0];
  index: number;
  onOpen: (item: (typeof items)[0]) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        background: "var(--ink)",
        overflow: "hidden",
        aspectRatio: "3/4",
      }}
    >
      {/* Image or fallback */}
      {!imgError ? (
        <img
          src={item.imgUrl}
          alt={item.title}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            filter: hovered ? "grayscale(0%) brightness(0.7)" : "grayscale(40%) brightness(0.6)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
          }}
        />
      ) : (
        // Fallback when image not uploaded yet
        <div
          style={{
            width: "100%",
            height: "100%",
            background: item.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2rem,4vw,3rem)",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.1em",
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            {item.tag}
          </div>
        </div>
      )}

      {/* Always-visible tag */}
      <div
        style={{
          position: "absolute",
          top: "1.2rem",
          left: "1.2rem",
          background: "var(--gold)",
          color: "#fff",
          fontFamily: "'Space Mono',monospace",
          fontSize: "0.48rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          padding: "0.3rem 0.7rem",
          fontWeight: 700,
        }}
      >
        {item.tag}
      </div>

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(14,13,10,0.95) 0%, rgba(14,13,10,0.3) 60%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "2rem",
        }}
      >
        <div
          style={{
            transform: hovered ? "translateY(0)" : "translateY(16px)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.5rem",
            }}
          >
            {item.year}
          </div>
          <h3
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(1.4rem,2.5vw,2.2rem)",
              letterSpacing: "0.04em",
              color: "var(--bg)",
              lineHeight: 0.95,
              marginBottom: "1rem",
            }}
          >
            {item.title}
          </h3>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            View Case Study <span style={{ fontSize: "0.8rem" }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PORTFOLIO SECTION ────────────────────────────────────────────
export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<(typeof items)[0] | null>(null);

  const openModal = useCallback((item: (typeof items)[0]) => {
    setActiveModal(item);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          ref.current
            ?.querySelectorAll(".r-up,.r-clip")
            .forEach((el, i) => setTimeout(() => el.classList.add("on"), i * 80));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="portfolio" style={{ background: "var(--bg)", padding: "12rem 3rem" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }} ref={ref}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "6rem",
              borderBottom: "2px solid var(--ink)",
              paddingBottom: "3rem",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div>
              <p
                className="r-up"
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "1rem",
                }}
              >
                02 — Portfolio
              </p>
              <h2
                className="r-up"
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(4rem,8vw,8rem)",
                  letterSpacing: "0.04em",
                  color: "var(--ink)",
                  lineHeight: 0.85,
                }}
              >
                Karya
                <br />
                <span style={{ WebkitTextStroke: "1px var(--ink)", color: "transparent" }}>
                  Terpilih
                </span>
              </h2>
            </div>
            <p
              className="r-up"
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "var(--muted)",
                maxWidth: "280px",
                lineHeight: 1.7,
                textAlign: "right",
              }}
            >
              Klik karya untuk melihat detail case study dan proses kreatif.
            </p>
          </div>

          {/* Masonry-style grid — 3 columns */}
          <div className="portfolio-grid">
            {items.map((item, i) => (
              <Card key={item.id} item={item} index={i} onOpen={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal item={activeModal} onClose={closeModal} />

      <style jsx global>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .portfolio-grid > div:nth-child(1) {
          grid-row: span 2;
        }
        .portfolio-grid > div:nth-child(5) {
          grid-column: span 2;
          aspect-ratio: 16/9 !important;
        }
        @media (max-width: 900px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .portfolio-grid > div:nth-child(1) {
            grid-row: span 1;
          }
          .portfolio-grid > div:nth-child(5) {
            grid-column: span 1;
            aspect-ratio: 3/4 !important;
          }
        }
        @media (max-width: 550px) {
          .portfolio-grid {
            grid-template-columns: 1fr !important;
          }
          .portfolio-grid > div:nth-child(5) {
            grid-column: span 1 !important;
            aspect-ratio: 3/4 !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-grid > div {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
