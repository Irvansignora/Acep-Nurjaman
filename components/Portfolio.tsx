"use client";
import { useEffect, useRef, useState, useMemo } from "react";

// Portfolio items (Pastikan Cloudinary name diubah!)
const items = [
  { tag:"Brand Identity", title:"Visual Identity & Branding", wide:true,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_brand.jpg" },
  { tag:"Social Media", title:"Feed & Story Design", wide:false,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_social.jpg" },
  { tag:"Logo Design", title:"Logo & Icon System", wide:false,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_logo.jpg" },
  { tag:"Print Design", title:"Poster & Banner", wide:false,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_print.jpg" },
  { tag:"Digital Marketing", title:"Al-Qudwah AQM", wide:true,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_aqm.jpg" },
  { tag:"AutoCAD", title:"Technical Drawing", wide:false,
    imgUrl:"https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio_cad.jpg" },
];

function Card({ item, i }: { item:typeof items[0]; i:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  
  // Menghasilkan rotasi, posisi, dan skew acak yang LEBIH INTENS
  const randomRotate = useMemo(() => (i % 2 === 0 ? 1 : -1) * (Math.random() * 20 + 5), [i]);
  const randomSkew = useMemo(() => (Math.random() * 8 - 4), [i]);
  const randomTranslateY = useMemo(() => Math.random() * 80 - 40, []);
  // Offset horizontal ekstra untuk meningkatkan Overlapping Chaos
  const randomTranslateX = useMemo(() => Math.random() * 100 - 50, []);

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ 
      if(e.isIntersecting){
        setTimeout(()=>{ 
          if(ref.current){
            ref.current.style.opacity="1";
            ref.current.style.transform=`translateX(${randomTranslateX}px) translateY(${randomTranslateY}px) rotate(${randomRotate}deg) skewX(${randomSkew}deg)`;
          } 
        }, i * 150); 
        obs.disconnect();
      } 
    },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[i, randomRotate, randomTranslateY, randomSkew, randomTranslateX]);

  return (
    <div ref={ref} style={{
      position:"relative",
      width: item.wide ? "450px" : "320px",
      aspectRatio: "3/4", // Proporsi portrait ala Poster
      cursor:"none",
      opacity:0, 
      transform:"translateY(150px) rotate(0deg)", // State awal sebelum scroll masuk
      transition:"all 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
      zIndex: hovered ? 50 : 1, // Maju ke depan saat dihover
      boxShadow: hovered ? "0 40px 100px rgba(14,13,10,0.6)" : "0 10px 40px rgba(14,13,10,0.15)",
      background: "var(--ink)", // Gelap kaku
      borderRadius: "4px",
      padding: "10px" // Frame ala Polaroid
    }}
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(false)}
    >
      {/* Gambar dengan Efek 'Warp Drive' dan Kecerahan Brutalist */}
      <img src={item.imgUrl} alt={item.title} style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        objectFit:"cover", display:"block",
        transform: hovered ? "scale(1.1) skewX(10deg) rotate(5deg)" : "scale(1)",
        transition:"transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.5s ease",
        
        // --- WARP INTERACTION ---
        // Abu-abu gelap kaku sampai di-hover menjadi warna massif dengan kecerahan tinggi
        filter: hovered ? "grayscale(0%) brightness(1.2) contrast(1.1)" : "grayscale(100%) brightness(0.7) contrast(1.3)", 
        borderRadius: "4px"
      }}/>
      
      {/* --- Warp Pulse Animation (Optional, triggers on hover) --- */}
      {hovered && (
        <div style={{
          position:"absolute", inset:0,
          background:"white",
          opacity: 0,
          animation: "warpPulse 0.3s ease-out",
          pointerEvents: "none",
          zIndex: 10
        }}/>
      )}

      {/* Judul Besar Keluar Batas */}
      <div style={{
        position:"absolute", 
        bottom: hovered ? "-3rem" : "1.5rem", 
        left: hovered ? "-2rem" : "1.5rem",
        opacity: hovered ? 1 : 0,
        transition:"all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        pointerEvents: "none",
        zIndex: 3,
        width: "130%"
      }}>
        <h3 style={{ 
          fontFamily:"'Bebas Neue',sans-serif", 
          fontSize:"clamp(3rem,6vw,5.5rem)", // Jauh lebih besar
          lineHeight: 0.8,
          color:"#C4A77D", // Gold dari visual baru
          textTransform: "uppercase",
          textShadow: "4px 4px 0px var(--ink), -1px -1px 0 var(--ink), 1px -1px 0 var(--ink), -1px 1px 0 var(--ink), 1px 1px 0 var(--ink)" 
        }}>{item.title}</h3>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ 
      if(e.isIntersecting){
        ref.current?.querySelectorAll(".r-up,.r-clip").forEach((el,i)=>setTimeout(()=>el.classList.add("on"),i*80)); 
        obs.disconnect();
      } 
    },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="portfolio" style={{ background:"var(--bg)", padding:"12rem 3rem", overflowX:"hidden" }}>
      <div style={{ maxWidth:"1300px", margin:"0 auto" }} ref={ref}>
        {/* Header Tetap Rapi */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"8rem", borderBottom:"2px solid var(--ink)", paddingBottom:"3rem" }}>
          <div>
            <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"1rem" }}>02 — Portfolio</p>
            <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(4rem,8vw,8rem)", letterSpacing:"0.04em", color:"var(--ink)", lineHeight:0.85 }}>
              Karya<br/>
              <span style={{ WebkitTextStroke:"1px var(--ink)", color:"transparent" }}>Terpilih</span>
            </h2>
          </div>
          <p className="r-up" style={{ fontFamily:"'DM Serif Display',serif", fontStyle:"italic", fontSize:"1.2rem", color:"var(--muted)", maxWidth:"250px", textAlign:"right", lineHeight:1.7 }}>
            Sentuh (hover) untuk mengaktifkan efek 'Warp Drive'.
          </p>
        </div>

        {/* Container Flex dengan NEGATIVE GAP agar saling menumpuk secara masif */}
        <div style={{ 
          display:"flex", 
          flexWrap:"wrap", 
          justifyContent:"center", 
          gap:"-6rem", // Negatif gap ekstrem untuk Overlapping Chaos
          margin:"0 auto",
          paddingBottom:"8rem",
          maxWidth: "100%"
        }}>
          {items.map((item,i)=><Card key={i} item={item} i={i}/>)}
        </div>
      </div>

      {/* --- CSS untuk Warp Pulse --- */}
      <style jsx global>{`
        @keyframes warpPulse {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
}
