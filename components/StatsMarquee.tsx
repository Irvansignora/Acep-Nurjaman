"use client";
import { useEffect, useRef } from "react";

const items = ["Adobe Suite","Illustrator","Photoshop","After Effects","Premiere Pro","Affinity Designer","AutoCAD","Brand Identity","Logo Design","Social Media","Digital Marketing","Video Editing","Print Design"];

export default function StatsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ ref.current?.querySelectorAll(".r-up,.r-clip").forEach((el,i)=>setTimeout(()=>el.classList.add("on"),i*100)); obs.disconnect(); }
    },{threshold:0.2});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <div ref={ref}>
      {/* Stats row */}
      <div style={{ background:"var(--ink)", padding:"4rem 3rem" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:"rgba(245,240,232,0.08)" }}>
          {[["5+","Years Experience"],["100+","Projects Delivered"],["8+","Tools Mastered"],["4","Companies & Clients"]].map(([n,l])=>(
            <div key={l} className="r-up" style={{ background:"var(--ink)", padding:"2.5rem 2rem", textAlign:"center" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,5vw,5rem)", color:"var(--bg)", lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(245,240,232,0.35)", marginTop:"0.5rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div style={{ background:"var(--gold)", padding:"0.9rem 0", overflow:"hidden" }}>
        <div className="mq-inner">
          {[...items,...items].map((item,i)=>(
            <span key={i} style={{
              fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", fontWeight:700,
              letterSpacing:"0.2em", textTransform:"uppercase",
              color:"#fff", padding:"0 2.5rem", whiteSpace:"nowrap",
              display:"inline-flex", alignItems:"center", gap:"2.5rem",
            }}>
              {item}<span style={{opacity:0.4}}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
