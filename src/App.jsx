import { useState } from 'react'
import { categories, printSettings } from './data/site'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryTabs from './components/CategoryTabs'
import Gallery from './components/Gallery'
import PrintMockup from './components/PrintMockup'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Star8 from './components/Star8'

export default function App() {
  const [active, setActive] = useState(categories[0].id)
  const activeCategory = categories.find((cat) => cat.id === active)

  return (
    <div id="top" className="min-h-screen">
      <Navbar />
      <Hero />

      <div id="works" className="scroll-mt-16">
        <CategoryTabs active={active} onChange={setActive} />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-6 flex items-center gap-3 font-display text-3xl font-bold text-white">
            <Star8 className="h-4 w-4 text-gold" />
            {activeCategory.label}
          </h2>
          {/* key={active} يعيد بناء المعرض عند تغيير القسم */}
          <Gallery key={active} folder={active} label={activeCategory.label} />
        </main>
      </div>

      {printSettings.enabled && (
        <section id="prints" className="scroll-mt-16 border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="mb-2 flex items-center gap-3 font-display text-3xl font-bold text-white">
              <Star8 className="h-4 w-4 text-gold" />
              عروض الطباعة
            </h2>
            <p className="mb-8 leading-8">
              تخيّل شكل أي صورة من أعمالنا مطبوعة — اختر الهيئة والصورة وشاهد
              النتيجة مباشرة.
            </p>
            <PrintMockup />
          </div>
        </section>
      )}

      <Contact />
      <Footer />
    </div>
  )
}
