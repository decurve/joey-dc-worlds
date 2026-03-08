import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Instrument_Serif, Space_Mono, JetBrains_Mono, Silkscreen } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif-display",
});

export const metadata: Metadata = {
  title: "Demand Curve — Growth Architects",
  description: "We architect growth. Strategy, systems, and execution for tech companies that are done guessing.",
  openGraph: {
    title: "Demand Curve — Growth Architects",
    description: "We architect growth. Strategy, systems, and execution for tech companies that are done guessing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} ${inter.variable} ${instrumentSerif.variable} ${spaceMono.variable} ${jetbrainsMono.variable} ${silkscreen.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
