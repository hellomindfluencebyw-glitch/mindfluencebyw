import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import PathBurst from "@/components/PathBurst";
import AmbientTrail from "@/components/AmbientTrail";
import SoundToggle from "@/components/SoundToggle";
import "./globals.css";

// next/font self-hosts these at build time: no render-blocking Google Fonts
// request, no layout shift, and it works offline once built.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mindfluence by W — Great marketing begins in the mind.",
  description:
    "A psychology-backed creative marketing studio. Explore the mind behind the work.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AmbientTrail />
        {children}
        <PathBurst />
        <SoundToggle />
      </body>
    </html>
  );
}
