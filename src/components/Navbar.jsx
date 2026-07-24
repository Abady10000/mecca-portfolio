import { useState } from 'react'
import Star8 from './Star8'
import { site, printSettings } from '../data/site'

const links = [
  { href: '#works', label: 'الأعمال' },
  { href: '#prints', label: 'عروض الطباعة', requiresPrints: true },
  { href: '#contact', label: 'تواصل' },
  { href: '#social', label: 'روابط التواصل', hideOnMobile: true },
].filter((link) => !link.requiresPrints || printSettings.enabled)

export default function Navbar() {
  // إن تعطّل تحميل ملف الشعار (غير موجود بعد) نرجع تلقائيًا للاسم النصي
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = Boolean(site.logo) && !logoFailed

  return (
    <header className="sticky top-0 z-40 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2.5 text-white">
          {showLogo ? (
            <img
              src={site.logo}
              alt={site.name}
              className="h-9 w-auto object-contain"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <>
              <Star8 className="h-5 w-5 text-gold" />
              <span className="font-display text-2xl font-bold">{site.name}</span>
            </>
          )}
        </a>
        <nav className="flex items-center gap-6 text-sm font-bold">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${link.hideOnMobile ? 'hidden sm:block' : ''} text-sand transition hover:text-gold`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      {/* خيط ذهبي رفيع — إشارة إلى حزام الكسوة */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to left, transparent, rgba(214, 169, 79, 0.55), transparent)',
        }}
      />
    </header>
  )
}
