"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="loader" className={hidden ? "hidden" : ""}>
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.4rem",
            fontWeight: 300,
            letterSpacing: "0.35em",
            color: "#c9a84c",
            marginBottom: "1.5rem",
            textTransform: "uppercase",
          }}
        >
          Acnuman
        </p>
        <div id="loader-bar" />
      </div>
    </div>
  );
}
