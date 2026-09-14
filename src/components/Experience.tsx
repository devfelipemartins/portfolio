"use client";

import { experiencias } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { gsap } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";

export default function Experience() {
  const ref = useMotion<HTMLElement>(({ root }) => {
    const list = root.querySelector<HTMLElement>("[data-timeline-list]");
    const line = root.querySelector<HTMLElement>("[data-timeline-line]");

    // E1 · draw da linha da timeline (acompanha o scroll)
    if (list && line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 70%", scrub: true },
        },
      );
    }

    // Por card: marcador, slide-in (E2) e pills (E3)
    root.querySelectorAll<HTMLElement>("[data-exp-card]").forEach((card) => {
      const marker = card.querySelector<HTMLElement>("[data-exp-marker]");
      const pills = card.querySelectorAll<HTMLElement>("[data-exp-pill]");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 84%", once: true },
      });
      tl.from(card, { x: -60, autoAlpha: 0, duration: 0.8 });
      if (marker) {
        tl.from(marker, { scale: 0.4, autoAlpha: 0, duration: 0.5, ease: "back.out(1.8)" }, 0.2);
      }
      if (pills.length) {
        tl.from(pills, { y: 10, opacity: 0, stagger: 0.05, duration: 0.4 }, 0.3);
      }
    });
  });

  if (experiencias.length === 0) return null;

  return (
    <section ref={ref} id="experiencia" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading numero="02" titulo="Experiência" />

        <div data-timeline-list className="relative mt-10 space-y-6 pl-2">
          {/* E1 · linha da timeline */}
          <span
            data-timeline-line
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
            style={{ background: "linear-gradient(180deg, #22d3ee, #6366f1)" }}
          />

          {experiencias.map((exp, i) => (
            <div
              key={i}
              data-exp-card
              className="glass relative rounded-2xl p-6 pl-8"
            >
              {/* Marcador da timeline */}
              <span
                data-exp-marker
                className="absolute left-0 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-2"
                style={{ boxShadow: "0 0 0 5px #0a0b10" }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold">{exp.cargo}</h3>
                <span className="font-mono text-sm text-accent-2">{exp.periodo}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-muted">
                {exp.empresa}
                {exp.local ? ` · ${exp.local}` : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{exp.descricao}</p>
              {exp.tecnologias && exp.tecnologias.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {exp.tecnologias.map((tec) => (
                    <li
                      key={tec}
                      data-exp-pill
                      className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent-2"
                    >
                      {tec}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
