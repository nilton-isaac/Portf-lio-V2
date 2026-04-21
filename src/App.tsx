import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TechLogo, type TechLogoKind } from './brand-system'

gsap.registerPlugin(ScrollTrigger)

type Particle = {
  startXNorm: number
  yNorm: number
  radius: number
  speed: number
  alpha: number
  drift: number
}

type Rgb = {
  r: number
  g: number
  b: number
}

type MotionState = {
  distance: number
  velocity: number
  orangeMix: number
  glow: number
  initialWrite: number
  initialErase: number
  finalWrite: number
  titleOpacity: number
  titleY: number
  titleBlur: number
}

type StackItem = {
  label: string
  kind: TechLogoKind
  category: string
}

type BackgroundSquare = {
  left: string
  top: string
  size: string
  variant?: 'bright' | 'outline'
}

const PARTICLE_COUNT = 180
const MAX_VELOCITY = 3.3
const INITIAL_NAME = 'nilton-isaac'
const FINAL_NAME = 'Isaac Rubio'
const COOL_PARTICLE = { r: 214, g: 220, b: 228 }
const WARM_PARTICLE = { r: 255, g: 122, b: 26 }
const STACK_FILTERS = [
  'Todos',
  'Linguagens',
  'Frameworks',
  'Orquestracao',
  'Ferramentas',
]
const STACK_ITEMS: StackItem[] = [
  { label: 'HTML5', kind: 'html', category: 'linguagens' },
  { label: 'CSS3', kind: 'css', category: 'linguagens' },
  { label: 'JavaScript', kind: 'javascript', category: 'linguagens' },
  { label: 'React', kind: 'react', category: 'frameworks' },
  { label: 'Next.js', kind: 'nextjs', category: 'frameworks' },
  { label: 'Tailwind', kind: 'tailwind', category: 'frameworks' },
  { label: 'Vite', kind: 'vite', category: 'frameworks' },
  { label: 'GSAP', kind: 'gsap', category: 'frameworks' },
  { label: 'Java', kind: 'java', category: 'linguagens' },
  { label: 'Python', kind: 'python', category: 'linguagens' },
  { label: 'PostgreSQL', kind: 'postgresql', category: 'ferramentas' },
  { label: 'Supabase', kind: 'supabase', category: 'ferramentas' },
  { label: 'n8n', kind: 'n8n', category: 'orquestracao' },
  { label: 'Node-RED', kind: 'nodered', category: 'orquestracao' },
]
const CATALOG_SQUARES: BackgroundSquare[] = [
  { left: '8%', top: '16%', size: '54px', variant: 'outline' },
  { left: '16%', top: '29%', size: '36px' },
  { left: '22%', top: '60%', size: '66px' },
  { left: '31%', top: '18%', size: '72px', variant: 'bright' },
  { left: '39%', top: '74%', size: '42px', variant: 'outline' },
  { left: '54%', top: '22%', size: '58px' },
  { left: '62%', top: '61%', size: '92px', variant: 'bright' },
  { left: '71%', top: '35%', size: '48px' },
  { left: '79%', top: '17%', size: '34px', variant: 'outline' },
  { left: '84%', top: '56%', size: '64px' },
  { left: '88%', top: '73%', size: '44px', variant: 'bright' },
  { left: '11%', top: '77%', size: '52px' },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount
}

function wrap(value: number, length: number) {
  return ((value % length) + length) % length
}

function rgba(color: Rgb, alpha: number) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
}

function mixColor(start: Rgb, end: Rgb, amount: number): Rgb {
  return {
    r: Math.round(lerp(start.r, end.r, amount)),
    g: Math.round(lerp(start.g, end.g, amount)),
    b: Math.round(lerp(start.b, end.b, amount)),
  }
}

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    startXNorm: 0.35 + Math.random() * 2.05,
    yNorm: Math.random(),
    radius: Math.random() * 5.8 + 0.9,
    speed: 0.72 + Math.random() * 1.45,
    alpha: 0.18 + Math.random() * 0.48,
    drift: Math.random() * Math.PI * 2,
  })) satisfies Particle[]
}

