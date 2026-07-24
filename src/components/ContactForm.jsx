import { useState } from 'react'
import { contactForm } from '../data/site'

const initialValues = { name: '', phone: '', email: '', message: '' }

const fieldClass =
  'w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-white placeholder:text-sand/40 outline-none transition focus:border-gold/60'

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | unconfigured

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const endpoint = (contactForm.formspreeEndpoint || '').trim()
    // نعتبر النموذج غير مفعّل إذا كان الرابط فارغًا أو ما زال يحمل قيمة المثال
    const isConfigured =
      endpoint.startsWith('https://formspree.io/f/') &&
      !endpoint.includes('xxxx') &&
      !endpoint.includes('abcd')

    if (!isConfigured) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })
      if (res.ok) {
        setStatus('sent')
        setValues(initialValues)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // بعد نجاح الإرسال: رسالة شكر تلقائية بدل النموذج
  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-gold/40 bg-gold/10 px-6 py-10 text-center">
        <p className="mb-2 text-xl font-extrabold text-white">شكرًا لتواصلك! 🌙</p>
        <p className="text-sm leading-7 text-sand">
          استلمنا طلبك بنجاح، وسيتم الرد عليك في أقرب وقت ممكن.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 text-sm font-bold text-gold hover:text-gold-bright"
        >
          إرسال طلب آخر
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <input
        required
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="الاسم الكامل"
        className={fieldClass}
      />
      <input
        required
        type="tel"
        name="phone"
        dir="ltr"
        value={values.phone}
        onChange={handleChange}
        placeholder="رقم الجوال"
        className={`${fieldClass} text-left`}
      />
      <input
        required
        type="email"
        name="email"
        dir="ltr"
        value={values.email}
        onChange={handleChange}
        placeholder="البريد الإلكتروني"
        className={`${fieldClass} text-left sm:col-span-2`}
      />
      <textarea
        required
        name="message"
        rows={4}
        value={values.message}
        onChange={handleChange}
        placeholder="اكتب طلبك أو رسالتك هنا..."
        className={`${fieldClass} resize-none sm:col-span-2`}
      />

      {status === 'unconfigured' && (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-6 text-amber-300 sm:col-span-2">
          ⚠️ نموذج التواصل لم يُفعَّل بعد. أضف رابط Formspree في{' '}
          <code>contactForm.formspreeEndpoint</code> داخل{' '}
          <code>src/data/site.js</code> حتى تصل الرسائل إلى بريدك.
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs leading-6 text-red-300 sm:col-span-2">
          حدث خطأ أثناء الإرسال. تأكد من اتصالك بالإنترنت أو تواصل عبر البريد
          مباشرة.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-full bg-gold px-6 py-3 text-sm font-extrabold text-black transition hover:bg-gold-bright disabled:opacity-60 sm:col-span-2"
      >
        {status === 'sending' ? 'جارٍ الإرسال…' : 'إرسال الطلب'}
      </button>
    </form>
  )
}
