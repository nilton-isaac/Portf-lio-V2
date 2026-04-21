import type { BrandLogoKind, BrandPalette, TechLogoKind } from './brand-system'

export type PatternEmphasis = 'orthogonal' | 'orbital' | 'diagonal'

export type Palette = BrandPalette & {
  accentSoft: string
  washLeft: string
  washCenter: string
  washRight: string
  dot: string
  tileStrong: string
  tileSoft: string
  tileOutline: string
  panelGlow: string
  previewTint: string
}

export type BackgroundPattern = {
  seed: number
  density: number
  clusterCount: number
  clusterRadius: number
  strongCutoff: number
  softCutoff: number
  flow: number
  jitter: number
  voidStrength: number
  emphasis: PatternEmphasis
  angle?: number
}

export type ProjectVisual = {
  src: string
  alt: string
}

export type DetailSection = {
  title: string
  body: string
}

export type Manifestation = {
  id: string
  index: string
  label: string
  title: string
  posterTitle: string
  posterSubtitle: string
  subtitle: string
  summary: string
  detail: string
  overview: string
  status: string
  ctaLabel: string
  ctaHref: string
  stack: string[]
  cue: string
  logoMode: 'vector' | 'image'
  logoKind: BrandLogoKind
  logoAsset?: string
  palette: Palette
  backgroundPattern: BackgroundPattern
  heroVisual: ProjectVisual
  gallery: ProjectVisual[]
  detailSections: DetailSection[]
}

export type DisciplineItem = {
  label: string
  kind: TechLogoKind
}

export type DisciplineGroup = {
  title: string
  items: DisciplineItem[]
}

export const navigation = [
  { label: '01. PERFIL', href: '#manifesto' },
  { label: '02. PROJETOS', href: '#manifestacoes' },
  { label: '03. PROCESSO', href: '#processo' },
  { label: '04. CONTATO', href: '#contato' },
]

export const siteCopy = {
  heroBadge: 'portfolio / isaac jean rubio',
  heroEyebrow:
    'Desenvolvedor Junior na ProHound com foco em frontend, automacao e ferramentas para uso real.',
  heroTitle: 'Isaac Jean Rubio',
  heroBody:
    'Sou desenvolvedor com formacao tecnica em Eletronica e tecnologo em Analise e Desenvolvimento de Sistemas. Desde 2024 atuo na ProHound, onde comecei como auxiliar de desenvolvimento e hoje trabalho como Analista Junior, criando interfaces, automacoes e sistemas voltados a rotina real.',
  heroPanelEyebrow: 'stack / linguagens / workflow',
  heroPanelTitle: 'Tecnologias com que ja trabalhei',
  heroPanelBody:
    'Minha experiencia passa por frontend, automacao, integracao e prototipacao. Aqui esta a base de linguagens, frameworks e ferramentas que mais aparecem no meu fluxo.',
  heroPanelLinkLabel: 'github.com/nilton-isaac',
  heroPanelLinkBody:
    'Uso Git e GitHub para versionamento, organizacao do codigo e historico de projetos e estudos.',
  heroNotes: [
    'ProHound desde 2024',
    'Auxiliar de desenvolvimento -> Analista Junior',
    'Frontend, automacao e organizacao de fluxo',
  ],
  manifestationEyebrow: '02 / Projetos em foco',
  manifestationTitle: 'Projetos autorais que mostram produto, organizacao e leitura de interface.',
  manifestationBody:
    'Kanban Nine e Synth WireNotion concentram hoje o tipo de sistema que mais me interessa construir: ferramentas praticas, com estrutura clara e espaco para evolucao.',
  processEyebrow: '03 / Processo',
  processTitle: 'Problema real, estrutura clara e iteracao continua.',
  processBody:
    'Meu processo mistura leitura de contexto, modelagem de fluxo e polimento visual. A ideia e sair do rascunho rapido para uma estrutura que faca sentido no uso do dia a dia.',
  proofEyebrow: 'Base e repertorio',
  proofItems: [
    'Tecnico em Eletronica e tecnologo em Analise e Desenvolvimento de Sistemas.',
    'Experiencia profissional desde 2024 na ProHound com automacao e eficiencia energetica.',
    'Evolucao de auxiliar de desenvolvimento para Analista Junior no segundo ano.',
    'Repertorio em HTML, CSS, JavaScript, Angular, React, Next.js, Node-RED, n8n e Supabase.',
  ],
  proofAsideTitle: 'O que guia meu trabalho',
  proofAsideBody:
    'Gosto de construir interfaces legiveis, fluxos organizados e produtos que resolvam uma rotina de verdade. Meu interesse fica no encontro entre front-end, automacao, visualizacao e ferramentas de trabalho.',
  contactEyebrow: '04 / Contato',
  contactTitle: 'GitHub ativo. Contato completo em organizacao.',
  contactBody:
    'Enquanto organizo email e LinkedIn, o GitHub fica como ponto principal. Quando voce me passar os links finais, essa secao pode ser fechada em poucos minutos.',
}

