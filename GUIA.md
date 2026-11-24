# Guia do seu Portfólio

Portfólio pessoal em **Next.js 16 + React 19 + Tailwind v4**, com animações (GSAP, Lenis) e logo 3D. Site no ar: https://devfelipemartins.com.br

## Como editar seu conteúdo

Praticamente tudo está em **um único arquivo**:

```
src/data/portfolio.ts
```

Abra, mude os textos entre aspas e salve. Não precisa mexer em mais nada do código.

### O que existe no arquivo

| Grupo | O que controla |
|---|---|
| `perfil` | nome, cargo, headline (frase grande do topo), resumo, bio (seção "Sobre"), local, disponibilidade, foto e logo 3D |
| `contatos` | e-mail, GitHub, LinkedIn, WhatsApp, currículo |
| `skills` | tecnologias, agrupadas por categoria (`categoria` + lista de `itens`) |
| `softSkills` | lista de habilidades comportamentais |
| `experiencias` | cargo, empresa, período, local, descrição e tecnologias de cada experiência |
| `formacao` | curso, instituição, período e status |
| `certificacoes` | nome, emissor e link (opcional) |
| `projetos` | título, descrição, tecnologias, links, print/vídeo e `destaque` |

Para **adicionar** um item (uma experiência, um projeto, uma certificação...), copie um bloco `{ ... }` existente, cole logo abaixo, separe com vírgula e edite os valores. Para **remover**, apague o bloco inteiro.

### Regra importante: campo vazio esconde o item

Se um campo opcional estiver como `""` (aspas vazias), ele **não aparece** no site, sem quebrar nada. Isso vale para:

- `contatos`: `whatsapp` e `curriculo` (o botão de currículo some se ficar vazio)
- `perfil`: `foto` e `logo3d`
- cada `projeto`: `github`, `demo`, `video` e `imagem` (o botão/print só aparece se houver valor)
- cada `certificacao`: `link`

Exemplo: para mostrar o botão do GitHub de um projeto, preencha `github: "https://github.com/devfelipemartins/nome-do-repo"`.

### Adicionar imagens/prints

1. Coloque o arquivo na pasta `public/` (ex: `public/projetos/meu-projeto.png`)
2. Referencie no `portfolio.ts` com o caminho começando em `/` (ex: `imagem: "/projetos/meu-projeto.png"`). **Sem a barra inicial a imagem não aparece.**

### Foto e logo 3D

O topo do site mostra, nesta ordem de prioridade: **logo 3D → foto → iniciais**.

- Hoje o `logo3d` está preenchido (`/logo-fm.glb`), então ele aparece e a `foto` é ignorada.
- Para mostrar a sua foto, deixe `logo3d: ""` e preencha `foto: "/foto.jpg"` (arquivo em `public/`).
- Se os dois estiverem vazios, aparecem as iniciais do seu nome.

### Currículo e privacidade (telefone)

Tudo que está em `public/` fica acessível a qualquer pessoa na internet, e o que entra no repositório fica no histórico do Git para sempre.

- O currículo publicado é `public/curriculo-felipe-martins.pdf` (configurado em `contatos.curriculo`). Ele é a versão **SEM telefone**.
- **NUNCA publique a versão com telefone** (`Curriculo_Felipe_Martins_2026.pdf`). Ela deve ficar só no seu computador, **fora** do repositório e da pasta `public/`.
- O telefone não deve aparecer em lugar nenhum do site nem do repositório (nem em textos, nem em links como `wa.me`, nem em PDFs). Por isso `whatsapp` fica vazio (`""`).
- **Para trocar o currículo**, basta substituir o arquivo em `public/` **mantendo o mesmo nome** (`curriculo-felipe-martins.pdf`). Antes de enviar, abra o PDF novo e confirme que não tem telefone.

### Texto do Google e das redes sociais

O título e a descrição que aparecem no Google e ao compartilhar o link vêm de `perfil` (cargo e resumo). Ao editar o `resumo`, você também muda esse texto.

## Rodar no seu computador

Requer **Node.js 20.9 ou superior**.

```bash
npm install     # só na primeira vez
npm run dev     # abre em http://localhost:3000
```

Outros comandos:

- `npm run build` — gera a versão de produção (bom testar antes de publicar)
- `npm start` — roda essa versão de produção
- `npm run lint` — verifica o código

### Abrir pelo celular (opcional)

Para ver o site em desenvolvimento em outro aparelho da mesma rede (`http://<ip-do-pc>:3000`):

1. Crie o arquivo `.env.local` na raiz do projeto (ele não vai para o GitHub).
2. Coloque nele o IP do seu computador, separado por vírgula se forem vários, sem porta nem `http://`:

   ```
   NEXT_DEV_ORIGINS=192.168.0.10
   ```
3. Reinicie o `npm run dev`.

Sem essa variável, só o `localhost` é liberado. Isso só vale para o modo de desenvolvimento; o site publicado não é afetado.

## Publicar (deploy)

O site é publicado na **Vercel**, com deploy automático:

1. Você edita e testa localmente.
2. Envia as mudanças para a branch `main` do GitHub (`git push`).
3. A Vercel detecta o push, gera o site novamente e publica em **cerca de 1 minuto** em https://devfelipemartins.com.br.

Não é preciso fazer nada manual na Vercel. Se o site não atualizar, veja o status do último deploy no painel da Vercel (erros de build aparecem lá). Rodar `npm run build` antes do push ajuda a descobrir o problema antes.

### Antes de publicar, confira

- [ ] Textos revisados, sem erros de digitação
- [ ] Nenhum campo com texto de rascunho ("TODO", "exemplo", etc.)
- [ ] Links testados (GitHub, LinkedIn, demos)
- [ ] Imagens aparecendo (caminho começa com `/`)
- [ ] `npm run build` passou sem erro

## Problemas comuns

- **Imagem não aparece:** confira se o arquivo está em `public/` e se o caminho começa com `/`.
- **Mudei o texto e nada mudou:** confira se salvou o arquivo; com `npm run dev` ligado a página atualiza sozinha.
- **Porta 3000 ocupada:** o Next.js sugere outra porta (ex: 3001); use o endereço que ele mostrar.
- **Erro ao salvar o `portfolio.ts`:** quase sempre falta uma vírgula, aspas ou chave `}` no bloco que você editou.
