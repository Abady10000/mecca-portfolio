import { useEffect, useState } from 'react'

const BASE = import.meta.env.BASE_URL

// نقرأ manifest.json مرة واحدة ونعيد استخدامه لكل الأقسام
let manifestPromise = null
function loadManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch(`${BASE}manifest.json`, { cache: 'no-store' }).then(
      (res) => {
        if (!res.ok) throw new Error('لم يتم العثور على manifest.json')
        return res.json()
      },
    )
  }
  return manifestPromise
}

const VIDEO_FILE = /\.(mp4|webm|mov)$/i

export function useGallery(folder) {
  const [items, setItems] = useState(null)

  useEffect(() => {
    let alive = true
    loadManifest()
      .then((manifest) => {
        if (!alive) return
        const files = manifest[folder] ?? []
        setItems(
          files.map((name) => ({
            name,
            src: `${BASE}${folder}/${encodeURIComponent(name)}`,
            type: VIDEO_FILE.test(name) ? 'video' : 'image',
          })),
        )
      })
      .catch(() => alive && setItems([]))
    return () => {
      alive = false
    }
  }, [folder])

  return items
}
