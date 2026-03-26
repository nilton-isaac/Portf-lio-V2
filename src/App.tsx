import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { animate, createTimeline, stagger } from 'animejs'
import {
  BrandMark,
  BrandPoster,
  type BrandLogoKind,
  type BrandPalette,
} from './brand-system'

type PatternEmphasis = 'orthogonal' | 'orbital' | 'diagonal'

type Palette = BrandPalette & {
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

type BackgroundPattern = {
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

type BackgroundTile = {
  level: 0 | 1 | 2
  tone: 0 | 1 | 2
}

type ViewportField = {
  columns: number
  rows: number
  gap: number
}

type Manifestation = {
  id: string
  index: string
  label: string
  title: string
  posterTitle: string
  posterSubtitle: string
  subtitle: string
  summary: string
  detail: string
  stack: string[]
  cue: string
  logoMode: 'vector' | 'image'
  logoKind: BrandLogoKind
  logoAsset?: string
  palette: Palette
  backgroundPattern: BackgroundPattern
}

const synthAsset = '/synth-logo-original.png'

const navigation = [
  { label: '01. GRIMOIRE', href: '#manifesto' },
  { label: '02. MANIFESTOS', href: '#manifestacoes' },
  { label: '03. RITO', href: '#processo' },
  { label: '04. CANAL', href: '#contato' },
]

const disciplines = [
  {
    title: 'UI',
    items: ['React / TypeScript', 'Motion + branding', 'Contrast / readability'],
  },
  {
    title: 'Systems',
    items: ['Node / APIs', 'Modelagem limpa', 'Fluxos reais'],
  },
  {
    title: 'Delivery',
    items: ['Deploy simples', 'Checks uteis', 'Codigo pronto para time'],
  },
]

const manifestations: Manifestation[] = [
  {
    id: 'kanban-nine',
    index: 'I',
    label: 'workflow system',
    title: 'Kanban Nine',
    posterTitle: 'KANBAN_NINE',
    posterSubtitle: 'ops / flow / systems',
    subtitle: 'Board-driven ops com glow tecnico e leitura imediata.',
    summary: 'Workspace para squad, prioridade e fluxo sem ruido.',
    detail: 'Hover puxa o arquivo para um ciano tecnico com circuitos e brilho terminal.',
    stack: ['React', 'State', 'Ops UI'],
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
  },
  {
    id: 'icarus-type',
    index: 'II',
    label: 'language product',
    title: 'Icarus Type',
    posterTitle: 'Icarus',
    posterSubtitle: 'Type',
    subtitle: 'Eye sigil, purple wash e leitura mais editorial.',
    summary: 'Produto de ingles com musica, ritmo e identidade forte.',
    detail: 'Hover troca o site para um roxo neon com simbolo ritual e wordmark mais limpo.',
    stack: ['Next.js', 'Content', 'UX copy'],
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
  },
  {
    id: 'synth-wirenotion',
    index: 'III',
    label: 'note system',
    title: 'Synth WireNotion',
    posterTitle: 'SYNTH',
    posterSubtitle: 'WIRENOTION',
    subtitle: 'Logo original do Synth com campo cromatico e ambiente reativo.',
    summary: 'Ferramenta de notas visuais com identidade glass, glow real e fundo modular.',
    detail: 'Hover leva o ambiente para ciano-violeta com a arte original do Synth e matriz mais densa.',
    stack: ['Visual graph', 'Notes', 'Brand UI'],
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
  },
]

const rituals = [
  {
    step: '01',
    title: 'Ler',
    description: 'Comeco pelo contexto, nao pelo efeito.',
  },
  {
    step: '02',
    title: 'Estruturar',
    description: 'Componente, contrato e fluxo antes do enfeite.',
  },
  {
    step: '03',
    title: 'Polir',
    description: 'Motion, contraste e entrega pronta para time.',
  },
]

const contactLinks = [
  {
    label: 'Email',
    value: 'contato@seuportfolio.dev',
    href: 'mailto:contato@seuportfolio.dev',
  },
  {
    label: 'GitHub',
    value: 'github.com/seunome',
    href: 'https://github.com/seunome',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/seunome',
    href: 'https://www.linkedin.com/in/seunome/',
  },
]

function fract(value: number) {
  return value - Math.floor(value)
}

function hashNoise(x: number, y: number, seed: number) {
  return fract(
    Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123,
  )
}

function getViewportField(width: number, height: number): ViewportField {
  const isMobile = width < 640
  const isTablet = width < 1024
  const gap = isMobile ? 6 : isTablet ? 7 : 8
  const step = isMobile ? 28 : isTablet ? 31 : 36

  return {
    columns: Math.max(14, Math.ceil(width / step)),
    rows: Math.max(16, Math.ceil(height / step)),
    gap,
  }
}

function getPatternEmphasis(
  pattern: BackgroundPattern,
  nx: number,
  ny: number,
) {
  switch (pattern.emphasis) {
    case 'orthogonal': {
      const horizontal =
        (Math.sin(nx * pattern.flow * 12 + pattern.seed * 0.27) + 1) / 2
      const vertical =
        (Math.sin(ny * pattern.flow * 10 - pattern.seed * 0.31) + 1) / 2

      return horizontal * 0.56 + vertical * 0.44
    }
    case 'orbital': {
      const dx = nx - 0.54
      const dy = ny - 0.44
      const radius = Math.hypot(dx, dy)
      const ring =
        (Math.sin(radius * pattern.flow * 24 - pattern.seed * 0.32) + 1) / 2
      const arc =
        (Math.sin((Math.atan2(dy, dx) + Math.PI) * 1.8 + pattern.seed * 0.18) +
          1) /
        2

      return ring * 0.68 + arc * 0.32
    }
    case 'diagonal': {
      const angle = pattern.angle ?? 0.84
      const axis = nx * Math.cos(angle) + ny * Math.sin(angle)
      const wave =
        (Math.sin(axis * pattern.flow * 16 + pattern.seed * 0.24) + 1) / 2
      const counter =
        (Math.sin((nx - ny) * pattern.flow * 11 - pattern.seed * 0.18) + 1) / 2

      return wave * 0.66 + counter * 0.34
    }
  }
}

function createBackgroundPattern(
  pattern: BackgroundPattern,
  columns: number,
  rows: number,
) {
  const centers = Array.from({ length: pattern.clusterCount }, (_, index) => ({
    x:
      0.08 +
      hashNoise(pattern.seed * 0.71, index * 3.11, pattern.seed + index) * 0.84,
    y:
      0.08 +
      hashNoise(
        pattern.seed * 1.31,
        index * 4.27,
        pattern.seed + index * 2,
      ) *
        0.84,
    radius:
      pattern.clusterRadius *
      (0.72 +
        hashNoise(pattern.seed * 2.17, index * 5.21, pattern.seed + 13) * 0.8),
    weight:
      0.58 +
      hashNoise(pattern.seed * 3.17, index * 1.91, pattern.seed + 29) * 0.62,
  }))
  const voidX = 0.18 + hashNoise(pattern.seed * 1.7, 91, 7) * 0.64
  const voidY = 0.18 + hashNoise(pattern.seed * 1.9, 101, 11) * 0.58

  return Array.from({ length: columns * rows }, (_, index) => {
    const x = index % columns
    const y = Math.floor(index / columns)
    const nx = x / Math.max(1, columns - 1)
    const ny = y / Math.max(1, rows - 1)
    let cluster = 0
    let layered = 0

    centers.forEach((center) => {
      const influence =
        Math.max(0, 1 - Math.hypot(nx - center.x, ny - center.y) / center.radius) *
        center.weight

      cluster = Math.max(cluster, influence)
      layered += influence * 0.18
    })

    const emphasis = getPatternEmphasis(pattern, nx, ny)
    const grain = hashNoise(
      (x + 1) * pattern.jitter,
      (y + 1) * pattern.jitter,
      pattern.seed,
    )
    const micro = hashNoise(
      (x + 1) * (pattern.jitter + 1.42),
      (y + 1) * 2.07,
      pattern.seed + 17,
    )
    const voidDistance = Math.hypot(nx - voidX, ny - voidY)
    const voidMask =
      1 - Math.max(0, 1 - voidDistance / 0.24) * pattern.voidStrength
    const score =
      (cluster * 0.52 +
        layered * 0.16 +
        emphasis * 0.22 +
        grain * pattern.density +
        micro * 0.08) *
      voidMask

    const level: 0 | 1 | 2 =
      score >= pattern.strongCutoff
        ? 2
        : score >= pattern.softCutoff || grain > 0.986
          ? 1
          : 0
    const tone: 0 | 1 | 2 = micro > 0.78 ? 2 : micro > 0.36 ? 1 : 0

    return { level, tone } satisfies BackgroundTile
  })
}

function createAmbientPatternDataUrl(
  tiles: BackgroundTile[],
  palette: Palette,
  columns: number,
  rows: number,
) {
  const cell = 14
  const gap = 8
  const radius = 1.2
  const width = columns * cell + Math.max(0, columns - 1) * gap
  const height = rows * cell + Math.max(0, rows - 1) * gap
  const fills = [palette.primary, palette.secondary, palette.tertiary]

  const rects = tiles
    .map((tile, index) => {
      if (tile.level === 0) {
        return ''
      }

      const x = (index % columns) * (cell + gap)
      const y = Math.floor(index / columns) * (cell + gap)
      const fill = fills[tile.tone]
      const opacity = tile.level === 2 ? '0.94' : '0.38'
      const strokeOpacity = tile.level === 2 ? '0.18' : '0.1'

      return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="${radius}" fill="${fill}" fill-opacity="${opacity}" stroke="${fill}" stroke-opacity="${strokeOpacity}" />`
    })
    .join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><rect width="${width}" height="${height}" fill="transparent" />${rects}</svg>`

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function App() {
  const [activeManifestationId, setActiveManifestationId] = useState(
    manifestations[0].id,
  )
  const [viewportField, setViewportField] = useState<ViewportField>(() => {
    if (typeof window === 'undefined') {
      return { columns: 28, rows: 18, gap: 8 }
    }

    return getViewportField(window.innerWidth, window.innerHeight)
  })
  const rootRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const activeManifestation =
    manifestations.find(
      (manifestation) => manifestation.id === activeManifestationId,
    ) ?? manifestations[0]
  const activeAsset =
    activeManifestation.logoMode === 'image'
      ? activeManifestation.logoAsset
      : undefined
  const activePattern = useMemo(
    () =>
      createBackgroundPattern(
        activeManifestation.backgroundPattern,
        viewportField.columns,
        viewportField.rows,
      ),
    [activeManifestation.backgroundPattern, viewportField.columns, viewportField.rows],
  )
  const ambientPatternImage = useMemo(
    () =>
      createAmbientPatternDataUrl(
        activePattern,
        activeManifestation.palette,
        viewportField.columns,
        viewportField.rows,
      ),
    [activeManifestation.palette, activePattern, viewportField.columns, viewportField.rows],
  )

  const themeStyle: CSSProperties = {
    '--accent': activeManifestation.palette.primary,
    '--accent-secondary': activeManifestation.palette.secondary,
    '--accent-tertiary': activeManifestation.palette.tertiary,
    '--accent-soft': activeManifestation.palette.accentSoft,
    '--wash-left': activeManifestation.palette.washLeft,
    '--wash-center': activeManifestation.palette.washCenter,
    '--wash-right': activeManifestation.palette.washRight,
    '--dot-color': activeManifestation.palette.dot,
    '--tile-strong': activeManifestation.palette.tileStrong,
    '--tile-soft': activeManifestation.palette.tileSoft,
    '--tile-outline': activeManifestation.palette.tileOutline,
    '--panel-glow': activeManifestation.palette.panelGlow,
    '--preview-tint': activeManifestation.palette.previewTint,
  } as CSSProperties
  const ambientFieldStyle = {
    '--ambient-image': ambientPatternImage,
  } as CSSProperties

  useEffect(() => {
    const syncViewportField = () => {
      setViewportField(getViewportField(window.innerWidth, window.innerHeight))
    }

    syncViewportField()
    window.addEventListener('resize', syncViewportField)

    return () => {
      window.removeEventListener('resize', syncViewportField)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current

    if (!root) {
      return
    }

    const pendingNodes = root.querySelectorAll<HTMLElement>(
      '[data-animate="pending"]',
    )
    const revealAll = (nodes: NodeListOf<HTMLElement>) => {
      nodes.forEach((node) => {
        node.dataset.animate = 'ready'
      })
    }
    const shouldReduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (shouldReduceMotion) {
      revealAll(pendingNodes)
      return
    }

    const animations: Array<{ revert: () => unknown }> = []
    const heroNodes = root.querySelectorAll<HTMLElement>('[data-hero-item]')
    const sigilLines = root.querySelectorAll<HTMLElement>('[data-sigil-line]')
    const orbitNodes = root.querySelectorAll<HTMLElement>('[data-orbit]')

    revealAll(heroNodes)

    const intro = createTimeline({
      defaults: {
        duration: 860,
        ease: 'outExpo',
      },
    })

    intro
      .add(heroNodes, {
        opacity: { from: 0 },
        y: { from: 28 },
        filter: { from: 'blur(12px)' },
        delay: stagger(80),
      })
      .add(
        sigilLines,
        {
          opacity: { from: 0 },
          scaleX: { from: 0 },
          duration: 620,
          delay: stagger(80),
        },
        120,
      )

    animations.push(intro)

    const orbitAnimation = animate(orbitNodes, {
      scale: 1.05,
      opacity: 0.72,
      duration: 3400,
      ease: 'inOutSine',
      delay: stagger(420),
      alternate: true,
      loop: true,
    })

    animations.push(orbitAnimation)

    const revealedSections = new WeakSet<HTMLElement>()
    const revealSection = (section: HTMLElement) => {
      if (revealedSections.has(section)) {
        return
      }

      const items = section.querySelectorAll<HTMLElement>('[data-reveal-item]')

      if (!items.length) {
        return
      }

      revealedSections.add(section)
      revealAll(items)

      animations.push(
        animate(items, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 720,
          ease: 'outExpo',
          delay: stagger(70),
        }),
      )
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          revealSection(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((section) => {
      observer.observe(section)
    })

    requestAnimationFrame(() => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((section) => {
        const bounds = section.getBoundingClientRect()
        const isVisible =
          bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= 0

        if (isVisible) {
          revealSection(section)
          observer.unobserve(section)
        }
      })
    })

    return () => {
      observer.disconnect()

      animations
        .slice()
        .reverse()
        .forEach((animation) => {
          animation.revert()
        })

      pendingNodes.forEach((node) => {
        node.dataset.animate = 'pending'
      })
    }
  }, [])

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (shouldReduceMotion) {
      return
    }

    const previewItems = previewRef.current?.querySelectorAll<HTMLElement>(
      '[data-preview-item]',
    )
    const animations: Array<{ revert: () => unknown }> = []

    if (previewItems?.length) {
      animations.push(
        animate(previewItems, {
          opacity: { from: 0.36 },
          y: { from: 18 },
          filter: { from: 'blur(10px)' },
          duration: 640,
          ease: 'outExpo',
          delay: stagger(60),
        }),
      )
    }

    return () => {
      animations
        .slice()
        .reverse()
        .forEach((animation) => {
          animation.revert()
        })
    }
  }, [activeManifestation.id])

  return (
    <div
      ref={rootRef}
      style={themeStyle}
      className="theme-shell relative isolate overflow-x-hidden text-[var(--text)]"
    >
      <div className="theme-wash pointer-events-none fixed inset-0 -z-40" />
      <div className="theme-grid pointer-events-none fixed inset-0 -z-30" />

      <div className="ambient-pattern-layer pointer-events-none fixed inset-0 -z-20">
        <div
          key={`${activeManifestation.id}-${viewportField.columns}-${viewportField.rows}`}
          className="ambient-pattern ambient-pattern--current"
          style={ambientFieldStyle}
        />
      </div>

      <div
        data-orbit
        className="pointer-events-none absolute left-[-6rem] top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--preview-tint),transparent_70%)] opacity-35 blur-3xl"
      />
      <div
        data-orbit
        className="pointer-events-none absolute right-[-4rem] top-[26rem] h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--accent-secondary),transparent_72%)] opacity-18 blur-3xl"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 pb-4 pt-6 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <a
          href="#manifesto"
          data-hero-item
          data-animate="pending"
          className="flex items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-[var(--muted)]"
        >
          <span className="relative flex h-4 w-4 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-[var(--accent)]/45" />
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--panel-glow)]" />
          </span>
          <span className="font-mono text-[13px] text-[var(--text)]">
            SEU NOME // ARCHIVE
          </span>
        </a>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.38em] text-[var(--dim)] md:gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-hero-item
                  data-animate="pending"
                  className="transition-colors duration-300 hover:text-[var(--text)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="relative z-10">
        <section
          id="manifesto"
          className="mx-auto grid min-h-[calc(100svh-88px)] w-full max-w-[1440px] gap-14 px-6 pb-18 pt-8 md:px-10 md:pt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:px-16 lg:pb-24"
        >
          <div className="flex flex-col justify-between gap-12">
            <div className="space-y-8">
              <div
                data-hero-item
                data-animate="pending"
                className="inline-flex w-fit items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.36em] text-[var(--muted)] backdrop-blur-sm"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                junior dev / dark brand systems
              </div>

              <div className="space-y-5">
                <p
                  data-hero-item
                  data-animate="pending"
                  className="max-w-[20rem] font-mono text-[12px] uppercase tracking-[0.42em] text-[var(--accent)]"
                >
                  grid inteiro, paleta viva e codigo legivel.
                </p>

                <h1
                  data-hero-item
                  data-animate="pending"
                  className="max-w-[10ch] text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.06em] text-[var(--text)] sm:text-6xl lg:text-[6rem]"
                >
                  Marca forte. Sistema claro.
                </h1>

                <p
                  data-hero-item
                  data-animate="pending"
                  className="max-w-[34rem] text-base leading-8 text-[var(--muted)] md:text-lg"
                >
                  Portfolio para um dev junior com assinatura visual escura,
                  marcas reativas e um fundo modular que muda de clima a cada
                  projeto.
                </p>
              </div>

              <div
                data-hero-item
                data-animate="pending"
                className="flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href="#manifestacoes"
                  className="signal-line inline-flex items-center justify-center border border-[var(--accent)]/45 bg-[var(--accent-soft)] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.3em] text-[var(--text)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  abrir manifestos
                </a>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center border border-white/12 bg-black/25 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.3em] text-[var(--muted)] backdrop-blur-sm transition-colors duration-300 hover:text-[var(--text)]"
                >
                  abrir canal
                </a>
              </div>
            </div>

            <div className="grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
              {[
                'O hover muda a paleta e o padrao do fundo inteiro.',
                'Kanban e Icarus ficam vetoriais; Synth entra com arte original.',
                'O texto ficou mais curto para dar espaco ao ambiente.',
              ].map((item) => (
                <p
                  key={item}
                  data-hero-item
                  data-animate="pending"
                  className="max-w-[18rem] text-sm leading-7 text-[var(--dim)]"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div
            data-hero-item
            data-animate="pending"
            className="theme-panel relative overflow-hidden border border-white/12 bg-[rgba(9,12,10,0.72)] p-6 backdrop-blur-md md:p-8"
          >
            <div className="dither-panel absolute inset-0" />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_240px]">
              <div className="space-y-5 border-b border-white/10 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.38em] text-[var(--dim)]">
                  active signal / {activeManifestation.index}
                </div>
                <div className="signal-bar h-px w-20 bg-[var(--accent)]/80" />
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold uppercase tracking-[-0.04em] text-[var(--text)]">
                    {activeManifestation.title}
                  </h2>
                  <p className="max-w-[28rem] text-base leading-8 text-[var(--text)]">
                    {activeManifestation.subtitle}
                  </p>
                  <p className="max-w-[28rem] text-sm leading-7 text-[var(--muted)]">
                    {activeManifestation.detail}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {activeManifestation.stack.map((item) => (
                    <span
                      key={item}
                      className="border border-[var(--accent)]/24 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="preview-shell min-h-[300px] overflow-hidden border border-white/10 bg-black/55">
                <BrandPoster
                  kind={activeManifestation.logoKind}
                  palette={activeManifestation.palette}
                  className="h-full w-full"
                  title={activeManifestation.posterTitle}
                  subtitle={activeManifestation.posterSubtitle}
                  assetSrc={activeAsset}
                  assetAlt={`${activeManifestation.title} original brand`}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3 md:gap-0">
              {disciplines.map((discipline, index) => (
                <article
                  key={discipline.title}
                  className={`flex h-full flex-col gap-5 border-white/10 px-1 py-2 md:px-6 md:py-3 ${
                    index === 0 ? '' : 'md:border-l'
                  }`}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--accent)]">
                    {discipline.title}
                  </div>
                  <ul className="space-y-3 text-sm leading-7 text-[var(--muted)]">
                    {discipline.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="manifestacoes"
          data-reveal
          className="mx-auto w-full max-w-[1440px] border-t border-white/10 px-6 py-20 md:px-10 lg:px-16 lg:py-24"
        >
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-10">
              <div className="max-w-[30rem] space-y-6">
                <p
                  data-reveal-item
                  data-animate="pending"
                  className="font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]"
                >
                  02 / Manifestacoes
                </p>
                <h2
                  data-reveal-item
                  data-animate="pending"
                  className="max-w-[12ch] text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.05em] text-[var(--text)] md:text-5xl"
                >
                  Logos reais, paletas reais.
                </h2>
                <p
                  data-reveal-item
                  data-animate="pending"
                  className="text-base leading-8 text-[var(--muted)]"
                >
                  A lista agora ativa o fundo inteiro. Hover ou foco muda
                  padrao, glow, quadrados e preview de acordo com cada projeto.
                </p>
              </div>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {manifestations.map((manifestation) => {
                  const isActive = manifestation.id === activeManifestation.id
                  const assetSrc =
                    manifestation.logoMode === 'image'
                      ? manifestation.logoAsset
                      : undefined

                  return (
                    <article
                      key={manifestation.id}
                      data-reveal-item
                      data-animate="pending"
                      tabIndex={0}
                      onMouseEnter={() => setActiveManifestationId(manifestation.id)}
                      onFocus={() => setActiveManifestationId(manifestation.id)}
                      className={`project-node group grid gap-6 px-0 py-8 transition-colors duration-300 md:grid-cols-[90px_minmax(0,1fr)_220px] md:px-4 ${
                        isActive ? 'is-active' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        <BrandMark
                          kind={manifestation.logoKind}
                          palette={manifestation.palette}
                          className={
                            manifestation.logoMode === 'image'
                              ? 'h-18 w-18 overflow-hidden border border-white/10 bg-[#666b70]'
                              : 'h-18 w-18 border border-white/10 bg-black/35 p-2'
                          }
                          assetSrc={assetSrc}
                          assetAlt={`${manifestation.title} original brand`}
                        />
                        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--dim)]">
                          {manifestation.index}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-3xl font-semibold uppercase tracking-[-0.04em] text-[var(--text)] transition-transform duration-300 group-hover:translate-x-2">
                            {manifestation.title}
                          </h3>
                          <span className="border border-[var(--accent)]/24 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]">
                            {manifestation.label}
                          </span>
                        </div>
                        <p className="text-base leading-8 text-[var(--text)]">
                          {manifestation.subtitle}
                        </p>
                        <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
                          {manifestation.summary}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <ul className="space-y-3 font-mono text-[12px] uppercase tracking-[0.22em] text-[var(--text)]">
                          {manifestation.stack.map((item) => (
                            <li
                              key={item}
                              className="border-b border-white/8 pb-3 last:border-b-0 last:pb-0"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm leading-7 text-[var(--dim)]">
                          {manifestation.cue}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

            <aside
              ref={previewRef}
              data-reveal-item
              data-animate="pending"
              className="theme-panel sticky top-24 hidden h-fit overflow-hidden border border-white/12 bg-[rgba(9,12,10,0.72)] p-5 backdrop-blur-md xl:block"
            >
              <div className="dither-panel absolute inset-0 opacity-80" />

              <div className="relative space-y-5">
                <div
                  data-preview-item
                  className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--dim)]"
                >
                  <span>active preview</span>
                  <span className="text-[var(--accent)]">
                    {activeManifestation.index}
                  </span>
                </div>

                <div
                  data-preview-item
                  className="preview-shell min-h-[360px] overflow-hidden border border-white/10 bg-black/60"
                >
                  <BrandPoster
                    kind={activeManifestation.logoKind}
                    palette={activeManifestation.palette}
                    className="h-full w-full"
                    title={activeManifestation.posterTitle}
                    subtitle={activeManifestation.posterSubtitle}
                    assetSrc={activeAsset}
                    assetAlt={`${activeManifestation.title} original brand`}
                  />
                </div>

                <div data-preview-item className="space-y-3">
                  <p className="font-mono text-[12px] uppercase tracking-[0.28em] text-[var(--accent)]">
                    {activeManifestation.title}
                  </p>
                  <p className="text-sm leading-7 text-[var(--muted)]">
                    {activeManifestation.detail}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="processo"
          data-reveal
          className="mx-auto w-full max-w-[1440px] border-t border-white/10 px-6 py-20 md:px-10 lg:px-16 lg:py-24"
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="space-y-6">
              <p
                data-reveal-item
                data-animate="pending"
                className="font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]"
              >
                03 / Rito de entrega
              </p>
              <h2
                data-reveal-item
                data-animate="pending"
                className="max-w-[13ch] text-4xl font-semibold uppercase leading-[0.96] tracking-[-0.05em] text-[var(--text)] md:text-5xl"
              >
                O estranho fica na forma. O metodo fica no codigo.
              </h2>
              <p
                data-reveal-item
                data-animate="pending"
                className="max-w-xl text-base leading-8 text-[var(--muted)]"
              >
                O site continua noturno e mistico, mas agora a atmosfera mora
                num background vivo e em marcas com papel bem definido.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {rituals.map((ritual) => (
                <article
                  key={ritual.title}
                  data-reveal-item
                  data-animate="pending"
                  className="border-l border-white/10 pl-5"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--accent)]">
                    {ritual.step}
                  </p>
                  <h3 className="mt-5 text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--text)]">
                    {ritual.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {ritual.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.5fr)]">
            <div
              data-reveal-item
              data-animate="pending"
              className="space-y-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-[var(--dim)]">
                O que se prova aqui
              </p>
              <ul className="grid gap-4 text-base leading-8 text-[var(--muted)] md:grid-cols-2">
                {[
                  'Marca propria sem parecer mock aleatorio.',
                  'Hover que muda atmosfera com criterio.',
                  'Fundo global responde ao projeto ativo.',
                  'Synth entra com arte original; os outros seguem vetoriais.',
                ].map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/8 pb-4 last:border-b-0 md:last:border-b"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside
              data-reveal-item
              data-animate="pending"
              className="theme-panel border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-[var(--accent)]">
                Fundo inteiro, nao lateral
              </p>
              <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                Os quadrados agora ocupam a viewport toda com seed por projeto.
                O `Synth` sai do desenho procedural e passa a usar a arte
                dedicada.
              </p>
            </aside>
          </div>
        </section>

        <section
          id="contato"
          data-reveal
          className="mx-auto w-full max-w-[1440px] px-6 pb-20 pt-4 md:px-10 lg:px-16 lg:pb-28"
        >
          <div className="theme-panel relative overflow-hidden border border-white/12 bg-[rgba(9,12,10,0.74)] px-6 py-10 backdrop-blur-md md:px-10 md:py-14">
            <div className="dither-panel absolute inset-0 opacity-80" />
            <div className="pointer-events-none absolute right-[-8rem] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--preview-tint),transparent_70%)] blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_340px] lg:items-end">
              <div className="space-y-6">
                <p
                  data-reveal-item
                  data-animate="pending"
                  className="font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]"
                >
                  04 / Canal aberto
                </p>
                <h2
                  data-reveal-item
                  data-animate="pending"
                  className="max-w-[13ch] text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.05em] text-[var(--text)] md:text-5xl"
                >
                  O arquivo esta pronto para receber seus dados reais.
                </h2>
                <p
                  data-reveal-item
                  data-animate="pending"
                  className="max-w-2xl text-base leading-8 text-[var(--muted)]"
                >
                  Se quiser, a proxima passada pode trocar cada projeto dummy
                  pelos seus cases reais, textos finais e links definitivos.
                </p>
              </div>

              <div className="space-y-4">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noreferrer'
                        : undefined
                    }
                    data-reveal-item
                    data-animate="pending"
                    className="group flex items-center justify-between border-b border-white/10 py-4 font-mono text-[12px] uppercase tracking-[0.26em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text)]"
                  >
                    <span>{link.label}</span>
                    <span className="text-right text-[var(--text)] transition-transform duration-300 group-hover:-translate-x-1">
                      {link.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