export const disciplines: DisciplineGroup[] = [
  {
    title: 'Linguagens',
    items: [
      { label: 'HTML', kind: 'html' },
      { label: 'CSS', kind: 'css' },
      { label: 'JavaScript', kind: 'javascript' },
      { label: 'Python', kind: 'python' },
      { label: 'Java', kind: 'java' },
      { label: 'C++', kind: 'cplusplus' },
      { label: 'PostgreSQL', kind: 'postgresql' },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { label: 'Angular', kind: 'angular' },
      { label: 'React', kind: 'react' },
      { label: 'Next.js', kind: 'nextjs' },
      { label: 'Vite', kind: 'vite' },
      { label: 'Tailwind CSS', kind: 'tailwind' },
    ],
  },
  {
    title: 'Automacao',
    items: [
      { label: 'Node-RED', kind: 'nodered' },
      { label: 'n8n', kind: 'n8n' },
      { label: 'Supabase', kind: 'supabase' },
      { label: 'APIs', kind: 'api' },
      { label: 'Integracoes', kind: 'integrations' },
    ],
  },
  {
    title: 'Ferramentas',
    items: [
      { label: 'Git', kind: 'git' },
      { label: 'GitHub', kind: 'github' },
      { label: 'Vercel', kind: 'vercel' },
      { label: 'Tauri', kind: 'tauri' },
      { label: 'Anime.js', kind: 'animejs' },
      { label: 'Magic UI', kind: 'magicui' },
      { label: 'LM Studio', kind: 'lmstudio' },
      { label: 'Ollama', kind: 'ollama' },
    ],
  },
]

export const rituals = [
  {
    step: '01',
    title: 'Contexto',
    description:
      'Entendo a rotina, a dor e o tipo de organizacao que o sistema precisa sustentar.',
  },
  {
    step: '02',
    title: 'Sistema',
    description:
      'Desenho o fluxo principal, os estados e a leitura da interface antes de expandir escopo.',
  },
  {
    step: '03',
    title: 'Iteracao',
    description:
      'Lapido detalhes de uso, personalizacao e entrega para o produto ficar util no dia a dia.',
  },
]

export const contactLinks = [
  {
    label: 'GitHub',
    value: 'github.com/nilton-isaac',
    href: 'https://github.com/nilton-isaac',
  },
  {
    label: 'Email',
    value: 'em organizacao',
    href: '#contato',
  },
  {
    label: 'LinkedIn',
    value: 'em organizacao',
    href: '#contato',
  },
]

const synthAsset = '/synth-logo-original.png'

