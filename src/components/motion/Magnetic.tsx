"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";

/**
 * H7 · Botão magnético: quando o mouse entra no raio de atração, o alvo se
 * desloca na direção do cursor (deslocamento = distância × fator) e cresce um
 * pouco; ao sair do raio, volta com elasticidade.
 */
export default function Magnetic({
  children,
  radius = 170,
  factor = 0.28,
  className = "",
}: {
  children: ReactNode;
  radius?: number;
  factor?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
        const scaleTo = gsap.quickTo(el, "scale", { duration: 0.3, ease: "power3" });
        let active = false;

        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            active = true;
            xTo(dx * factor);
            yTo(dy * factor);
            scaleTo(1.04);
          } else if (active) {
            active = false;
            scaleTo(1);
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.4)",
              overwrite: true,
            });
          }
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}
