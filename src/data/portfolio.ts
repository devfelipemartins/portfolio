/* =====================================================================
   CONTEÚDO DO PORTFÓLIO
   ---------------------------------------------------------------------
   Edite APENAS este arquivo para atualizar seus dados.
   Não precisa mexer em mais nada do código.
   ===================================================================== */

export const perfil = {
  nome: "Felipe",
  sobrenome: "Martins",
  cargo: "Desenvolvedor Fullstack",
  // Frase curta que aparece grande no topo
  headline: "Conecto interfaces web a automações inteligentes em Python.",
  // Parágrafo de apresentação (aparece no topo, abaixo do headline)
  resumo:
    "Desenvolvedor Fullstack com foco em automação de processos: back-end em Python e front-end em React, Next.js e TypeScript.",
  // Bio maior (seção "Sobre")
  bio: [
    "Sou Tecnólogo em Análise e Desenvolvimento de Sistemas pela USCS e técnico em Desenvolvimento de Sistemas pela Etec de Rio Grande da Serra. Busco oportunidades em desenvolvimento front-end, back-end ou automação.",
    "Na Reluz Contábil fui promovido de Auxiliar de Automação a Assistente de Automação. Desenvolvo sistemas que otimizam processos internos e de clientes, atuo como Product Owner dos sistemas internos e cuido da infraestrutura de deploy.",
    "Também coordeno o time de automação: distribuo demandas, acompanho entregas e reviso o trabalho. Sigo em constante aprendizado, em busca de novas certificações e desafios.",
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
  curriculo: "/curriculo-felipe-martins.pdf", // PDF em /public (versão SEM telefone) — deixe "" para ocultar
};

/* Skills agrupadas por categoria */
export const skills: { categoria: string; itens: string[] }[] = [
  {
    categoria: "Front-end",
    itens: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    categoria: "Back-end & Automação",
    itens: [
      "Python",
      "Flask",
      "Node.js",
      "Web Scraping",
      "Selenium",
      "Playwright",
      "OCR",
      "OpenCV",
      "Pandas",
      "APIs REST",
      "Integração com IA e agentes",
    ],
  },
  {
    categoria: "Banco de Dados",
    itens: ["MySQL", "PostgreSQL", "SQLite"],
  },
  {
    categoria: "Infra & Ferramentas",
    itens: [
      "Docker",
      "Docker Compose",
      "Nginx",
      "n8n",
      "Antigravity",
      "Maestri",
      "Git & GitHub",
      "Jira",
      "Microsoft 365",
      "Azure",
      "Entra ID",
      "AWS (Cloud Foundations)",
    ],
  },
];

/* Soft skills (competências comportamentais) */
export const softSkills: string[] = [
  "Liderança",
  "Delegação e acompanhamento de demandas",
  "Proatividade",
  "Organização",
  "Pontualidade",
  "Facilidade de aprendizado",
  "Comunicação",
  "Trabalho em equipe",
  "Resolução de problemas",
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
  /** Quando presente, é exibido em lista no lugar do texto corrido. */
  topicos?: string[];
  tecnologias?: string[];
};

export const experiencias: Experiencia[] = [
  {
    cargo: "Assistente de Automação",
    empresa: "Reluz Contábil",
    periodo: "Out 2026 – Atual",
    local: "São Paulo, Brasil",
    descricao:
      "Coordeno o time de automação (demandas e prazos pelo Jira, revisão de código) e atuo como Product Owner dos sistemas internos. Levanto requisitos com áreas internas e clientes e conduzo projetos da arquitetura à entrega. Integro APIs como SERPRO (Integra Contador) e InfoSimples. Mantenho o ambiente de produção: Docker Compose, Nginx, Git com submódulos e testes de recuperação de desastres. Administro Microsoft 365, Azure e Entra ID. Desenvolvo automações utilizando agentes de IA. Apresento as soluções de automação a clientes.",
    topicos: [
      "Coordeno o time de automação (demandas e prazos pelo Jira, revisão de código) e atuo como Product Owner dos sistemas internos.",
      "Levanto requisitos com áreas internas e clientes e conduzo projetos da arquitetura à entrega.",
      "Desenvolvo automações utilizando agentes de IA.",
      "Integro APIs como SERPRO (Integra Contador) e InfoSimples.",
      "Mantenho o ambiente de produção: Docker Compose, Nginx, Git com submódulos e testes de recuperação de desastres.",
      "Administro Microsoft 365, Azure e Entra ID.",
      "Apresento as soluções de automação a clientes.",
    ],
    tecnologias: [
      "Python",
      "React",
      "Next.js",
      "TypeScript",
      "IA e agentes",
      "Docker Compose",
      "Nginx",
      "Jira",
      "APIs SERPRO",
      "Microsoft 365",
    ],
  },
  {
    cargo: "Auxiliar de Automação",
    empresa: "Reluz Contábil",
    periodo: "Jan 2026 – Out 2026",
    local: "São Paulo, Brasil",
    descricao:
      "Desenvolvi sistemas de automação para processos internos, com back-end em Python (Flask) e front-end em React/Next.js, TypeScript e Tailwind CSS. Criei rotinas com web scraping (Selenium/Playwright), OCR em PDFs (pytesseract, pdfplumber, PyMuPDF, OpenCV), planilhas (pandas/openpyxl), mensagens automáticas (Twilio), tarefas agendadas (APScheduler) e IA (LLMs, agentes, engenharia de prompt), reduzindo tarefas manuais. Também atendi chamados dos colaboradores (Windows, Office e hardware).",
    tecnologias: [
      "Python",
      "Flask",
      "React",
      "Next.js",
      "TypeScript",
      "Web Scraping",
      "OCR",
      "IA e agentes",
      "APIs REST",
    ],
  },
  {
    cargo: "Técnico em Tecnologia da Informação",
    empresa: "ALLTEC",
    periodo: "Jun 2024 – Jan 2026",
    descricao:
      "Elaborei políticas de segurança e administrei os servidores da empresa. Resolvi chamados de helpdesk (remoto e presencial), com manutenção, montagem e troca de componentes e periféricos. Instalei e configurei redes locais, impressoras compartilhadas, sistemas operacionais e pacote Office. Gerenciei backups, contas de e-mail e senhas, reduzindo o risco de perda de dados.",
    tecnologias: ["Suporte de TI", "Redes", "Windows", "Backup", "Servidores"],
  },
  {
    cargo: "Estágio em Tecnologia da Informação",
    empresa: "Intermídia Publicidade",
    periodo: "Dez 2023 – Mai 2024",
    descricao:
      "Organizei e gerenciei projetos internos, contribuindo para o cumprimento dos prazos da equipe. Digitalizei e arquivei documentos, migrando arquivos físicos para armazenamento em nuvem e facilitando o acesso da equipe.",
    tecnologias: ["Suporte de TI", "Gestão de Projetos", "Cloud"],
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
    curso: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    instituicao: "USCS – Universidade Municipal de São Caetano do Sul",
    periodo: "Fev 2024 – Jul 2026",
    status: "Concluído",
  },
  {
    curso: "Ensino Médio e Técnico em Desenvolvimento de Sistemas",
    instituicao: "ETEC de Rio Grande da Serra",
    periodo: "2021 – 2023",
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
    nome: "AWS Academy Cloud Foundations",
    emissor: "Amazon Web Services (30h)",
    link: "",
  },
  {
    nome: "Conceitos Básicos de Rede",
    emissor: "Cisco (22h)",
    link: "",
  },
  {
    nome: "Introduction to Cybersecurity",
    emissor: "Cisco (6h)",
    link: "",
  },
  {
    nome: "Git e GitHub: compartilhando e colaborando em projeto",
    emissor: "Alura (8h)",
    link: "",
  },
];

/* ---------------------------------------------------------------------
   PROJETOS
   --------------------------------------------------------------------- */
export type Projeto = {
  titulo: string;
  descricao: string;
  tecnologias: string[];
  github?: string;
  demo?: string; // link do site no ar
  video?: string; // link de vídeo (YouTube, Loom, etc.)
  imagem?: string; // capa; se ausente, usa a primeira foto da galeria
  galeria?: FotoProjeto[]; // fotos exibidas no carrossel ao clicar no card
  dadosFicticios?: boolean; // exibe o aviso de LGPD no carrossel
  recursos?: string[]; // lista "O que ele faz" exibida no modal
  destaque?: boolean;
};

export type FotoProjeto = { src: string; legenda: string };

export const projetos: Projeto[] = [
  {
    titulo: "Gestão de Frotas",
    descricao:
      "Um só lugar para acompanhar a situação regulatória da frota dos clientes. Robôs entram sozinhos nos portais da ANTT, ARTESP, EMTU, SPTrans, Cadastur e Senatran, trazem veículos, documentos e pendências, e o sistema destaca o que está vencido ou perto de vencer.",
    recursos: [
      "Busca automática: cada empresa é cadastrada com o seu login nos portais dos órgãos, e os robôs trazem a frota, os documentos e as pendências de cada uma. Parte das buscas roda sozinha, em horários agendados.",
      "IPVA: a lista de veículos vem do Senatran e é conferida na SEFAZ-SP; cada veículo é marcado como Isento, Não isento ou Em análise fiscal.",
      "Vigências: dashboard com empresas a vencer em 30 dias, vencidas e vigentes, e busca por empresa ou CNPJ.",
      "Comunicação: envio de e-mails de aviso de vencimento, com seleção dos veículos e prévia antes de enviar.",
      "Cadastros: motoristas e certificados digitais guardados no sistema.",
      "Relatórios: exportação dos resultados em Excel e PDF.",
      "Acesso: login corporativo via Microsoft/Office 365.",
    ],
    tecnologias: ["Next.js","Python","PostgreSQL","Web Scraping","Agendamento de tarefas","Excel/PDF"],
    github: "", // repositório privado
    demo: "", // sistema de uso interno
    video: "",
    galeria: [
      { src: "/projetos/frotas-orgaos.webp", legenda: "Tela inicial da Gestão de Frotas: escolha do órgão regulador ou do IPVA" },
      { src: "/projetos/frotas-vigencias.webp", legenda: "Dashboard de vigências da frota (ANTT): empresas a vencer, vencidas e vigentes" },
      { src: "/projetos/frotas-empresa.webp", legenda: "Detalhe da empresa: frota, situação e vencimento de cada veículo" },
      { src: "/projetos/frotas-email.webp", legenda: "Envio de e-mail de aviso de vencimento, com os veículos selecionados e prévia" },
    ],
    dadosFicticios: true,
    destaque: true,
  },
  {
    titulo: "Gestão de Apólices",
    descricao:
      "Transforma uma pasta cheia de PDFs de seguro em um painel de decisão. Um robô lê cada apólice, mesmo com o layout diferente de cada seguradora, e o painel mostra em verde, amarelo e vermelho o que está vigente, a vencer e vencido.",
    recursos: [
      "Leitura automática: o robô extrai segurado, seguradora, corretor, veículo e período de vigência dos PDFs guardados numa pasta da rede, mesmo quando cada seguradora monta o PDF de um jeito.",
      "Semáforo de vigência: verde para vigente, amarelo para vence em até 30 dias e vermelho para vencida.",
      "Dashboard: total processado, vencimentos por mês, ranking por seguradora e alertas das apólices que vencem em 7 dias.",
      "Filtros: por seguradora, empresa, mês e situação, com um clique nos cards e gráficos.",
      "Saídas: exportação para Excel, geração de PDF e envio por e-mail, individual ou em massa por empresa.",
    ],
    tecnologias: ["Next.js","Python","Extração de PDF","Automação","Excel/PDF"],
    github: "",
    demo: "",
    video: "",
    galeria: [
      { src: "/projetos/apolices-dashboard.webp", legenda: "Dashboard de apólices: indicadores e vencimentos por mês" },
      { src: "/projetos/apolices-ranking.webp", legenda: "Dashboard de apólices: ranking por seguradora e alertas de vencimento urgentes" },
      { src: "/projetos/apolices-lista.webp", legenda: "Visão geral da lista, com filtros por status, seguradora, empresa e mês" },
      { src: "/projetos/apolices-tabela.webp", legenda: "Tabela de apólices com vigência, placa e status, com exportação e envio por e-mail" },
    ],
    dadosFicticios: true,
    destaque: true,
  },
  {
    titulo: "Consulta Domínio",
    descricao:
      "Os números do escritório contábil sem precisar abrir a Domínio. O painel lê o banco do sistema apenas para consulta, sem alterar nada, e mostra horas trabalhadas, notas fiscais, lançamentos e faturamento, conferidos com os relatórios oficiais.",
    recursos: [
      "Horas trabalhadas: de cada colaborador, por sistema (Contabilidade, Fiscal, Folha), por empresa e mês a mês. Confere com o relatório oficial da Domínio, ao segundo.",
      "Notas fiscais e lançamentos: do período, por empresa.",
      "Colaboradores ativos: no total e mês a mês.",
      "Faturamento: mensal das empresas, sem as notas canceladas, conferindo ao centavo com a declaração oficial.",
      "Visões e relatórios: agrupa por colaborador ou por empresa, com busca, ordenação e exportação para Excel e PDF.",
      "Segurança: somente leitura, sem travar a Domínio, com consultas pré-definidas (nunca SQL livre), limite de 50 mil linhas por resposta e acesso restrito ao setor Contábil por login.",
    ],
    tecnologias: ["Next.js","Python","SQL Anywhere","Docker","Firebase Auth","Somente leitura"],
    github: "",
    demo: "",
    video: "",
    galeria: [
      { src: "/projetos/dominio-consulta.webp", legenda: "Consulta Domínio: escolha da consulta e do período por competência ou datas" },
      { src: "/projetos/dominio-opcoes.webp", legenda: "Consultas disponíveis: horas no sistema, notas fiscais, lançamentos contábeis e funcionários ativos" },
      { src: "/projetos/dominio-horas-empresa.webp", legenda: "Resultado de horas no sistema agrupado por empresa, com pessoas e horas de cada uma" },
      { src: "/projetos/dominio-horas-colaborador.webp", legenda: "Resultado de horas no sistema por colaborador: dias, empresas atendidas e sistemas usados" },
    ],
    dadosFicticios: true,
    destaque: true,
  },
  {
    titulo: "Portfólio Pessoal",
    descricao:
      "Este próprio site. Portfólio pessoal desenvolvido em Next.js e React, com design responsivo e tema claro/escuro, animações no scroll (GSAP + Lenis), logo 3D interativa e deploy contínuo na Vercel.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    github: "https://github.com/devfelipemartins/portfolio",
    demo: "https://devfelipemartins.com.br",
    video: "",
    imagem: "/projetos/portfolio-home.png",
    galeria: [{ src: "/projetos/portfolio-home.png", legenda: "Página inicial do portfólio" }],
  },
];

/** Capa do card: `imagem` ou a primeira foto da galeria. */
export function capaDoProjeto(p: Projeto): string | undefined {
  return p.imagem ?? p.galeria?.[0]?.src;
}
