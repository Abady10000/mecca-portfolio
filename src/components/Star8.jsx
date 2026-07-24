// النجمة الثمانية — زخرفة هندسية إسلامية تُستخدم كعنصر مميز عبر الموقع
export default function Star8({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="6.3" y="6.3" width="11.4" height="11.4" />
      <rect x="6.3" y="6.3" width="11.4" height="11.4" transform="rotate(45 12 12)" />
    </svg>
  )
}
