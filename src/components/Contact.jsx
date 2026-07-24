import { FaEnvelope, FaLocationDot } from 'react-icons/fa6'
import { site, socialLinks } from '../data/site'
import ContactForm from './ContactForm'
import Star8 from './Star8'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line bg-panel/30">
      <div className="mx-auto max-w-6xl px-4 py-20">
        {/* نموذج التواصل */}
        <div className="mx-auto mb-16 max-w-2xl">
          <h2 className="mb-4 flex items-center gap-3 font-display text-3xl font-bold text-white">
            <Star8 className="h-4 w-4 text-gold" />
            راسلنا مباشرة
          </h2>
          <p className="mb-8 leading-8">
            عبّئ النموذج التالي وسنتواصل معك في أقرب وقت — لطلبات التصوير،
            استخدام الصور، أو اقتناء نسخ مطبوعة.
          </p>
          <ContactForm />
        </div>

        <div className="grid gap-14 border-t border-line pt-16 md:grid-cols-2">
          {/* تواصل */}
          <div>
            <h2 className="mb-4 flex items-center gap-3 font-display text-3xl font-bold text-white">
              <Star8 className="h-4 w-4 text-gold" />
              تواصل
            </h2>
            <p className="mb-8 leading-8">
              للتعاون، طلبات وجلسات التصوير، استخدام الصور، أو اقتناء نسخ مطبوعة
              من الأعمال — يسعدني تواصلكم في أي وقت.
            </p>
            <div className="mb-5">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 text-sm font-extrabold text-black transition hover:bg-gold-bright"
              >
                <FaEnvelope />
                <span dir="ltr">{site.email}</span>
              </a>
            </div>
            <p className="flex items-center gap-2 text-sm">
              <FaLocationDot className="text-gold" />
              {site.location}
            </p>
          </div>

          {/* روابط التواصل */}
          <div id="social" className="scroll-mt-24">
            <h2 className="mb-4 flex items-center gap-3 font-display text-3xl font-bold text-white">
              <Star8 className="h-4 w-4 text-gold" />
              روابط التواصل
            </h2>
            <p className="mb-8 leading-8">تابعوا جديد الأعمال أولًا بأول عبر المنصات:</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {socialLinks.map(({ label, url, icon: Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center gap-2 rounded-xl border border-line bg-ink/60 p-4 transition hover:border-gold/70 hover:bg-panel"
                >
                  <Icon className="text-2xl text-sand transition group-hover:text-gold" />
                  <span className="text-xs font-bold">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
