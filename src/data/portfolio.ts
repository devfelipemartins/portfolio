/* =====================================================================
   CONTEÚDO DO PORTFÓLIO
   ---------------------------------------------------------------------
   Edite APENAS este arquivo para atualizar seus dados.
   Não precisa mexer em mais nada do código.

   Dados preenchidos a partir do seu LinkedIn. Campos marcados com TODO
   ainda precisam da sua confirmação.
   ===================================================================== */

export const perfil = {
  nome: "Felipe",
  sobrenome: "Martins",
  cargo: "Desenvolvedor Full Stack",
  // Frase curta que aparece grande no topo
  headline: "Conecto interfaces web a automações inteligentes em Python.",
  // Parágrafo de apresentação (aparece no topo, abaixo do headline)
  resumo:
    "Desenvolvedor Full Stack com foco em automação de processos com Python e aplicações web com React, Next.js e Node.js — passando também por processamento de dados (ETL) e suporte de TI.",
  // Bio maior (seção "Sobre")
  bio: [
    "Sou formado no Tecnólogo em Desenvolvimento de Sistemas pela Universidade Municipal de São Caetano do Sul (USCS) e tenho formação técnica em Desenvolvimento de Sistemas pela ETEC. Tenho interesse em desenvolvimento front-end e automação, com o objetivo de criar soluções integradas que melhorem processos e promovam resultados reais.",
    "Atualmente atuo como Desenvolvedor de Automações de Escritório na Reluz Contábil, onde otimizo processos operacionais com soluções em Python e desenvolvo aplicações e sites com tecnologias como React, Next.js e Node.js.",
    "Também realizo processos de ETL e suporte de TI (helpdesk), garantindo a eficiência e a continuidade das operações do dia a dia. Sigo em constante aprendizado, buscando novas certificações e desafios.",
  ],
  local: "Ribeirão Pires, São Paulo, Brasil",
  disponibilidade: "Aberto a novas oportunidades",
  // Caminho da foto (coloque o arquivo em /public e ajuste aqui). Deixe "" para não mostrar.
  foto: "",
  // Logo 3D em .glb (arquivo em /public). Gira sozinha e o usuário pode arrastar.
  // Deixe "" para cair no fallback (foto ou iniciais).
  logo3d: "/logo-fm.glb",
};

export const contatos = {
  email: "dev.felipemartins@gmail.com",
  github: "https://github.com/devfelipemartins",
  linkedin: "https://www.linkedin.com/in/felipe-martins-686887266/",
  whatsapp: "", // ex: "https://wa.me/5511999999999" — deixe "" para ocultar
  curriculo: "", // ex: "/curriculo.pdf" (coloque o PDF em /public) — deixe "" para ocultar
};

/* Skills agrupadas por categoria */
export const skills: { categoria: string; itens: string[] }[] = [
  {
    categoria: "Front-end",
    itens: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    categoria: "Back-end & Automação",
    itens: ["Python", "Node.js", "ETL", "Pandas", "Web Scraping", "APIs REST"],
  },
  {
    categoria: "Dados, Nuvem & Infra",
    itens: ["SQL", "AWS (Cloud Foundations)", "Docker", "Git & GitHub", "Suporte de TI (Helpdesk)"],
  },
];

/* ---------------------------------------------------------------------
   EXPERIÊNCIA PROFISSIONAL
   --------------------------------------------------------------------- */
export type Experiencia = {
  cargo: string;
  empresa: string;
  periodo: string;
  local?: string;
  descricao: string;
  tecnologias?: string[];
};

export const experiencias: Experiencia[] = [
  {
    cargo: "Desenvolvedor de Automações de Escritório",
    empresa: "Reluz Contábil",
    periodo: "Atual", // TODO: confirme o mês/ano de início (ex: "2024 – Atual")
    local: "São Paulo, Brasil",
    descricao:
      "Otimizo processos operacionais com automações em Python e desenvolvo aplicações e sites com React, Next.js e Node.js. Realizo processos de ETL (extração, transformação e carga de dados) e presto suporte de TI (helpdesk), garantindo a continuidade das operações. Efetivado após o período de experiência.",
    tecnologias: ["Python", "React", "Next.js", "Node.js", "ETL", "SQL"],
  },
];

