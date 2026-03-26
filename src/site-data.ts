import type { BrandLogoKind, BrandPalette } from './brand-system'

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

export const navigation = [
  { label: '01. GRIMOIRE', href: '#manifesto' },
  { label: '02. MANIFESTOS', href: '#manifestacoes' },
  { label: '03. RITO', href: '#processo' },
  { label: '04. CANAL', href: '#contato' },
]

export const siteCopy = {
  heroBadge: 'junior dev / archive build',
  heroEyebrow: 'lorem ipsum, visual systems and readable code.',
  heroTitle: 'Interfaces escuras. Leitura clara.',
  heroBody:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor lacus luctus accumsan tortor posuere ac ut consequat.',
  heroNotes: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Nunc lobortis mattis aliquam faucibus purus in massa.',
    'Ut consequat semper viverra nam libero justo laoreet.',
  ],
  manifestationEyebrow: '02 / Manifestacoes',
  manifestationTitle: 'Projetos com visualizacao dedicada e leitura melhor.',
  manifestationBody:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Clique em um projeto para abrir uma visualizacao dedicada com imagens temporarias, stack e contexto.',
  processEyebrow: '03 / Rito de entrega',
  processTitle: 'Estrutura, leitura e placeholders antes do conteudo final.',
  processBody:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  proofEyebrow: 'O que se prova aqui',
  proofItems: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Nibh ipsum consequat nisl vel pretium lectus quam.',
    'Amet nulla facilisi morbi tempus iaculis urna id.',
    'Scelerisque varius morbi enim nunc faucibus a pellentesque.',
  ],
  proofAsideTitle: 'Leitura acima do ruido',
  proofAsideBody:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit amet est placerat in egestas erat imperdiet sed euismod nisi.',
  contactEyebrow: '04 / Canal aberto',
  contactTitle: 'Placeholder pronto para receber seus dados finais.',
  contactBody:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat.',
}

export const disciplines = [
  {
    title: 'UI',
    items: ['Lorem layout system', 'Readable cards', 'Motion restraint'],
  },
  {
    title: 'Systems',
    items: ['APIs and flow', 'Typed structure', 'Clean delivery'],
  },
  {
    title: 'Delivery',
    items: ['Vercel ready', 'Checks enabled', 'Mobile first'],
  },
]

export const rituals = [
  {
    step: '01',
    title: 'Contexto',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.',
  },
  {
    step: '02',
    title: 'Sistema',
    description:
      'Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi.',
  },
  {
    step: '03',
    title: 'Polimento',
    description:
      'Morbi tristique senectus et netus et malesuada fames ac turpis.',
  },
]

export const contactLinks = [
  {
    label: 'Email',
    value: 'hello@loremarchive.dev',
    href: 'mailto:hello@loremarchive.dev',
  },
  {
    label: 'GitHub',
    value: 'github.com/loremarchive',
    href: 'https://github.com/loremarchive',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/loremarchive',
    href: 'https://www.linkedin.com/in/loremarchive/',
  },
]

const synthAsset = '/synth-logo-original.png'

const loremLong =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec nam aliquam sem et tortor consequat id. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis.'

