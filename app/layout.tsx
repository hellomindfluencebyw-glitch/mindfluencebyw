import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import PathBurst from "@/components/PathBurst";
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
  title: "Mindfluence by W — Social media, understood differently.",
  description:
    "A psychology-backed social media creative agency. Strategy, content and creative systems built around real human behaviour.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `(() => { try { const saved = localStorage.getItem("mindfluence-theme"); const system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"; document.documentElement.dataset.theme = saved || system; } catch (_) { document.documentElement.dataset.theme = "dark"; } })();` }} />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <PathBurst />
      </body>
    </html>
  );
}