export const manifestations: Manifestation[] = [
  {
    id: 'kanban-nine',
    index: 'I',
    label: 'produtividade pessoal',
    title: 'Kanban Nine',
    posterTitle: 'KANBAN_NINE',
    posterSubtitle: 'scrum / flow / focus',
    subtitle:
      'Sistema pessoal de produtividade que nasceu das minhas dailies e evoluiu para um kanban gamificado e flexivel.',
    summary:
      'Une organizacao pessoal, personalizacao visual e uma estrutura inspirada em Scrum para transformar tarefas em rotina clara.',
    detail:
      'O foco esta em facilitar planejamento, priorizacao e acompanhamento sem perder personalizacao nem leveza de uso.',
    overview:
      'O Kanban Nine comecou como uma necessidade simples: anotar o que eu faria no dia. A partir disso, evoluiu para uma ferramenta pessoal com estrutura de kanban, temas inspirados em jogos e recursos para tornar a organizacao mais consistente e motivadora.',
    status: 'projeto autoral',
    ctaLabel: 'falar sobre o projeto',
    ctaHref: '#contato',
    stack: ['Kanban', 'Scrum', 'Gamificacao', 'Produtividade'],
    cue: 'cyan / focus / planning',
    logoMode: 'vector',
    logoKind: 'kanban-nine',
    palette: {
      primary: '#98f7ff',
      secondary: '#efff8f',
      tertiary: '#ff8fd9',
      text: '#ecfeff',
      glow: 'rgba(152, 247, 255, 0.24)',
      accentSoft: 'rgba(152, 247, 255, 0.16)',
      washLeft: 'rgba(18, 78, 92, 0.24)',
      washCenter: 'rgba(6, 12, 16, 0.84)',
      washRight: 'rgba(160, 255, 250, 0.08)',
      dot: 'rgba(152, 247, 255, 0.12)',
      tileStrong: 'rgba(152, 247, 255, 0.82)',
      tileSoft: 'rgba(152, 247, 255, 0.36)',
      tileOutline: 'rgba(152, 247, 255, 0.2)',
      panelGlow: 'rgba(152, 247, 255, 0.22)',
      previewTint: 'rgba(152, 247, 255, 0.18)',
    },
    backgroundPattern: {
      seed: 11,
      density: 0.34,
      clusterCount: 8,
      clusterRadius: 0.2,
      strongCutoff: 0.78,
      softCutoff: 0.53,
      flow: 1.32,
      jitter: 1.28,
      voidStrength: 0.32,
      emphasis: 'orthogonal',
    },
    heroVisual: { src: '/mockups/kanban-hero.svg', alt: 'Kanban Nine interface conceitual' },
    gallery: [
      { src: '/mockups/kanban-queue.svg', alt: 'Kanban Nine quadro principal' },
      { src: '/mockups/kanban-metrics.svg', alt: 'Kanban Nine organizacao de prioridade' },
      { src: '/mockups/shared-terminal.svg', alt: 'Kanban Nine compartilhamento de status' },
    ],
    detailSections: [
      {
        title: 'Contexto',
        body: 'Nasceu da rotina de dailies e da necessidade de registrar o que precisava ser feito de forma mais clara e mais estimulante do que uma lista solta.',
      },
      {
        title: 'Estrutura',
        body: 'Permite personalizar colunas, organizar tarefas em cards, adicionar equipes, pessoas envolvidas, subtarefas, tags, anexos, prioridade e status.',
      },
      {
        title: 'Recursos',
        body: 'Tambem inclui matriz de Eisenhower, arquivo semanal e mensagens prontas com variaveis para compartilhar atualizacoes em grupos.',
      },
    ],
  },
  {
    id: 'synth-wirenotion',
    index: 'II',
    label: 'whiteboard + notes',
    title: 'Synth WireNotion',
    posterTitle: 'SYNTH',
    posterSubtitle: 'WIRENOTION',
    subtitle:
      'Ferramenta inspirada no Excalidraw que mistura whiteboard, documentos e notas em um mesmo espaco de trabalho.',
    summary:
      'O objetivo do Synth e ir alem de uma board isolada, permitindo organizar conhecimento, diagramar fluxos e trabalhar com diferentes tipos de conteudo lado a lado.',
    detail:
      'Ele foi pensado para quem quer desenhar, mapear ideias, escrever e estruturar informacao sem quebrar o contexto entre canvas e documento.',
    overview:
      'O Synth WireNotion nasceu de uma vontade pessoal de expandir o que eu via no Excalidraw. Em vez de usar somente um whiteboard, quis montar um ambiente que juntasse diagramacao, mapas mentais, notas, graficos, tabelas e documentos em uma experiencia mais ampla.',
    status: 'conceito em evolucao',
    ctaLabel: 'falar sobre o projeto',
    ctaHref: '#contato',
    stack: ['Whiteboard', 'Notas', 'Mapas mentais', 'Documentos'],
    cue: 'teal / boards / knowledge',
    logoMode: 'image',
    logoKind: 'synth-wirenotion',
    logoAsset: synthAsset,
    palette: {
      primary: '#6ef9ff',
      secondary: '#a3b2ff',
      tertiary: '#ff75ec',
      text: '#f3fbff',
      glow: 'rgba(110, 249, 255, 0.24)',
      accentSoft: 'rgba(110, 249, 255, 0.16)',
      washLeft: 'rgba(15, 72, 88, 0.24)',
      washCenter: 'rgba(6, 9, 22, 0.84)',
      washRight: 'rgba(255, 117, 236, 0.1)',
      dot: 'rgba(110, 249, 255, 0.12)',
      tileStrong: 'rgba(110, 249, 255, 0.82)',
      tileSoft: 'rgba(163, 178, 255, 0.36)',
      tileOutline: 'rgba(255, 117, 236, 0.2)',
      panelGlow: 'rgba(110, 249, 255, 0.22)',
      previewTint: 'rgba(163, 178, 255, 0.18)',
    },
    backgroundPattern: {
      seed: 37,
      density: 0.39,
      clusterCount: 11,
      clusterRadius: 0.21,
      strongCutoff: 0.76,
      softCutoff: 0.51,
      flow: 1.58,
      jitter: 1.62,
      voidStrength: 0.2,
      emphasis: 'diagonal',
      angle: 0.84,
    },
    heroVisual: { src: '/mockups/synth-hero.svg', alt: 'Synth WireNotion interface conceitual' },
    gallery: [
      { src: '/mockups/synth-graph.svg', alt: 'Synth WireNotion area de grafos e conexoes' },
      { src: '/mockups/synth-panels.svg', alt: 'Synth WireNotion documento ao lado da board' },
      { src: '/mockups/shared-terminal.svg', alt: 'Synth WireNotion uso com diferentes paineis' },
    ],
    detailSections: [
      {
        title: 'Inspiracao',
        body: 'A referencia inicial foi o Excalidraw, principalmente pela liberdade de desenhar e diagramar sem friccao. O Synth nasce quando essa experiencia deixa de ser suficiente para o que eu queria organizar.',
      },
      {
        title: 'Estrutura',
        body: 'A proposta e usar documento e whiteboard lado a lado, permitindo criar fluxos, mapas mentais, notas, tabelas, graficos e outros registros sem separar a escrita da visualizacao.',
      },
      {
        title: 'Direcao',
        body: 'Mais do que uma board isolada, o projeto busca virar um espaco de trabalho visual para organizacao de conhecimento, exploracao de ideias e documentacao conectada.',
      },
    ],
  },
]
