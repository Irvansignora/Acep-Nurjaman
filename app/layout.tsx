import "./globals.css";
// Pastikan komponen-komponen ini ada di folder lu, kalau tidak ada, sesuaikan import-nya
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";

export const metadata = {
  title: "Acep Nurjaman - Portfolio",
  description: "Graphic Designer & Technical Artist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* --- ACTIVE THEORY LIQUID ENGINE (HIDDEN) --- */}
        {/* Ini adalah jantung dari efek distorsi cair ala WebGL */}
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', zIndex: -1 }}>
          <filter id="liquid-filter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.015 0.03" 
              numOctaves="3" 
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="0" 
              xChannelSelector="R" 
              yChannelSelector="G" 
              id="displacement-map"
            >
              {/* Animasi ini membuat riaknya bergerak secara berulang */}
              <animate attributeName="scale" values="0;35;0" dur="4s" repeatCount="indefinite" begin="indefinite" />
            </feDisplacementMap>
          </filter>
        </svg>

        <Loader />
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
