"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

export type MotionConditions = {
  /** true quando a viewport é >= 768px (libera pin, tilt, etc.) */
  desktop: boolean;
  /** true em ponteiros finos (mouse) — libera cursor/tilt */
  fine: boolean;
  /** elemento raiz do escopo (o ref retornado) */
  root: HTMLElement;
};

type Builder = (c: MotionConditions) => void | (() => void);

/**
 * Base de todas as animações: cria um escopo com `useGSAP`, envolve tudo em
 * `gsap.matchMedia` e só executa `build` quando o usuário NÃO pediu
 * "reduzir movimento". Assim, quem começa com `opacity: 0` só é escondido
 * (via `gsap.set` dentro de `build`) quando há animação de fato — em
 * `prefers-reduced-motion: reduce` nada é tocado e o conteúdo fica visível.
 *
 * Retorna o `ref` que deve ser colocado no elemento raiz da seção.
 */
export function useMotion<T extends HTMLElement = HTMLDivElement>(
  build: Builder,
  deps: unknown[] = [],
) {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
          fine: "(pointer: fine)",
        },
        (ctx) => {
          const cond = ctx.conditions as {
            reduce: boolean;
            motion: boolean;
            desktop: boolean;
            fine: boolean;
          };
          if (cond.reduce) return; // acessibilidade: nada anima
          return build({ desktop: cond.desktop, fine: cond.fine, root });
        },
      );
    },
    { scope, dependencies: deps },
  );

  return scope;
}
