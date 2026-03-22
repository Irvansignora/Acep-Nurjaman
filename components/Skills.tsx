"use client";
import { useEffect, useRef, useState, useMemo } from "react";

const groups = [
  { title:"Adobe Suite", tags:["Photoshop","Illustrator","After Effects","Premiere Pro"] },
  { title:"Affinity",    tags:["Affinity Designer"] },
  { title:"AutoDesk",    tags:["AutoCAD"] },
  { title:"Coding",      tags:["HTML","C++"] },
  { title:"Visual Design", tags:["Brand Identity","Logo Design","Social Media","Print","Mockup"] },
  { title:"Content",     tags:["Video Editing","Photo Editing","Digital Marketing"] },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Menggabungkan semua tag menjadi satu array flat
  const allSkills = useMemo(() => groups.flatMap(g => g.tags), []);

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        setVisible(true);
        ref.current?.querySelectorAll(".r-up,.r-clip,.r-fade").forEach((el,i)=>setTimeout(()=>el.classList.add("on"),i*40));
        obs.disconnect();
      }
    },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="skills" ref={ref} style={{ background:"var(--ink)", padding:"10rem 3rem", overflow:"hidden" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", borderBottom:"1px solid rgba(245,240,232,0.1)", paddingBottom:"2rem" }}>
          <div>
            <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(245,240,232,0.3)", marginBottom:"0.8rem" }}>02 — Arsenal</p>
            <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,6vw,6rem)", letterSpacing:"0.02em", color:"var(--bg)", lineHeight:0.9 }}>
              Keahlian<br/>
              <span style={{ WebkitTextStroke:"1px rgba(245,240,232,0.5)", color:"transparent" }}>Teknis</span>
            </h2>
          </div>
        </div>

        {/* Massive Typography Cloud */}
        <div style={{ 
          display:"flex", 
          flexWrap:"wrap", 
          justifyContent:"center", 
          alignItems: "center",
          gap:"1.5rem", 
          padding: "2rem 0" 
        }}>
          {allSkills.map((tag, i) => {
            // Setup randomisasi gaya secara statis agar tidak error hidrasi di Next.js
            const fontSize = (i % 3 === 0) ? 5 : (i % 2 === 0) ? 3 : 2.5; // Ukuran font bervariasi
            const isOutline = i % 2 !== 0; // Sebagian solid, sebagian cuma outline (stroke)

            return (
              <span key={tag + i} className="r-fade" style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize: `clamp(2rem, ${fontSize}vw, ${fontSize + 2}rem)`,
                lineHeight: 0.85,
                color: isOutline ? "transparent" : "var(--bg)",
                // Di React inline style, WebkitTextStroke wajib huruf besar W
                WebkitTextStroke: isOutline ? "1px rgba(245,240,232,0.4)" : "none",
                textTransform: "uppercase",
                cursor: "none", 
                display: "inline-block",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "var(--gold)";
                e.currentTarget.style.transform = "skewX(-10deg) scale(1.15) translateY(-5px)";
                // Di manipulasi DOM TS, webkitTextStroke wajib huruf kecil w
                e.currentTarget.style.webkitTextStroke = "none";
                e.currentTarget.style.zIndex = "10";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = isOutline ? "transparent" : "var(--bg)";
                e.currentTarget.style.transform = "skewX(0deg) scale(1) translateY(0)";
                // Di manipulasi DOM TS, webkitTextStroke wajib huruf kecil w
                e.currentTarget.style.webkitTextStroke = isOutline ? "1px rgba(245,240,232,0.4)" : "none";
                e.currentTarget.style.zIndex = "1";
              }}
              >
                {tag}
              </span>
            );
          })}
        </div>

      </div>
    </section>
  );
}
