import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { animate, createTimeline, stagger } from 'animejs'
import { BrandMark, BrandPoster } from './brand-system'
import { ProjectCaseView } from './components/project-case-view'
import {
  contactLinks,
  disciplines,
  manifestations,
  navigation,
  rituals,
  siteCopy,
  type BackgroundPattern,
  type Manifestation,
  type Palette,
} from './site-data'

type BackgroundTile = {
  level: 0 | 1 | 2
  tone: 0 | 1 | 2
}

type ViewportField = {
  columns: number
  rows: number
}

function getProjectFromLocation() {
  if (typeof window === 'undefined') {
    return null
  }

  const params = new URLSearchParams(window.location.search)
  const projectId = params.get('project')

  return manifestations.some((manifestation) => manifestation.id === projectId)
    ? projectId
    : null
}

function syncProjectUrl(
  projectId: string | null,
  options?: {
    replace?: boolean
    hash?: string
  },
) {
  if (typeof window === 'undefined') {
    return
  }

  const url = new URL(window.location.href)

  if (projectId) {
    url.searchParams.set('project', projectId)
  } else {
    url.searchParams.delete('project')
  }

  if (options?.hash !== undefined) {
    url.hash = options.hash
  }

  const next = `${url.pathname}${url.search}${url.hash}`

  if (options?.replace) {
    window.history.replaceState({ projectId }, '', next)
    return
  }

  window.history.pushState({ projectId }, '', next)
}

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
  const step = isMobile ? 38 : isTablet ? 46 : 54

  return {
    columns: Math.max(14, Math.ceil(width / step)),
    rows: Math.max(16, Math.ceil(height / step)),
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
    const edgeDistance = Math.min(nx, 1 - nx, ny, 1 - ny)
    const edgeBias =
      0.26 +
      Math.pow(1 - Math.min(1, edgeDistance / 0.26), 1.72) * 0.92
    const centerDistance = Math.hypot(nx - 0.5, ny - 0.46)
    const centerSuppression =
      0.34 + Math.min(1, Math.max(0, (centerDistance - 0.06) / 0.42)) * 0.66
    const score =
      (cluster * 0.52 +
        layered * 0.16 +
        emphasis * 0.22 +
        grain * pattern.density +
        micro * 0.08) *
      voidMask *
      edgeBias *
      centerSuppression

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
  const cell = 8
  const gap = 14
  const radius = 0.9
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
      const opacity = tile.level === 2 ? '0.52' : '0.14'
      const strokeOpacity = tile.level === 2 ? '0.1' : '0.04'

      return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="${radius}" fill="${fill}" fill-opacity="${opacity}" stroke="${fill}" stroke-opacity="${strokeOpacity}" />`
    })
    .join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><rect width="${width}" height="${height}" fill="transparent" />${rects}</svg>`

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function getThemeStyle(manifestation: Manifestation): CSSProperties {
  return {
    '--accent': manifestation.palette.primary,
    '--accent-secondary': manifestation.palette.secondary,
    '--accent-tertiary': manifestation.palette.tertiary,
    '--accent-soft': manifestation.palette.accentSoft,
    '--wash-left': manifestation.palette.washLeft,
    '--wash-center': manifestation.palette.washCenter,
    '--wash-right': manifestation.palette.washRight,
    '--dot-color': manifestation.palette.dot,
    '--tile-strong': manifestation.palette.tileStrong,
    '--tile-soft': manifestation.palette.tileSoft,
    '--tile-outline': manifestation.palette.tileOutline,
    '--panel-glow': manifestation.palette.panelGlow,
    '--preview-tint': manifestation.palette.previewTint,
  } as CSSProperties
}

function App() {
  const defaultManifestation = manifestations[0]
  const initialProjectId = getProjectFromLocation()
  const [activeManifestationId, setActiveManifestationId] = useState(
    initialProjectId ?? defaultManifestation.id,
  )
  const [projectViewId, setProjectViewId] = useState<string | null>(
    initialProjectId,
  )
  const [viewportField, setViewportField] = useState<ViewportField>(() => {
    if (typeof window === 'undefined') {
      return { columns: 22, rows: 18 }
    }

    return getViewportField(window.innerWidth, window.innerHeight)
  })
  const rootRef = useRef<HTMLDivElement>(null)

  const activeManifestation =
    manifestations.find(
      (manifestation) => manifestation.id === activeManifestationId,
    ) ?? defaultManifestation
  const activeAsset =
    activeManifestation.logoMode === 'image'
      ? activeManifestation.logoAsset
      : undefined
  const ambientPatternImage = useMemo(() => {
    const tiles = createBackgroundPattern(
      activeManifestation.backgroundPattern,
      viewportField.columns,
      viewportField.rows,
    )

    return createAmbientPatternDataUrl(
      tiles,
      activeManifestation.palette,
      viewportField.columns,
      viewportField.rows,
    )
  }, [activeManifestation, viewportField.columns, viewportField.rows])

  const themeStyle = getThemeStyle(activeManifestation)
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
    syncProjectUrl(projectViewId, { replace: true })

    const handlePopState = () => {
      const nextProjectId = getProjectFromLocation()

      setProjectViewId(nextProjectId)

      if (nextProjectId) {
        setActiveManifestationId(nextProjectId)
      } else {
        setActiveManifestationId(defaultManifestation.id)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [defaultManifestation.id, projectViewId])

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
    const orbitNodes = root.querySelectorAll<HTMLElement>('[data-orbit]')

    revealAll(heroNodes)

    const intro = createTimeline({
      defaults: {
        duration: 820,
        ease: 'outExpo',
      },
    })

    intro.add(heroNodes, {
      opacity: { from: 0 },
      y: { from: 24 },
      filter: { from: 'blur(12px)' },
      delay: stagger(70),
    })

    animations.push(intro)
    animations.push(
      animate(orbitNodes, {
        scale: 1.04,
        opacity: 0.68,
        duration: 3200,
        ease: 'inOutSine',
        delay: stagger(380),
        alternate: true,
        loop: true,
      }),
    )

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
          duration: 680,
          ease: 'outExpo',
          delay: stagger(60),
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
        threshold: 0.14,
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
  }, [projectViewId])

  const handleActivate = (id: string) => {
    setActiveManifestationId(id)
  }

  const openProjectView = (id: string) => {
    setActiveManifestationId(id)
    setProjectViewId(id)
    syncProjectUrl(id, { hash: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeProjectView = () => {
    setProjectViewId(null)
    syncProjectUrl(null, { hash: '#manifestacoes' })

    requestAnimationFrame(() => {
      document.getElementById('manifestacoes')?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    })
  }

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
        className="pointer-events-none absolute left-[-8rem] top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--preview-tint),transparent_72%)] opacity-40 blur-3xl"
      />
      <div
        data-orbit
        className="pointer-events-none absolute right-[-8rem] top-[24rem] h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--accent-secondary),transparent_76%)] opacity-14 blur-3xl"
      />

      <header className="relative z-20">
        <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-6 px-6 py-6 md:px-10 lg:px-16">
          {projectViewId ? (
            <>
              <button
                type="button"
                onClick={closeProjectView}
                className="inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--text)]"
              >
                <span className="inline-flex h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent)]" />
                voltar ao arquivo
              </button>

              <div className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--dim)] lg:block">
                {activeManifestation.title}
              </div>
            </>
          ) : (
            <>
              <a
                href="#manifesto"
                className="flex items-center gap-3 font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--text)]"
              >
                <span className="inline-flex h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent)]" />
                Archive
              </a>

              <nav
                aria-label="Primary"
                className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--dim)] lg:flex"
              >
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="transition-colors duration-300 hover:text-[var(--text)]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </>
          )}
        </div>
      </header>
      <main className="relative z-10">
        {projectViewId ? (
          <ProjectCaseView
            manifestation={activeManifestation}
            onBack={closeProjectView}
          />
        ) : (
          <>
        <section
          id="manifesto"
          className="mx-auto flex min-h-[calc(100svh-88px)] w-full max-w-[1480px] items-center px-6 pb-18 pt-4 md:px-10 lg:px-16"
        >
          <div className="grid w-full gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(340px,1.08fr)] xl:items-end">
            <div className="space-y-10">
              <div className="space-y-6">
                <div
                  data-hero-item
                  data-animate="pending"
                  className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--accent)]"
                >
                  {siteCopy.heroBadge}
                </div>

                <p
                  data-hero-item
                  data-animate="pending"
                  className="max-w-[34rem] text-sm leading-7 text-[var(--dim)] sm:text-[15px]"
                >
                  {siteCopy.heroEyebrow}
                </p>

                <h1
                  data-hero-item
                  data-animate="pending"
                  className="max-w-[11ch] text-5xl font-semibold leading-[0.92] tracking-[-0.065em] text-[var(--text)] sm:text-6xl xl:text-[5.9rem]"
                >
                  {siteCopy.heroTitle}
                </h1>

                <p
                  data-hero-item
                  data-animate="pending"
                  className="max-w-[38rem] text-base leading-8 text-[var(--muted)] sm:text-lg"
                >
                  {siteCopy.heroBody}
                </p>
              </div>

              <div
                data-hero-item
                data-animate="pending"
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#manifestacoes"
                  className="signal-line inline-flex items-center justify-center rounded-full border border-[var(--accent)]/32 bg-[var(--accent-soft)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  abrir projetos
                </a>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/22 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)] backdrop-blur-sm transition-colors duration-300 hover:text-[var(--text)]"
                >
                  abrir canal
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {siteCopy.heroNotes.map((item) => (
                  <p
                    key={item}
                    data-hero-item
                    data-animate="pending"
                    className="rounded-[22px] border border-white/8 bg-black/18 px-4 py-4 text-sm leading-7 text-[var(--muted)]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div
              data-hero-item
              data-animate="pending"
              className="theme-panel reading-panel relative overflow-hidden rounded-[30px] border border-white/10 px-5 py-5 sm:px-7 sm:py-7"
            >
              <div className="dither-panel absolute inset-0 opacity-40" />

              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(200px,280px)] lg:items-start">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                      active archive / {activeManifestation.index}
                    </p>
                    <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-[2.4rem]">
                      {activeManifestation.title}
                    </h2>
                    <p className="max-w-[38rem] text-base leading-8 text-[var(--muted)]">
                      {activeManifestation.detail}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {disciplines.map((discipline) => (
                      <article
                        key={discipline.title}
                        className="rounded-[22px] border border-white/8 bg-black/24 px-4 py-4"
                      >
                        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]">
                          {discipline.title}
                        </p>
                        <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                          {discipline.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="preview-shell relative min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-black/60 p-2">
                  <BrandPoster
                    kind={activeManifestation.logoKind}
                    palette={activeManifestation.palette}
                    className="h-full w-full rounded-[22px]"
                    title={activeManifestation.posterTitle}
                    subtitle={activeManifestation.posterSubtitle}
                    assetSrc={activeAsset}
                    assetAlt={`${activeManifestation.title} original brand`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="manifestacoes"
          data-reveal
          className="mx-auto w-full max-w-[1480px] border-t border-white/10 px-6 py-18 md:px-10 lg:px-16 lg:py-24"
        >
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
            <div className="space-y-8">
              <div className="max-w-[46rem] space-y-4">
                <p
                  data-reveal-item
                  data-animate="pending"
                  className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--accent)]"
                >
                  {siteCopy.manifestationEyebrow}
                </p>
                <h2
                  data-reveal-item
                  data-animate="pending"
                  className="max-w-[15ch] text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-[var(--text)] sm:text-5xl"
                >
                  {siteCopy.manifestationTitle}
                </h2>
                <p
                  data-reveal-item
                  data-animate="pending"
                  className="max-w-3xl text-base leading-8 text-[var(--muted)]"
                >
                  {siteCopy.manifestationBody}
                </p>
              </div>

              <div className="space-y-4">
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
                      className="rounded-[30px] border border-white/10 bg-black/18 px-4 py-4 sm:px-5"
                    >
                      <button
                        type="button"
                        onMouseEnter={() => handleActivate(manifestation.id)}
                        onFocus={() => handleActivate(manifestation.id)}
                        onClick={() => openProjectView(manifestation.id)}
                        className={`manifestation-toggle group grid w-full gap-5 rounded-[24px] px-2 py-2 text-left transition-colors duration-300 md:grid-cols-[90px_minmax(0,1fr)_180px] ${
                          isActive ? 'is-active' : ''
                        }`}
                      >
                        <div className="space-y-3">
                          <BrandMark
                            kind={manifestation.logoKind}
                            palette={manifestation.palette}
                            className={
                              manifestation.logoMode === 'image'
                                ? 'h-[74px] w-[74px] overflow-hidden rounded-[20px] border border-white/10 bg-[#5f666d] p-1.5'
                                : 'h-[74px] w-[74px] rounded-[20px] border border-white/10 bg-black/35 p-2'
                            }
                            assetSrc={assetSrc}
                            assetAlt={`${manifestation.title} original brand`}
                          />
                          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--dim)]">
                            {manifestation.index}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-3xl font-semibold tracking-[-0.05em] text-[var(--text)] transition-transform duration-300 group-hover:translate-x-1.5">
                              {manifestation.title}
                            </h3>
                            <span className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                              {manifestation.label}
                            </span>
                          </div>
                          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                            {manifestation.subtitle}
                          </p>
                          <p className="max-w-3xl text-[15px] leading-7 text-[var(--dim)]">
                            {manifestation.summary}
                          </p>
                        </div>

                        <div className="flex flex-col justify-between gap-4 md:items-end">
                          <div className="flex flex-wrap gap-2 md:justify-end">
                            {manifestation.stack.slice(0, 3).map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>

                          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]">
                            abrir projeto
                          </span>
                        </div>
                      </button>
                    </article>
                  )
                })}
              </div>
            </div>

            <aside
              data-reveal-item
              data-animate="pending"
              className="theme-panel reading-panel relative hidden h-fit overflow-hidden rounded-[30px] border border-white/10 px-5 py-5 xl:sticky xl:top-8 xl:block"
            >
              <div className="dither-panel absolute inset-0 opacity-35" />

              <div className="relative space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                      active preview
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--text)]">
                      {activeManifestation.title}
                    </h3>
                  </div>

                  <BrandMark
                    kind={activeManifestation.logoKind}
                    palette={activeManifestation.palette}
                    className={
                      activeManifestation.logoMode === 'image'
                        ? 'h-16 w-16 overflow-hidden rounded-[18px] border border-white/10 bg-[#5f666d] p-1.5'
                        : 'h-16 w-16 rounded-[18px] border border-white/10 bg-black/35 p-2'
                    }
                    assetSrc={activeAsset}
                    assetAlt={`${activeManifestation.title} original brand`}
                  />
                </div>

                <div className="preview-shell relative min-h-[320px] overflow-hidden rounded-[24px] border border-white/10 bg-black/55 p-2">
                  <BrandPoster
                    kind={activeManifestation.logoKind}
                    palette={activeManifestation.palette}
                    className="h-full w-full rounded-[18px]"
                    title={activeManifestation.posterTitle}
                    subtitle={activeManifestation.posterSubtitle}
                    assetSrc={activeAsset}
                    assetAlt={`${activeManifestation.title} original brand`}
                  />
                </div>

                <div className="space-y-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--dim)]">
                    {activeManifestation.cue}
                  </p>
                  <p className="text-[15px] leading-7 text-[var(--muted)]">
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
          className="mx-auto w-full max-w-[1480px] border-t border-white/10 px-6 py-18 md:px-10 lg:px-16 lg:py-24"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="space-y-5">
              <p
                data-reveal-item
                data-animate="pending"
                className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--accent)]"
              >
                {siteCopy.processEyebrow}
              </p>
              <h2
                data-reveal-item
                data-animate="pending"
                className="max-w-[13ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-[var(--text)] sm:text-5xl"
              >
                {siteCopy.processTitle}
              </h2>
              <p
                data-reveal-item
                data-animate="pending"
                className="max-w-xl text-base leading-8 text-[var(--muted)]"
              >
                {siteCopy.processBody}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {rituals.map((ritual) => (
                <article
                  key={ritual.title}
                  data-reveal-item
                  data-animate="pending"
                  className="reading-panel rounded-[24px] border border-white/10 px-5 py-5"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                    {ritual.step}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--text)]">
                    {ritual.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
                    {ritual.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
            <div
              data-reveal-item
              data-animate="pending"
              className="reading-panel rounded-[28px] border border-white/10 px-5 py-5 sm:px-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                {siteCopy.proofEyebrow}
              </p>
              <ul className="mt-5 grid gap-4 text-[15px] leading-7 text-[var(--muted)] sm:text-base sm:leading-8 md:grid-cols-2">
                {siteCopy.proofItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-[20px] border border-white/8 bg-black/20 px-4 py-4"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside
              data-reveal-item
              data-animate="pending"
              className="theme-panel reading-panel relative overflow-hidden rounded-[28px] border border-white/10 px-5 py-5"
            >
              <div className="dither-panel absolute inset-0 opacity-35" />
              <div className="relative space-y-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  {siteCopy.proofAsideTitle}
                </p>
                <p className="text-[15px] leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
                  {siteCopy.proofAsideBody}
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="contato"
          data-reveal
          className="mx-auto w-full max-w-[1480px] px-6 pb-20 pt-4 md:px-10 lg:px-16 lg:pb-28"
        >
          <div className="theme-panel reading-panel relative overflow-hidden rounded-[32px] border border-white/10 px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="dither-panel absolute inset-0 opacity-34" />
            <div className="pointer-events-none absolute right-[-6rem] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--preview-tint),transparent_70%)] blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(280px,360px)] lg:items-end">
              <div className="space-y-5">
                <p
                  data-reveal-item
                  data-animate="pending"
                  className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--accent)]"
                >
                  {siteCopy.contactEyebrow}
                </p>
                <h2
                  data-reveal-item
                  data-animate="pending"
                  className="max-w-[13ch] text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-[var(--text)] sm:text-5xl"
                >
                  {siteCopy.contactTitle}
                </h2>
                <p
                  data-reveal-item
                  data-animate="pending"
                  className="max-w-2xl text-base leading-8 text-[var(--muted)]"
                >
                  {siteCopy.contactBody}
                </p>
              </div>

              <div className="space-y-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    data-reveal-item
                    data-animate="pending"
                    className="group flex items-center justify-between rounded-[22px] border border-white/10 bg-black/22 px-4 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text)]"
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
          </>
        )}
      </main>
    </div>
  )
}

export default App