/* ---------------------------------------------------------------------
   FORMAÇÃO ACADÊMICA
   --------------------------------------------------------------------- */
export type Formacao = {
  curso: string;
  instituicao: string;
  periodo: string;
  status?: string;
};

export const formacao: Formacao[] = [
  {
    curso: "Tecnólogo em Desenvolvimento de Sistemas",
    instituicao: "USCS – Universidade Municipal de São Caetano do Sul",
    periodo: "Jan 2024 – Jun 2026",
    status: "Concluído",
  },
  {
    curso: "Técnico em Desenvolvimento de Sistemas",
    instituicao: "ETEC de Rio Grande da Serra",
    periodo: "Jan 2021 – Dez 2023",
    status: "Concluído",
  },
];

/* ---------------------------------------------------------------------
   CERTIFICAÇÕES E CURSOS
   --------------------------------------------------------------------- */
export type Certificacao = {
  nome: string;
  emissor: string;
  link?: string;
};

export const certificacoes: Certificacao[] = [
  {
    nome: "AWS Academy Graduate – Cloud Foundations",
    emissor: "AWS Academy",
    link: "",
  },
  {
    nome: "Introduction to Cybersecurity",
    emissor: "Cisco Networking Academy",
    link: "",
  },
  {
    nome: "IT Essentials",
    emissor: "Cisco Networking Academy",
    link: "",
  },
];

/* ---------------------------------------------------------------------
   PROJETOS
   (Ainda com exemplos — me passe seus projetos reais / GitHub para eu preencher)
   --------------------------------------------------------------------- */
export type Projeto = {
  titulo: string;
  descricao: string;
  tecnologias: string[];
  github?: string;
  demo?: string; // link do site no ar
  video?: string; // link de vídeo (YouTube, Loom, etc.)
  imagem?: string; // caminho do print, ex: "/projetos/projeto1.png" (arquivo em /public/projetos)
  destaque?: boolean;
};

export const projetos: Projeto[] = [
  {
    titulo: "RELUZ Hub — Gestão de Transporte",
    descricao:
      "Sistema web para consulta e gestão de frotas de veículos junto aos órgãos reguladores (ARTESP, ANTT, EMTU, SPTrans e Cadastur). Permite cadastrar empresas, consultar a frota por CNPJ ou razão social e exportar os dados. Login corporativo via Microsoft/Office 365.",
    tecnologias: ["Next.js", "React", "TypeScript", "Python", "Tailwind CSS"],
    github: "", // repositórios privados — deixei sem link (visitantes não teriam acesso)
    demo: "", // roda em rede interna (192.168.x) — não exponha o IP publicamente
    video: "",
    imagem: "/projetos/transporte-home.jpeg",
    destaque: true,
  },
  {
    titulo: "RELUZ Hub — Gestão de Apólices",
    descricao:
      "Painel para gestão de apólices de seguro com dashboard de indicadores: total processado, vencimentos por mês, status (vigente, a vencer, vencida), ranking por seguradora e alertas de vencimento. Inclui exportação para Excel e geração de PDF.",
    tecnologias: ["Next.js", "React", "TypeScript", "Python", "Tailwind CSS"],
    github: "",
    demo: "",
    video: "",
    imagem: "/projetos/apolices-dashboard-v2.jpeg",
    destaque: true,
  },
  {
    titulo: "Automação de Processos Contábeis",
    descricao:
      "TODO: descreva uma automação real que você fez na Reluz. Ex: robô em Python que extrai dados de sistemas, processa (ETL) e alimenta relatórios automaticamente, economizando horas de trabalho manual.",
    tecnologias: ["Python", "ETL", "Pandas", "SQL"],
    github: "",
    demo: "",
    video: "",
    imagem: "",
  },
  {
    titulo: "Portfólio Pessoal",
    descricao:
      "Este próprio site. Portfólio pessoal desenvolvido em Next.js e React, com design dark responsivo, animações no scroll (GSAP + Lenis), logo 3D interativa e deploy contínuo na Vercel.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    github: "",
    demo: "",
    video: "",
    imagem: "/projetos/portfolio-home.png",
  },
];
