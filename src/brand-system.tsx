import { useId, type ReactNode } from 'react'

export type BrandLogoKind =
  | 'kanban-nine'
  | 'icarus-type'
  | 'synth-wirenotion'

export type TechLogoKind =
  | 'html'
  | 'css'
  | 'javascript'
  | 'python'
  | 'java'
  | 'cplusplus'
  | 'postgresql'
  | 'angular'
  | 'react'
  | 'nextjs'
  | 'vite'
  | 'tailwind'
  | 'nodered'
  | 'n8n'
  | 'supabase'
  | 'api'
  | 'integrations'
  | 'git'
  | 'github'
  | 'vercel'
  | 'tauri'
  | 'animejs'
  | 'magicui'
  | 'lmstudio'
  | 'ollama'

export type BrandPalette = {
  primary: string
  secondary: string
  tertiary: string
  text: string
  glow: string
}

type SharedProps = {
  kind: BrandLogoKind
  palette: BrandPalette
  className?: string
  title?: string
  subtitle?: string
  assetSrc?: string
  assetAlt?: string
}

const monoFont = "'IBM Plex Mono', monospace"
const displayFont = "'Manrope', sans-serif"
const synthAssetFallback = '/synth-logo-original.svg'

type TechPalette = {
  primary: string
  secondary: string
  tertiary: string
  text: string
  glow: string
}

