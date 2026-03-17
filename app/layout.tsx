import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acep Nurjaman — Graphic Designer",
  description: "Graphic designer dengan pengalaman 5+ tahun. Spesialis brand identity, social media design, digital marketing, dan konten visual.",
  keywords: "graphic designer jakarta, brand identity, social media design, logo design",
  openGraph: {
    title: "Acep Nurjaman — Graphic Designer",
    description: "5+ tahun pengalaman desain grafis. Brand identity, digital marketing, visual content.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
