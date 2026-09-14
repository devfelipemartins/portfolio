"use client";

import { perfil } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { gsap, SplitText } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";
import { MapPinIcon, BriefcaseIcon } from "./icons";

export default function About() {
  const ref = useMotion<HTMLElement>(({ root }) => {
    // S2 · reveal palavra por palavra da bio
    const splits: ReturnType<typeof SplitText.create>[] = [];
    root.querySelectorAll<HTMLElement>("[data-bio] p").forEach((p) => {
      const s = SplitText.create(p, { type: "words" });
      splits.push(s);
      gsap.from(s.words, {
        y: 14,
        opacity: 0,
        filter: "blur(5px)",
        stagger: 0.02,
        duration: 0.6,
        scrollTrigger: { trigger: p, start: "top 84%", once: true },
      });
    });

    // S3 · pop dos chips
    const chips = root.querySelectorAll<HTMLElement>("[data-chip]");
    gsap.from(chips, {
      scale: 0.8,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: "back.out(2)",
      scrollTrigger: { trigger: chips[0], start: "top 88%", once: true },
    });

    // Micro-animações dos ícones (idle sutil)
    const pin = root.querySelector<SVGSVGElement>('[data-chip-icon="pin"]');
    const bag = root.querySelector<SVGSVGElement>('[data-chip-icon="briefcase"]');
    if (pin) {
      gsap.to(pin, { y: -2.5, repeat: -1, yoyo: true, duration: 1.1, ease: "sine.inOut" });
    }
    if (bag) {
      gsap.to(bag, {
        rotation: -9,
        transformOrigin: "50% 50%",
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
      });
    }

    return () => splits.forEach((s) => s.revert());
  });

  return (
    <section ref={ref} id="sobre" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading numero="01" titulo="Sobre mim" />
        <div data-bio className="mt-10 space-y-5 text-lg leading-relaxed text-muted">
          {perfil.bio.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span
            data-chip
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          >
            <MapPinIcon data-chip-icon="pin" width={16} height={16} className="text-accent-2" />
            {perfil.local}
          </span>
          <span
            data-chip
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          >
            <BriefcaseIcon data-chip-icon="briefcase" width={16} height={16} className="text-accent-2" />
            {perfil.cargo}
          </span>
        </div>
      </div>
    </section>
  );
}
