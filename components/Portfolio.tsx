"use client";
import { useEffect, useRef, useState } from "react";

const items = [
  { tag:"Brand Identity", title:"Visual Identity & Branding", desc:"Logo, brand guide, dan seluruh elemen visual brand.", wide:true,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_brand.jpg" },
  { tag:"Social Media", title:"Feed & Story Design", desc:"Desain konten sosial media yang konsisten.", wide:false,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_social.jpg" },
  { tag:"Logo Design", title:"Logo & Icon System", desc:"Logo yang memorable dan scalable.", wide:false,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_logo.jpg" },
  { tag:"Print Design", title:"Poster & Banner", desc:"Material cetak berkualitas tinggi.", wide:false,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_print.jpg" },
  { tag:"Digital Marketing", title:"Al-Qudwah AQM", desc:"Sosial media & digital marketing AQM.", wide:true,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_aqm.jpg" },
  { tag:"AutoCAD", title:"Technical Drawing", desc:"Traffic Control Plan & Layout Jalan.", wide:false,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_cad.jpg" },
];

function Card({ item, i }: { item:typeof items[0]; i:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){setTimeout(()=>{ if(ref.current){ref.current.style.opacity="1";ref.current.style.transform="translateY(0)";} },i*100); obs.disconnect();} },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[i]);

  return (
    <div ref={ref} style={{
      gridColumn: item.wide ? "span 2" : "span 1",
      aspectRatio: item.wide ? "16/7" : "4/3",
      position:"relative", overflow:"hidden", cursor:"none",
      opacity:0, transform:"translateY(30px)",
      transition:"opacity 0.8s ease, transform 0.8s ease",
      background:"var(--bg2)",
    }}
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(false)}
    >
      {/* Image */}
      <img src={item.imgUrl} alt={item.title} style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        objectFit:"cover", display:"block",
        transform: hovered ? "scale(1.06)" : "scale(1)",
        transition:"transform 0.7s cubic-bezier(0.16,1,0.3,1)",
      }}/>

      {/* Overlay */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to top, rgba(14,13,10,0.92) 0%, transparent 55%)",
        opacity: hovered ? 1 : 0,
        transition:"opacity 0.4s ease",
      }}/>

      {/* Tag top-left */}
      <div style={{
        position:"absolute", top:"1.2rem", left:"1.2rem",
        fontFamily:"'Space Mono',monospace", fontSize:"0.55rem",
        letterSpacing:"0.15em", textTransform:"uppercase",
        background:"var(--gold)", color:"#fff",
        padding:"0.3rem 0.7rem", fontWeight:700,
        transform: hovered ? "translateY(0)" : "translateY(-6px)",
        opacity: hovered ? 1 : 0,
        transition:"all 0.35s ease",
      }}>{item.tag}</div>

      {/* Bottom text */}
      <div style={{
        position:"absolute", bottom:"1.5rem", left:"1.5rem", right:"1.5rem",
        transform: hovered ? "translateY(0)" : "translateY(12px)",
        opacity: hovered ? 1 : 0,
        transition:"all 0.35s ease 0.05s",
        zIndex:1,
      }}>
        <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.2rem,2.5vw,2rem)", letterSpacing:"0.05em", color:"#fff", marginBottom:"0.3rem" }}>{item.title}</h3>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", color:"rgba(255,255,255,0.6)" }}>{item.desc}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ref.current?.querySelectorAll(".r-up,.r-clip").forEach((el,i)=>setTimeout(()=>el.classList.add("on"),i*80)); obs.disconnect();} },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="portfolio" style={{ background:"var(--bg)", padding:"8rem 3rem" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }} ref={ref}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", borderBottom:"1px solid var(--line)", paddingBottom:"2rem" }}>
          <div>
            <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.8rem" }}>03 — Portfolio</p>
            <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,6vw,6rem)", letterSpacing:"0.02em", color:"var(--ink)", lineHeight:0.9 }}>
              Karya<br/>
              <span style={{ WebkitTextStroke:"1px var(--ink)", color:"transparent" }}>Terpilih</span>
            </h2>
          </div>
          <p className="r-up" style={{ fontFamily:"'DM Serif Display',serif", fontStyle:"italic", fontSize:"1rem", color:"var(--muted)", maxWidth:"200px", textAlign:"right", lineHeight:1.6 }}>
            Hover untuk melihat detail karya
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem" }} className="port-grid">
          {items.map((item,i)=><Card key={i} item={item} i={i}/>)}
        </div>
      </div>

      <style jsx>{`
        @media(max-width:900px){
          .port-grid{ grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:600px){
          .port-grid{ grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}
