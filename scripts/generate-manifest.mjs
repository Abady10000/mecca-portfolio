/**
 * ============================================================
 *  سكربت القراءة التلقائية للصور
 * ============================================================
 *  هذا السكربت يمسح كل المجلدات الموجودة داخل مجلد public
 *  ويكتب قائمة بأسماء الصور والفيديوهات في ملف public/manifest.json
 *  ثم يقرأ الموقع هذا الملف ويعرض كل شيء تلقائيًا.
 *
 *  ✅ لا تحتاج لتشغيله يدويًا: يعمل تلقائيًا قبل كل
 *     `npm run dev` وقبل كل `npm run build`.
 *  ✅ لتحديث الصور أثناء عمل الموقع: نفّذ `npm run photos`
 *     في نافذة طرفية أخرى ثم حدّث صفحة المتصفح.
 *  ✅ إذا أضفت قسمًا جديدًا للموقع: فقط أنشئ مجلدًا جديدًا داخل
 *     public وأضف اسمه في ملف src/data/site.js — السكربت سيلتقطه وحده.
 * ============================================================
 */
import { readdirSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.resolve(here, '..', 'public')

// المجلدات الأساسية: تُنشأ تلقائيًا إذا لم تكن موجودة
// (يجب أن تطابق قيم id في categories داخل src/data/site.js)
const DEFAULT_FOLDERS = [
  'Haram',
  'Hajj',
  'Makkah',
  'Views',
  'Lightning',
  'Sun&Moon',
  'Madinah',
  'Kingdom',
  'Travel',
  'Architectural',
]

// الصيغ المدعومة (صور + فيديو للتايم لابس)
const MEDIA_FILE = /\.(jpe?g|png|webp|avif|gif|mp4|webm|mov)$/i

mkdirSync(PUBLIC_DIR, { recursive: true })
for (const folder of DEFAULT_FOLDERS) {
  mkdirSync(path.join(PUBLIC_DIR, folder), { recursive: true })
}

const manifest = {}
for (const entry of readdirSync(PUBLIC_DIR)) {
  const fullPath = path.join(PUBLIC_DIR, entry)
  if (!statSync(fullPath).isDirectory()) continue

  manifest[entry] = readdirSync(fullPath)
    .filter((file) => MEDIA_FILE.test(file))
    .sort((a, b) => a.localeCompare(b, 'ar', { numeric: true }))
}

writeFileSync(
  path.join(PUBLIC_DIR, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf8',
)

const total = Object.values(manifest).reduce((n, files) => n + files.length, 0)
console.log('📸 تم تحديث قائمة الصور (public/manifest.json):')
for (const [folder, files] of Object.entries(manifest)) {
  console.log(`   ${folder.padEnd(15)} ${files.length} ملف`)
}
console.log(`   ${'المجموع'.padEnd(15)} ${total} ملف`)
