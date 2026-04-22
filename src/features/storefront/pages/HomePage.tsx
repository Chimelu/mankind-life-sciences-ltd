import { useEffect, useMemo, useState } from 'react'
import { CategoryShowcase } from '../components/CategoryShowcase'
import { DealerCard } from '../components/DealerCard'
import { ProductCard, type Product } from '../components/ProductCard'
import { dealers } from '../data/dealers'

const slides = [
  {
    eyebrow: 'Manufacturer-grade pharmaceutical production',
    title: 'Drug Manufacturing Backed by Quality Control',
    subtitle:
      'We produce trusted pharmaceutical products with disciplined process controls, quality assurance, and dependable supply standards.',
    cta: 'View manufacturing lines',
    tone: 'bg-[#d8f0dd]',
  },
  {
    eyebrow: 'Trading and distribution network',
    title: 'Reliable Pharmaceutical Trading for B2B Supply',
    subtitle:
      'Source approved products for hospitals, pharmacies, clinics, and distributors through our structured trading channels.',
    cta: 'Explore trading catalog',
    tone: 'bg-[#e6f4ff]',
  },
  {
    eyebrow: 'Bulk orders and transparent fulfillment',
    title: 'Order in Bulk and Track Every Delivery Stage',
    subtitle:
      'From factory dispatch to dealer destination, monitor bulk order progress with clear status updates and professional support.',
    cta: 'Start bulk ordering',
    tone: 'bg-[#fff1f2]',
  },
]

const demoProducts: Product[] = [
  {
    id: 1,
    name: 'Mebendazol 100mg *30 Tabs',
    category: 'Tablets',
    price: 9250,
    image: 'https://images.unsplash.com/photo-1626676812991-c65f0f8f4f0c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Panadol Extra *20 Caplets',
    category: 'Pain Relief',
    price: 7700,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Adapalene Gel Micro 0.1%',
    category: 'Skin Care',
    price: 7300,
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Differin Gel 0.1% 45g',
    category: 'Skin Care',
    price: 29700,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    name: 'Vitaced Complete A-Z',
    category: 'Vitamins',
    price: 17550,
    image: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    name: 'Vitaced C Effervescent',
    category: 'Vitamins',
    price: 6850,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    name: 'Metformin 500mg Pack',
    category: 'Tablets',
    price: 4950,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    name: 'Immunity Booster Syrup',
    category: 'Syrups',
    price: 11200,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=600&q=80',
  },
]

function fetchDemoProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(demoProducts), 450)
  })
}

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<
    'Drugs Category' | 'Non-Drugs Category' | 'Laboratory Tests Category'
  >('Drugs Category')

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let mounted = true
    fetchDemoProducts().then((data) => {
      if (!mounted) return
      setProducts(data)
      setLoadingProducts(false)
    })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    setSelectedCategory('All')
  }, [selectedCategoryTab])

  const currentSlide = slides[activeSlide]
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length)

  const visibleProducts = useMemo(() => {
    if (selectedCategory === 'All') return products
    return products.filter((product) => product.category === selectedCategory)
  }, [products, selectedCategory])

  const mostPopularProducts = useMemo(() => products.slice(0, 5), [products])
  const mankindCoreManufacturing = useMemo(
    () => products.filter((item) => ['Tablets', 'Syrups'].includes(item.category)),
    [products],
  )
  const mankindSpecialtyCare = useMemo(
    () => products.filter((item) => ['Skin Care', 'Pain Relief'].includes(item.category)),
    [products],
  )
  const mankindWellnessRange = useMemo(
    () => products.filter((item) => item.category === 'Vitamins'),
    [products],
  )

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-6 md:px-5">
      <div className={`relative overflow-hidden rounded-3xl p-5 md:p-7 ${currentSlide.tone}`}>
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm transition hover:bg-white md:block"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm transition hover:bg-white md:block"
          aria-label="Next slide"
        >
          <ChevronRightIcon />
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-brand-green/20 bg-white/70 px-3 py-1 text-xs font-medium text-brand-green md:text-sm">
              {currentSlide.eyebrow}
            </p>
            <h1 className="max-w-2xl text-3xl font-semibold leading-[1.08] text-slate-950 md:text-5xl">
              {currentSlide.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-700 md:text-lg">
              {currentSlide.subtitle}
            </p>
            <button className="mt-5 rounded-full bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 md:text-base">
              {currentSlide.cta}
            </button>
          </div>

          <div className="relative hidden h-[250px] lg:block">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-brand-red/15" />
            <div className="absolute right-10 top-14 h-44 w-44 rounded-full bg-brand-green/20" />
            <div className="absolute right-20 top-24 h-40 w-40 rounded-full bg-brand-blue/15" />
            <div className="absolute bottom-1 left-2 rounded-2xl bg-white px-6 py-4 shadow-md">
              <p className="text-sm font-medium text-brand-muted">Mankind care</p>
              <p className="text-xl font-semibold text-brand-ink">
                Professional support
              </p>
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition ${
                index === activeSlide ? 'w-7 bg-brand-blue' : 'w-2 bg-slate-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <CategoryShowcase
        selectedTab={selectedCategoryTab}
        onTabChange={setSelectedCategoryTab}
        onSelectProductCategory={setSelectedCategory}
      />

      <section className="mt-9 space-y-10">
        {loadingProducts ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading products...
          </div>
        ) : (
          <>
            <ProductShelf
              label="Most Popular"
              title="Trusted essentials customers reorder often"
              products={mostPopularProducts}
            />
            <ProductShelf
              label="Mankind Core Manufacturing"
              title="Factory-driven tablets and syrups for daily care"
              products={mankindCoreManufacturing}
            />
            <ProductShelf
              label="Mankind Specialty Care"
              title="Targeted skin and pain management solutions"
              products={mankindSpecialtyCare}
            />
            <ProductShelf
              label="Mankind Wellness Range"
              title="Vitamins and immunity support for preventive care"
              products={mankindWellnessRange}
            />
            <ProductShelf
              label="Filtered by Category"
              title={`Showing ${selectedCategory} selections`}
              products={visibleProducts}
            />
          </>
        )}
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-green">
              Our Stores
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900 md:text-3xl">
              Visit or call any Mankind location
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            For orders, wholesale supply, and product inquiries
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {dealers.map((dealer) => (
            <DealerCard
              key={dealer.id}
              dealer={dealer}
              badgeLabel="Mankind Store"
              showFocus={false}
            />
          ))}
        </div>
      </section>
    </section>
  )
}

type ProductShelfProps = {
  label: string
  title: string
  products: Product[]
}

function ProductShelf({ label, title, products }: ProductShelfProps) {
  if (products.length === 0) return null

  return (
    <section>
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-green">
            {label}
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900 md:text-3xl">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-500">
            {products.length} product{products.length === 1 ? '' : 's'}
          </p>
          <button className="inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/5 px-4 py-2 text-sm font-semibold text-brand-green transition hover:border-brand-green hover:bg-brand-green hover:text-white">
            View all products
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={`${label}-${product.id}`} product={product} />
        ))}
      </div>
    </section>
  )
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
