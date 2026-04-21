import { BrandMark, BrandPoster } from '../brand-system'
import type { Manifestation } from '../site-data'

type ProjectCaseViewProps = {
  manifestation: Manifestation
  onBack: () => void
}

export function ProjectCaseView({
  manifestation,
  onBack,
}: ProjectCaseViewProps) {
  const assetSrc =
    manifestation.logoMode === 'image' ? manifestation.logoAsset : undefined

  return (
    <section className="mx-auto w-full max-w-[1480px] px-6 pb-20 pt-4 md:px-10 lg:px-16 lg:pb-24">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
        <div className="space-y-8">
          <div className="theme-panel reading-panel relative overflow-hidden rounded-[34px] border border-white/10 px-5 py-6 sm:px-8 sm:py-8">
            <div className="dither-panel absolute inset-0 opacity-35" />

            <div className="relative space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/24 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  voltar ao arquivo
                </button>

                <span className="rounded-full border border-[var(--accent)]/18 bg-[var(--accent-soft)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
                  {manifestation.status}
                </span>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(260px,0.7fr)] lg:items-start">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                      {manifestation.index} / {manifestation.label}
                    </span>
                    <BrandMark
                      kind={manifestation.logoKind}
                      palette={manifestation.palette}
                      className={
                        manifestation.logoMode === 'image'
                          ? 'h-14 w-14 overflow-hidden rounded-[16px] border border-white/10 bg-[#5f666d] p-1.5'
                          : 'h-14 w-14 rounded-[16px] border border-white/10 bg-black/35 p-2'
                      }
                      assetSrc={assetSrc}
                      assetAlt={`${manifestation.title} original brand`}
                    />
                  </div>

                  <div className="space-y-3">
                    <h1 className="max-w-[12ch] text-4xl font-semibold leading-[0.92] tracking-[-0.06em] text-[var(--text)] sm:text-5xl lg:text-[3.8rem]">
                      {manifestation.title}
                    </h1>
                    <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
                      {manifestation.subtitle}
                    </p>
                    <p className="max-w-3xl text-base leading-8 text-[var(--text)]">
                      {manifestation.overview}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {manifestation.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/22 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="preview-shell relative min-h-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-black/60 p-2">
                  <BrandPoster
                    kind={manifestation.logoKind}
                    palette={manifestation.palette}
                    className="h-full w-full rounded-[22px]"
                    title={manifestation.posterTitle}
                    subtitle={manifestation.posterSubtitle}
                    assetSrc={assetSrc}
                    assetAlt={`${manifestation.title} original brand`}
                  />
                </div>
              </div>

              <figure className="mockup-frame relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0f10] p-2 sm:p-3">
                <img
                  src={manifestation.heroVisual.src}
                  alt={manifestation.heroVisual.alt}
                  className="h-full min-h-[320px] w-full rounded-[22px] object-cover sm:min-h-[420px]"
                  loading="eager"
                  decoding="async"
                />
              </figure>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {manifestation.detailSections.map((section) => (
              <article
                key={section.title}
                className="theme-panel reading-panel relative overflow-hidden rounded-[28px] border border-white/10 px-5 py-5 sm:px-6"
              >
                <div className="dither-panel absolute inset-0 opacity-25" />
                <div className="relative">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                    {section.title}
                  </p>
                  <p className="mt-4 text-[15px] leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
                    {section.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {manifestation.gallery.map((visual) => (
              <figure
                key={visual.src}
                className="mockup-frame relative overflow-hidden rounded-[26px] border border-white/10 bg-[#090c0e] p-2"
              >
                <img
                  src={visual.src}
                  alt={visual.alt}
                  className="h-56 w-full rounded-[18px] object-cover sm:h-64"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-8">
          <article className="theme-panel reading-panel relative overflow-hidden rounded-[28px] border border-white/10 px-5 py-5">
            <div className="dither-panel absolute inset-0 opacity-25" />
            <div className="relative space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                resumo
              </p>
              <p className="text-[15px] leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
                {manifestation.summary}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--dim)]">
                {manifestation.cue}
              </p>
            </div>
          </article>

          <article className="theme-panel reading-panel relative overflow-hidden rounded-[28px] border border-white/10 px-5 py-5">
            <div className="dither-panel absolute inset-0 opacity-25" />
            <div className="relative space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                acao
              </p>
              <p className="text-[15px] leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
                {manifestation.detail}
              </p>
              <a
                href={manifestation.ctaHref}
                className="inline-flex items-center justify-center rounded-full border border-[var(--accent)]/35 bg-[var(--accent-soft)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {manifestation.ctaLabel}
              </a>
            </div>
          </article>
        </aside>
      </div>
    </section>
  )
}
