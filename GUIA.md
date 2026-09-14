# Guia do seu Portfólio

Portfólio pessoal em **Next.js 16 + React 19 + Tailwind v4**, design dark tech.

## Como editar seu conteúdo

Praticamente tudo está em **um único arquivo**:

```
src/data/portfolio.ts
```

Lá você edita:
- **perfil**: nome, cargo, headline, bio, foto
- **contatos**: e-mail, GitHub, LinkedIn, WhatsApp, currículo
- **skills**: suas tecnologias agrupadas
- **projetos**: seus trabalhos (título, descrição, tecnologias, links, print/vídeo)

Procure pelos comentários `// TODO` — são os campos que você precisa preencher.

### Adicionar imagens/prints e currículo

1. Coloque os arquivos na pasta `public/` (ex: `public/projetos/meu-projeto.png`, `public/curriculo.pdf`)
2. Referencie no `portfolio.ts` com o caminho começando em `/` (ex: `imagem: "/projetos/meu-projeto.png"`)

### Sua foto

Coloque em `public/` (ex: `public/foto.jpg`) e ajuste `foto: "/foto.jpg"` no perfil.

## Rodar localmente

```bash
npm run dev
```
Abre em http://localhost:3000

## Publicar (deploy)

O site é estático. Opções gratuitas:

1. **Vercel** (recomendado para Next.js) — https://vercel.com
2. **Netlify** — https://netlify.com
3. **GitHub Pages**

O fluxo recomendado:
1. Subir o código para um repositório no GitHub
2. Conectar o repositório na Vercel (deploy automático)
3. Comprar um domínio (ex: no https://registro.br) e conectar na Vercel

Cada `git push` atualiza o site automaticamente.
