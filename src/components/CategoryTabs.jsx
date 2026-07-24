import { categories } from '../data/site'

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="sticky top-16 z-30 border-y border-line bg-ink/85 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4"
        aria-label="أقسام المعرض"
      >
        {categories.map((cat) => {
          const isActive = cat.id === active
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-3.5 text-sm font-bold transition ${
                isActive
                  ? 'border-gold text-gold'
                  : 'border-transparent text-sand hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
