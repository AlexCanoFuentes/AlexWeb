import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Alex Cano — CTO t\u00e9cnico \u00b7 Productos con IA",
  description:
    "Construyo productos completos con inteligencia artificial. Del concepto al deploy. 5+ productos en producci\u00f3n.",
  metadataBase: new URL("https://alexweb-psi.vercel.app"),
  openGraph: {
    title: "Alex Cano — CTO t\u00e9cnico \u00b7 Productos con IA",
    description:
      "Construyo productos completos con IA. Del concepto al deploy.",
    url: "https://alexweb-psi.vercel.app",
    siteName: "Alex Cano",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alex Cano — CTO & AI Orchestrator",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Cano — CTO t\u00e9cnico \u00b7 Productos con IA",
    description:
      "Construyo productos completos con IA. Del concepto al deploy.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
