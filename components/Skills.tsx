"use client";
import { useEffect, useRef, useState } from "react";

const groups = [
  { title:"Adobe Suite", tags:["Photoshop","Illustrator","After Effects","Premiere Pro"], level:95 },
  { title:"Affinity",    tags:["Affinity Designer"], level:80 },
  { title:"AutoDesk",    tags:["AutoCAD"], level:85 },
  { title:"Coding",      tags:["HTML","C++"], level:55 },
  { title:"Visual Design", tags:["Brand Identity","Logo Design","Social Media","Print","Mockup"], level:95 },
  { title:"Content",     tags:["Video Editing","Photo Editing","Digital Marketing"], level:90 },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        setVisible(true);
        ref.current?.querySelectorAll(".r-up,.r-clip,.r-fade").forEach((el,i)=>setTimeout(()=>el.classList.add("on"),i*70));
        obs.disconnect();
      }
    },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="skills" ref={ref} style={{ background:"var(--ink)", padding:"8rem 3rem" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"5rem", borderBottom:"1px solid rgba(245,240,232,0.1)", paddingBottom:"2rem" }}>
          <div>
            <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(245,240,232,0.3)", marginBottom:"0.8rem" }}>02 — Technical Skills</p>
            <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,6vw,6rem)", letterSpacing:"0.02em", color:"var(--bg)", lineHeight:0.9 }}>
              Keahlian<br/>
              <span style={{ WebkitTextStroke:"1px rgba(245,240,232,0.5)", color:"transparent" }}>Teknis</span>
            </h2>
          </div>
        </div>

        {/* Skills table */}
        <div style={{ borderTop:"1px solid rgba(245,240,232,0.08)" }}>
          {groups.map((g,i)=>(
            <div key={g.title} className="r-up" style={{
              display:"grid", gridTemplateColumns:"1fr 2fr auto",
              gap:"2rem", padding:"2rem 0",
              borderBottom:"1px solid rgba(245,240,232,0.08)",
              alignItems:"center",
            }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem", letterSpacing:"0.08em", color:"var(--bg)" }}>{g.title}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                {g.tags.map(t=>(
                  <span key={t} style={{
                    background:"rgba(245,240,232,0.06)", border:"1px solid rgba(245,240,232,0.12)",
                    color:"rgba(245,240,232,0.6)", fontFamily:"'Space Mono',monospace",
                    fontSize:"0.55rem", letterSpacing:"0.1em", padding:"0.3rem 0.8rem",
                  }}>{t}</span>
                ))}
              </div>
              {/* Progress bar */}
              <div style={{ width:"120px", display:"flex", flexDirection:"column", gap:"0.3rem", alignItems:"flex-end" }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:"var(--gold)" }}>{g.level}%</span>
                <div style={{ width:"100%", height:"2px", background:"rgba(245,240,232,0.1)", borderRadius:"1px", overflow:"hidden" }}>
                  <div style={{
                    height:"100%", background:"linear-gradient(to right,var(--gold),var(--gold-lt))",
                    width: visible ? `${g.level}%` : "0%",
                    transition:`width 1.4s cubic-bezier(0.4,0,0.2,1) ${i*0.1}s`,
                  }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
