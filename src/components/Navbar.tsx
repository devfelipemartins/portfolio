"use client";

import { useRef, useState } from "react";
import { perfil } from "@/data/portfolio";
import ThemeToggle from "./ThemeToggle";
import { gsap, ScrollTrigger, useGSAP } from "./motion/gsap";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#skills", label: "Skills" },
  { href: "#projetos", label: "Projetos" },
  { href: "#formacao", label: "Formação" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // N1 (glass no scroll), N2 (link ativo), N3 (entrada), G2 (barra de progresso)
  useGSAP(
    () => {
      const header = headerRef.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // N3 · entrada da navbar
      if (!reduce) {
        gsap.from(header, { y: -60, opacity: 0, duration: 0.7, delay: 0.1 });
      }

      // G2 · barra de progresso de scroll
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        },
      );

      // N1 · vira glass ao passar de 20px (sem re-render)
      ScrollTrigger.create({
        start: "20px top",
        end: "max",
        toggleClass: { targets: header, className: "nav-scrolled" },
      });

      // N2 · scroll spy (um trigger por seção)
      links.forEach((l) => {
        const section = document.querySelector(l.href);
        const link = header.querySelector(`[data-nav="${l.href}"]`);
        if (!section || !link) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => link.classList.toggle("active", self.isActive),
        });
      });
    },
    { scope: headerRef },
  );

  // N4 · menu mobile (abre em altura + itens em cascata)
  useGSAP(
    () => {
      const panel = panelRef.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = panel.querySelectorAll("[data-mobile-item]");

      if (open) {
        if (reduce) {
          gsap.set(panel, { height: "auto" });
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }
        gsap.to(panel, { height: "auto", duration: 0.35, ease: "power3.out" });
        gsap.fromTo(
          items,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, delay: 0.05 },
        );
      } else {
        gsap.to(panel, { height: 0, duration: reduce ? 0 : 0.3, ease: "power3.in" });
      }
    },
    { dependencies: [open], scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="site-header fixed left-0 right-0 top-0 z-50"
    >
      {/* G2 · barra de progresso */}
      <div className="scroll-progress" aria-hidden>
        <span ref={progressRef} />
      </div>

      <nav className="nav-inner mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#topo" className="font-mono text-lg font-bold tracking-tight">
          <span className="text-muted-soft">dev.</span>
          <span className="text-gradient">{`${perfil.nome}${perfil.sobrenome}`.toLowerCase()}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} data-nav={l.href} className="nav-link text-sm">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href="#contato"
            data-scroll-offset="100"
            className="hidden rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent/20 md:inline-block"
          >
            Fale comigo
          </a>

          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
          >
            <span className={`h-0.5 w-6 bg-foreground transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-foreground transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-foreground transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* N4 · painel mobile (sempre no DOM; altura controlada pelo GSAP) */}
      <div
        ref={panelRef}
        className="glass overflow-hidden border-t border-border md:hidden"
        style={{ height: 0 }}
      >
        <ul className="flex flex-col px-6 py-4">
          {links.map((l) => (
            <li key={l.href} data-mobile-item>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
