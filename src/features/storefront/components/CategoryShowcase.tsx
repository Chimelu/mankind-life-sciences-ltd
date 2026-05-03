type CategoryItem = {
  name: string
  accent: string
  icon: string
  productCategory: string
}

type CategoryShowcaseProps = {
  categories?: string[]
  onSelectProductCategory: (category: string) => void
}

export function CategoryShowcase({
  categories = [],
  onSelectProductCategory,
}: CategoryShowcaseProps) {
  const visibleItems: CategoryItem[] = categories.map((name, index) => {
    const accents = [
      'bg-green-100 text-green-600',
      'bg-rose-100 text-rose-600',
      'bg-cyan-100 text-cyan-600',
      'bg-indigo-100 text-indigo-600',
      'bg-amber-100 text-amber-600',
    ]
    return {
      name,
      accent: accents[index % accents.length],
      icon: name.slice(0, 1).toUpperCase(),
      productCategory: name,
    }
  })

  return (
    <section className="mt-8 p-1">
      <div className="mt-1 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {visibleItems.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl border border-slate-200 p-4 transition hover:border-brand-red/40 hover:shadow-sm"
          >
            <span
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-lg font-semibold ${item.accent}`}
            >
              {item.icon}
            </span>
            <h3 className="mt-4 text-lg font-medium text-slate-800">{item.name}</h3>
            <button
              onClick={() => onSelectProductCategory(item.productCategory)}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-red transition hover:gap-2"
            >
              View Category
              <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
