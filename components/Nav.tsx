"use client";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Skills",     href: "#skills"     },
  { label: "Portfolio",  href: "#portfolio"  },
  { label: "Training",   href: "#training"   },
  { label: "Contact",    href: "#contact"    },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState<string>("");

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s, { passive: true });

    // Track active section
    const sections = links.map((l) => document.querySelector(l.href));
    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => s && sectionObs.observe(s));

    return () => {
      window.removeEventListener("scroll", s);
      sectionObs.disconnect();
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 800,
          padding: "1.1rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(245,240,232,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(14,13,10,0.08)"
            : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo — text fallback (ganti img src saat logo sudah di-upload ke Cloudinary) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "1.4rem",
            letterSpacing: "0.25em",
            color: "var(--ink)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {/* Uncomment & update this img once you have a logo on Cloudinary:
          <img
            src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/acnuman-logo.png"
            alt="Acnuman"
            style={{ height: "32px", width: "auto", objectFit: "contain" }}
          />
          */}
          Acnuman
        </a>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }} className="hidden md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => go(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: active === l.href ? "var(--ink)" : "var(--muted)",
                  cursor: "none",
                  transition: "color 0.25s",
                  position: "relative",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    active === l.href ? "var(--ink)" : "var(--muted)")
                }
              >
                {l.label}
                {/* Active underline */}
                {active === l.href && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "var(--gold)",
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Hire CTA */}
        <a
          href="mailto:acman2602@gmail.com"
          className="hidden md:block"
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            background: "var(--ink)",
            color: "var(--bg)",
            padding: "0.55rem 1.5rem",
            textDecoration: "none",
            borderRadius: "1px",
            fontWeight: 700,
            transition: "background 0.25s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "var(--ink)",
                transformOrigin: "center",
                transition: "transform 0.3s, opacity 0.3s",
                transform: open
                  ? i === 0
                    ? "rotate(45deg) translateY(6.5px)"
                    : i === 2
                    ? "rotate(-45deg) translateY(-6.5px)"
                    : "none"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 700,
          background: "var(--ink)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          /* gap kecil + paddingTop biar item pertama tidak ketutup nav */
          gap: "1.2rem",
          paddingTop: "5rem",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity 0.5s ease, visibility 0.5s",
        }}
      >
        {links.map((l, i) => (
          <button
            key={l.href}
            onClick={() => go(l.href)}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'Bebas Neue',sans-serif",
              /* ↓ diperkecil agar semua 5 item muat di layar */
              fontSize: "clamp(1.8rem,6vw,3rem)",
              letterSpacing: "0.18em",
              color: "var(--bg)",
              cursor: "none",
              transition: "color 0.3s",
              transform: open ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 0.07}s`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-lt)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--bg)")}
          >
            {l.label}
          </button>
        ))}
        {/* Gold divider */}
        <div style={{ width: "40px", height: "1px", background: "var(--gold)", margin: "0.5rem 0", opacity: 0.4 }} />
        <a
          href="mailto:acman2602@gmail.com"
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.62rem",
            color: "rgba(245,240,232,0.35)",
            letterSpacing: "0.18em",
            textDecoration: "none",
          }}
        >
          acman2602@gmail.com
        </a>
      </div>
    </>
  );
}
