import type { Metadata } from "next";
import PathBurst from "@/components/PathBurst";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mindfluence by W — Social media, understood differently.",
  description:
    "A psychology-backed social media creative agency. Strategy, content and creative systems built around real human behaviour.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      style={{
        "--font-fraunces": "Georgia, serif",
        "--font-inter": "Arial, sans-serif",
        "--font-plex-mono": "monospace",
      } as React.CSSProperties}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const saved = localStorage.getItem("mindfluence-theme"); const system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"; document.documentElement.dataset.theme = saved || system; } catch (_) { document.documentElement.dataset.theme = "dark"; } })();`,
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <PathBurst />
      </body>
    </html>
  );
}
