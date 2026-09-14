"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "./motion/gsap";
import { SunIcon, MoonIcon } from "./icons";

type Theme = "light" | "dark";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  // Sincroniza com o tema já aplicado pelo script anti-flash no <head>.
  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "dark";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* localStorage indisponível — segue sem persistir */
    }
    setTheme(next);
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

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      title={theme === "light" ? "Modo escuro" : "Modo claro"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-foreground ${className}`}
    >
      <span ref={iconRef} className="inline-flex">
        {theme === "light" ? (
          <SunIcon width={18} height={18} />
        ) : theme === "dark" ? (
          <MoonIcon width={18} height={18} />
        ) : null}
      </span>
    </button>
  );
}
