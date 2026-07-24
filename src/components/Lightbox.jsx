import { useCallback, useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6'
import { captions } from '../data/site'

export default function Lightbox({ items, index, setIndex, onClose, label, folder }) {
  const item = items[index]
  const hasMany = items.length > 1
  const wheelLock = useRef(false)
  const touchStartX = useRef(null)

  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length, setIndex],
  )
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length, setIndex],
  )

  // النص الذي يكتبه صاحب الموقع لهذه الصورة (إن وُجد) من ملف site.js
  const caption = captions[`${folder}/${item.name}`] || ''

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') next() // في اتجاه RTL: اليسار = التالي
      else if (e.key === 'ArrowRight') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [next, prev, onClose])

  // التنقّل بالتمرير (عجلة الفأرة/لوحة اللمس) بدل الاعتماد على السهم فقط
  const handleWheel = (e) => {
    if (!hasMany || wheelLock.current) return
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    if (Math.abs(delta) < 20) return
    wheelLock.current = true
    delta > 0 ? next() : prev()
    // قفل زمني بسيط يمنع القفز عدة صور دفعة واحدة بتمريرة واحدة
    setTimeout(() => (wheelLock.current = false), 450)
  }

  // التنقّل بالسحب على شاشات اللمس
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || !hasMany) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > 50) {
      // في RTL: السحب لليسار = الصورة التالية
      diff < 0 ? next() : prev()
    }
    touchStartX.current = null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={`عرض ${label}`}
    >
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute top-4 left-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-gold/60 hover:text-gold"
      >
        <FaXmark />
      </button>

      <span className="absolute top-6 right-6 text-sm font-bold text-sand">
        {index + 1} / {items.length}
      </span>

      {/* الصورة/الفيديو + النص أسفلها */}
      <figure
        className="flex max-h-[88vh] max-w-[92vw] flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'video' ? (
          <video
            key={item.src}
            src={item.src}
            controls
            controlsList="nodownload"
            autoPlay
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            className="protect-media max-h-[80vh] max-w-[92vw] rounded-lg"
          />
        ) : (
          <img
            src={item.src}
            alt={caption || `${label} — ${index + 1}`}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            className="protect-media max-h-[80vh] max-w-[92vw] select-none rounded-lg object-contain"
          />
        )}

        {caption && (
          <figcaption className="max-w-2xl px-4 text-center text-sm leading-7 text-sand">
            {caption}
          </figcaption>
        )}
      </figure>

      {hasMany && (
        <>
          <button
            type="button"
            aria-label="التالي"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-gold/60 hover:text-gold"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            aria-label="السابق"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-gold/60 hover:text-gold"
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  )
}
