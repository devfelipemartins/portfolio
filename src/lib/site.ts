import { perfil } from "@/data/portfolio";

// Domínio de produção (Vercel). Pode ser sobrescrito por NEXT_PUBLIC_SITE_URL
// (precisa incluir o protocolo, ex.: https://exemplo.com).
const fallbackUrl = "https://devfelipemartins.com.br";
const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl = (
  envUrl && /^https?:\/\//.test(envUrl) ? envUrl : fallbackUrl
).replace(/\/$/, "");
export const siteHost = new URL(siteUrl).host;

export const nomeCompleto = `${perfil.nome} ${perfil.sobrenome}`;
export const siteTitle = `${nomeCompleto} | ${perfil.cargo} · Desenvolvedor Full Stack`;

// Descrição própria (120–155 caracteres), montada a partir dos dados do perfil.
export const siteDescription = `${nomeCompleto}, ${perfil.cargo}. Portfólio com projetos de automação em Python e aplicações web com React, Next.js e Node.js.`;
