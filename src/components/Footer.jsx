import { site } from '../data/site'
import Star8 from './Star8'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 text-center text-sm">
      <Star8 className="mx-auto mb-3 h-4 w-4 text-gold/70" />
      <p className="font-bold text-white">{site.name}</p>
      <p className="mt-1">
        © {new Date().getFullYear()} — جميع الحقوق محفوظة · جميع الصور والمقاطع
        في هذا الموقع ملك لصاحبه
      </p>
    </footer>
  )
}
