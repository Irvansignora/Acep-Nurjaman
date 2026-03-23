"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Observer untuk trigger animasi masuk (materialize effect)
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current?.querySelectorAll(".hero-text-shard").forEach((el, i) => {
          // Delay acak agar elemen muncul bergantian (pecah-pecah)
          setTimeout(() => el.classList.add("on"), Math.random() * 600 + 100);
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#111", padding: "12rem 4rem", overflow: "hidden", position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", width: "100%", zIndex: 5 }}>
        
        {/* --- DYNAMIC KINETIC TEXT SCULPTURE --- */}
        <div style={{ 
          position: "relative", 
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: "perspective(1200px)", // Memberikan kedalaman 3D ruang
        }}>
          
          {/* Main Name: Teks Raksasa di Tengah */}
          <div style={{ position: "relative" }}>
            <h1 className="hero-text-shard main-name" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(5rem, 15vw, 12rem)", // Raksasa responsif
              lineHeight: 0.85,
              letterSpacing: "0.02em",
              color: "#C4A77D", // Desaturated Gold
              textTransform: "uppercase",
              fontWeight: 400,
              textAlign: "center",
              cursor: "crosshair",
              transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), text-shadow 0.5s ease"
            }}
            onMouseEnter={e => {
              // Efek 3D pop-out saat dihover
              e.currentTarget.style.transform = "perspective(1000px) scale(1.05) rotateY(15deg) rotateX(5deg)";
              e.currentTarget.style.textShadow = "0 20px 40px rgba(196,167,125,0.4)";
            }}
            onMouseLeave={e => {
              // Kembali ke normal
              e.currentTarget.style.transform = "perspective(1000px) scale(1) rotateY(0deg) rotateX(0deg)";
              e.currentTarget.style.textShadow = "none";
            }}
            >
              ACEP NURJAMAN
            </h1>
            
            {/* Shard Background: ACEP */}
            <span className="hero-text-shard" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "rgba(255,255,255,0.05)", // Putih sangat transparan
              textTransform: "uppercase",
              position: "absolute",
              top: "-2rem", left: "-3rem",
              zIndex: -1,
              animation: "floatHero1 6s ease-in-out infinite alternate",
              pointerEvents: "none"
            }}>
              ACEP
            </span>

            {/* Shard Background: NURJAMAN */}
            <span className="hero-text-shard" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "rgba(196,167,125,0.1)", // Gold sangat transparan
              textTransform: "uppercase",
              position: "absolute",
              bottom: "-3rem", right: "-3rem",
              zIndex: -1,
              animation: "floatHero2 7s ease-in-out infinite alternate",
              pointerEvents: "none"
            }}>
              NURJAMAN
            </span>
          </div>

          {/* Titles: Floating & Rotating Teks (Graphic Designer & Tech Artist) */}
          <div style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
            <p className="hero-text-shard" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
              color: "#F5F0E8", // Off-white
              position: "absolute",
              top: "-4rem", right: "-2rem",
              animation: "floatHero1 5s ease-in-out infinite alternate", // Melayang palsu
              pointerEvents: "auto",
              cursor: "default"
            }}>
              GRAPHIC DESIGNER
            </p>
            
            <p className="hero-text-shard" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
              color: "rgba(196,167,125,0.8)", // Semitransparan gold
              position: "absolute",
              bottom: "-4rem", left: "-2rem",
              animation: "floatHero2 6s ease-in-out infinite alternate", // Melayang palsu
              pointerEvents: "auto",
              cursor: "default"
            }}>
              TECHNICAL ARTIST
            </p>
          </div>
        </div>

        {/* --- ABOUT Block: Kiri Bawah --- */}
        <div style={{ position: "absolute", bottom: "-8rem", left: "0", zIndex: 5, maxWidth: "500px" }}>
          <p className="hero-text-shard" style={{ fontFamily: "'DM Serif Display',serif", fontStyle: "italic", fontSize: "1.2rem", color: "#C4A77D", marginBottom: "0.5rem" }}>
            CORE PROTOCOL: VISUAL TRANSLATION.
          </p>
          <p className="hero-text-shard" style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(245,240,232,0.6)" }}>
            Fusing technical rigor with creative fluency. Consistently translating complex concepts into precise technical documents and impactful visual identities.
          </p>
        </div>
        
      </div>

      {/* --- SCROLLING MARQUEE (Background Miring) --- */}
      <div style={{
        position: "absolute",
        top: "15%", right: "-10%",
        width: "120%",
        transform: "rotate(10deg)",
        zIndex: 1,
        opacity: 0.1, // Tipis banget di belakang
        pointerEvents: "none"
      }}>
        <div className="hero-text-shard" style={{ display: "flex", gap: "2rem", whiteSpace: "nowrap", animation: "marqueeHero 25s linear infinite" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "1rem", color: "#F5F0E8" }}>SIGNAL-TO-NOISE RATIO OPTIMIZED... FUSING TECHNICAL RIGOR WITH CREATIVE FLUENCE...</p>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "1rem", color: "#F5F0E8" }}>SIGNAL-TO-NOISE RATIO OPTIMIZED... FUSING TECHNICAL RIGOR WITH CREATIVE FLUENCE...</p>
        </div>
      </div>

      {/* --- REAL CSS INJECTION --- 
          Pakai ini biar 100% jalan dan nggak diblokir sama Next.js 
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeHero {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatHero1 {
          0% { transform: perspective(1000px) rotateY(-20deg) rotateZ(5deg) translateY(0px); }
          100% { transform: perspective(1000px) rotateY(-15deg) rotateZ(2deg) translateY(-20px); }
        }
        @keyframes floatHero2 {
          0% { transform: perspective(1000px) rotateX(20deg) rotateY(15deg) rotateZ(-5deg) translateY(0px); }
          100% { transform: perspective(1000px) rotateX(15deg) rotateY(10deg) rotateZ(-2deg) translateY(20px); }
        }
        .hero-text-shard {
          opacity: 0;
          filter: blur(10px); /* Efek blur saat baru dimuat */
          transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.8s ease-out, filter 0.8s ease-out;
        }
        .hero-text-shard.on {
          opacity: 1;
          filter: blur(0px); /* Teks menjadi tajam */
        }
      `}} />
    </section>
  );
}
