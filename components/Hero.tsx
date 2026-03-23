"use client";
import { useEffect, useRef, useState, useMemo } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Animasi masuk untuk elemen r-up (fade-in masuk dari vortex)
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current?.querySelectorAll(".hero-text-shard").forEach((el, i) => {
          // Setiap shard teks masuk dengan delay acak
          setTimeout(() => el.classList.add("on"), Math.random() * 500 + 100);
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#111", padding: "18rem 4rem 15rem 4rem", overflow: "hidden" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", minHeight: "60vh" }}>
        
        {/* --- DYNAMIC KINETIC TEXT SCULPTURE --- */}
        <div style={{ 
          position: "relative", 
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: "perspective(1000px)", // Berikan kedalaman 3D
        }}>
          
          {/* Main Name: Exploded Shards */}
          <div style={{ position: "relative", marginBottom: "3rem" }}>
            <h1 className="hero-text-shard main-name" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(6rem, 20vw, 15rem)", // Raksasa!
              lineHeight: 0.8,
              letterSpacing: "-0.04em",
              color: "#C4A77D", // Gold dari visual baru
              textTransform: "uppercase",
              fontWeight: 400,
              display: "inline-block",
              transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease",
              cursor: "crosshair"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "perspective(1000px) scale(1.1) rotateY(10deg) skewX(2deg)";
              e.currentTarget.style.textShadow = "0 0 20px rgba(196,167,125,0.7)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "perspective(1000px) scale(1) rotateY(0deg) skewX(0deg)";
              e.currentTarget.style.textShadow = "none";
            }}
            >
              ACEP NURJAMAN
            </h1>
            
            {/* Shard: ACEP */}
            <span className="hero-text-shard name-acep" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3rem, 10vw, 8rem)",
              color: "#FFF",
              textTransform: "uppercase",
              position: "absolute",
              top: "-5rem", left: "0",
              zIndex: 11,
              transition: "all 0.4s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateX(30px) translateY(-10px) rotate(5deg) scale(1.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateX(0) translateY(0) rotate(0) scale(1)";
            }}
            >
              ACEP
            </span>
            
            {/* Shard: NURJAMAN */}
            <span className="hero-text-shard name-nurjaman" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3rem, 10vw, 8rem)",
              color: "rgba(196,167,125,0.6)", // Sedikit transparansi gold
              textTransform: "uppercase",
              position: "absolute",
              bottom: "-5rem", right: "0",
              zIndex: 11,
              transition: "all 0.4s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateX(-30px) translateY(10px) rotate(-5deg) scale(1.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateX(0) translateY(0) rotate(0) scale(1)";
            }}
            >
              NURJAMAN
            </span>
          </div>

          {/* Titles: Exploded Shards (Rotating in different directions) */}
          <div style={{ position: "relative", alignSelf: "flex-end", marginRight: "5rem" }}>
            <p className="hero-text-shard title-graphic" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "#F5F0E8", // Off-white
              textTransform: "uppercase",
              position: "absolute",
              top: "0", right: "10rem",
              transform: "perspective(1000px) rotateY(-30deg) skewY(5deg)", // Rotasi agresif
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              animation: "float1 5s ease-in-out infinite alternate" // Melayang palsu
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#C4A77D";
              e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) skewY(0deg) scale(1.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#F5F0E8";
              e.currentTarget.style.transform = "perspective(1000px) rotateY(-30deg) skewY(5deg) scale(1)";
            }}
            >
              GRAPHIC DESIGNER
            </p>
            
            <p className="hero-text-shard title-technical" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "rgba(196,167,125,0.7)", // Semitransparan gold
              textTransform: "uppercase",
              position: "absolute",
              bottom: "0", left: "-10rem",
              transform: "perspective(1000px) rotateX(25deg) rotateY(15deg) skewX(-5deg)", // Rotasi agresif beda arah
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              animation: "float2 6s ease-in-out infinite alternate" // Melayang palsu
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#C4A77D";
              e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) skewX(0deg) scale(1.15)";
              e.currentTarget.style.zIndex = "20";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(196,167,125,0.7)";
              e.currentTarget.style.transform = "perspective(1000px) rotateX(25deg) rotateY(15deg) skewX(-5deg) scale(1)";
              e.currentTarget.style.zIndex = "10";
            }}
            >
              TECHNICAL ARTIST
            </p>
          </div>

        </div>

        {/* --- ABOUT Block: Interwoven Editorial --- */}
        <div style={{ position: "absolute", bottom: "4rem", left: "4rem", zIndex: 5, maxWidth: "500px" }}>
          <p className="hero-text-shard" style={{
            fontFamily: "'DM Serif Display',serif",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            lineHeight: 1.4,
            color: "#C4A77D", // Gold
            marginBottom: "1rem"
          }}>
            CORE PROTOCOL: VISUAL TRANSLATION.
          </p>
          <p className="hero-text-shard" style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.85rem",
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.6)",
          }}>
            Fusing technical rigor with creative fluency. Consistently translating complex concepts into precise technical documents and impactful visual identities. A fusion of technical rigor and creative fluency.
          </p>
        </div>
        
        {/* --- SCROLLING MARQUEE --- */}
        <div style={{
          position: "absolute",
          top: "4rem", right: "0",
          overflow: "hidden",
          width: "100%",
          display: "flex",
          transform: "rotate(15deg) translateY(-50%)",
          transformOrigin: "top right",
          zIndex: 1,
          opacity: 0.3
        }}>
          <div className="r-up" style={{
            display: "flex",
            gap: "2rem",
            whiteSpace: "nowrap",
            animation: "marquee 20s linear infinite"
          }}>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.8rem", color: "#F5F0E8" }}>SIGNAL-TO-NOISE RATIO OPTIMIZED... FUSING TECHNICAL RIGOR WITH CREATIVE FLUENCE...</p>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.8rem", color: "#F5F0E8" }}>SIGNAL-TO-NOISE RATIO OPTIMIZED... FUSING TECHNICAL RIGOR WITH CREATIVE FLUENCE...</p>
          </div>
        </div>
        
      </div>

      {/* --- Perlu CSS tambahan untuk keyframes dan kelas visible --- */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes float1 {
          0% { transform: perspective(1000px) rotateY(-30deg) skewY(5deg) translateY(0px); }
          100% { transform: perspective(1000px) rotateY(-25deg) skewY(3deg) translateY(-15px); }
        }
        @keyframes float2 {
          0% { transform: perspective(1000px) rotateX(25deg) rotateY(15deg) skewX(-5deg) translateY(0px); }
          100% { transform: perspective(1000px) rotateX(20deg) rotateY(10deg) skewX(-3deg) translateY(15px); }
        }
        .hero-text-shard {
          opacity: 0 !important;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.5s ease;
        }
        .hero-text-shard.on {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
