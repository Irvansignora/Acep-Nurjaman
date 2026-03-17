"use client";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState("");

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

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const contacts = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127 1.04.36 2.06.7 3.05a2 2 0 01-.45 2.11L6.09 8.06a16 16 0 006.29 6.29l1.18-1.18a2 2 0 012.11-.45c.99.34 2.01.57 3.05.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      label: "Phone",
      value: "0851-7975-2326",
      href: "tel:+6285179752326",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Email",
      value: "acman2602@gmail.com",
      href: "mailto:acman2602@gmail.com",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      label: "Instagram",
      value: "@Acnuman",
      href: "https://instagram.com/Acnuman",
    },
  ];

  return (
    <>
      <section
        id="contact"
        style={{
          background: "#0a0906",
          padding: "7rem 3rem",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div
            ref={titleRef}
            style={{
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
              06 — Contact
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem,5vw,4.5rem)",
                fontWeight: 600,
                color: "#f2e8d6",
                lineHeight: 1.1,
                marginBottom: "0.8rem",
              }}
            >
              Mari{" "}
              <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Terhubung</em>
            </h2>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#c9a84c",
                margin: "0 auto 2rem",
              }}
            />
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(242,232,214,0.5)",
                marginBottom: "3rem",
                lineHeight: 1.75,
              }}
            >
              Tertarik berkolaborasi atau punya project menarik?
              <br />
              Jangan ragu untuk menghubungi saya.
            </p>
          </div>

          {/* Contact cards */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.label === "Instagram" ? "_blank" : undefined}
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "#111009",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "2px",
                  padding: "1rem 1.5rem",
                  color: "#f2e8d6",
                  textDecoration: "none",
                  transition: "border-color 0.3s, background 0.3s",
                  cursor: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c9a84c";
                  e.currentTarget.style.background = "rgba(201,168,76,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)";
                  e.currentTarget.style.background = "#111009";
                }}
              >
                <span style={{ color: "#c9a84c" }}>{c.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#6b6254",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {c.label}
                  </div>
                  <div style={{ fontSize: "0.85rem" }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* CTA button */}
          <a
            href="mailto:acman2602@gmail.com"
            style={{
              display: "inline-block",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              background: "#c9a84c",
              color: "#0a0906",
              padding: "1rem 3rem",
              textDecoration: "none",
              borderRadius: "1px",
              transition: "background 0.3s",
              cursor: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e8c97a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#c9a84c")}
          >
            Send Message ✦
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#111009",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          padding: "2.5rem 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.3rem",
            fontWeight: 600,
            color: "#c9a84c",
            letterSpacing: "0.1em",
          }}
        >
          Acnuman
        </div>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            color: "#6b6254",
          }}
        >
          © 2025 Acep Nurjaman · Graphic Designer · Jakarta
        </p>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.1em",
            color: "rgba(201,168,76,0.4)",
          }}
        >
          Crafted with passion ✦
        </p>
      </footer>
    </>
  );
}