const techPalettes: Record<TechLogoKind, TechPalette> = {
  html: {
    primary: '#ff7a59',
    secondary: '#ffb36b',
    tertiary: '#ffd7bf',
    text: '#fff4ef',
    glow: 'rgba(255, 122, 89, 0.3)',
  },
  css: {
    primary: '#4ab2ff',
    secondary: '#86d3ff',
    tertiary: '#d7f2ff',
    text: '#eefaff',
    glow: 'rgba(74, 178, 255, 0.3)',
  },
  javascript: {
    primary: '#f7df1e',
    secondary: '#ffe76c',
    tertiary: '#fff6b1',
    text: '#131313',
    glow: 'rgba(247, 223, 30, 0.26)',
  },
  python: {
    primary: '#5fa8ff',
    secondary: '#ffd54d',
    tertiary: '#fff0b3',
    text: '#f7fbff',
    glow: 'rgba(95, 168, 255, 0.28)',
  },
  java: {
    primary: '#ff7d66',
    secondary: '#ffb07c',
    tertiary: '#ffe3d1',
    text: '#fff5f0',
    glow: 'rgba(255, 125, 102, 0.28)',
  },
  cplusplus: {
    primary: '#5cd3ff',
    secondary: '#7ca8ff',
    tertiary: '#d2e5ff',
    text: '#f1fbff',
    glow: 'rgba(92, 211, 255, 0.26)',
  },
  postgresql: {
    primary: '#78b8ff',
    secondary: '#9fe0ff',
    tertiary: '#def5ff',
    text: '#eef8ff',
    glow: 'rgba(120, 184, 255, 0.28)',
  },
  angular: {
    primary: '#ff617c',
    secondary: '#ff9f7c',
    tertiary: '#ffd7cf',
    text: '#fff4f2',
    glow: 'rgba(255, 97, 124, 0.28)',
  },
  react: {
    primary: '#72f5ff',
    secondary: '#9fdcff',
    tertiary: '#d8fbff',
    text: '#f2feff',
    glow: 'rgba(114, 245, 255, 0.28)',
  },
  nextjs: {
    primary: '#f3f6fb',
    secondary: '#96a1b5',
    tertiary: '#d8deea',
    text: '#f8fbff',
    glow: 'rgba(180, 193, 220, 0.24)',
  },
  vite: {
    primary: '#8b7dff',
    secondary: '#ffd15d',
    tertiary: '#fff1b0',
    text: '#f8f5ff',
    glow: 'rgba(139, 125, 255, 0.28)',
  },
  tailwind: {
    primary: '#44d1d8',
    secondary: '#86f8ee',
    tertiary: '#d2fff8',
    text: '#f2fffe',
    glow: 'rgba(68, 209, 216, 0.28)',
  },
  nodered: {
    primary: '#ff7a76',
    secondary: '#ffb38c',
    tertiary: '#ffe0d8',
    text: '#fff3f1',
    glow: 'rgba(255, 122, 118, 0.28)',
  },
  n8n: {
    primary: '#ff6367',
    secondary: '#ff8fc4',
    tertiary: '#ffd6e8',
    text: '#fff3f7',
    glow: 'rgba(255, 99, 103, 0.28)',
  },
  supabase: {
    primary: '#5ef0a1',
    secondary: '#99ffcb',
    tertiary: '#d7ffea',
    text: '#f2fff7',
    glow: 'rgba(94, 240, 161, 0.28)',
  },
  api: {
    primary: '#6de8ff',
    secondary: '#9cc9ff',
    tertiary: '#ddf4ff',
    text: '#f1fcff',
    glow: 'rgba(109, 232, 255, 0.28)',
  },
  integrations: {
    primary: '#ff82cf',
    secondary: '#86d4ff',
    tertiary: '#f9ddff',
    text: '#fff6ff',
    glow: 'rgba(255, 130, 207, 0.26)',
  },
  git: {
    primary: '#ff8d57',
    secondary: '#ffbc75',
    tertiary: '#ffe3cb',
    text: '#fff6ef',
    glow: 'rgba(255, 141, 87, 0.28)',
  },
  github: {
    primary: '#edf2ff',
    secondary: '#95a6d8',
    tertiary: '#dce5ff',
    text: '#ffffff',
    glow: 'rgba(149, 166, 216, 0.26)',
  },
  vercel: {
    primary: '#ffffff',
    secondary: '#a9b1c9',
    tertiary: '#eef1ff',
    text: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.18)',
  },
  tauri: {
    primary: '#ffb05a',
    secondary: '#7fd8ff',
    tertiary: '#ffe9c7',
    text: '#fffaf1',
    glow: 'rgba(255, 176, 90, 0.28)',
  },
  animejs: {
    primary: '#ff6ecd',
    secondary: '#8b8dff',
    tertiary: '#ffd7f3',
    text: '#fff4fc',
    glow: 'rgba(255, 110, 205, 0.28)',
  },
  magicui: {
    primary: '#d38aff',
    secondary: '#ffe066',
    tertiary: '#f5dfff',
    text: '#fff7ff',
    glow: 'rgba(211, 138, 255, 0.26)',
  },
  lmstudio: {
    primary: '#7edcff',
    secondary: '#8effd8',
    tertiary: '#dbfff4',
    text: '#f3ffff',
    glow: 'rgba(126, 220, 255, 0.26)',
  },
  ollama: {
    primary: '#9eff8c',
    secondary: '#d9ff8e',
    tertiary: '#efffd8',
    text: '#f8fff3',
    glow: 'rgba(158, 255, 140, 0.24)',
  },
}

function TechCanvas({
  label,
  palette,
  className,
  children,
}: {
  label: string
  palette: TechPalette
  className?: string
  children: ReactNode
}) {
  const id = useId()
  const gradientId = `${id}-gradient`
  const glowId = `${id}-glow`
  const dotsId = `${id}-dots`

  return (
    <svg viewBox="0 0 72 72" className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id={gradientId} x1="10%" y1="12%" x2="88%" y2="88%">
          <stop offset="0%" stopColor={palette.primary} />
          <stop offset="54%" stopColor={palette.secondary} />
          <stop offset="100%" stopColor={palette.tertiary} />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="44%" r="70%">
          <stop offset="0%" stopColor={palette.glow} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <pattern id={dotsId} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill={palette.primary} fillOpacity="0.14" />
        </pattern>
      </defs>

      <circle cx="36" cy="36" r="24" fill={`url(#${glowId})`} opacity="0.72" />
      <circle
        cx="36"
        cy="36"
        r="20"
        fill="rgba(8, 11, 13, 0.52)"
        stroke={`url(#${gradientId})`}
        strokeOpacity="0.18"
      />
      <circle cx="36" cy="36" r="20" fill={`url(#${dotsId})`} opacity="0.36" />
      {children}
    </svg>
  )
}

