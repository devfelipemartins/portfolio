"use client";

import { formacao, certificacoes } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { gsap } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";
import { ExternalIcon } from "./icons";

export default function Education() {
  const ref = useMotion<HTMLElement>(({ root }) => {
    // F1 · fade-up escalonado dos cards de formação
    const formCol = root.querySelector<HTMLElement>("[data-formacao]");
    const cards = root.querySelectorAll<HTMLElement>("[data-formacao-card]");
    if (cards.length) {
      // fromTo + immediateRender:false: se o gatilho não disparar, os cards
      // ficam na posição natural (alinhados) em vez de presos no offset inicial.
      gsap.fromTo(
        cards,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: { trigger: formCol, start: "top 84%", once: true },
        },
      );
    }

    // F2 · draw da lista de certificações (clip-path) + marcador
    const certList = root.querySelector<HTMLElement>("[data-cert-list]");
    const rows = root.querySelectorAll<HTMLElement>("[data-cert-row]");
    const dots = root.querySelectorAll<HTMLElement>("[data-cert-dot]");
    if (rows.length) {
      const trigger = { trigger: certList, start: "top 85%", end: "top 55%", scrub: 0.4 };
      gsap.fromTo(
        rows,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", ease: "none", stagger: 0.12, scrollTrigger: trigger },
      );
      gsap.fromTo(
        dots,
        { scale: 0 },
        { scale: 1, ease: "none", stagger: 0.12, scrollTrigger: trigger },
      );
    }
  });

  return (
    <section ref={ref} id="formacao" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading numero="05" titulo="Formação & Certificações" />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Formação acadêmica */}
          <div data-formacao>
            <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-accent-2">
              Formação acadêmica
            </h3>
            <div className="space-y-4">
              {formacao.map((f, i) => (
                <div key={i} data-formacao-card className="glass card-hover rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-semibold leading-snug">{f.curso}</h4>
                    {f.status && (
                      <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent-2">
                        {f.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">{f.instituicao}</p>
                  <p className="mt-1 font-mono text-xs text-muted-soft">{f.periodo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificações */}
          <div>
            <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-accent-2">
              Certificações & cursos
            </h3>
            <ul data-cert-list className="border-t border-border">
              {certificacoes.map((c, i) => (
                <li
                  key={i}
                  data-cert-row
                  className="flex items-start gap-3 border-b border-border py-4"
                >
                  <span
                    data-cert-dot
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[17px] font-semibold leading-snug">{c.nome}</h4>
                    <p className="mt-1 text-sm text-muted">{c.emissor}</p>
                  </div>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ver credencial"
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      <ExternalIcon width={18} height={18} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
