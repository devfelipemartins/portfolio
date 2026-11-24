"use client";

import { useRef, useSyncExternalStore } from "react";
import { gsap } from "./motion/gsap";
import { SunIcon, MoonIcon } from "./icons";

type Theme = "light" | "dark";

// O tema vive em <html data-theme>; o script anti-flash do <head> o define
// antes da pintura. Lemos esse atributo como um "store externo" (sem setState
// em effect) e observamos mudanças nele.
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const getServerSnapshot = (): Theme => "dark";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const iconRef = useRef<HTMLSpanElement>(null);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* localStorage indisponível — segue sem persistir */
    }
    if (
      iconRef.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.fromTo(
        iconRef.current,
        { rotate: -90, scale: 0.4, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
      );
    }
  };

  const label = theme === "light" ? "Ativar modo escuro" : "Ativar modo claro";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      suppressHydrationWarning
      className={`inline-flex h-11 w-11 items-center md:h-9 md:w-9 justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-foreground ${className}`}
    >
      {/* Os dois ícones ficam no DOM; o CSS mostra o certo conforme
          html[data-theme], sem depender de estado (sem flash na hidratação). */}
      <span ref={iconRef} className="inline-flex" aria-hidden>
        <SunIcon
          width={18}
          height={18}
          className="hidden [html[data-theme=light]_&]:block"
        />
        <MoonIcon
          width={18}
          height={18}
          className="block [html[data-theme=light]_&]:hidden"
        />
      </span>
    </button>
  );
}
