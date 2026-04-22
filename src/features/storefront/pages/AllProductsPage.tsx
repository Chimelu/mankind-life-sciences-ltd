import { useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import {
  catalogProducts,
  type ProductGroup,
} from '../data/catalogProducts'
type SortBy = 'latest' | 'price-asc' | 'price-desc' | 'name-asc'

const filterGroups: ProductGroup[] = ['Drugs', 'Non-Drugs', 'Laboratory Tests']

export function AllProductsPage() {
  const [selectedGroup, setSelectedGroup] = useState<ProductGroup>('Drugs')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [sortBy, setSortBy] = useState<SortBy>('latest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const productsByGroup = useMemo(
    () => catalogProducts.filter((item) => item.group === selectedGroup),
    [selectedGroup],
  )

  const availableCategories = useMemo(() => {
    const unique = Array.from(new Set(productsByGroup.map((item) => item.category)))
    return ['All', ...unique]
  }, [productsByGroup])

  const brandCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const product of productsByGroup) {
      counts.set(product.brand, (counts.get(product.brand) ?? 0) + 1)
    }
    return counts
  }, [productsByGroup])

  const filteredProducts = useMemo(() => {
    const min = Number(minPrice || 0)
    const max = Number(maxPrice || Number.MAX_SAFE_INTEGER)

    const filtered = productsByGroup.filter((item) => {
      const categoryOk = selectedCategory === 'All' || item.category === selectedCategory
      const brandOk = selectedBrand === 'All' || item.brand === selectedBrand
      const priceOk = item.price >= min && item.price <= max
      return categoryOk && brandOk && priceOk
    })

    if (sortBy === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price)
    if (sortBy === 'name-asc') return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    return [...filtered].sort((a, b) => b.id - a.id)
  }, [productsByGroup, selectedCategory, selectedBrand, minPrice, maxPrice, sortBy])

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
              Category Products ({selectedGroup})
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {filteredProducts.length} items found
            </p>
          </div>

          <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm">
            <span className="text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortBy)}
              className="bg-transparent font-medium text-slate-700 outline-none"
            >
              <option value="latest">Latest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </label>
        </div>

        <div className="mt-3 flex justify-end md:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            <FilterIcon />
            Filter
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-start">
        <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-4 md:sticky md:top-28 md:block md:w-64 md:shrink-0">
          <FilterPanel
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            availableCategories={availableCategories}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            brandCounts={brandCounts}
            productsByGroupLength={productsByGroup.length}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </aside>

        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              No products found for this filter. Try another category, brand,
              or price range.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button
            className="absolute inset-0 bg-black/45"
            aria-label="Close filter panel"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Filter</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                Close
              </button>
            </div>
            <FilterPanel
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              availableCategories={availableCategories}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              brandCounts={brandCounts}
              productsByGroupLength={productsByGroup.length}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="mt-4 w-full rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white"
            >
              Apply filters
            </button>
          </aside>
        </div>
      )}
    </section>
  )
}

type FilterPanelProps = {
  selectedGroup: ProductGroup
  setSelectedGroup: (group: ProductGroup) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  availableCategories: string[]
  selectedBrand: string
  setSelectedBrand: (brand: string) => void
  brandCounts: Map<string, number>
  productsByGroupLength: number
  minPrice: string
  setMinPrice: (value: string) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
}

function FilterPanel({
  selectedGroup,
  setSelectedGroup,
  selectedCategory,
  setSelectedCategory,
  availableCategories,
  selectedBrand,
  setSelectedBrand,
  brandCounts,
  productsByGroupLength,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: FilterPanelProps) {
  return (
    <>
      <h2 className="text-lg font-semibold text-slate-900">Filter</h2>

      <div className="mt-4 border-t border-slate-200 pt-4">
        <p className="mb-2 text-sm font-semibold text-slate-700">Choose</p>
        <select
          value={selectedGroup}
          onChange={(event) => {
            setSelectedGroup(event.target.value as ProductGroup)
            setSelectedCategory('All')
            setSelectedBrand('All')
          }}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        >
          {filterGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="text-sm font-semibold text-slate-700">Categories</p>
        <div className="mt-3 space-y-2">
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition ${
                selectedCategory === category
                  ? 'bg-brand-green/10 font-semibold text-brand-green'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{category}</span>
              <span aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="text-sm font-semibold text-slate-700">Brands</p>
        <div className="mt-3 space-y-2">
          <button
            onClick={() => setSelectedBrand('All')}
            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition ${
              selectedBrand === 'All'
                ? 'bg-brand-green/10 font-semibold text-brand-green'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>All Brands</span>
            <span>{productsByGroupLength}</span>
          </button>
          {Array.from(brandCounts.entries()).map(([brand, count]) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition ${
                selectedBrand === brand
                  ? 'bg-brand-green/10 font-semibold text-brand-green'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{brand}</span>
              <span>{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="text-sm font-semibold text-slate-700">Price</p>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            placeholder="From"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm outline-none focus:border-brand-green"
          />
          <span className="text-slate-400">-</span>
          <input
            type="number"
            placeholder="To"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm outline-none focus:border-brand-green"
          />
        </div>
      </div>
    </>
  )
}

function FilterIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 5h18" />
      <path d="M6 12h12" />
      <path d="M10 19h4" />
    </svg>
  )
}
