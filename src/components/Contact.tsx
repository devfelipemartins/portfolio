"use client";

import { useEffect, useRef, useState } from "react";
import { contatos, perfil } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import TiltCard from "./motion/TiltCard";
import { gsap } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./icons";

export default function Contact() {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // Limpa o timeout pendente ao desmontar.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const marcarCopiado = () => {
    setCopiado(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopiado(false), 1800);
  };

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(contatos.email);
      marcarCopiado();
    } catch {
      // Fallback quando a Clipboard API não está disponível
      const ta = document.createElement("textarea");
      ta.value = contatos.email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        marcarCopiado();
      } catch {
        /* ignora */
      }
      document.body.removeChild(ta);
    }
  };

  const canais = [
    contatos.email && {
      label: "E-mail",
      valor: contatos.email,
      href: `mailto:${contatos.email}`,
      Icon: MailIcon,
      copy: true,
    },
    contatos.linkedin && {
      label: "LinkedIn",
      valor: "Vamos conectar",
      href: contatos.linkedin,
      Icon: LinkedInIcon,
    },
    contatos.github && {
      label: "GitHub",
      valor: "Veja meu código",
      href: contatos.github,
      Icon: GitHubIcon,
    },
    contatos.whatsapp && {
      label: "WhatsApp",
      valor: "Mande uma mensagem",
      href: contatos.whatsapp,
      Icon: WhatsAppIcon,
    },
  ].filter(Boolean) as {
    label: string;
    valor: string;
    href: string;
    Icon: typeof MailIcon;
    copy?: boolean;
  }[];

  const ref = useMotion<HTMLElement>(({ root }) => {
    const h3 = root.querySelector<HTMLElement>("[data-contact-title]")!;
    const para = root.querySelector<HTMLElement>("[data-contact-para]")!;
    const grid = root.querySelector<HTMLElement>("[data-contact-grid]");
    const cards = root.querySelectorAll<HTMLElement>("[data-contact-card]");

    // C1 · blur-in do título + parágrafo
    // fromTo + immediateRender:false: se o gatilho não disparar, tudo fica visível.
    const tl = gsap.timeline({
      scrollTrigger: { trigger: h3, start: "top 84%", once: true },
    });
    tl.fromTo(
      h3,
      { opacity: 0, filter: "blur(16px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9, immediateRender: false },
      0,
    );
    tl.fromTo(
      para,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, immediateRender: false },
      0.2,
    );

    // C2 · cards de canal em escala (cascata com elasticidade)
    if (cards.length) {
      gsap.fromTo(
        cards,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.09,
          duration: 0.6,
          ease: "back.out(1.6)",
          immediateRender: false,
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        },
      );
    }
  });

  return (
    <section ref={ref} id="contato" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading numero="06" titulo="Contato" />
        <div className="mt-10 glass rounded-3xl p-8 text-center sm:p-12">
          <h3 data-contact-title className="text-2xl font-bold sm:text-3xl">
            Vamos <span className="text-gradient">trabalhar juntos?</span>
          </h3>
          <p data-contact-para className="mx-auto mt-4 max-w-lg text-muted">
            Estou {perfil.disponibilidade.toLowerCase()}. Se você tem um projeto, uma
            vaga ou só quer trocar uma ideia, será um prazer conversar.
          </p>

          {/* Anuncia o resultado da cópia para leitores de tela */}
          <span role="status" aria-live="polite" className="sr-only">
            {copiado ? "E-mail copiado para a área de transferência" : ""}
          </span>

          <div data-contact-grid className="mt-10 flex flex-wrap justify-center gap-4">
            {canais.map(({ label, valor, href, Icon, copy }) => {
              const cardClass =
                "flex w-full items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5 text-left sm:w-[calc(50%-0.5rem)]";
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-2">
                    <Icon width={22} height={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{label}</span>
                    <span
                      className={`block truncate text-sm ${
                        copy && copiado ? "font-medium text-accent-2" : "text-muted"
                      }`}
                    >
                      {copy && copiado ? "Copiado!" : valor}
                    </span>
                  </span>
                </>
              );

              if (copy) {
                return (
                  <TiltCard
                    key={label}
                    as="button"
                    type="button"
                    data-contact-card
                    glow="cyan"
                    z={16}
                    onClick={copiarEmail}
                    className={`${cardClass} cursor-pointer`}
                  >
                    {inner}
                    {/* Nome acessível = texto visível + ação (sem aria-label que o substitua). */}
                    <span className="sr-only">(clique para copiar)</span>
                  </TiltCard>
                );
              }

              return (
                <TiltCard
                  key={label}
                  as="a"
                  data-contact-card
                  glow="cyan"
                  z={16}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {inner}
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
