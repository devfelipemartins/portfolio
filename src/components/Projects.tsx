"use client";

import { useState } from "react";
import Image from "next/image";
import { capaDoProjeto, projetos, type Projeto } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";
import { ProjectLinks } from "./ProjectLinks";
import TiltCard from "./motion/TiltCard";
import { gsap } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";
import { ChevronRightIcon } from "./icons";

const destaques = projetos.filter((p) => p.destaque);
const demais = projetos.filter((p) => !p.destaque);

function CoverFallback() {
  return (
    <div
      className="relative h-full w-full"
      style={{
        background: "linear-gradient(135deg, var(--color-surface), var(--color-background-soft))",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(420px circle at 40% 40%, color-mix(in srgb, var(--color-accent-2) 20%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <span
          className="font-mono text-sm"
          style={{ color: "color-mix(in srgb, var(--color-muted) 55%, transparent)" }}
        >
          {"</>"}
        </span>
      </div>
    </div>
  );
}

/** Botão que abre o modal; o ::after estica o clique para o card inteiro. */
function OpenButton({ projeto, onOpen, className }: { projeto: Projeto; onOpen: (p: Projeto) => void; className: string }) {
  return (
    <h3 className={className}>
      <button
        type="button"
        onClick={() => onOpen(projeto)}
        aria-haspopup="dialog"
        className="cursor-pointer text-left after:absolute after:inset-0 after:z-[1] after:content-['']"
      >
        {projeto.titulo}
      </button>
    </h3>
  );
}

function SeeMore({ projeto }: { projeto: Projeto }) {
  const n = projeto.galeria?.length ?? 0;
  return (
    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-2">
      Clique para ver mais{n > 1 ? ` · ${n} fotos` : ""}
      <ChevronRightIcon
        width={16}
        height={16}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </span>
  );
}

export default function Projects() {
  const [aberto, setAberto] = useState<Projeto | null>(null);
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

    // P3 · reveal da grade. fromTo + immediateRender:false: se o gatilho não
    // disparar (página aberta já rolada, refresh), os cards ficam visíveis na
    // posição natural em vez de presos em opacity 0.
    const cards = root.querySelectorAll<HTMLElement>("[data-project-card]");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: (i % 2) * 0.12, // escalona as colunas da mesma linha
          immediateRender: false,
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        },
      );
    });
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
              <TiltCard
                key={projeto.titulo}
                as="article"
                data-feature-card
                glow="cyan"
                z={20}
                className="group glass relative rounded-2xl md:flex"
              >
                {/* Capa */}
                <div className="relative aspect-video overflow-hidden md:aspect-auto md:w-1/2">
                  <div
                    data-feature-cover-inner
                    className="cover-zoom absolute inset-0 transition-transform duration-500 group-hover:scale-[1.06]"
                  >
                    {capaDoProjeto(projeto) ? (
                      <Image
                        src={capaDoProjeto(projeto)!}
                        alt={projeto.titulo}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <CoverFallback />
                    )}
                  </div>
                  {/* P1 · barra de progresso interna */}
                  <div className="feature-progress absolute bottom-0 left-0 right-0">
                    <span data-feature-progress />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col p-8 md:w-1/2">
                  <OpenButton
                    projeto={projeto}
                    onOpen={setAberto}
                    className="text-xl font-bold sm:text-2xl"
                  />
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
                  <SeeMore projeto={projeto} />
                  <ProjectLinks projeto={projeto} />
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {/* Demais projetos (grade) */}
        {demais.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2" style={{ perspective: 1000 }}>
            {demais.map((projeto, idx) => {
              // Se a contagem é ímpar, o último card ocupa a linha inteira
              // (layout horizontal) para não sobrar um buraco na grade.
              const largo = demais.length % 2 === 1 && idx === demais.length - 1;
              return (
              <TiltCard
                key={projeto.titulo}
                as="article"
                data-project-card
                glow="cyan"
                z={20}
                className={`group glass flex flex-col rounded-2xl ${
                  largo ? "md:col-span-2 md:flex-row" : ""
                }`}
              >
                <div
                  className={`relative aspect-video w-full overflow-hidden ${
                    largo ? "md:aspect-auto md:min-h-64 md:w-1/2" : ""
                  }`}
                >
                  <div className="cover-zoom relative h-full w-full transition-transform duration-500 group-hover:scale-[1.06]">
                    {capaDoProjeto(projeto) ? (
                      <Image
                        src={capaDoProjeto(projeto)!}
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

                <div className={`flex flex-1 flex-col p-6 ${largo ? "md:w-1/2 md:p-8" : ""}`}>
                  <OpenButton projeto={projeto} onOpen={setAberto} className="text-xl font-bold" />
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
                  <SeeMore projeto={projeto} />
                  <ProjectLinks projeto={projeto} />
                </div>
              </TiltCard>
              );
            })}
          </div>
        )}
      </div>
      {aberto && <ProjectModal projeto={aberto} onClose={() => setAberto(null)} />}
    </section>
  );
}
