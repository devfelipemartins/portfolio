"use client";

import { skills, softSkills } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import TiltCard from "./motion/TiltCard";
import { gsap } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";

const todasTecnologias = skills.flatMap((g) => g.itens);

// Valores derivados do portfolio.ts (nunca escritos à mão)
const totalTecnologias = todasTecnologias.length;
const totalAreas = skills.length;

export default function Skills() {
  const ref = useMotion<HTMLElement>(({ root }) => {
    const grid = root.querySelector<HTMLElement>("[data-skill-grid]");
    const cards = root.querySelectorAll<HTMLElement>("[data-skill-card]");
    const pills = root.querySelectorAll<HTMLElement>("[data-skill-pill]");

    // K1 · stagger em grade com flip 3D + K2 · stagger interno das pills
    if (grid && cards.length) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: grid, start: "top 84%", once: true },
      });
      tl.from(cards, {
        y: 40,
        rotateY: -14,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
      });
      tl.from(pills, { y: 8, opacity: 0, stagger: 0.03, duration: 0.4 }, 0.2);
    }

    // Contadores animados (derivados do portfolio.ts)
    root.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
      const target = Number(el.dataset.countTo || "0");
      const obj = { v: 0 };
      el.textContent = "0";
      gsap.to(obj, {
        v: target,
        snap: { v: 1 },
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // Soft skills · reveal em cascata
    const softGrid = root.querySelector<HTMLElement>("[data-soft-grid]");
    const softPills = root.querySelectorAll<HTMLElement>("[data-soft-pill]");
    if (softGrid && softPills.length) {
      gsap.from(softPills, {
        y: 10,
        opacity: 0,
        stagger: 0.04,
        duration: 0.4,
        scrollTrigger: { trigger: softGrid, start: "top 88%", once: true },
      });
    }

    // K4 · marquee infinito (desacelera no hover)
    const track = root.querySelector<HTMLElement>("[data-marquee-track]");
    const marqueeArea = root.querySelector<HTMLElement>("[data-marquee]");
    if (track && marqueeArea) {
      const loop = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "none",
      });
      const slow = () => gsap.to(loop, { timeScale: 0.35, duration: 0.4 });
      const fast = () => gsap.to(loop, { timeScale: 1, duration: 0.4 });
      marqueeArea.addEventListener("mouseenter", slow);
      marqueeArea.addEventListener("mouseleave", fast);
      return () => {
        marqueeArea.removeEventListener("mouseenter", slow);
        marqueeArea.removeEventListener("mouseleave", fast);
      };
    }
  });

  return (
    <section ref={ref} id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading numero="03" titulo="Skills & Tecnologias" />

        {/* Contadores (derivados do portfolio.ts) */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div>
            <span
              data-count-to={totalTecnologias}
              className="block font-mono text-4xl font-bold text-gradient sm:text-5xl"
            >
              {totalTecnologias}
            </span>
            <span className="mt-1 block text-sm text-muted-soft">tecnologias</span>
          </div>
          <div>
            <span
              data-count-to={totalAreas}
              className="block font-mono text-4xl font-bold text-gradient sm:text-5xl"
            >
              {totalAreas}
            </span>
            <span className="mt-1 block text-sm text-muted-soft">áreas de atuação</span>
          </div>
        </div>

        <div
          data-skill-grid
          className="mt-10 grid gap-6 md:grid-cols-3"
          style={{ perspective: 1000 }}
        >
          {skills.map((grupo) => (
            <TiltCard
              key={grupo.categoria}
              data-skill-card
              glow="indigo"
              className="glass rounded-2xl p-6"
            >
              <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-accent-2">
                {grupo.categoria}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {grupo.itens.map((item) => (
                  <li
                    key={item}
                    data-skill-pill
                    className="rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>

        {/* Soft skills */}
        <div className="mt-10">
          <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-accent-2">
            Soft Skills
          </h3>
          <ul data-soft-grid className="flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <li
                key={s}
                data-soft-pill
                className="rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent/50"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* K4 · marquee infinito de tecnologias */}
        <div data-marquee className="marquee-mask mt-10 overflow-hidden py-2">
          <div data-marquee-track className="marquee-track gap-3">
            {[...todasTecnologias, ...todasTecnologias].map((tec, i) => (
              <span
                key={`${tec}-${i}`}
                className={`whitespace-nowrap rounded-lg border border-border px-4 py-2 font-mono text-sm ${
                  i % 3 === 2 ? "text-accent-2" : "text-muted-soft"
                }`}
              >
                {tec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
