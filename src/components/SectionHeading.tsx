"use client";

import { gsap } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";

/**
 * S1 · Cabeçalho de seção (vale para 01→06): número acende, título entra
 * desfocado ganhando foco e a linha cresce para a direita. Aplicado uma vez.
 */
export function SectionHeading({ numero, titulo }: { numero: string; titulo: string }) {
  const ref = useMotion(({ root }) => {
    const num = root.querySelector<HTMLElement>("[data-sh-num]")!;
    const title = root.querySelector<HTMLElement>("[data-sh-title]")!;
    const line = root.querySelector<HTMLElement>("[data-sh-line]")!;

    gsap.set([num, title], { opacity: 0 });
    gsap.set(title, { filter: "blur(14px)", y: 18 });
    gsap.set(line, { scaleX: 0, transformOrigin: "left" });

    gsap
      .timeline({ scrollTrigger: { trigger: root, start: "top 84%", once: true } })
      .to(num, { opacity: 1, duration: 0.4 }, 0)
      .to(title, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8 }, 0.4)
      .to(line, { scaleX: 1, ease: "none", duration: 0.6 }, 0.4);
  });

  return (
    <div ref={ref} className="flex items-center gap-4">
      <span data-sh-num className="font-mono text-sm text-accent-2">
        {numero}.
      </span>
      <h2 data-sh-title className="text-3xl font-bold tracking-tight sm:text-4xl">
        {titulo}
      </h2>
      <span
        data-sh-line
        className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
      />
    </div>
  );
}

export default SectionHeading;
