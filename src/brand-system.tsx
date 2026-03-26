import { useId, type ReactNode } from 'react'

export type BrandLogoKind =
  | 'kanban-nine'
  | 'icarus-type'
  | 'synth-wirenotion'

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
