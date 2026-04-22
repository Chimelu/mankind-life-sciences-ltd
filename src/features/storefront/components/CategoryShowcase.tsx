type CategoryTab = 'Drugs Category' | 'Non-Drugs Category' | 'Laboratory Tests Category'

type CategoryItem = {
  name: string
  group: CategoryTab
  accent: string
  icon: string
  productCategory: string
}

const categoryItems: CategoryItem[] = [
  {
    name: 'Vitamins and Supplements',
    group: 'Drugs Category',
    accent: 'bg-green-100 text-green-600',
    icon: 'V',
    productCategory: 'Vitamins',
  },
  {
    name: 'Antimalaria',
    group: 'Drugs Category',
    accent: 'bg-rose-100 text-rose-600',
    icon: 'A',
    productCategory: 'Tablets',
  },
  {
    name: 'Pain Relievers',
    group: 'Drugs Category',
    accent: 'bg-slate-100 text-slate-700',
    icon: 'P',
    productCategory: 'Pain Relief',
  },
  {
    name: 'Anti-asthma',
    group: 'Drugs Category',
    accent: 'bg-violet-100 text-violet-600',
    icon: 'S',
    productCategory: 'Syrups',
  },
  {
    name: 'Personal Care',
    group: 'Non-Drugs Category',
    accent: 'bg-amber-100 text-amber-600',
    icon: 'C',
    productCategory: 'All',
  },
  {
    name: 'Baby Care',
    group: 'Non-Drugs Category',
    accent: 'bg-cyan-100 text-cyan-600',
    icon: 'B',
    productCategory: 'All',
  },
  {
    name: 'Medical Devices',
    group: 'Non-Drugs Category',
    accent: 'bg-indigo-100 text-indigo-600',
    icon: 'M',
    productCategory: 'All',
  },
  {
    name: 'Diagnostics',
    group: 'Laboratory Tests Category',
    accent: 'bg-emerald-100 text-emerald-700',
    icon: 'D',
    productCategory: 'All',
  },
]

type CategoryShowcaseProps = {
  selectedTab: CategoryTab
  onTabChange: (tab: CategoryTab) => void
  onSelectProductCategory: (category: string) => void
}

export function CategoryShowcase({
  selectedTab,
  onTabChange,
  onSelectProductCategory,
}: CategoryShowcaseProps) {
  const tabs: CategoryTab[] = [
    'Drugs Category',
    'Non-Drugs Category',
    'Laboratory Tests Category',
  ]

  const visibleItems = categoryItems.filter((item) => item.group === selectedTab)

  return (
    <section className="mt-8 p-1">
      <div className="flex flex-wrap gap-6 border-b border-slate-200 px-1 pb-3">
        {tabs.map((tab) => {
          const isActive = tab === selectedTab
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`pb-2 text-sm font-medium transition ${
                isActive
                  ? 'border-b-2 border-brand-red text-brand-red'
                  : 'text-slate-500 hover:text-brand-green'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
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