function renderTechGlyph(kind: TechLogoKind, palette: TechPalette) {
  switch (kind) {
    case 'html':
      return (
        <>
          <path
            d="M20 14H52L48 52L36 56L24 52L20 14Z"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
          />
          <path
            d="M28 22H44M29 30H43M31 38H41"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="35.5"
            y="49"
            fill={palette.secondary}
            fontFamily={monoFont}
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            5
          </text>
        </>
      )
    case 'css':
      return (
        <>
          <path
            d="M20 14H52L48 52L36 56L24 52L20 14Z"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
          />
          <path
            d="M29 22H43M30 30H42M31 38H39"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="35.5"
            y="49"
            fill={palette.secondary}
            fontFamily={monoFont}
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            3
          </text>
        </>
      )
    case 'javascript':
      return (
        <>
          <rect x="17" y="17" width="38" height="38" rx="11" fill={palette.primary} />
          <text
            x="36"
            y="41"
            fill={palette.text}
            fontFamily={monoFont}
            fontSize="17"
            fontWeight="700"
            textAnchor="middle"
          >
            JS
          </text>
        </>
      )
    case 'python':
      return (
        <>
          <path
            d="M22 24C22 18 26 16 32 16H40C46 16 50 20 50 26V30C50 35 46 38 41 38H28C25 38 22 35 22 32V24Z"
            fill={palette.primary}
          />
          <path
            d="M50 48C50 54 46 56 40 56H32C26 56 22 52 22 46V42C22 37 26 34 31 34H44C47 34 50 37 50 40V48Z"
            fill={palette.secondary}
          />
          <circle cx="41.5" cy="24.5" r="2.2" fill="#070a0c" />
          <circle cx="30.5" cy="47.5" r="2.2" fill="#070a0c" />
        </>
      )
    case 'java':
      return (
        <>
          <path
            d="M27 43H45C45 48 42 52 36 52C30 52 27 48 27 43Z"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M45 44H48C50 44 51 45.5 51 47.5C51 49.5 49.5 51 47.5 51H45"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M31 36C31 34 34 33 34 30C34 27 31 26 31 24"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M38 37C38 34 41 33 41 29C41 26 38 25 38 22"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )
    case 'cplusplus':
      return (
        <>
          <path
            d="M36 16L48 23V37L36 44L24 37V23L36 16Z"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
          />
          <text
            x="31"
            y="35"
            fill={palette.text}
            fontFamily={monoFont}
            fontSize="17"
            fontWeight="700"
            textAnchor="middle"
          >
            C
          </text>
          <path
            d="M42 28H48M45 25V31M42 36H48M45 33V39"
            stroke={palette.secondary}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </>
      )
    case 'postgresql':
      return (
        <>
          <path
            d="M36 18C28 18 23 23 23 32V41C23 47 27 52 34 52C39 52 43 49 45 45L48 47V37L45 35C45 24 41 18 36 18Z"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="33" cy="29" r="2.2" fill={palette.text} />
          <path
            d="M44 34C48 34 51 36 51 40C51 44 48 46 44 46"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M33 36C35.5 38 37.5 40.5 39 44"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )
    case 'angular':
      return (
        <>
          <path
            d="M36 15L50 20L47 46L36 55L25 46L22 20L36 15Z"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
          />
          <path
            d="M36 23L44 43H39.5L38 38H34L32.5 43H28L36 23ZM35 34H37L36 30L35 34Z"
            fill={palette.text}
          />
        </>
      )
    case 'react':
      return (
        <>
          <ellipse
            cx="36"
            cy="36"
            rx="15"
            ry="6.5"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
          />
          <ellipse
            cx="36"
            cy="36"
            rx="15"
            ry="6.5"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="3"
            transform="rotate(60 36 36)"
          />
          <ellipse
            cx="36"
            cy="36"
            rx="15"
            ry="6.5"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            transform="rotate(-60 36 36)"
          />
          <circle cx="36" cy="36" r="4" fill={palette.primary} />
        </>
      )
    case 'nextjs':
      return (
        <>
          <circle
            cx="36"
            cy="36"
            r="18"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
          />
          <path
            d="M28 45V27L44 45V27"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )
    case 'vite':
      return (
        <>
          <path
            d="M26 18L35 24L29 43L20 36L26 18Z"
            fill={palette.primary}
          />
          <path
            d="M40 18L50 23L42 44L31 37L40 18Z"
            fill={palette.secondary}
          />
          <path
            d="M37 22L30 37H36L33 48L44 31H38L42 22Z"
            fill={palette.text}
          />
        </>
      )
    case 'tailwind':
      return (
        <>
          <path
            d="M22 30C25 24 29 22 34 24C37 25 38.5 28 40.5 29.5C43.5 32 47 31 50 26C47 32 43 34 38 32C35 31 33.5 28 31.5 26.5C28.5 24 25 25 22 30Z"
            fill={palette.primary}
          />
          <path
            d="M22 42C25 36 29 34 34 36C37 37 38.5 40 40.5 41.5C43.5 44 47 43 50 38C47 44 43 46 38 44C35 43 33.5 40 31.5 38.5C28.5 36 25 37 22 42Z"
            fill={palette.secondary}
          />
        </>
      )
    case 'nodered':
      return (
        <>
          <path
            d="M22 36H31L37 28H50"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="36" r="5" fill={palette.primary} />
          <circle cx="36" cy="28" r="5" fill={palette.secondary} />
          <circle cx="52" cy="28" r="5" fill={palette.tertiary} />
        </>
      )
    case 'n8n':
      return (
        <>
          <path
            d="M26 28L36 36L46 24"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="29" r="6" fill={palette.primary} />
          <circle cx="36" cy="36" r="6" fill={palette.secondary} />
          <circle cx="48" cy="24" r="6" fill={palette.tertiary} />
        </>
      )
    case 'supabase':
      return (
        <>
          <path
            d="M44 18L28 36H38L28 54L46 32H36L44 18Z"
            fill={palette.primary}
          />
          <path
            d="M28 36H38L31 47"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      )
    case 'api':
      return (
        <>
          <path
            d="M26 24L18 36L26 48M46 24L54 36L46 48"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35 25L31 47"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="40" cy="36" r="3.5" fill={palette.secondary} />
        </>
      )
    case 'integrations':
      return (
        <>
          <path
            d="M28 28L34 22C37 19 41 19 44 22L47 25C50 28 50 32 47 35L42 40"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M44 44L38 50C35 53 31 53 28 50L25 47C22 44 22 40 25 37L30 32"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M30 42L42 30"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )
    case 'git':
      return (
        <>
          <path
            d="M28 24V45M28 24L40 18M28 36L44 36"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="28" cy="24" r="4.5" fill={palette.primary} />
          <circle cx="40" cy="18" r="4.5" fill={palette.secondary} />
          <circle cx="28" cy="45" r="4.5" fill={palette.primary} />
          <circle cx="44" cy="36" r="4.5" fill={palette.tertiary} />
        </>
      )
    case 'github':
      return (
        <>
          <path
            d="M24 29L27 21L33 26L39 21L42 29V43C42 48 39 51 33 51C27 51 24 48 24 43V29Z"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="30" cy="36" r="1.8" fill={palette.primary} />
          <circle cx="36" cy="36" r="1.8" fill={palette.primary} />
          <path
            d="M30 43C31.5 44.5 34.5 44.5 36 43"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </>
      )
    case 'vercel':
      return (
        <>
          <path d="M36 18L50 46H22L36 18Z" fill={palette.text} />
          <path d="M36 24L45 42H27L36 24Z" fill={palette.primary} opacity="0.22" />
        </>
      )
    case 'tauri':
      return (
        <>
          <path
            d="M36 22V48M28 22H44"
            fill="none"
            stroke={palette.text}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M20 36C24 30 30 27 36 27C42 27 48 30 52 36C48 42 42 45 36 45C30 45 24 42 20 36Z"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
          />
          <circle cx="25" cy="27" r="3" fill={palette.secondary} />
          <circle cx="47" cy="45" r="3" fill={palette.primary} />
        </>
      )
    case 'animejs':
      return (
        <>
          <path
            d="M22 43C27 27 35 19 44 19C49 19 52 22 52 27C52 34 46 37 39 37H29"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M24 49C29 43 34 40 40 40C44 40 47 41.5 50 44"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="22" cy="43" r="3.3" fill={palette.text} />
        </>
      )
    case 'magicui':
      return (
        <>
          <path
            d="M36 19L39.5 28.5L49 32L39.5 35.5L36 45L32.5 35.5L23 32L32.5 28.5L36 19Z"
            fill={palette.primary}
          />
          <path
            d="M23 21L24.5 25L28.5 26.5L24.5 28L23 32L21.5 28L17.5 26.5L21.5 25L23 21Z"
            fill={palette.secondary}
          />
          <circle cx="49" cy="20" r="3" fill={palette.tertiary} />
        </>
      )
    case 'lmstudio':
      return (
        <>
          <rect
            x="19"
            y="18"
            width="34"
            height="36"
            rx="8"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
          />
          <text
            x="36"
            y="40"
            fill={palette.text}
            fontFamily={monoFont}
            fontSize="15"
            fontWeight="700"
            textAnchor="middle"
          >
            LM
          </text>
        </>
      )
    case 'ollama':
      return (
        <>
          <path
            d="M28 28L31 21H36L39 28L44 29V45C44 50 40 53 36 53C32 53 28 50 28 45V28Z"
            fill="none"
            stroke={palette.primary}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M28 28L24 31V44C24 48 21 50 18 50"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="33" cy="36" r="1.8" fill={palette.text} />
          <circle cx="39" cy="36" r="1.8" fill={palette.text} />
          <path
            d="M34 43H38"
            fill="none"
            stroke={palette.text}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </>
      )
  }
}

export function TechLogo({
  kind,
  className,
}: {
  kind: TechLogoKind
  className?: string
}) {
  const palette = techPalettes[kind]

  return (
    <TechCanvas label={`${kind} logo`} palette={palette} className={className}>
      {renderTechGlyph(kind, palette)}
    </TechCanvas>
  )
}

export function SignatureMark({ className }: { className?: string }) {
  const id = useId()
  const gradientId = `${id}-signature-gradient`
  const glowId = `${id}-signature-glow`

  return (
    <svg
      viewBox="0 0 244 86"
      className={className}
      role="img"
      aria-label="Isaac Rubio signature mark"
    >
      <defs>
        <linearGradient id={gradientId} x1="2%" y1="20%" x2="98%" y2="72%">
          <stop offset="0%" stopColor="#a2f7ff" />
          <stop offset="48%" stopColor="#f4f8ff" />
          <stop offset="100%" stopColor="#ff9bd6" />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      <g opacity="0.22" filter={`url(#${glowId})`}>
        <path
          d="M24 63C29 55 31 42 31 23C31 18 32 13 33 10C35 15 35 34 35 66"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M63 63C73 39 86 17 102 17C114 17 122 24 122 35C122 46 112 51 98 51C111 51 121 55 130 62C139 69 151 73 165 73C181 73 198 67 219 51"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <path
        d="M20 61C26 54 28 41 28 23C28 18 29 13 30 10C32 15 32 34 31 64"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 68C42 66 50 61 58 53"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M61 62C71 38 84 16 101 16C113 16 121 23 121 34C121 45 111 50 97 50C110 50 120 54 129 61C138 68 149 72 164 72C180 72 197 66 222 48"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96 50C104 43 110 37 116 30"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M159 71C170 77 183 78 199 74"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.86"
      />
    </svg>
  )
}

function BrandCanvas({
  viewBox,
  label,
  palette,
  className,
  children,
}: {
  viewBox: string
  label: string
  palette: BrandPalette
  className?: string
  children: (ids: {
    grid: string
    dots: string
    micro: string
    scan: string
    glow: string
    glowSoft: string
    wash: string
  }) => ReactNode
}) {
  const id = useId()
  const ids = {
    grid: `${id}-grid`,
    dots: `${id}-dots`,
    micro: `${id}-micro`,
    scan: `${id}-scan`,
    glow: `${id}-glow`,
    glowSoft: `${id}-glow-soft`,
    wash: `${id}-wash`,
  }

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={label}>
      <defs>
        <pattern
          id={ids.grid}
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0H28V28"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        </pattern>
        <pattern
          id={ids.dots}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1.5" y="1.5" width="3.2" height="3.2" fill={palette.primary} />
          <rect
            x="6.2"
            y="6.2"
            width="2.1"
            height="2.1"
            fill={palette.secondary}
          />
        </pattern>
        <pattern
          id={ids.micro}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1.1" y="1.1" width="1.8" height="1.8" fill={palette.text} />
        </pattern>
        <pattern
          id={ids.scan}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="4"
            height="8"
            fill="rgba(255,255,255,0.25)"
          />
        </pattern>
        <radialGradient id={ids.wash} cx="50%" cy="38%" r="78%">
          <stop offset="0%" stopColor={palette.glow} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={ids.glow}>
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id={ids.glowSoft}>
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="#06090d" />
      <rect
        width="100%"
        height="100%"
        fill={`url(#${ids.grid})`}
        opacity="0.48"
      />
      <rect
        width="100%"
        height="100%"
        fill={`url(#${ids.dots})`}
        opacity="0.22"
      />
      <rect
        width="100%"
        height="100%"
        fill={`url(#${ids.wash})`}
        opacity="0.62"
      />
      {children(ids)}
    </svg>
  )
}

function SynthAsset({
  assetSrc = synthAssetFallback,
  assetAlt = 'Synth WireNotion original logo',
  className,
  mode,
}: {
  assetSrc?: string
  assetAlt?: string
  className?: string
  mode: 'mark' | 'poster'
}) {
  return (
    <div className={`brand-asset brand-asset--${mode} ${className ?? ''}`}>
      <img
        src={assetSrc}
        alt={assetAlt}
        className="brand-asset__image"
        loading={mode === 'poster' ? 'eager' : 'lazy'}
        decoding="async"
        onError={(event) => {
          if (event.currentTarget.src.endsWith(synthAssetFallback)) {
            return
          }

          event.currentTarget.src = synthAssetFallback
        }}
      />
    </div>
  )
}

function IcarusMark({ palette, className }: Omit<SharedProps, 'kind'>) {
  const id = useId()
  const irisGradientId = `${id}-iris`
  const ringGradientId = `${id}-ring`

  return (
    <BrandCanvas
      viewBox="0 0 320 320"
      label="Icarus Type mark"
      palette={palette}
      className={className}
    >
      {(ids) => (
        <>
          <defs>
            <linearGradient
              id={irisGradientId}
              x1="16%"
              y1="20%"
              x2="82%"
              y2="84%"
            >
              <stop offset="0%" stopColor={palette.secondary} />
              <stop offset="100%" stopColor={palette.tertiary} />
            </linearGradient>
            <linearGradient
              id={ringGradientId}
              x1="10%"
              y1="14%"
              x2="88%"
              y2="90%"
            >
              <stop offset="0%" stopColor={palette.text} />
              <stop offset="100%" stopColor={palette.secondary} />
            </linearGradient>
          </defs>

          <g opacity="0.38" filter={`url(#${ids.glowSoft})`}>
            <circle cx="160" cy="118" r="66" fill={palette.glow} />
          </g>

          <g stroke={palette.secondary} strokeWidth="8" strokeLinecap="round">
            <path d="M160 34V62" />
            <path d="M246 74L226 92" />
            <path d="M274 156H246" />
            <path d="M74 74L94 92" />
            <path d="M46 156H74" />
            <path d="M98 238L116 216" />
            <path d="M222 238L204 216" />
          </g>

          <ellipse
            cx="160"
            cy="150"
            rx="104"
            ry="66"
            fill="none"
            stroke={`url(#${ringGradientId})`}
            strokeWidth="12"
          />
          <path
            d="M86 152C110 98 210 98 234 152C210 206 110 206 86 152Z"
            fill="none"
            stroke={palette.primary}
            strokeWidth="10"
          />
          <circle cx="160" cy="152" r="36" fill={`url(#${irisGradientId})`} />
          <circle cx="160" cy="152" r="16" fill="#09070d" />
          <circle cx="160" cy="152" r="6" fill={palette.text} />
          <path
            d="M102 206C146 168 202 170 240 214"
            fill="none"
            stroke={palette.tertiary}
            strokeWidth="8"
            strokeLinecap="round"
          />
        </>
      )}
    </BrandCanvas>
  )
}

function KanbanMark({ palette, className }: Omit<SharedProps, 'kind'>) {
  const nodeColors = [palette.primary, palette.secondary, palette.tertiary]

  return (
    <BrandCanvas
      viewBox="0 0 320 320"
      label="Kanban Nine mark"
      palette={palette}
      className={className}
    >
      {(ids) => (
        <>
          <g opacity="0.34" filter={`url(#${ids.glowSoft})`}>
            <polygon
              points="160,44 232,86 232,170 160,212 88,170 88,86"
              fill={palette.glow}
            />
          </g>

          <g fill="none" stroke={palette.text} strokeWidth="8">
            <polygon points="160,44 232,86 232,170 160,212 88,170 88,86" />
            <path d="M160 44V212" />
            <path d="M88 86L232 170" />
            <path d="M232 86L88 170" />
            <path d="M88 86L160 128L232 86" />
            <path d="M88 170L160 128L232 170" />
          </g>

          <g stroke={palette.primary} strokeWidth="4" opacity="0.75">
            <path d="M160 128L160 86" />
            <path d="M160 128L126 148" />
            <path d="M160 128L194 148" />
          </g>

          {[
            [160, 44],
            [232, 86],
            [232, 170],
            [160, 212],
            [88, 170],
            [88, 86],
            [160, 128],
          ].map(([cx, cy], index) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={index === 6 ? 8 : 7}
              fill={nodeColors[index % nodeColors.length]}
            />
          ))}

          <rect
            x="122"
            y="110"
            width="76"
            height="76"
            fill={`url(#${ids.micro})`}
            opacity="0.4"
          />
        </>
      )}
    </BrandCanvas>
  )
}

