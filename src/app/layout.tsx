import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/providers/agentation-provider";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kapitalizando",
    template: "%s — Kapitalizando",
  },
  description: "Educación financiera y emprendimiento para kapitalistas.",
  openGraph: {
    title: "Kapitalizando",
    description: "Educación financiera y emprendimiento para kapitalistas.",
    siteName: "Kapitalizando",
    type: "website",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full bg-[#0E0E10] font-body text-white antialiased md:pl-[72px] pb-16 md:pb-0">
        {children}
        <AgentationProvider />
      </body>
    </html>
  );
}
