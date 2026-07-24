import { useEffect, useMemo, useState } from 'react'
import { categories } from '../data/site'
import { useGallery } from '../hooks/useGallery'
import Star8 from './Star8'

// يجمع صور كل الأقسام في قائمة واحدة يختار منها الزائر
function useAllPhotos() {
  const results = categories.map((cat) => useGallery(cat.id))
  return useMemo(() => {
    if (results.some((r) => r === null)) return null
    return categories.flatMap((cat, i) =>
      (results[i] ?? [])
        .filter((item) => item.type === 'image')
        .map((item) => ({ ...item, categoryLabel: cat.label })),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(results.map((r) => r?.length ?? 0))])
}

// الهيئات الثلاث الجاهزة — كلها تتكيّف تلقائيًا مع أبعاد أي صورة
const STYLES = [
  { id: 'canvas', label: 'لوحة كانفس' },
  { id: 'frame', label: 'إطار خشبي' },
  { id: 'wall', label: 'معلّقة على جدار' },
]

function StagePhoto({ src, styleId }) {
  const common = 'protect-media block max-h-[60vh] w-auto max-w-full object-contain'
  const guard = {
    draggable: false,
    onContextMenu: (e) => e.preventDefault(),
  }

  if (styleId === 'canvas') {
    // كانفس بحواف سميكة وظل جانبي يوحي بالبروز عن الجدار
    return (
      <div className="rounded-[2px] bg-white p-[6px] shadow-[10px_14px_30px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(0,0,0,0.06)]">
        <img src={src} alt="معاينة كانفس" className={common} {...guard} />
      </div>
    )
  }

  if (styleId === 'frame') {
    // باسبارتو أبيض + إطار خشبي داكن
    return (
      <div className="rounded-sm border-[10px] border-[#3a2f22] bg-white p-4 shadow-[0_20px_45px_rgba(0,0,0,0.55)]">
        <img src={src} alt="معاينة إطار" className={common} {...guard} />
      </div>
    )
  }

  // wall: الصورة معلّقة وسط جدار داكن مع إضاءة علوية خافتة وظل أرضي
  return (
    <div className="relative w-full">
      <div className="relative z-10 inline-block rounded-sm border-[6px] border-[#20242b] bg-black shadow-[0_24px_50px_rgba(0,0,0,0.6)]">
        <img src={src} alt="معاينة على جدار" className={common} {...guard} />
      </div>
    </div>
  )
}

export default function PrintMockup() {
  const photos = useAllPhotos()
  const [styleId, setStyleId] = useState(STYLES[0].id)
  const [photoIndex, setPhotoIndex] = useState(null)

  useEffect(() => {
    if (photos && photos.length > 0 && photoIndex === null) setPhotoIndex(0)
  }, [photos, photoIndex])

  const selected = photos && photoIndex !== null ? photos[photoIndex] : null

  return (
    <div>
      {/* اختيار الهيئة */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStyleId(s.id)}
            className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
              s.id === styleId
                ? 'border-gold bg-gold text-black'
                : 'border-line text-sand hover:border-gold/60 hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* منصّة العرض */}
        <div
          className="grid min-h-[340px] place-items-center overflow-hidden rounded-2xl border border-line p-6 sm:p-10"
          style={{
            background:
              styleId === 'wall'
                ? 'radial-gradient(120% 80% at 50% 0%, #2a2f38 0%, #14161b 55%, #0c0d11 100%)'
                : 'linear-gradient(180deg, #191a1f 0%, #101116 100%)',
          }}
        >
          {photos === null ? (
            <div className="h-64 w-48 animate-pulse rounded-lg bg-panel" />
          ) : selected ? (
            <StagePhoto src={selected.src} styleId={styleId} />
          ) : (
            <div className="text-center text-sm">
              <Star8 className="mx-auto mb-3 h-5 w-5 text-gold/70" />
              أضف صورًا لأي قسم أولاً لتظهر هنا
            </div>
          )}
        </div>

        {/* اختيار الصورة */}
        <div>
          <p className="mb-3 text-sm font-bold text-white">اختر إحدى صورك:</p>
          {photos === null ? (
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="aspect-square animate-pulse rounded-lg bg-panel" />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <p className="text-sm leading-7">
              لا توجد صور بعد. أضف صورًا لأي قسم ثم ارجع هنا لمعاينتها مطبوعة.
            </p>
          ) : (
            <div className="grid max-h-[420px] grid-cols-4 gap-2 overflow-y-auto lg:grid-cols-3">
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setPhotoIndex(i)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition ${
                    i === photoIndex
                      ? 'border-gold'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.categoryLabel}
                    className="protect-media h-full w-full object-cover"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </button>
              ))}
            </div>
          )}
          <p className="mt-4 text-xs leading-6 text-sand/70">
            معاينة تقريبية تساعد الزائر على تخيّل الصورة مطبوعة. تتكيّف الهيئات
            تلقائيًا مع أبعاد كل صورة دون أي إعداد منك.
          </p>
        </div>
      </div>
    </div>
  )
}
