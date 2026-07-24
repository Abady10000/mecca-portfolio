import { useEffect, useRef, useState } from 'react'
import { FaPlay } from 'react-icons/fa6'
import { useGallery } from '../hooks/useGallery'
import Lightbox from './Lightbox'
import Star8 from './Star8'

// مقاسات كل شريحة حسب طبيعة القسم:
// بانوراميات = شريحة واحدة بعرض كامل، تايم لابس = عرض فيديو، الباقي = بورتريه
function slideSizing(folder) {
  if (folder === 'pano') return 'w-full aspect-[21/9]'
  if (folder === 'timelapse') return 'w-full sm:w-[640px] aspect-video'
  return 'w-full sm:w-[420px] aspect-[4/5]'
}

export default function Gallery({ folder, label }) {
  const items = useGallery(folder)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const trackRef = useRef(null)
  const slideRefs = useRef([])

  // تحديث النقطة النشطة أثناء التمرير حسب الصورة الظاهرة فعليًا
  useEffect(() => {
    if (!items || items.length === 0) return
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveSlide(Number(entry.target.dataset.index))
          }
        })
      },
      { root: track, threshold: [0.6] },
    )

    slideRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  const goToSlide = (i) => {
    slideRefs.current[i]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    })
  }

  // عجلة الفأرة فوق المعرض تحرّك الصور أفقيًا (بدل أن تبقى عالقة بلا أثر)،
  // بينما التمرير الرأسي للصفحة خارج منطقة المعرض يبقى يعمل كالمعتاد
  const handleWheel = (e) => {
    const track = trackRef.current
    if (!track) return
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return // تمرير أفقي أصلاً (تراك باد) اتركه طبيعيًا
    e.preventDefault()
    track.scrollLeft += e.deltaY
  }

  // 1) جارِ التحميل
  if (items === null) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${slideSizing(folder)} shrink-0 animate-pulse rounded-2xl bg-panel`}
          />
        ))}
      </div>
    )
  }

  // 2) المجلد فارغ — رسالة ترشدك أين تضع صورك
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gold/30 bg-panel/40 px-6 py-16 text-center">
        <Star8 className="mx-auto mb-4 h-6 w-6 text-gold/70" />
        <p className="mb-2 text-lg font-extrabold text-white">
          قسم «{label}» فارغ حاليًا
        </p>
        <p className="mb-5 text-sm leading-7">
          انسخ صورك إلى المجلد التالي ثم أعد تشغيل الموقع بالأمر{' '}
          <code className="text-gold">npm run dev</code>
        </p>
        <code
          dir="ltr"
          className="rounded-lg bg-black/60 px-4 py-2 text-sm text-gold"
        >
          public/{folder}/
        </code>
      </div>
    )
  }

  // 3) عرض تمريري أفقي: كل صورة تملأ الشاشة تقريبًا، يتوقف عند آخر صورة،
  //    ويمكن الرجوع للخلف بالتمرير في أي وقت (بدون تكرار الدورة)
  return (
    <>
      <div
        ref={trackRef}
        onWheel={handleWheel}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
      >
        {items.map((item, i) => {
          return (
            <figure
              key={item.src}
              ref={(el) => (slideRefs.current[i] = el)}
              data-index={i}
              className={`${slideSizing(folder)} group relative shrink-0 snap-start cursor-zoom-in overflow-hidden rounded-2xl border border-line transition hover:border-gold/60`}
              onClick={() => setLightboxIndex(i)}
            >
              {item.type === 'video' ? (
                <>
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    className="protect-media h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-black/30 transition group-hover:bg-black/10">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-black/60 text-gold">
                      <FaPlay />
                    </span>
                  </span>
                </>
              ) : (
                <img
                  src={item.src}
                  alt={`${label} — ${i + 1}`}
                  loading="lazy"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  className="protect-media h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              )}
            </figure>
          )
        })}
      </div>

      {/* نقاط التنقل — تدل على عدد الصور وموقعك الحالي بينها */}
      {items.length > 1 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`الانتقال إلى العنصر ${i + 1} من ${items.length}`}
              aria-current={i === activeSlide}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeSlide ? 'w-6 bg-gold' : 'w-2 bg-line hover:bg-sand/50'
              }`}
            />
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          setIndex={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          label={label}
          folder={folder}
        />
      )}
    </>
  )
}
