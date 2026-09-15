"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * G1 · Scroll suave (Lenis) + integração com o ScrollTrigger.
 * Em `prefers-reduced-motion: reduce` não monta o Lenis (scroll nativo).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });

    // O Lenis passa a controlar o "relógio" do ScrollTrigger.
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Rolagem suave também nos links âncora (#sobre, #projetos, ...).
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
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
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
