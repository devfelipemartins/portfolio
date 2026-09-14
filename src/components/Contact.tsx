"use client";

import { useState } from "react";
import { contatos, perfil } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import TiltCard from "./motion/TiltCard";
import { gsap } from "./motion/gsap";
import { useMotion } from "./motion/useReveal";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./icons";

export default function Contact() {
  const [copiado, setCopiado] = useState(false);

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(contatos.email);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
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
        setCopiado(true);
        window.setTimeout(() => setCopiado(false), 1800);
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
    const tl = gsap.timeline({
      scrollTrigger: { trigger: h3, start: "top 84%", once: true },
    });
    gsap.set(h3, { opacity: 0, filter: "blur(16px)", y: 20 });
    gsap.set(para, { opacity: 0, y: 14 });
    tl.to(h3, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9 }, 0);
    tl.to(para, { opacity: 1, y: 0, duration: 0.7 }, 0.2);

    // C2 · cards de canal em escala (cascata com elasticidade)
    if (cards.length) {
      gsap.from(cards, {
        scale: 0.9,
        opacity: 0,
        stagger: 0.09,
        duration: 0.6,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: grid, start: "top 85%", once: true },
      });
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
                    aria-label={`Copiar e-mail: ${valor}`}
                    className={`${cardClass} cursor-pointer`}
                  >
                    {inner}
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
