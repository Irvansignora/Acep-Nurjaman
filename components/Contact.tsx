"use client";
import { useEffect, useRef } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ref.current?.querySelectorAll(".r-up,.r-clip,.r-fade").forEach((el,i)=>setTimeout(()=>el.classList.add("on"),i*80)); obs.disconnect();} },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <>
      {/* CTA band */}
      <section style={{ background:"var(--gold)", padding:"5rem 3rem", overflow:"hidden", position:"relative" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"2rem" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.5rem,6vw,6rem)", letterSpacing:"0.02em", color:"#fff", lineHeight:0.9 }}>
            Ada Project<br/>Menarik?
          </h2>
          <a href="mailto:acman2602@gmail.com" style={{
            fontFamily:"'Space Mono',monospace", fontSize:"0.65rem",
            letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700,
            background:"#fff", color:"var(--gold)",
            padding:"1.1rem 3rem", textDecoration:"none",
            transition:"background 0.25s, color 0.25s", cursor:"none",
          }}
          onMouseEnter={e=>{ e.currentTarget.style.background="var(--ink)"; e.currentTarget.style.color="#fff"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.color="var(--gold)"; }}
          >Hubungi Sekarang →</a>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" ref={ref} style={{ background:"var(--ink)", padding:"8rem 3rem" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"start" }} className="ct-grid">

            {/* Left */}
            <div>
              <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(245,240,232,0.3)", marginBottom:"0.8rem" }}>06 — Contact</p>
              <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,6vw,6rem)", letterSpacing:"0.02em", color:"var(--bg)", lineHeight:0.9, marginBottom:"2rem" }}>
                Mari<br/>
                <span style={{ WebkitTextStroke:"1px rgba(245,240,232,0.4)", color:"transparent" }}>Terhubung</span>
              </h2>
              <p className="r-up" style={{ fontFamily:"'DM Serif Display',serif", fontStyle:"italic", fontSize:"1.1rem", color:"rgba(245,240,232,0.45)", lineHeight:1.7, maxWidth:"360px" }}>
                Terbuka untuk kolaborasi, freelance project, atau sekadar ngobrol soal desain.
              </p>
            </div>

            {/* Right — contact details */}
            <div style={{ borderTop:"1px solid rgba(245,240,232,0.08)" }}>
              {[
                { label:"Email", value:"acman2602@gmail.com", href:"mailto:acman2602@gmail.com" },
                { label:"Phone", value:"0851-7975-2326", href:"tel:+6285179752326" },
                { label:"Instagram", value:"@Acnuman", href:"https://instagram.com/Acnuman" },
              ].map((c,i)=>(
                <div key={i} className="r-up" style={{ borderBottom:"1px solid rgba(245,240,232,0.08)", padding:"2rem 0" }}>
                  <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(245,240,232,0.25)", marginBottom:"0.5rem" }}>{c.label}</p>
                  <a href={c.href} target={c.label==="Instagram"?"_blank":undefined} rel="noreferrer" style={{
                    fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.2rem,2.5vw,2rem)",
                    letterSpacing:"0.05em", color:"var(--bg)",
                    textDecoration:"none", transition:"color 0.25s", cursor:"none",
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                  }}
                  onMouseEnter={e=>e.currentTarget.style.color="var(--gold)"}
                  onMouseLeave={e=>e.currentTarget.style.color="var(--bg)"}
                  >
                    {c.value}
                    <span style={{ fontSize:"1rem", opacity:0.3 }}>↗</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background:"var(--ink)", borderTop:"1px solid rgba(245,240,232,0.06)", padding:"2rem 3rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.2em", color:"var(--bg)" }}>Acnuman</span>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.1em", color:"rgba(245,240,232,0.25)" }}>© 2025 Acep Nurjaman · Graphic Designer · Jakarta</span>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.52rem", color:"rgba(184,146,42,0.5)", letterSpacing:"0.1em" }}>Made with passion ✦</span>
      </footer>

      <style jsx>{`
        @media(max-width:768px){ .ct-grid{ grid-template-columns:1fr !important; gap:3rem !important; } }
      `}</style>
    </>
  );
}
