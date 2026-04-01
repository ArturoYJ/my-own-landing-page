import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arturo Yion Jaime — Software Engineer",
  description:
    "Portafolio de Arturo Yion Jaime. Ingeniero de Software especializado en Clean Architecture, SOLID, stack PERN y despliegue Cloud. Basado en Tuxtla Gutiérrez, Chiapas.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Clean Architecture",
    "Arturo Yion",
  ],
  authors: [{ name: "Arturo Yion Jaime" }],
  creator: "Arturo Yion Jaime",
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "Arturo Yion Jaime — Software Engineer",
    description:
      "Ingeniero de Software especializado en sistemas escalables con Clean Architecture y stack PERN.",
    siteName: "Arturo Yion — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arturo Yion Jaime — Software Engineer",
    description:
      "Ingeniero de Software especializado en sistemas escalables con Clean Architecture y stack PERN.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