function getDisplayName(state: MotionState) {
  if (state.finalWrite > 0) {
    const length = Math.max(1, Math.round(state.finalWrite * FINAL_NAME.length))

    return FINAL_NAME.slice(0, length)
  }

  if (state.initialErase > 0) {
    const remaining = Math.max(
      0,
      INITIAL_NAME.length - Math.round(state.initialErase * INITIAL_NAME.length),
    )

    return INITIAL_NAME.slice(0, remaining)
  }

  if (state.initialWrite > 0) {
    const length = Math.max(1, Math.round(state.initialWrite * INITIAL_NAME.length))

    return INITIAL_NAME.slice(0, length)
  }

  return ''
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const storyRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const catalogZoneRef = useRef<HTMLDivElement>(null)
  const catalogSurfaceRef = useRef<HTMLDivElement>(null)
  const catalogGlowRef = useRef<HTMLDivElement>(null)
  const catalogSquaresRef = useRef<HTMLDivElement>(null)
  const catalogNumberRef = useRef<HTMLDivElement>(null)
  const catalogHeaderRef = useRef<HTMLDivElement>(null)
  const catalogFiltersRef = useRef<HTMLDivElement>(null)
  const catalogCardsRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const progressLabelRef = useRef<HTMLSpanElement>(null)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('scroll-locked', !introComplete)
    document.body.classList.toggle('scroll-locked', !introComplete)

    return () => {
      document.documentElement.classList.remove('scroll-locked')
      document.body.classList.remove('scroll-locked')
    }
  }, [introComplete])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    let width = window.innerWidth
    let height = window.innerHeight
    const particles = createParticles()
    const motion: MotionState = {
      distance: reduceMotion ? width * 2.9 : 0,
      velocity: 0,
      orangeMix: reduceMotion ? 1 : 0,
      glow: reduceMotion ? 1 : 0,
      initialWrite: reduceMotion ? 0 : 0,
      initialErase: reduceMotion ? 0 : 0,
      finalWrite: reduceMotion ? 1 : 0,
      titleOpacity: reduceMotion ? 1 : 0,
      titleY: reduceMotion ? 0 : 26,
      titleBlur: reduceMotion ? 0 : 14,
    }
    let frameId = 0
    let introTimeline: gsap.core.Timeline | null = null
    let lastFrameTime = performance.now()

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const render = (now: number) => {
      const deltaSeconds = Math.min((now - lastFrameTime) / 1000, 0.05)
      lastFrameTime = now
      motion.distance += motion.velocity * deltaSeconds * width

      const speedPhase = clamp(motion.velocity / MAX_VELOCITY, 0, 1)

      context.fillStyle = '#050505'
      context.fillRect(0, 0, width, height)

      if (motion.glow > 0) {
        const glow = context.createRadialGradient(
          width * 0.76,
          height * 0.48,
          0,
          width * 0.76,
          height * 0.48,
          Math.max(width, height) * 0.74,
        )
        glow.addColorStop(0, rgba(WARM_PARTICLE, 0.18 * motion.glow))
        glow.addColorStop(0.44, rgba(WARM_PARTICLE, 0.06 * motion.glow))
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        context.fillStyle = glow
        context.fillRect(0, 0, width, height)
      }

      particles.forEach((particle) => {
        const y =
          particle.yNorm * height +
          Math.sin(now * 0.0013 + particle.drift) *
            (height * 0.0024 * (0.22 + speedPhase) * particle.speed)
        const laneLength = width * (1.95 + particle.speed * 1.06)
        const travelOffset = motion.distance * (0.88 + particle.speed * 0.54)
        const wrappedPosition = wrap(
          particle.startXNorm * laneLength - travelOffset,
          laneLength,
        )

        const stretch =
          particle.radius *
          lerp(1, 18.5, speedPhase) *
          (0.9 + particle.speed * 0.16)
        const thickness = particle.radius * lerp(1, 0.22, speedPhase)
        const color = mixColor(COOL_PARTICLE, WARM_PARTICLE, motion.orangeMix)

        ;[
          wrappedPosition - stretch * 1.4,
          wrappedPosition - laneLength - stretch * 1.4,
        ].forEach((x) => {
          if (x + stretch < 0 || x - stretch > width) {
            return
          }

          context.beginPath()
          context.ellipse(x, y, stretch, thickness, 0, 0, Math.PI * 2)

          if (speedPhase < 0.06) {
            context.fillStyle = rgba(color, particle.alpha)
          } else {
            const gradient = context.createLinearGradient(
              x - stretch * 1.28,
              y,
              x + particle.radius,
              y,
            )

            gradient.addColorStop(0, rgba(color, 0))
            gradient.addColorStop(0.35, rgba(color, particle.alpha * 0.28))
            gradient.addColorStop(1, rgba(color, particle.alpha))
            context.fillStyle = gradient
          }

          context.shadowColor = rgba(color, 0.12 + motion.glow * 0.24)
          context.shadowBlur = lerp(0, 18, motion.glow)
          context.fill()
          context.shadowBlur = 0
        })
      })

      if (titleRef.current) {
        const text = getDisplayName(motion)

        titleRef.current.textContent = text
        titleRef.current.style.opacity = `${motion.titleOpacity}`
        titleRef.current.style.transform = `translate3d(0, ${motion.titleY}px, 0) scale(${lerp(
          0.985,
          1,
          motion.titleOpacity,
        )})`
        titleRef.current.style.filter = `blur(${motion.titleBlur}px)`
      }

      frameId = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduceMotion) {
      setIntroComplete(true)
    } else {
      introTimeline = gsap.timeline({
        onComplete: () => {
          setIntroComplete(true)
        },
      })

      introTimeline
        .to(motion, {
          duration: 2,
          ease: 'none',
        })
        .to(motion, {
          duration: 2,
          velocity: 1.24,
          ease: 'power4.in',
        })
        .to(motion, {
          duration: 1,
          velocity: 2.48,
          orangeMix: 0.42,
          glow: 0.24,
          ease: 'power2.in',
        })
        .to(motion, {
          duration: 1,
          velocity: MAX_VELOCITY,
          orangeMix: 1,
          glow: 1,
          ease: 'power1.in',
        })
        .to(motion, {
          duration: 2,
          velocity: MAX_VELOCITY,
          ease: 'none',
        })
        .addLabel('deceleration')
        .to(
          motion,
          {
            duration: 0.24,
            velocity: 3.06,
            ease: 'none',
          },
          'deceleration',
        )
        .to(
          motion,
          {
            duration: 0.31,
            velocity: 2.74,
            ease: 'sine.out',
          },
          'deceleration+=0.24',
        )
        .to(
          motion,
          {
            duration: 0.38,
            velocity: 2.2,
            ease: 'power1.out',
          },
          'deceleration+=0.55',
        )
        .to(
          motion,
          {
            duration: 0.48,
            velocity: 1.48,
            ease: 'power2.out',
          },
          'deceleration+=0.93',
        )
        .to(
          motion,
          {
            duration: 0.66,
            velocity: 0.5,
            ease: 'expo.out',
          },
          'deceleration+=1.41',
        )
        .to(
          motion,
          {
            duration: 0.44,
            velocity: 0,
            ease: 'sine.out',
          },
          'deceleration+=2.07',
        )
        .to(
          motion,
          {
            duration: 0.9,
            titleOpacity: 1,
            titleY: 0,
            titleBlur: 0,
            ease: 'power3.out',
          },
          'deceleration+=1.02',
        )
        .to(
          motion,
          {
            duration: 1.1,
            initialWrite: 1,
            ease: 'none',
          },
          'deceleration+=1.1',
        )
        .to(
          motion,
          {
            duration: 0.86,
            initialErase: 1,
            ease: 'power1.inOut',
          },
          'deceleration+=2.46',
        )
        .to(
          motion,
          {
            duration: 1.06,
            finalWrite: 1,
            ease: 'none',
          },
          'deceleration+=3.24',
        )
    }

    frameId = window.requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frameId)
      introTimeline?.kill()
    }
  }, [])

  useEffect(() => {
    if (!introComplete) {
      return
    }

    const story = storyRef.current
    const copy = copyRef.current
    const banner = bannerRef.current
    const description = descriptionRef.current
    const mockup = mockupRef.current
    const catalogZone = catalogZoneRef.current
    const catalogSurface = catalogSurfaceRef.current
    const catalogGlow = catalogGlowRef.current
    const catalogSquaresWrap = catalogSquaresRef.current
    const catalogNumber = catalogNumberRef.current
    const catalogHeader = catalogHeaderRef.current
    const catalogFilters = catalogFiltersRef.current
    const catalogCardsWrap = catalogCardsRef.current
    const progressFill = progressFillRef.current
    const progressLabel = progressLabelRef.current
    const canvas = canvasRef.current

    if (
      !story ||
      !copy ||
      !banner ||
      !description ||
      !mockup ||
      !catalogZone ||
      !catalogSurface ||
      !catalogGlow ||
      !catalogSquaresWrap ||
      !catalogNumber ||
      !catalogHeader ||
      !catalogFilters ||
      !catalogCardsWrap ||
      !progressFill ||
      !progressLabel ||
      !canvas
    ) {
      return
    }

    const ctx = gsap.context(() => {
      const isCompact = () => window.innerWidth < 960
      const hold = { value: 0 }
      const squares = gsap.utils.toArray<HTMLElement>('.catalog-square')
      const filters = gsap.utils.toArray<HTMLElement>('.catalog-filter')
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card')

      gsap.set(progressFill, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(canvas, { opacity: 1 })
      gsap.set(banner, {
        autoAlpha: 0,
        y: 34,
        scale: 0.985,
        clipPath: 'inset(0% 0% 0% 0% round 2.2rem)',
      })
      gsap.set(description, { autoAlpha: 0, y: 26 })
      gsap.set(mockup, {
        autoAlpha: 0,
        x: () => (isCompact() ? 0 : 76),
        y: () => (isCompact() ? 36 : 18),
        scale: 0.965,
      })
      gsap.set(copy, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
      })
      gsap.set(catalogZone, { autoAlpha: 0 })
      gsap.set(catalogSurface, { autoAlpha: 0, scale: 1.03 })
      gsap.set(catalogGlow, { autoAlpha: 0, y: 72, scale: 0.84 })
      gsap.set(catalogSquaresWrap, { autoAlpha: 0 })
      gsap.set(catalogNumber, { autoAlpha: 0, y: -32 })
      gsap.set(catalogHeader, { autoAlpha: 0, y: 42 })
      gsap.set(catalogFilters, { autoAlpha: 0, y: 26 })
      gsap.set(catalogCardsWrap, { autoAlpha: 0 })
      gsap.set(squares, { autoAlpha: 0, scale: 0.72, y: 24 })
      gsap.set(filters, { autoAlpha: 0, y: 18, scale: 0.96 })
      gsap.set(cards, { autoAlpha: 0, y: 34, scale: 0.94 })

      gsap
        .timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: story,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progressFill.style.transform = `scaleX(${self.progress})`
              progressLabel.textContent = `${Math.round(self.progress * 100)}%`
            },
          },
        })
        .to(
          banner,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 10,
          },
          0,
        )
        .to(
          copy,
          {
            x: () => (isCompact() ? -window.innerWidth * 0.06 : -window.innerWidth * 0.22),
            y: () => (isCompact() ? -window.innerHeight * 0.06 : -window.innerHeight * 0.05),
            scale: () => (isCompact() ? 0.92 : 0.82),
            duration: 10,
          },
          0,
        )
        .to(
          description,
          {
            autoAlpha: 1,
            y: 0,
            duration: 7,
          },
          1.8,
        )
        .to(
          mockup,
          {
            autoAlpha: 1,
            x: 0,
            y: () => (isCompact() ? 0 : -window.innerHeight * 0.05),
            scale: 1,
            duration: 8,
          },
          2.2,
        )
        .to(
          mockup,
          {
            autoAlpha: 0,
            x: () => (isCompact() ? 0 : window.innerWidth * 0.06),
            y: () => (isCompact() ? 24 : -window.innerHeight * 0.12),
            scale: 0.82,
            duration: 4,
          },
          11,
        )
        .to(
          copy,
          {
            x: () => (isCompact() ? -window.innerWidth * 0.12 : -window.innerWidth * 0.26),
            y: () => (isCompact() ? -window.innerHeight * 0.08 : -window.innerHeight * 0.09),
            scale: () => (isCompact() ? 0.88 : 0.78),
            duration: 4,
          },
          11,
        )
        .to(
          description,
          {
            autoAlpha: 0.32,
            y: -10,
            duration: 4,
          },
          11,
        )
        .to(
          banner,
          {
            clipPath: 'inset(10% 9% 10% 9% round 2rem)',
            scale: 0.95,
            autoAlpha: 0.9,
            duration: 4,
            ease: 'power2.inOut',
          },
          11,
        )
        .set(catalogZone, { autoAlpha: 1 }, 15)
        .to(
          canvas,
          {
            opacity: 0,
            duration: 3,
            ease: 'power2.out',
          },
          15,
        )
        .to(
          copy,
          {
            autoAlpha: 0,
            duration: 2.6,
            ease: 'power1.out',
          },
          15.1,
        )
        .to(
          banner,
          {
            clipPath: 'inset(47% 47% 47% 47% round 999px)',
            scale: 0.72,
            autoAlpha: 0,
            duration: 3,
            ease: 'power3.inOut',
          },
          15,
        )
        .to(
          catalogSurface,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 4,
          },
          18,
        )
        .to(
          catalogGlow,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 4,
            ease: 'power3.out',
          },
          18.15,
        )
        .to(
          catalogSquaresWrap,
          {
            autoAlpha: 1,
            duration: 0.3,
          },
          18.2,
        )
        .to(
          catalogNumber,
          {
            autoAlpha: 0.6,
            y: 0,
            duration: 2.8,
          },
          19.1,
        )
        .to(
          squares,
          {
            autoAlpha: (_, target) =>
              (target as HTMLElement).classList.contains('is-bright')
                ? 0.38
                : (target as HTMLElement).classList.contains('is-outline')
                  ? 0.22
                  : 0.28,
            y: 0,
            scale: 1,
            duration: 2.4,
            stagger: 0.08,
            ease: 'power3.out',
          },
          18.45,
        )
        .to(
          catalogHeader,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.6,
          },
          22,
        )
        .to(
          catalogFilters,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
          },
          22.25,
        )
        .to(
          filters,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.08,
          },
          22.35,
        )
        .to(
          catalogCardsWrap,
          {
            autoAlpha: 1,
            duration: 0.25,
          },
          22.9,
        )
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            stagger: 0.07,
          },
          23.05,
        )
        .to(
          hold,
          {
            value: 1,
            duration: 75,
            ease: 'none',
          },
          25,
        )

      ScrollTrigger.refresh()
    }, story)

    return () => {
      progressFill.style.transform = 'scaleX(0)'
      progressLabel.textContent = '0%'
      ctx.revert()
    }
  }, [introComplete])

  return (
    <main className="experience-shell" aria-label="Portfolio opening and cover">
      <canvas ref={canvasRef} className="stage-canvas" />

      <section ref={storyRef} className="story-shell">
        <div className={`scroll-progress${introComplete ? ' is-visible' : ''}`}>
          <span ref={progressLabelRef} className="scroll-progress__label">
            0%
          </span>
          <div className="scroll-progress__track">
            <div ref={progressFillRef} className="scroll-progress__fill" />
          </div>
        </div>

        <div className="story-stage">
          <div ref={bannerRef} className="hero-banner" />

          <div ref={copyRef} className="hero-copy">
            <h1 ref={titleRef} className="stage-title" />
            <p ref={descriptionRef} className="hero-description">
              Sou analista de desenvolvimento junior e crio experiencias que
              podem nascer minimalistas e escalar para produtos robustos,
              funcionais e cheios de intencao.
            </p>
          </div>

          <div ref={mockupRef} className="hero-mockup" aria-hidden="true">
            <div className="hero-mockup__topbar">
              <div className="hero-mockup__lights">
                <span />
                <span />
                <span />
              </div>

              <div className="hero-mockup__address" />
            </div>

            <div className="hero-mockup__viewport" />
          </div>

          <section ref={catalogZoneRef} className="catalog-zone" aria-label="Tech stack">
            <div ref={catalogSurfaceRef} className="catalog-surface" />
            <div ref={catalogGlowRef} className="catalog-glow" />

            <div ref={catalogSquaresRef} className="catalog-squares" aria-hidden="true">
              {CATALOG_SQUARES.map((square, index) => (
                <span
                  key={`${square.left}-${square.top}-${index}`}
                  className={`catalog-square${square.variant ? ` is-${square.variant}` : ''}`}
                  style={{
                    left: square.left,
                    top: square.top,
                    width: square.size,
                    height: square.size,
                  }}
                />
              ))}
            </div>

            <div ref={catalogNumberRef} className="catalog-number" aria-hidden="true">
              02
            </div>

            <div ref={catalogHeaderRef} className="catalog-header">
              <p className="catalog-header__kicker">Tech Stack</p>
              <h2 className="catalog-header__title">
                Tecnologias que sustentam a parte mais tecnica do meu trabalho.
              </h2>
              <p className="catalog-header__body">
                Linguagens, frameworks, dados e fluxos que eu ja usei para
                construir interfaces, automacoes e produtos com cara de produto
                de verdade.
              </p>
            </div>

            <div ref={catalogFiltersRef} className="catalog-filters" aria-hidden="true">
              {STACK_FILTERS.map((filter, index) => (
                <span
                  key={filter}
                  className={`catalog-filter${index === 0 ? ' is-active' : ''}`}
                >
                  {filter}
                </span>
              ))}
            </div>

            <div ref={catalogCardsRef} className="catalog-grid">
              {STACK_ITEMS.map((item) => (
                <article
                  key={item.label}
                  className="stack-card"
                  data-category={item.category}
                >
                  <TechLogo kind={item.kind} className="stack-card__logo" />
                  <p className="stack-card__label">{item.label}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
