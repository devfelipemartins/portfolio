"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * G1 · Scroll suave (Lenis) + integração com o ScrollTrigger.
 * Em `prefers-reduced-motion: reduce` não monta o Lenis (scroll nativo).
 */
// Move o foco do teclado para o alvo da âncora (sem rolar de novo).
function focusTarget(el: HTMLElement) {
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Monta Lenis (ou o modo nativo) conforme a preferência atual e devolve o
    // teardown; reexecutado quando o usuário muda "reduzir movimento".
    const setup = (): (() => void) => {
    if (mq.matches) {
      // Scroll nativo: o navegador já rola; só garante o foco no alvo.
      const onNativeClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
        const href = a?.getAttribute("href");
        if (!href || href === "#") return;
        try {
          const t = document.querySelector<HTMLElement>(href);
          if (t) focusTarget(t);
        } catch {
          /* hash inválido */
        }
      };
      document.addEventListener("click", onNativeClick);
      return () => document.removeEventListener("click", onNativeClick);
    }

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });

    // O Lenis passa a controlar o "relógio" do ScrollTrigger.
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Rolagem suave também nos links âncora (#sobre, #projetos, ...).
    const onClick = (e: MouseEvent) => {
      // Deixa o navegador agir em Ctrl/Cmd/Shift/Alt+clique e botão do meio.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      let target: Element | null = null;
      try {
        target = document.querySelector(href);
      } catch {
        return; // hash que não é um seletor válido
      }
      if (!target) return;
      e.preventDefault();
      // Um link pode sobrescrever o cálculo com data-scroll-offset
      // (positivo = rola mais para baixo na seção, ex.: #contato).
      const attr = anchor.getAttribute("data-scroll-offset");
      let offset: number;
      if (attr !== null) {
        offset = Number(attr);
      } else {
        // Encosta o TÍTULO da seção logo abaixo do header fixo, pulando o
        // padding-top da seção (senão o título cai ~1 tela para baixo).
        const bar = document.querySelector<HTMLElement>(".nav-inner");
        const headerH = bar ? bar.getBoundingClientRect().height : 68;
        const padTop = parseFloat(getComputedStyle(target as HTMLElement).paddingTop) || 0;
        const gap = 24; // respiro entre a navbar e o título
        offset = padTop - headerH - gap;
      }
      lenis.scrollTo(target as HTMLElement, { offset });
      focusTarget(target as HTMLElement);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
    };

    let teardown = setup();
    const onChange = () => {
      teardown();
      teardown = setup();
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      teardown();
    };
  }, []);

  return <>{children}</>;
}
