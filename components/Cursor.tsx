"use client";
import { useEffect, useRef } from "react";
export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: 0, y: 0 });
  const rp   = useRef({ x: 0, y: 0 });
  const raf  = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) { dot.current.style.left = e.clientX+"px"; dot.current.style.top = e.clientY+"px"; }
    };
    const tick = () => {
      rp.current.x += (pos.current.x - rp.current.x) * 0.1;
      rp.current.y += (pos.current.y - rp.current.y) * 0.1;
      if (ring.current) { ring.current.style.left = rp.current.x+"px"; ring.current.style.top = rp.current.y+"px"; }
      raf.current = requestAnimationFrame(tick);
    };
    const addH = () => document.body.classList.add("c-hover");
    const remH = () => document.body.classList.remove("c-hover");
    const addT = () => document.body.classList.add("c-text");
    const remT = () => document.body.classList.remove("c-text");

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-hover]").forEach(el => { el.addEventListener("mouseenter", addH); el.addEventListener("mouseleave", remH); });
    document.querySelectorAll("p,h1,h2,h3,span").forEach(el => { el.addEventListener("mouseenter", addT); el.addEventListener("mouseleave", remT); });
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  return <><div id="c-dot" ref={dot} /><div id="c-ring" ref={ring} /></>;
}
