"use client";

import { useRef, type ElementType, type ReactNode, type Ref } from "react";
import { gsap, useGSAP } from "./gsap";

type TiltCardProps = {
  as?: ElementType;
  glow?: "indigo" | "cyan";
  strengthX?: number;
  strengthY?: number;
  z?: number;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>;

/**
 * K3 / P4 / C3 · Card com tilt 3D + glow que segue o mouse.
 * A inclinação, a elevação (translateZ) e o brilho só existem em desktop com
 * ponteiro fino e movimento permitido. Borda/sombra do hover ficam no CSS.
 */
export default function TiltCard({
  as,
  glow = "indigo",
  strengthX = 7,
  strengthY = 6,
  z = 18,
  className = "",
  children,
  ...rest
}: TiltCardProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3" });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3" });
          const qz = gsap.quickTo(el, "z", { duration: 0.4, ease: "power3" });

          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const mx = e.clientX - r.left;
            const my = e.clientY - r.top;
            el.style.setProperty("--mx", `${mx}px`);
            el.style.setProperty("--my", `${my}px`);
            ry(((mx - r.width / 2) / (r.width / 2)) * strengthX);
            rx(-((my - r.height / 2) / (r.height / 2)) * strengthY);
            qz(z);
          };
          const onLeave = () => {
            ry(0);
            rx(0);
            qz(0);
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
          };
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      data-glow={glow}
      className={`tilt-card ${className}`}
      {...rest}
    >
      {children}
      <span className="card-glow" aria-hidden />
    </Tag>
  );
}
