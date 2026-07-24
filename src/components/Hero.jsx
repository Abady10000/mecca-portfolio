import { useState } from 'react'
import Star8 from './Star8'
import { site } from '../data/site'

export default function Hero() {
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = Boolean(site.heroLogo) && !logoFailed

  return (
    <section className="relative overflow-hidden">
      {/* توهج ذهبي خافت في أعلى الصفحة */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 right-1/2 h-[480px] w-[820px] translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center md:py-32">
        <p className="mb-5 text-sm font-bold tracking-widest text-gold">
          {site.tagline}
        </p>

        {showLogo ? (
          <img
            src={site.heroLogo}
            alt={site.name}
            onError={() => setLogoFailed(true)}
            className="mx-auto h-28 w-auto object-contain md:h-40"
          />
        ) : (
          <h1 className="font-display text-5xl font-bold text-white md:text-7xl">
            {site.name}
          </h1>
        )}

        <div className="my-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gold/40" />
          <Star8 className="h-4 w-4 text-gold" />
          <span className="h-px w-16 bg-gold/40" />
        </div>

        <p className="mx-auto max-w-3xl font-display text-xl leading-[2.3] text-zinc-300 md:text-2xl">
          {site.intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#works"
            className="rounded-full bg-gold px-7 py-3 text-sm font-extrabold text-black transition hover:bg-gold-bright"
          >
            تصفّح الأعمال
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-7 py-3 text-sm font-extrabold text-white transition hover:border-gold/70 hover:text-gold"
          >
            تواصل معي
          </a>
        </div>
      </div>
    </section>
  )
}
