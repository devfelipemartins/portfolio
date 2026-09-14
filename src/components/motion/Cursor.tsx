"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";

/**
 * G3 · Cursor customizado: ponto (segue quase instantâneo) + anel (arrasta).
 * Sobre link/botão/card o anel cresce e fica cyan; o ponto some.
 * Só monta em ponteiros finos (mouse) — em touch mantém o cursor nativo.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.dataset.cursor = "custom";
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dx = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let shown = false;
    const move = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
    };

    const interactive = "a, button, .card, [data-cursor-hover]";
    const over = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest?.(interactive)) return;
      gsap.to(ring, { scale: 1.8, borderColor: "#22d3ee", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };
    const out = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest?.(interactive)) return;
      gsap.to(ring, { scale: 1, borderColor: "rgba(125,130,148,0.6)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };
    const leaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const enterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leaveWindow);
    document.addEventListener("mouseenter", enterWindow);

    return () => {
      document.documentElement.removeAttribute("data-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leaveWindow);
      document.removeEventListener("mouseenter", enterWindow);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
