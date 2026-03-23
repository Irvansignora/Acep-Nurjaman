"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById("c-dot");
    const ring = document.getElementById("c-ring");
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left  = mx + "px";
      dot.style.top   = my + "px";

      // Section-aware cursor color
      const el = document.elementFromPoint(mx, my);
      const inGold = el?.closest("section[style*='background:\"var(--gold)\"'], [data-cursor-light]");
      document.body.classList.toggle("c-gold-section", !!inGold);
    };

    // Ring lags behind with lerp
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => document.body.classList.add("c-hover");
    const onLeave = () => document.body.classList.remove("c-hover");
    const onTextEnter = () => document.body.classList.add("c-text");
    const onTextLeave = () => document.body.classList.remove("c-text");

    window.addEventListener("mousemove", onMove);

    // Hover targets — interactive elements
    const hoverEls = document.querySelectorAll("a,button,[data-cursor]");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Text hover targets
    const textEls = document.querySelectorAll("p,h1,h2,h3,span,li");
    textEls.forEach((el) => {
      el.addEventListener("mouseenter", onTextEnter);
      el.addEventListener("mouseleave", onTextLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      textEls.forEach((el) => {
        el.removeEventListener("mouseenter", onTextEnter);
        el.removeEventListener("mouseleave", onTextLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="c-dot" />
      <div id="c-ring" />
    </>
  );
}
