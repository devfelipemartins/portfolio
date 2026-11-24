import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { perfil, contatos } from "@/data/portfolio";
import { nomeCompleto, siteTitle, siteDescription, siteUrl } from "@/lib/site";
import SmoothScroll from "@/components/motion/SmoothScroll";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: nomeCompleto,
  jobTitle: perfil.cargo,
  url: siteUrl,
  sameAs: [contatos.github, contatos.linkedin].filter(Boolean),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b10" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  keywords: [
    "analista de sistemas",
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
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: nomeCompleto,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
