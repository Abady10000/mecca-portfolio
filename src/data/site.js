/**
 * ============================================================
 *  ملف المحتوى — هذا هو الملف الوحيد الذي تحتاج تعديله غالبًا
 * ============================================================
 *  1) غيّر اسمك وبريدك في كائن site بالأسفل.
 *  2) logo   = الشعار الصغير أعلى الشريط (public/logo.png)
 *     heroLogo = الشعار الكبير في الواجهة بدل الاسم (public/logo2.png)
 *  3) في socialLinks: عدّل الروابط، واحذف أي سطر لا تحتاجه.
 *  4) في categories: كل قسم مربوط بمجلد داخل public.
 *  5) captions: النص الذي يظهر عند فتح الصورة — تكتبه بنفسك هنا.
 *  6) contactForm: رابط Formspree لاستقبال رسائل نموذج التواصل.
 * ============================================================
 */
import {
  FaInstagram,
  FaXTwitter,
  FaSnapchat,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
} from 'react-icons/fa6'

export const site = {
  name: 'YOUSSEF BAJJASH', // ← يظهر فقط إذا لم يوجد شعار
  tagline: 'معرض تصوير ضوئي · مكة المكرمة',
  email: 'albajjash@egmail.com', // ← بريدك الإلكتروني
  location: 'مكة المكرمة، المملكة العربية السعودية',
  intro:
    'من قلب مكة المكرمة، حيث يمتزج نور الروح بجمال الضوء، أسعى لتوثيق تفاصيل لا تكتمل إلا بعدساتي. من هدوء المسجد الحرام في سكون الليل، إلى وهج البروق التي تلامس أفق المدينة، أنقل لكم رؤيتي الخاصة للعالم، من مكة إلى آفاق دولية.',

  // الشعار الصغير أعلى شريط التنقل (اتركه '' لعرض الاسم النصي)
  logo: '/logo.png',

  // الشعار الكبير في الواجهة الرئيسية بدل الاسم المكتوب
  // (اتركه '' لعرض الاسم النصي الكبير كما كان)
  heroLogo: '/logo2.png',
}

// كل قسم: id = اسم المجلد داخل public، label = الاسم الظاهر في الموقع
export const categories = [
  { id: 'Haram', label: 'المسجد الحرام' },
  { id: 'Hajj', label: 'الحج' },
  { id: 'Makkah', label: 'أحياء مكة' },
  { id: 'Views', label: 'إطلالات' },
  { id: 'Lightning', label: 'البروق' },
  { id: 'Sun&Moon', label: 'الشمس والقمر' },
  { id: 'Madinah', label: 'طيبة الطيبة' },
  { id: 'Kingdom', label: 'مملكتنا' },
  { id: 'Travel', label: 'رحلات خارجية' },
  { id: 'Architectural', label: 'معماري' },
  // { id: 'Products', label: 'منتجات' },
  // { id: 'timelapse', label: 'تايم لابس' },
]

/**
 * نصوص الصور (تظهر عند فتح الصورة بملء الشاشة)
 * ------------------------------------------------------------
 * المفتاح = "اسم-المجلد/اسم-الملف" تمامًا كما هو في public.
 * مثال: صورة public/Haram/sunset.jpg مفتاحها 'Haram/sunset.jpg'.
 * أي صورة لا تكتب لها نصًا هنا، تُفتح ببساطة دون نص — لا مشكلة.
 */
export const captions = {
  // 'Haram/sunset.jpg': 'غروب على المسجد الحرام — عدسة مقربة، شتاء ٢٠٢٤',
  // 'Lightning/storm-1.jpg': 'عاصفة رعدية فوق أطراف مكة، تعريض ٢٥ ثانية',
}

// روابط التواصل: عدّل الروابط فقط، واحذف ما لا تحتاجه
export const socialLinks = [
  { label: 'إنستغرام', url: 'https://instagram.com/youssef_bajjash', icon: FaInstagram },
  //{ label: 'إكس (تويتر)', url: 'https://x.com/youssef_bajjash', icon: FaXTwitter },
  //{ label: 'سناب شات', url: 'https://snapchat.com/add/y2020y', icon: FaSnapchat },
  { label: 'تيك توك', url: 'https://tiktok.com/@youssef_bajjash', icon: FaTiktok },
  { label: 'يوتيوب', url: 'https://youtube.com/@youssef_bajjash', icon: FaYoutube },
  //{ label: 'واتساب', url: 'https://wa.me/966508535633', icon: FaWhatsapp },
  { label: 'البريد', url: 'mailto:albajjash@egmail.com', icon: FaEnvelope },
]

/**
 * عروض الطباعة — نسخة مبسّطة
 * ------------------------------------------------------------
 * لا حاجة لأي إحداثيات أو صور غرف. الزائر يختار إحدى صورك،
 * ويشاهدها معروضة في ثلاث هيئات جاهزة تتكيّف تلقائيًا مع أبعاد
 * صورته (كانفس، إطار خشبي، معلّقة على جدار). لا يحتاج منك شيئًا.
 * يمكنك فقط التحكم بتفعيل/تعطيل القسم كله من هنا:
 */
export const printSettings = {
  enabled: false, // ← اجعلها false لإخفاء تبويب عروض الطباعة كليًا
}

/**
 * نموذج التواصل (الاسم + الجوال + البريد + الرسالة)
 * ------------------------------------------------------------
 * خطوات التفعيل (مجانًا عبر Formspree):
 *  1) أنشئ حسابًا في https://formspree.io
 *  2) أنشئ نموذجًا جديدًا (New Form) واختر بريدك لاستقبال الرسائل
 *  3) انسخ الرابط (مثل https://formspree.io/f/xnjkwawg) والصقه أدناه
 */
export const contactForm = {
  formspreeEndpoint: 'https://formspree.io/f/xnjkwawg', // ← رابط Formspree الخاص بك
}
