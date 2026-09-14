"use client";

import { useRef } from "react";
import Image from "next/image";
import { perfil, contatos } from "@/data/portfolio";
import Logo3D from "./Logo3D";
import Magnetic from "./motion/Magnetic";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./motion/gsap";
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowDownIcon, DocumentIcon } from "./icons";

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const h1 = root.querySelector<HTMLElement>("[data-hero-title]")!;
      const cargo = root.querySelector<HTMLElement>("[data-hero-cargo]")!;
      const headline = root.querySelector<HTMLElement>("[data-hero-headline]")!;
      const fadeUps = root.querySelectorAll<HTMLElement>("[data-hero-fade]");
      const logoOuter = root.querySelector<HTMLElement>("[data-hero-logo]");
      const logoInner = root.querySelector<HTMLElement>("[data-hero-logo-inner]");
      const arrow = root.querySelector<HTMLElement>("[data-hero-arrow]")!;
      const spot = root.querySelector<HTMLElement>("[data-hero-spot]")!;

      // H1 · máscara de linha no nome
      const titleSplit = SplitText.create(h1, { type: "lines", mask: "lines" });
      gsap.from(titleSplit.lines, {
        yPercent: 110,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
      });

      // H2 · stagger por caractere no cargo (0.25s depois do H1)
      const cargoSplit = SplitText.create(cargo, { type: "chars" });
      gsap.from(cargoSplit.chars, {
        opacity: 0,
        stagger: 0.03,
        duration: 0.4,
        delay: 0.25,
      });

      // H3 · blur-in do headline
      gsap.set(headline, { opacity: 0, filter: "blur(16px)", y: 14 });
      gsap.to(headline, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9, delay: 0.35 });

      // H4 · fade-up do resumo, botões e redes
      gsap.set(fadeUps, { opacity: 0, y: 16 });
      gsap.to(fadeUps, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, delay: 0.5 });

      // H5 · parallax da logo (scrub) + H6 · float infinito
      if (logoOuter && logoInner) {
        gsap.to(logoOuter, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(logoInner, { y: -9, repeat: -1, yoyo: true, duration: 2.2, ease: "sine.inOut" });
        gsap.to(logoInner, {
          rotate: 5,
          repeat: -1,
          yoyo: true,
          duration: 5,
          ease: "sine.inOut",
        });
      }

      // H8 · seta de rolagem (pulsa e some ao rolar).
      // xPercent -50 mantém a centralização horizontal ao animar o y.
      gsap.set(arrow, { xPercent: -50 });
      gsap.to(arrow, { y: 8, repeat: -1, yoyo: true, duration: 1.2, ease: "sine.inOut" });
      gsap.to(arrow, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { start: 200, end: 280, scrub: true },
      });

      // G4 · spotlight seguindo o mouse (só ponteiro fino)
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine)", () => {
        const xTo = gsap.quickTo(spot, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(spot, "y", { duration: 0.6, ease: "power3" });
        const move = (e: MouseEvent) => {
          const r = root.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };
        gsap.to(spot, { opacity: 1, duration: 0.8 });
        root.addEventListener("mousemove", move);
        return () => root.removeEventListener("mousemove", move);
      });

      // Recalcula posições quando as fontes terminam de carregar.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        titleSplit.revert();
        cargoSplit.revert();
      };
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="topo"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* G4 · spotlight */}
      <div data-hero-spot className="spotlight" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        {/* Texto */}
        <div>
          <h1
            data-hero-title
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            {perfil.nome} {perfil.sobrenome}
          </h1>
          <p data-hero-cargo className="mt-3 font-mono text-lg text-accent-2 sm:text-xl">
            {perfil.cargo}
          </p>

          <p
            data-hero-headline
            className="mt-6 max-w-xl text-2xl font-semibold leading-snug text-gradient sm:text-3xl"
          >
            {perfil.headline}
          </p>
          <p data-hero-fade className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {perfil.resumo}
          </p>

          {/* Ações */}
          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projetos"
                className="inline-block rounded-full bg-gradient-to-r from-accent to-accent-3 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-glow"
              >
                Ver projetos
              </a>
            </Magnetic>
            <a
              href="#contato"
              className="rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover"
            >
              Entrar em contato
            </a>
            {contatos.curriculo && (
              <a
                href={contatos.curriculo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
              >
                <DocumentIcon width={18} height={18} /> Currículo
              </a>
            )}
          </div>

          {/* Redes */}
          <div data-hero-fade className="mt-8 flex items-center gap-4">
            {contatos.github && (
              <a href={contatos.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted transition-colors hover:text-foreground">
                <GitHubIcon width={24} height={24} />
              </a>
            )}
            {contatos.linkedin && (
              <a href={contatos.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted transition-colors hover:text-foreground">
                <LinkedInIcon width={24} height={24} />
              </a>
            )}
            {contatos.email && (
              <a href={`mailto:${contatos.email}`} aria-label="E-mail" className="text-muted transition-colors hover:text-foreground">
                <MailIcon width={24} height={24} />
              </a>
            )}
          </div>
        </div>

        {/* Visual: logo 3D > foto > iniciais */}
        <div data-hero-logo className="flex justify-center md:justify-end">
          <div data-hero-logo-inner>
            {perfil.logo3d ? (
              <Logo3D src={perfil.logo3d} alt={`Logo de ${perfil.nome} ${perfil.sobrenome}`} />
            ) : (
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/30 via-accent-2/20 to-accent-3/30 blur-2xl" />
                {perfil.foto ? (
                  <Image
                    src={perfil.foto}
                    alt={`${perfil.nome} ${perfil.sobrenome}`}
                    width={320}
                    height={320}
                    className="relative h-72 w-72 rounded-3xl object-cover ring-1 ring-border sm:h-80 sm:w-80"
                  />
                ) : (
                  <div className="glass relative flex h-72 w-72 items-center justify-center rounded-3xl sm:h-80 sm:w-80">
                    <span className="text-8xl font-bold text-gradient">
                      {perfil.nome.charAt(0)}
                      {perfil.sobrenome.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <a
        data-hero-arrow
        href="#sobre"
        aria-label="Rolar para baixo"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-soft transition-colors hover:text-foreground"
      >
        <ArrowDownIcon width={24} height={24} />
      </a>
    </section>
  );
}
