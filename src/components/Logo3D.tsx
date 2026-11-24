"use client";

import { useEffect, useRef, useState, type CSSProperties, type FC } from "react";

/* <model-viewer> é um custom element; tipamos só o que usamos e "castamos"
   a string para um componente React, evitando mexer no namespace global do JSX. */
type ModelViewerProps = {
  ref?: React.Ref<HTMLElement>;
  src?: string;
  alt?: string;
  "camera-controls"?: boolean;
  "disable-pan"?: boolean;
  "disable-zoom"?: boolean;
  "interaction-prompt"?: string;
  "shadow-intensity"?: string;
  "camera-orbit"?: string;
  exposure?: string;
  loading?: string;
  style?: CSSProperties;
};

const ModelViewer = "model-viewer" as unknown as FC<ModelViewerProps>;

export default function Logo3D({ src, alt }: { src: string; alt: string }) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  // Carrega a biblioteca só no cliente (web component pesado)
  useEffect(() => {
    let active = true;
    import("@google/model-viewer").then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // Rotação automática: pausa enquanto o usuário arrasta, fora da tela, com a
  // aba oculta e com "reduzir movimento" (nesse caso a logo fica parada, mas
  // continua girável à mão via camera-controls).
  useEffect(() => {
    if (!ready) return;
    const el = ref.current as unknown as
      | (HTMLElement & {
          getCameraOrbit?: () => { theta: number; phi: number; radius: number };
          jumpCameraToGoal?: () => void;
        })
      | null;
    if (!el) return;

    const PHI0 = 75; // inclinação vertical padrão (graus)
    const RETORNO_TAU = 0.35; // suavidade do retorno da inclinação (menor = mais rápido)
    let theta = 0; // graus (giro horizontal)
    let phi = PHI0; // graus (inclinação vertical)
    let dragging = false;
    let raf = 0;
    let last = performance.now();
    const speed = 25.3; // graus/segundo

    const setOrbit = () => {
      el.setAttribute("camera-orbit", `${theta}deg ${phi}deg 105%`);
      el.jumpCameraToGoal?.();
    };

    const onDown = () => {
      dragging = true;
    };
    const onUp = () => {
      dragging = false;
      // continua exatamente de onde o usuário soltou (sem tranco)
      const o = el.getCameraOrbit?.();
      if (o) {
        theta = (o.theta * 180) / Math.PI;
        phi = (o.phi * 180) / Math.PI;
      }
      last = performance.now();
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!dragging) {
        theta = (theta - speed * dt + 360) % 360; // anti-horário
        // retorno fluido da inclinação vertical ao padrão (easing exponencial)
        phi += (PHI0 - phi) * (1 - Math.exp(-dt / RETORNO_TAU));
        setOrbit();
      }
      raf = requestAnimationFrame(tick);
    };

    // O loop só roda se: usuário não pediu "reduzir movimento", a logo está na
    // tela e a aba está visível. Caso contrário, o rAF é cancelado.
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    const update = () => {
      const shouldRun = !reduceMq.matches && inView && !document.hidden;
      if (shouldRun && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    reduceMq.addEventListener("change", update);
    update();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduceMq.removeEventListener("change", update);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [ready]);

  return (
    <div className="relative">
      {/* Brilho de fundo (halo ajustado ao redor da logo) */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-accent/25 via-accent-2/15 to-accent-3/25 blur-xl" />

      <div className="relative h-72 w-72 overflow-hidden rounded-3xl bg-transparent sm:h-80 sm:w-80">
        {/* Spinner enquanto carrega */}
        {!ready && (
          <div role="status" className="absolute inset-0 flex items-center justify-center">
            <span className="sr-only">Carregando logo 3D…</span>
            <span
              aria-hidden
              className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent-2"
            />
          </div>
        )}

        {ready && (
          <ModelViewer
            ref={ref}
            src={src}
            alt={alt}
            camera-controls
            disable-pan
            disable-zoom
            interaction-prompt="none"
            shadow-intensity="0.6"
            exposure="1"
            camera-orbit="0deg 75deg 105%"
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              cursor: "grab",
            }}
          />
        )}
      </div>
    </div>
  );
}
