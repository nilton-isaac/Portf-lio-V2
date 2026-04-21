import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

const PARTICLE_COUNT = 180
const MAX_VELOCITY = 3.3
const INITIAL_NAME = 'nilton-isaac'
const FINAL_NAME = 'Isaac Rubio'
const COOL_PARTICLE = { r: 214, g: 220, b: 228 }
const WARM_PARTICLE = { r: 255, g: 122, b: 26 }

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
    const progressFill = progressFillRef.current
    const progressLabel = progressLabelRef.current

    if (
      !story ||
      !copy ||
      !banner ||
      !description ||
      !mockup ||
      !progressFill ||
      !progressLabel
    ) {
      return
    }

    const ctx = gsap.context(() => {
      const isCompact = () => window.innerWidth < 960
      const hold = { value: 0 }

      gsap.set(progressFill, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(banner, { autoAlpha: 0, y: 34, scale: 0.985 })
      gsap.set(description, { autoAlpha: 0, y: 26 })
      gsap.set(mockup, {
        autoAlpha: 0,
        x: () => (isCompact() ? 0 : 76),
        y: () => (isCompact() ? 36 : 18),
        scale: 0.965,
      })
      gsap.set(copy, {
        x: 0,
        y: 0,
        scale: 1,
      })

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
          hold,
          {
            value: 1,
            duration: 90,
            ease: 'none',
          },
          10,
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
              Sou analista de desenvolvimento júnior e transformo interfaces em
              experiências que podem nascer minimalistas e escalar para produtos
              robustos, funcionais e cheios de intenção.
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
        </div>
      </section>
    </main>
  )
}

export default App
