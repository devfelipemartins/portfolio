"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Projeto } from "@/data/portfolio";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";
import { ProjectLinks } from "./ProjectLinks";

const navBtn =
  "absolute top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80";

/**
 * Modal do projeto: carrossel de fotos com legenda, descrição, lista de
 * recursos e tecnologias. Usa <dialog> nativo (foco preso, Esc fecha,
 * fundo inerte). Setas ←/→ e deslize no toque trocam de foto.
 */
export default function ProjectModal({
  projeto,
  onClose,
}: {
  projeto: Projeto;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const fotos = projeto.galeria ?? [];
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (fotos.length < 2) return;
      setI((cur) => (cur + delta + fotos.length) % fotos.length);
    },
    [fotos.length],
  );

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (!dlg.open) dlg.showModal();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    // Não chama dlg.close() aqui: dispararia onClose (e fecharia o modal logo
    // após abrir no StrictMode). Ao desmontar, o <dialog> sai do DOM sozinho.
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  const foto = fotos[i];

  return (
    <dialog
      ref={ref}
      data-lenis-prevent
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // clique no fundo
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="project-modal m-auto max-h-[92vh] w-[min(96vw,64rem)] overflow-y-auto rounded-2xl border border-border bg-background-soft p-0 text-foreground shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <CloseIcon />
        </button>

        {foto && (
          <div
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
          >
            <div className="relative">
              <div className="relative aspect-[1886/906] w-full overflow-hidden bg-black/40">
                {fotos.map((f, idx) => (
                  <Image
                    key={f.src}
                    src={f.src}
                    alt={idx === i ? f.legenda : ""}
                    fill
                    sizes="(min-width: 1024px) 1024px, 96vw"
                    priority={idx === 0}
                    className={`object-contain transition-opacity duration-300 motion-reduce:transition-none ${
                      idx === i ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  />
                ))}
              </div>
              {fotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Foto anterior"
                    className={`${navBtn} left-3`}
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Próxima foto"
                    className={`${navBtn} right-3`}
                  >
                    <ChevronRightIcon />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
              <p aria-live="polite" className="text-sm font-medium">
                {foto.legenda}
              </p>
              {fotos.length > 1 && (
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-xs text-muted">
                    {i + 1} / {fotos.length}
                  </span>
                  <div className="flex">
                    {fotos.map((f, idx) => (
                      <button
                        key={f.src}
                        type="button"
                        onClick={() => setI(idx)}
                        aria-label={`Ir para a foto ${idx + 1}`}
                        aria-current={idx === i}
                        className="inline-flex h-8 w-6 items-center justify-center"
                      >
                        <span
                          className={`h-2 rounded-full transition-all ${
                            idx === i ? "w-5 bg-accent-2" : "w-2 bg-muted-soft"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <h3 id="project-modal-title" className="text-xl font-bold sm:text-2xl">
            {projeto.titulo}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{projeto.descricao}</p>

          {projeto.recursos && projeto.recursos.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              {projeto.recursos.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2"
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-5 flex flex-wrap gap-2">
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
      </div>
    </dialog>
  );
}