function IcarusPoster({
  palette,
  className,
  title = 'Icarus',
  subtitle = 'Type',
}: Omit<SharedProps, 'kind'>) {
  return (
    <BrandCanvas
      viewBox="0 0 360 360"
      label="Icarus Type poster"
      palette={palette}
      className={className}
    >
      {(ids) => (
        <>
          <g opacity="0.3" filter={`url(#${ids.glowSoft})`}>
            <circle cx="182" cy="120" r="72" fill={palette.glow} />
          </g>
          <g stroke={palette.secondary} strokeWidth="7" strokeLinecap="round">
            <path d="M180 34V58" />
            <path d="M246 58L230 76" />
            <path d="M280 120H256" />
            <path d="M248 182L228 164" />
            <path d="M112 58L128 76" />
            <path d="M80 120H104" />
            <path d="M110 182L130 164" />
          </g>
          <circle
            cx="180"
            cy="120"
            r="54"
            fill="none"
            stroke={palette.tertiary}
            strokeWidth="8"
          />
          <path
            d="M98 124C124 80 236 80 262 124C236 168 124 168 98 124Z"
            fill="none"
            stroke={palette.text}
            strokeWidth="10"
          />
          <path
            d="M116 124C140 90 220 90 244 124C220 158 140 158 116 124Z"
            fill="none"
            stroke={palette.primary}
            strokeWidth="6"
          />
          <circle cx="180" cy="124" r="24" fill={palette.secondary} />
          <circle cx="180" cy="124" r="10" fill="#09070d" />
          <path
            d="M124 200C150 176 212 176 240 200"
            fill="none"
            stroke={palette.tertiary}
            strokeWidth="8"
            strokeLinecap="round"
          />

          <text
            x="34"
            y="296"
            fill={palette.text}
            fontFamily={displayFont}
            fontSize="56"
            fontWeight="700"
          >
            {title}
          </text>
          <text
            x="204"
            y="296"
            fill={palette.secondary}
            fontFamily={displayFont}
            fontSize="56"
            fontWeight="700"
          >
            {subtitle}
          </text>
          <text
            x="36"
            y="326"
            fill={palette.text}
            fontFamily={monoFont}
            fontSize="18"
            letterSpacing="1.8"
          >
            learn. english. with music.
          </text>
        </>
      )}
    </BrandCanvas>
  )
}

