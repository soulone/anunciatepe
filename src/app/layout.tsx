import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { createClient } from "@supabase/supabase-js";
import "./globals.css";
import { AgentationProvider } from "@/components/providers/agentation-provider";
import { LogoProvider } from "@/components/providers/logo-provider";

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
    default: "Kapitalizando — Educación Financiera para Kapitalistas",
    template: "%s — Kapitalizando",
  },
  description:
    "Aprende finanzas, emprendimiento y negocios con los maestros del barrio. Lives, cursos, herramientas y comunidad.",
  openGraph: {
    title: "Kapitalizando",
    description: "Educación financiera y emprendimiento para kapitalistas.",
    siteName: "Kapitalizando",
    type: "website",
    locale: "es_PE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch logo URL públicamente (service_role bypass RLS)
  let logoSrc: string | null = null;
  const srKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (srKey) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, srKey);
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "SITE_LOGO_URL")
      .maybeSingle();
    if (data?.value) logoSrc = data.value;
  }

  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#0E0E10] font-body text-white antialiased md:pl-[72px] pb-16 md:pb-0" suppressHydrationWarning>
        <LogoProvider src={logoSrc}>
          {children}
        </LogoProvider>
        <AgentationProvider />
      </body>
    </html>
  );
}
