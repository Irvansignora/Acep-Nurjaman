"use client";
import { useEffect, useRef, useState } from "react";

const exps = [
  { idx:"01", company:"Freelancer", role:"Graphic Designer", period:"2017 — Present",
    items:["Publikasi sosial media — Flyer, Story, Feed, Reels, katalog, menu, kartu bisnis","Identitas visual: brand positioning, promosi, digital marketing","Desain logo, t-shirt, Mockup, Poster, Banner","Editing Video & Photos"] },
  { idx:"02", company:"Indonesia Beramal Sholeh", role:"Freelance Graphic Designer", period:"2023 — Present",
    items:["Publikasi sosial media — Flyer, Story, Reels, Carousel, Tiktok Inspiration","Konten cetak: Banner, X-Banner, Poster","Editing Video & Photos","Identitas visual & digital marketing untuk web"] },
  { idx:"03", company:"PT Memori Netindo Jaya", role:"Quality Control — AutoCAD", period:"2021 — Present",
    items:["Memeriksa Technical Drawing untuk pekerjaan jalan","Konsultan dalam pengerjaan proyek jalan","Membuat Traffic Control Plan & Layout pemasangan kabel"] },
  { idx:"04", company:"Yayasan Indonesia Berkah", role:"Development Program Staff", period:"2020 — 2021",
    items:["Publikasi sosial media (Flyer, Story, Feed, Reels)","Talent sosial media untuk kebutuhan promosi","Membuat pelatihan desain grafis & menjadi coach","Pengembangan program yayasan"] },
];

function Row({ exp, i }: { exp:typeof exps[0]; i:number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){setTimeout(()=>ref.current?.classList.add("on"),i*80); obs.disconnect();} },{threshold:0.15});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[i]);

  return (
    <div ref={ref} className="r-up" style={{ borderBottom:"1px solid var(--line)" }}>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%", background:"none", border:"none", cursor:"none",
        display:"grid", gridTemplateColumns:"60px 1fr auto auto",
        alignItems:"center", gap:"2rem", padding:"2rem 0",
        textAlign:"left",
      }}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(14,13,10,0.02)"}
      onMouseLeave={e=>e.currentTarget.style.background="none"}
      >
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:"var(--muted)", letterSpacing:"0.1em" }}>{exp.idx}</span>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.4rem,3vw,2.2rem)", letterSpacing:"0.05em", color:"var(--ink)", lineHeight:1 }}>{exp.company}</div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold)", marginTop:"0.2rem" }}>{exp.role}</div>
        </div>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", color:"var(--muted)", whiteSpace:"nowrap" }}>{exp.period}</span>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"1rem", color:"var(--ink)", transition:"transform 0.3s", transform: open?"rotate(45deg)":"none", display:"inline-block" }}>+</span>
      </button>

      {/* Accordion body */}
      <div style={{
        maxHeight: open ? "300px" : "0",
        overflow:"hidden",
        transition:"max-height 0.5s cubic-bezier(0.77,0,0.18,1)",
      }}>
        <ul style={{ padding:"0 0 2rem 4rem", display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          {exp.items.map((item,j)=>(
            <li key={j} style={{ fontSize:"0.9rem", color:"var(--ink2)", paddingLeft:"1.2rem", position:"relative", lineHeight:1.7 }}>
              <span style={{ position:"absolute", left:0, color:"var(--gold)" }}>›</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ref.current?.querySelectorAll(".r-up,.r-clip").forEach((el,i)=>setTimeout(()=>el.classList.add("on"),i*80)); obs.disconnect();} },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="experience" style={{ background:"var(--bg)", padding:"8rem 3rem" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }} ref={ref}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", borderBottom:"1px solid var(--line)", paddingBottom:"2rem" }}>
          <div>
            <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.8rem" }}>01 — Work Experience</p>
            <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,6vw,6rem)", letterSpacing:"0.02em", color:"var(--ink)", lineHeight:0.9 }}>
              Pengalaman<br/>
              <span style={{ WebkitTextStroke:"1px var(--ink)", color:"transparent" }}>Kerja</span>
            </h2>
          </div>
          <p className="r-up" style={{ fontFamily:"'DM Serif Display',serif", fontStyle:"italic", fontSize:"1rem", color:"var(--muted)", maxWidth:"220px", textAlign:"right", lineHeight:1.6 }}>
            Klik untuk lihat detail pekerjaan
          </p>
        </div>

        {/* Accordion rows */}
        <div style={{ borderTop:"1px solid var(--line)" }}>
          {exps.map((e,i)=><Row key={i} exp={e} i={i}/>)}
        </div>
      </div>
    </section>
  );
}
