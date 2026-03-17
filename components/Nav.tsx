"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#training", label: "Training" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: "1.2rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(10,9,6,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.3rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "#c9a84c",
            textDecoration: "none",
          }}
        >
          Acnuman
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "2.5rem",
            listStyle: "none",
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#6b6254",
                  cursor: "none",
                  transition: "color 0.3s",
                  padding: "0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6254")}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hire me button */}
        <a
          href="mailto:acman2602@gmail.com"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            background: "#c9a84c",
            color: "#0a0906",
            padding: "0.55rem 1.4rem",
            textDecoration: "none",
            borderRadius: "1px",
            transition: "background 0.3s",
            fontWeight: 700,
          }}
          className="hidden md:block"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e8c97a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#c9a84c")}
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "none", color: "#c9a84c" }}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <rect y="0"  width={open ? 22 : 22} height="1.5" fill="currentColor"
              style={{ transformOrigin: "center", transform: open ? "rotate(45deg) translateY(7.5px)" : "none", transition: "transform 0.3s" }} />
            <rect y="7"  width="22" height="1.5" fill="currentColor"
              style={{ opacity: open ? 0 : 1, transition: "opacity 0.3s" }} />
            <rect y="14" width="22" height="1.5" fill="currentColor"
              style={{ transformOrigin: "center", transform: open ? "rotate(-45deg) translateY(-7.5px)" : "none", transition: "transform 0.3s" }} />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 900,
          background: "rgba(10,9,6,0.97)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          transition: "opacity 0.4s, visibility 0.4s",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
      >
        {links.map((l, i) => (
          <button
            key={l.href}
            onClick={() => scrollTo(l.href)}
            style={{
              background: "none", border: "none",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.5rem", fontWeight: 300,
              color: "#f2e8d6",
              cursor: "none",
              letterSpacing: "0.05em",
              transition: "color 0.3s",
              transform: open ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 0.06}s`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#f2e8d6")}
          >
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
}
