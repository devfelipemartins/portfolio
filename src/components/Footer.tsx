"use client";

import { perfil, contatos } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { gsap } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";

export default function Footer() {
  const ano = new Date().getFullYear();

  const ref = useMotion<HTMLElement>(({ root }) => {
    const line = root.querySelector<HTMLElement>("[data-footer-line]");
    const content = root.querySelector<HTMLElement>("[data-footer-content]");

    // C4 · a borda superior se desenha...
    if (line) {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 95%", end: "top 70%", scrub: true },
        },
      );
    }
    // ...e a assinatura aparece.
    if (content) {
      gsap.from(content, {
        opacity: 0,
        y: 12,
        duration: 0.7,
        scrollTrigger: { trigger: root, start: "top 90%", once: true },
      });
    }
  });

  return (
    <footer ref={ref} className="relative px-6 py-10">
      <span
        data-footer-line
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px bg-border"
      />
      <div
        data-footer-content
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row"
      >
        <p className="text-sm text-muted-soft">
          © {ano} {perfil.nome} {perfil.sobrenome}. Feito com Next.js.
        </p>
        <div className="flex items-center gap-5 text-muted-soft">
          {contatos.github && (
            <a href={contatos.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-foreground">
              <GitHubIcon width={20} height={20} />
            </a>
          )}
          {contatos.linkedin && (
            <a href={contatos.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
              <LinkedInIcon width={20} height={20} />
            </a>
          )}
          {contatos.email && (
            <a href={`mailto:${contatos.email}`} aria-label="E-mail" className="transition-colors hover:text-foreground">
              <MailIcon width={20} height={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
