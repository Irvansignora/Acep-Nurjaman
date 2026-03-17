"use client";
import { useEffect, useRef } from "react";

const trainings = [
  { org:"BMKA Masjid Salman ITB", name:"Impact Class — Graphic Designer Class", date:"08 Agustus 2020", num:"01" },
  { org:"Talenthub Kemnaker", name:"UI/UX Design Batch 3", date:"14 Oktober 2022", num:"02" },
];
const interests = [
  { icon:"🎮", name:"Video Games" },
  { icon:"📷", name:"Photography" },
  { icon:"🤖", name:"Artificial Intelligence" },
  { icon:"⚡", name:"Renewable Energy" },
];

export default function Training() {
  const ref = useRef<HTMLElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ ref.current?.querySelectorAll(".r-up,.r-clip,.r-fade").forEach((el,i)=>setTimeout(()=>el.classList.add("on"),i*80)); obs.disconnect(); }
    },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="training" ref={ref} style={{ background:"var(--bg2)", padding:"8rem 3rem", borderTop:"1px solid var(--line)" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"start" }} className="tr-grid">

          {/* Training */}
          <div>
            <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.8rem" }}>04 — Training</p>
            <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.5rem,5vw,5rem)", letterSpacing:"0.02em", color:"var(--ink)", lineHeight:0.9, marginBottom:"3rem" }}>
              Pelatihan<br/>
              <span style={{ WebkitTextStroke:"1px var(--ink)", color:"transparent" }}>& Sertifikasi</span>
            </h2>

            <div style={{ borderTop:"1px solid var(--line)" }}>
              {trainings.map((t,i)=>(
                <div key={i} className="r-up" style={{
                  display:"grid", gridTemplateColumns:"40px 1fr",
                  gap:"1.5rem", padding:"2rem 0",
                  borderBottom:"1px solid var(--line)",
                  alignItems:"start",
                }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", color:"var(--muted)", paddingTop:"0.3rem" }}>{t.num}</span>
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", letterSpacing:"0.05em", color:"var(--ink)", lineHeight:1, marginBottom:"0.3rem" }}>{t.name}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", color:"var(--gold)", letterSpacing:"0.1em", marginBottom:"0.2rem" }}>{t.org}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", color:"var(--muted)", letterSpacing:"0.08em" }}>{t.date}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Personal project */}
            <div className="r-up" style={{ marginTop:"3rem" }}>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.8rem" }}>Personal Project</p>
              <div style={{ borderLeft:"2px solid var(--gold)", paddingLeft:"1.5rem" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem", letterSpacing:"0.05em", color:"var(--ink)", lineHeight:1 }}>Al-Qudwah Mahabbatul Quran</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", color:"var(--muted)", marginTop:"0.4rem", lineHeight:1.6 }}>
                  Talent, Editor, Graphic Design & Digital Marketing — Sosial Media AQM
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.8rem" }}>05 — Interests</p>
            <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.5rem,5vw,5rem)", letterSpacing:"0.02em", color:"var(--ink)", lineHeight:0.9, marginBottom:"3rem" }}>
              Minat<br/>
              <span style={{ WebkitTextStroke:"1px var(--ink)", color:"transparent" }}>&amp; Passion</span>
            </h2>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:"var(--line)" }}>
              {interests.map((item,i)=>(
                <div key={i} className="r-fade" style={{
                  background:"var(--bg2)", padding:"2.5rem 1.5rem",
                  textAlign:"center", transition:"background 0.25s",
                  cursor:"none",
                }}
                onMouseEnter={e=>e.currentTarget.style.background="var(--bg)"}
                onMouseLeave={e=>e.currentTarget.style.background="var(--bg2)"}
                >
                  <div style={{ fontSize:"2.2rem", marginBottom:"0.8rem" }}>{item.icon}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--muted)" }}>{item.name}</div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="r-up" style={{ marginTop:"3rem" }}>
              <blockquote style={{
                fontFamily:"'DM Serif Display',serif", fontStyle:"italic",
                fontSize:"1.2rem", color:"var(--muted)", lineHeight:1.7,
                borderLeft:"2px solid var(--gold)", paddingLeft:"1.5rem",
              }}>
                "Design bukan hanya tentang estetika — ini tentang bagaimana sebuah pesan hadir dan dirasakan."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media(max-width:768px){ .tr-grid{ grid-template-columns:1fr !important; gap:4rem !important; } }
      `}</style>
    </section>
  );
}
