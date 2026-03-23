"use client";
import { useEffect, useRef, useMemo } from "react";

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
  const allSkills = useMemo(() => groups.flatMap(g => g.tags), []);

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        // Animasi fade in masuk
        ref.current?.querySelectorAll(".skill-item").forEach((el,i)=> {
          setTimeout(() => el.classList.add("visible"), i * 60);
        });
        obs.disconnect();
      }
    },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="skills" ref={ref} style={{ background:"var(--ink)", padding:"12rem 3rem", overflow:"hidden" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        
        {/* Header - Lebih Raw */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"8rem", borderBottom:"1px solid rgba(196,167,125,0.15)", paddingBottom:"3rem" }}>
          <div>
            <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(196,167,125,0.4)", marginBottom:"1rem" }}>03 — Arsenal</p>
            <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(4rem,8vw,8rem)", letterSpacing:"0.04em", color:"#C4A77D", lineHeight:0.85 }}>
              Keahlian<br/>
              <span style={{ WebkitTextStroke:"1px rgba(196,167,125,0.5)", color:"transparent" }}>Teknis</span>
            </h2>
          </div>
          <p className="r-up" style={{ fontFamily:"'DM Serif Display',serif", fontStyle:"italic", fontSize:"1.2rem", color:"rgba(245,240,232,0.4)", maxWidth:"300px", textAlign:"right", lineHeight:1.7 }}>
            Sentuh (hover) untuk mengaktifkan elemen 3D wireframe.
          </p>
        </div>

        {/* --- Interactive 3D/Wireframe Skill Field --- */}
        <div style={{ 
          display:"flex", 
          flexWrap:"wrap", 
          justifyContent:"center", 
          alignItems: "center",
          gap:"2rem", // Gap lebih besar agar melegakan
          padding: "4rem 0" 
        }}>
          {allSkills.map((tag, i) => {
            const fontSize = (i % 3 === 0) ? 6 : (i % 2 === 0) ? 4 : 3;
            // Gunakan inline style statis untuk rotasi acak palsu
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;

            return (
              <span key={tag + i} className="skill-item" style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize: `clamp(2rem, ${fontSize}vw, ${fontSize + 1}rem)`,
                lineHeight: 0.85,
                textTransform: "uppercase",
                display: "inline-block",
                cursor: "crosshair",
                
                // --- Initial State (3D Wireframe palsu) ---
                color: "transparent",
                WebkitTextStroke: "1px rgba(196,167,125,0.3)", 
                transform: `perspective(600px) rotateX(${randomX}deg) rotateY(${randomY}deg)`,
                opacity: 0, 
                transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), WebkitTextStroke 0.3s ease, opacity 0.5s ease",
                
                // Setup keyframes animation palsu untuk gerakan melayang
                animation: `float ${Math.random()*4 + 3}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random()*2}s`,
              }}
              // --- Interaction Hover (Glow & Expand) ---
              onMouseEnter={e => {
                e.currentTarget.style.animationPlayState = "paused"; // Berhenti melayang
                e.currentTarget.style.color = "#C4A77D"; // Solid Gold
                e.currentTarget.style.webkitTextStroke = "0px rgba(0,0,0,0)";
                e.currentTarget.style.transform = "perspective(600px) scale(1.3) translateY(-10px) rotateX(0deg) rotateY(0deg)";
                e.currentTarget.style.zIndex = "20";
                // Efek Glowing
                e.currentTarget.style.textShadow = "0 0 15px rgba(196,167,125,0.8), 0 0 30px rgba(196,167,125,0.6)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.animationPlayState = "running"; // Lanjut melayang
                e.currentTarget.style.color = "transparent";
                e.currentTarget.style.webkitTextStroke = "1px rgba(196,167,125,0.3)";
                e.currentTarget.style.transform = `perspective(600px) scale(1) translateY(0) rotateX(${randomX}deg) rotateY(${randomY}deg)`;
                e.currentTarget.style.zIndex = "1";
                // Matikan Glow
                e.currentTarget.style.textShadow = "none";
              }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      {/* --- Perlu CSS tambahan untuk keyframes dan kelas visible --- */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: perspective(600px) rotateX(-5deg) translateY(0px); }
          100% { transform: perspective(600px) rotateX(5deg) translateY(-15px); }
        }
        .skill-item.visible {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
