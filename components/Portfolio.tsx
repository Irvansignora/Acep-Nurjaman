"use client";
import { useEffect, useRef, useState, useMemo } from "react";

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
  
  // Menghasilkan rotasi dan posisi acak hanya sekali saat komponen dimuat
  const randomRotate = useMemo(() => (i % 2 === 0 ? 1 : -1) * (Math.random() * 12 + 2), [i]);
  const randomTranslateY = useMemo(() => Math.random() * 60 - 30, []);

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ 
      if(e.isIntersecting){
        setTimeout(()=>{ 
          if(ref.current){
            ref.current.style.opacity="1";
            ref.current.style.transform=`translateY(${randomTranslateY}px) rotate(${randomRotate}deg)`;
          } 
        }, i * 150); 
        obs.disconnect();
      } 
    },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[i, randomRotate, randomTranslateY]);

  return (
    <div ref={ref} style={{
      position:"relative",
      width: item.wide ? "450px" : "320px",
      aspectRatio: "4/5", // Proporsi portrait ala Polaroid / Poster
      cursor:"none",
      opacity:0, 
      transform:"translateY(150px) rotate(0deg)", // State awal sebelum scroll masuk
      transition:"all 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
      zIndex: hovered ? 50 : 1, // Maju ke depan saat dihover
      boxShadow: hovered ? "0 30px 60px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.15)",
      background: "var(--bg2)",
      borderRadius: "4px"
    }}
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(false)}
    >
      {/* Gambar */}
      <img src={item.imgUrl} alt={item.title} style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        objectFit:"cover", display:"block",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition:"transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
        filter: hovered ? "grayscale(0%)" : "grayscale(90%) brightness(0.8)", // Brutalist: abu-abu gelap sampai di-hover
        borderRadius: "4px"
      }}/>

      {/* Overlay Gelap (opsional) */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to top, rgba(14,13,10,0.7) 0%, transparent 40%)",
        opacity: hovered ? 1 : 0.4,
        transition:"opacity 0.4s ease",
        borderRadius: "4px"
      }}/>

      {/* Tag Kategori */}
      <div style={{
        position:"absolute", top:"1rem", right:"-1rem", // Menjorok keluar frame
        fontFamily:"'Space Mono',monospace", fontSize:"0.6rem",
        letterSpacing:"0.15em", textTransform:"uppercase",
        background:"var(--gold)", color:"#fff",
        padding:"0.4rem 1rem", fontWeight:700,
        transform: hovered ? "rotate(5deg) scale(1.1)" : "rotate(0deg) scale(1)",
        opacity: hovered ? 1 : 0,
        transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        zIndex: 2,
        boxShadow: "4px 4px 0px var(--ink)"
      }}>{item.tag}</div>

      {/* Judul Besar Keluar Batas */}
      <div style={{
        position:"absolute", 
        bottom: hovered ? "-2rem" : "1.5rem", 
        left: hovered ? "-1.5rem" : "1.5rem",
        opacity: hovered ? 1 : 0,
        transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        pointerEvents: "none",
        zIndex: 3,
        width: "120%"
      }}>
        <h3 style={{ 
          fontFamily:"'Bebas Neue',sans-serif", 
          fontSize:"clamp(2.5rem,5vw,4.5rem)", 
          lineHeight: 0.85,
          color:"var(--gold)", 
          // Text stroke gaya brutalist
          textShadow: "3px 3px 0px var(--ink), -1px -1px 0 var(--ink), 1px -1px 0 var(--ink), -1px 1px 0 var(--ink), 1px 1px 0 var(--ink)" 
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
    <section id="portfolio" style={{ background:"var(--bg)", padding:"8rem 3rem", overflowX:"hidden" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }} ref={ref}>
        {/* Header Tetap Rapi */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"6rem", borderBottom:"2px solid var(--ink)", paddingBottom:"2rem" }}>
          <div>
            <p className="r-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.8rem" }}>03 — Portfolio</p>
            <h2 className="r-up" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,6vw,6rem)", letterSpacing:"0.02em", color:"var(--ink)", lineHeight:0.9 }}>
              Karya<br/>
              <span style={{ WebkitTextStroke:"1px var(--ink)", color:"transparent" }}>Terpilih</span>
            </h2>
          </div>
          <p className="r-up" style={{ fontFamily:"'DM Serif Display',serif", fontStyle:"italic", fontSize:"1rem", color:"var(--muted)", maxWidth:"200px", textAlign:"right", lineHeight:1.6 }}>
            Sentuh (hover) untuk menghidupkan karya.
          </p>
        </div>

        {/* Container Flex berantakan pengganti Grid */}
        <div style={{ 
          display:"flex", 
          flexWrap:"wrap", 
          justifyContent:"center", 
          gap:"-3rem", // Negatif gap agar saling menumpuk 
          margin:"0 auto",
          paddingBottom:"4rem"
        }}>
          {items.map((item,i)=><Card key={i} item={item} i={i}/>)}
        </div>
      </div>
    </section>
  );
}
