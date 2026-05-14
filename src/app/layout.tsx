import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/providers/agentation-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
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
  description:
    "Educación financiera y emprendimiento para kapitalistas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full bg-[#0E0E10] font-sans text-white antialiased md:pl-[72px] pb-16 md:pb-0">
        {children}
        <AgentationProvider />
      </body>
    </html>
  );
}
