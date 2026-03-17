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
  const [scrolled, setScrolled]   = useState(false);
  const [open,     setOpen]       = useState(false);
  const [activeMenu, setActiveMenu] = useState<number|null>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:800,
        padding:"1.1rem 3rem",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(245,240,232,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(14,13,10,0.08)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <a href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"})}}
          style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.5rem", letterSpacing:"0.2em", color:"var(--ink)", textDecoration:"none" }}>
          <img
            src="URL_CLOUDINARY_LOGO_KAMU"
            alt="Acnuman"
            style={{ height: "32px", width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* Desktop links */}
        <ul style={{ display:"flex", gap:"2.5rem", listStyle:"none" }} className="hidden md:flex">
          {links.map((l,i) => (
            <li key={l.href}>
              <button onClick={()=>go(l.href)} style={{
                background:"none", border:"none",
                fontFamily:"'Space Mono',monospace", fontSize:"0.58rem",
                letterSpacing:"0.18em", textTransform:"uppercase",
                color:"var(--muted)", cursor:"none",
                transition:"color 0.25s",
              }}
              onMouseEnter={e=>e.currentTarget.style.color="var(--ink)"}
              onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}
              >{l.label}</button>
            </li>
          ))}
        </ul>

        {/* Hire CTA */}
        <a href="mailto:acman2602@gmail.com"
          className="hidden md:block"
          style={{
            fontFamily:"'Space Mono',monospace", fontSize:"0.58rem",
            letterSpacing:"0.15em", textTransform:"uppercase",
            background:"var(--ink)", color:"var(--bg)",
            padding:"0.55rem 1.5rem", textDecoration:"none",
            borderRadius:"1px", fontWeight:700,
            transition:"background 0.25s",
          }}
          onMouseEnter={e=>e.currentTarget.style.background="var(--gold)"}
          onMouseLeave={e=>e.currentTarget.style.background="var(--ink)"}
        >Hire Me</a>

        {/* Hamburger */}
        <button className="md:hidden" onClick={()=>setOpen(!open)}
          style={{ background:"none", border:"none", cursor:"none", display:"flex", flexDirection:"column", gap:"5px" }}>
          {[0,1,2].map(i=>(
            <span key={i} style={{
              display:"block", width:"22px", height:"1.5px", background:"var(--ink)",
              transformOrigin:"center",
              transition:"transform 0.3s, opacity 0.3s",
              transform: open ? (i===0?"rotate(45deg) translateY(6.5px)":(i===2?"rotate(-45deg) translateY(-6.5px)":"none")) : "none",
              opacity: open && i===1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position:"fixed", inset:0, zIndex:700,
        background:"var(--ink)",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"3rem",
        opacity: open?1:0, visibility: open?"visible":"hidden",
        transition:"opacity 0.5s ease, visibility 0.5s",
      }}>
        {links.map((l,i)=>(
          <button key={l.href} onClick={()=>go(l.href)} style={{
            background:"none", border:"none",
            fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.5rem,8vw,5rem)",
            letterSpacing:"0.15em", color:"var(--bg)",
            cursor:"none", transition:"color 0.3s",
            transform: open ? "translateY(0)" : "translateY(20px)",
            transitionDelay: `${i*0.07}s`,
          }}
          onMouseEnter={e=>e.currentTarget.style.color="var(--gold-lt)"}
          onMouseLeave={e=>e.currentTarget.style.color="var(--bg)"}
          >{l.label}</button>
        ))}
        <a href="mailto:acman2602@gmail.com" style={{
          fontFamily:"'Space Mono',monospace", fontSize:"0.75rem",
          color:"rgba(245,240,232,0.4)", letterSpacing:"0.2em", textDecoration:"none",
        }}>acman2602@gmail.com</a>
      </div>
    </>
  );
}
