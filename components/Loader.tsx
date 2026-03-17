"use client";
import { useEffect, useState } from "react";
export default function Loader() {
  const [out, setOut] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOut(true), 1800); return () => clearTimeout(t); }, []);
  return (
    <div id="loader" className={out ? "out" : ""}>
      <div id="loader-name">ACNUMAN</div>
      <div id="loader-bar-wrap"><div id="loader-bar-fill" /></div>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.3em", color:"rgba(245,240,232,0.4)", textTransform:"uppercase" }}>
        Graphic Designer · Jakarta
      </p>
    </div>
  );
}