function KanbanPoster({
  palette,
  className,
  title = 'KANBAN_NINE',
  subtitle = 'ops / flow / systems',
}: Omit<SharedProps, 'kind'>) {
  const nodeColors = [palette.primary, palette.secondary, palette.tertiary]

  return (
    <BrandCanvas
      viewBox="0 0 360 360"
      label="Kanban Nine poster"
      palette={palette}
      className={className}
    >
      {(ids) => (
        <>
          <g stroke="rgba(162, 245, 255, 0.12)" strokeWidth="2" fill="none">
            <path d="M44 48V140H96" />
            <path d="M312 54V112H264" />
            <path d="M54 250H118V316" />
            <path d="M306 226H258V316" />
            <path d="M180 40V82" />
            <path d="M180 214V256" />
          </g>

          <g opacity="0.26" filter={`url(#${ids.glowSoft})`}>
            <polygon
              points="180,56 246,94 246,170 180,208 114,170 114,94"
              fill={palette.glow}
            />
          </g>

          <g fill="none" stroke={palette.text} strokeWidth="7">
            <polygon points="180,56 246,94 246,170 180,208 114,170 114,94" />
            <path d="M180 56V208" />
            <path d="M114 94L246 170" />
            <path d="M246 94L114 170" />
            <path d="M114 94L180 132L246 94" />
            <path d="M114 170L180 132L246 170" />
          </g>

          <g stroke={palette.primary} strokeWidth="3.4" opacity="0.78">
            <path d="M180 132L180 102" />
            <path d="M180 132L150 148" />
            <path d="M180 132L210 148" />
            <path d="M180 132L140 118" />
            <path d="M180 132L220 118" />
          </g>

          {[
            [180, 56],
            [246, 94],
            [246, 170],
            [180, 208],
            [114, 170],
            [114, 94],
            [180, 132],
          ].map(([cx, cy], index) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={index === 6 ? 7.5 : 6.5}
              fill={nodeColors[index % nodeColors.length]}
            />
          ))}

          <text
            x="34"
            y="298"
            fill={palette.primary}
            fontFamily={monoFont}
            fontSize="34"
            fontWeight="600"
            letterSpacing="2.8"
          >
            {title}
          </text>
          <text
            x="34"
            y="328"
            fill={palette.text}
            fontFamily={monoFont}
            fontSize="15"
            letterSpacing="3.2"
          >
            {subtitle}
          </text>
        </>
      )}
    </BrandCanvas>
  )
}

export function BrandMark({
  kind,
  palette,
  className,
  assetSrc,
  assetAlt,
}: SharedProps) {
  if (kind === 'kanban-nine') {
    return <KanbanMark palette={palette} className={className} />
  }

  if (kind === 'icarus-type') {
    return <IcarusMark palette={palette} className={className} />
  }

  return (
    <SynthAsset
      assetSrc={assetSrc}
      assetAlt={assetAlt}
      className={className}
      mode="mark"
    />
  )
}

export function BrandPoster({
  kind,
  palette,
  className,
  title,
  subtitle,
  assetSrc,
  assetAlt,
}: SharedProps) {
  if (kind === 'kanban-nine') {
    return (
      <KanbanPoster
        palette={palette}
        className={className}
        title={title}
        subtitle={subtitle}
      />
    )
  }

  if (kind === 'icarus-type') {
    return (
      <IcarusPoster
        palette={palette}
        className={className}
        title={title}
        subtitle={subtitle}
      />
    )
  }

  return (
    <SynthAsset
      assetSrc={assetSrc}
      assetAlt={assetAlt}
      className={className}
      mode="poster"
    />
  )
}
