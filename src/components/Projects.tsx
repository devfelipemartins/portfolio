"use client";

import Image from "next/image";
import { projetos, type Projeto } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import TiltCard from "./motion/TiltCard";
import { gsap, ScrollTrigger } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";
import { GitHubIcon, ExternalIcon, PlayIcon } from "./icons";

const destaques = projetos.filter((p) => p.destaque);
const demais = projetos.filter((p) => !p.destaque);

function CoverFallback() {
  return (
    <div
      className="relative h-full w-full"
      style={{ background: "linear-gradient(135deg, #151824, #10121a)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(420px circle at 40% 40%, rgba(34,211,238,0.18), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-sm" style={{ color: "rgba(154,161,180,0.35)" }}>
          {"</>"}
        </span>
      </div>
    </div>
  );
}

function ProjectLinks({ projeto }: { projeto: Projeto }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
      {projeto.github && (
        <a href={projeto.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground">
          <GitHubIcon width={18} height={18} /> Código
        </a>
      )}
      {projeto.demo && (
        <a href={projeto.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground">
          <ExternalIcon width={18} height={18} /> Ver online
        </a>
      )}
      {projeto.video && (
        <a href={projeto.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground">
          <PlayIcon width={18} height={18} /> Vídeo
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const ref = useMotion<HTMLElement>(({ root }) => {
    // Card(s) destaque: entram uma vez (sobem, revelam conteúdo) e ficam fixos.
    root.querySelectorAll<HTMLElement>("[data-feature-card]").forEach((card) => {
      const desc = card.querySelector<HTMLElement>("[data-feature-desc]");
      const pills = card.querySelectorAll<HTMLElement>("[data-feature-pill]");
      const progress = card.querySelector<HTMLElement>("[data-feature-progress]");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 80%", once: true },
      });
      tl.from(card, { y: 48, opacity: 0, duration: 0.8 });
      if (desc) tl.from(desc, { y: 16, opacity: 0, duration: 0.6 }, 0.2);
      if (pills.length) {
        tl.from(pills, { y: 12, opacity: 0, stagger: 0.08, duration: 0.5 }, 0.35);
      }
      if (progress) {
        tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 0.9 }, 0.2);
      }
    });

    // P3 · batch stagger da grade
    const cards = root.querySelectorAll<HTMLElement>("[data-project-card]");
    if (cards.length) {
      gsap.set(cards, { opacity: 0, y: 48 });
      ScrollTrigger.batch("[data-project-card]", {
        start: "top 86%",
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, overwrite: true }),
      });
    }
  });

  return (
    <section ref={ref} id="projetos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading numero="04" titulo="Projetos" />
        <p className="mt-4 max-w-2xl text-muted">
          Alguns dos trabalhos que desenvolvi integrando web e automação.
        </p>

        {/* Destaques (largura total, scrollytelling) */}
        {destaques.length > 0 && (
          <div className="mt-10 space-y-10">
            {destaques.map((projeto) => (
              <article
                key={projeto.titulo}
                data-feature-card
                className="glass relative overflow-hidden rounded-2xl md:flex"
              >
                {/* Capa */}
                <div className="relative aspect-video overflow-hidden md:aspect-auto md:w-1/2">
                  <div data-feature-cover-inner className="absolute inset-0">
                    {projeto.imagem ? (
                      <Image
                        src={projeto.imagem}
                        alt={projeto.titulo}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <CoverFallback />
                    )}
                  </div>
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-[13px] font-semibold text-white"
                    style={{ background: "rgba(99,102,241,0.92)" }}
                  >
                    Destaque
                  </span>
                  {/* P1 · barra de progresso interna */}
                  <div className="feature-progress absolute bottom-0 left-0 right-0">
                    <span data-feature-progress />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col p-8 md:w-1/2">
                  <h3 className="text-xl font-bold sm:text-2xl">{projeto.titulo}</h3>
                  <p
                    data-feature-desc
                    className="mt-3 flex-1 text-sm leading-relaxed text-muted"
                  >
                    {projeto.descricao}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {projeto.tecnologias.map((tec) => (
                      <li
                        key={tec}
                        data-feature-pill
                        className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent-2"
                      >
                        {tec}
                      </li>
                    ))}
                  </ul>
                  <ProjectLinks projeto={projeto} />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Demais projetos (grade) */}
        {demais.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2" style={{ perspective: 1000 }}>
            {demais.map((projeto) => (
              <TiltCard
                key={projeto.titulo}
                as="article"
                data-project-card
                glow="cyan"
                z={20}
                className="group glass flex flex-col rounded-2xl"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <div className="cover-zoom relative h-full w-full transition-transform duration-500 group-hover:scale-[1.06]">
                    {projeto.imagem ? (
                      <Image
                        src={projeto.imagem}
                        alt={projeto.titulo}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <CoverFallback />
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold">{projeto.titulo}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {projeto.descricao}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {projeto.tecnologias.map((tec) => (
                      <li
                        key={tec}
                        className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent-2"
                      >
                        {tec}
                      </li>
                    ))}
                  </ul>
                  <ProjectLinks projeto={projeto} />
                </div>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