export const manifestations: Manifestation[] = [
  {
    id: 'kanban-nine',
    index: 'I',
    label: 'workflow system',
    title: 'Kanban Nine',
    posterTitle: 'KANBAN_NINE',
    posterSubtitle: 'ops / flow / systems',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    summary:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    detail:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    overview: loremLong,
    status: 'placeholder alpha',
    ctaLabel: 'abrir dossier',
    ctaHref: '#contato',
    stack: ['React', 'TypeScript', 'State', 'UI systems'],
    cue: 'cyan / circuitry / terminal',
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
    heroVisual: { src: '/mockups/kanban-hero.svg', alt: 'Kanban Nine placeholder hero' },
    gallery: [
      { src: '/mockups/kanban-queue.svg', alt: 'Kanban Nine queue mockup' },
      { src: '/mockups/kanban-metrics.svg', alt: 'Kanban Nine metrics mockup' },
      { src: '/mockups/shared-terminal.svg', alt: 'Shared terminal mockup' },
    ],
    detailSections: [
      { title: 'Contexto', body: loremLong },
      { title: 'Resultado', body: loremLong },
      { title: 'Proximos passos', body: loremLong },
    ],
  },
  {
    id: 'icarus-type',
    index: 'II',
    label: 'language product',
    title: 'Icarus Type',
    posterTitle: 'Icarus',
    posterSubtitle: 'Type',
    subtitle: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor.',
    summary:
      'Cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet.',
    detail:
      'Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris.',
    overview: loremLong,
    status: 'placeholder beta',
    ctaLabel: 'ver estrutura',
    ctaHref: '#contato',
    stack: ['Next.js', 'Content', 'Typography', 'Editorial UI'],
    cue: 'violet / sigil / editorial',
    logoMode: 'vector',
    logoKind: 'icarus-type',
    palette: {
      primary: '#f7ecff',
      secondary: '#cf79ff',
      tertiary: '#ff63d5',
      text: '#fff9ff',
      glow: 'rgba(207, 121, 255, 0.24)',
      accentSoft: 'rgba(207, 121, 255, 0.16)',
      washLeft: 'rgba(67, 20, 96, 0.26)',
      washCenter: 'rgba(12, 7, 18, 0.84)',
      washRight: 'rgba(255, 99, 213, 0.08)',
      dot: 'rgba(207, 121, 255, 0.12)',
      tileStrong: 'rgba(207, 121, 255, 0.82)',
      tileSoft: 'rgba(207, 121, 255, 0.34)',
      tileOutline: 'rgba(255, 99, 213, 0.22)',
      panelGlow: 'rgba(207, 121, 255, 0.22)',
      previewTint: 'rgba(255, 99, 213, 0.18)',
    },
    backgroundPattern: {
      seed: 23,
      density: 0.31,
      clusterCount: 9,
      clusterRadius: 0.18,
      strongCutoff: 0.79,
      softCutoff: 0.55,
      flow: 1.14,
      jitter: 1.44,
      voidStrength: 0.28,
      emphasis: 'orbital',
    },
    heroVisual: { src: '/mockups/icarus-hero.svg', alt: 'Icarus Type placeholder hero' },
    gallery: [
      { src: '/mockups/icarus-editorial.svg', alt: 'Icarus Type editorial mockup' },
      { src: '/mockups/icarus-player.svg', alt: 'Icarus Type player mockup' },
      { src: '/mockups/shared-terminal.svg', alt: 'Shared terminal mockup' },
    ],
    detailSections: [
      { title: 'Visao', body: loremLong },
      { title: 'Fluxo', body: loremLong },
      { title: 'Iteracao', body: loremLong },
    ],
  },
  {
    id: 'synth-wirenotion',
    index: 'III',
    label: 'note system',
    title: 'Synth WireNotion',
    posterTitle: 'SYNTH',
    posterSubtitle: 'WIRENOTION',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    summary:
      'Magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst.',
    detail:
      'Commodo elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
    overview: loremLong,
    status: 'placeholder concept',
    ctaLabel: 'abrir arquivo',
    ctaHref: '#contato',
    stack: ['Visual graph', 'Notes', 'Brand UI', 'System docs'],
    cue: 'teal / violet / glass',
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
    heroVisual: { src: '/mockups/synth-hero.svg', alt: 'Synth WireNotion placeholder hero' },
    gallery: [
      { src: '/mockups/synth-graph.svg', alt: 'Synth WireNotion graph mockup' },
      { src: '/mockups/synth-panels.svg', alt: 'Synth WireNotion panels mockup' },
      { src: '/mockups/shared-terminal.svg', alt: 'Shared terminal mockup' },
    ],
    detailSections: [
      { title: 'Arquivo', body: loremLong },
      { title: 'Estrutura', body: loremLong },
      { title: 'Direcao', body: loremLong },
    ],
  },
]
