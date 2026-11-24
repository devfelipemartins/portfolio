# Changelog

Registro das mudanças do portfólio, em ordem da mais recente para a mais antiga.
Formato inspirado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), simplificado: o projeto não usa números de versão, só datas.

## 2026-11-24

### Adicionado
- **README.md** para quem visita o repositório no GitHub: descrição, link do site, print, tecnologias, como rodar e estrutura.
- **Currículo em PDF** disponível para download no site (`public/curriculo-felipe-martins.pdf`), na versão **sem telefone**.
- **SEO e compartilhamento:** título e descrição por página, dados estruturados (JSON-LD), `robots.txt`, `sitemap.xml` e imagens de pré-visualização para redes sociais (Open Graph e Twitter).
- **Cabeçalhos de segurança** nas respostas do site (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` e `Permissions-Policy`).
- **Lint e CI:** ESLint configurado (`npm run lint`) e verificação automática no GitHub a cada push e pull request na `main` (tipos, lint e build).
- Variável opcional `NEXT_DEV_ORIGINS` para abrir o site em desenvolvimento pelo celular (explicada no GUIA.md).
- Exigência de Node.js 20.9 ou superior (`engines` no `package.json`).

### Alterado
- **Conteúdo sincronizado com o currículo:** cargo atual (Analista de Sistemas Júnior), resumo, bio, experiências, skills e soft skills atualizados em `src/data/portfolio.ts`; novas categorias de skills (Banco de Dados e Infra & Ferramentas).
- **Acessibilidade e tema claro:** ajustes de contraste e de navegação, link "Pular para o conteúdo", marcação de seção ativa no menu, respeito à preferência de menos movimento e refinamentos no tema claro.
- **Dependências:** vulnerabilidades corrigidas e pacotes atualizados.
- **GUIA.md** reescrito: todos os grupos editáveis, regra de que campo vazio esconde o item, deploy pela Vercel (push na `main` publica em cerca de 1 minuto), aviso de privacidade do currículo e problemas comuns.
- Componentes (Navbar, Hero, Contato, Projetos, Logo 3D, Tema e rolagem suave) ajustados em aparência e comportamento.

### Removido
- Projeto de exemplo com texto "TODO" e a anotação de rascunho no topo do `portfolio.ts`.
- Arquivos não usados de `public/`: ícones do template (`file`, `globe`, `next`, `vercel`, `window`), versões antigas do logo (`.obj`, `.mtl` e PNGs) e um print antigo de projeto.
- Cursor personalizado (`Cursor.tsx`).

## Antes de 2026-11-24

Histórico resumido do git:

- **2026-11-23** — Correção de vulnerabilidades das dependências.
- **2026-09-15** — Experiências, skills e soft skills atualizadas a partir do currículo; menu leva o título da seção para logo abaixo da navbar.
- **2026-09-14** — Seção de contato alinhada com "Fale comigo", print do portfólio e certificações; ajustes de UX (cursor, footer, scroll e textos); logo completo, datas e títulos das formações.
- **2026-09-14** — Primeira versão do portfólio em Next.js 16.
