import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { perfil } from "@/data/portfolio";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";

// Script anti-flash: define o tema antes da pintura (executado no HTML do SSR).
const themeInit = `(function(){try{var s=localStorage.getItem('theme');var t=s||((window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nomeCompleto = `${perfil.nome} ${perfil.sobrenome}`;

export const metadata: Metadata = {
  title: `${nomeCompleto} | ${perfil.cargo}`,
  description: perfil.resumo,
  keywords: [
    "desenvolvedor full stack",
    "portfólio",
    "Next.js",
    "React",
    "Python",
    "automação",
    nomeCompleto,
  ],
  authors: [{ name: nomeCompleto }],
  openGraph: {
    title: `${nomeCompleto} | ${perfil.cargo}`,
    description: perfil.resumo,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${nomeCompleto} | ${perfil.cargo}`,
    description: perfil.resumo,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
