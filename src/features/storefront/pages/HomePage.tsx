import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategories, type StoreCategory } from '../../../api/categories.api'
import { getAllDistributors } from '../../../api/distributors.api'
import { getProducts, type StoreProductItem } from '../../../api/products.api'
import { CategoryShowcase } from '../components/CategoryShowcase'
import { DealerCard } from '../components/DealerCard'
import type { Dealer } from '../components/DealerCard'
import { ProductCard, type Product } from '../components/ProductCard'

const slides = [
  {
    // eyebrow: 'Pharmaceutical imports and nationwide distribution',
    title: 'We Are Active in Pharmaceutical Imports and Distribution',
    subtitle:
      'We supply approved pharmaceutical products through trusted import channels and structured distribution networks for hospitals, pharmacies, and dealers.',
    cta: 'Start bulk ordering',
    tone: 'linear-gradient(135deg, rgba(216, 240, 221, 0.9), rgba(216, 240, 221, 0.72))',
    image: '/hero/slide-1.png',
  },
  {
    // eyebrow: 'Manufacturing roadmap and quality systems',
    title: 'Advancing Toward Scalable Local Manufacturing',
    subtitle:
      'As we expand into manufacturing, we are strengthening quality systems, operations, and compliance structures for reliable long-term production.',
    cta: 'Start bulk ordering',
    tone: 'linear-gradient(135deg, rgba(230, 244, 255, 0.9), rgba(230, 244, 255, 0.72))',
    image: '/hero/slide-2.png',
  },
  {
    eyebrow: 'Bulk orders and transparent fulfillment',
    title: 'Order in Bulk and Track Every Delivery Stage',
    subtitle:
      'From factory dispatch to dealer destination, monitor bulk order progress with clear status updates and professional support.',
    cta: 'Start bulk ordering',
    tone: 'linear-gradient(135deg, rgba(255, 241, 242, 0.9), rgba(255, 241, 242, 0.72))',
    image: '/hero/slide-3.png',
  },
]

export function HomePage() {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  const [mostPopularProducts, setMostPopularProducts] = useState<Product[]>([])
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({})
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState<StoreCategory[]>([])
  const [dealers, setDealers] = useState<Dealer[]>([])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 8000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let mounted = true
    const loadHomeProducts = async () => {
      try {
        const allCategories = await getAllCategories()
        const activeCategories = allCategories.filter((item) => item.isActive)

        if (!mounted) return
        setCategories(activeCategories)

        const [popularResult, ...categoryResults] = await Promise.all([
          getProducts({ page: 1, limit: 10 }),
          ...activeCategories.map((category) =>
            getProducts({
              categoryId: category.id,
              page: 1,
              limit: 10,
            }),
          ),
        ])

        if (!mounted) return

        setMostPopularProducts(
          popularResult.items.map((item, index) =>
            toStorefrontProduct(item, item.category?.name ?? 'Product', index),
          ),
        )

        const nextProductsByCategory: Record<string, Product[]> = {}
        activeCategories.forEach((category, index) => {
          const result = categoryResults[index]
          nextProductsByCategory[category.id] = result.items.map((item, itemIndex) =>
            toStorefrontProduct(item, category.name, itemIndex),
          )
        })
        setProductsByCategory(nextProductsByCategory)
      } catch {
        if (!mounted) return
        setCategories([])
        setMostPopularProducts([])
        setProductsByCategory({})
      } finally {
        if (mounted) {
          setLoadingProducts(false)
        }
      }
    }

    void loadHomeProducts()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    getAllDistributors()
      .then((data) => {
        setDealers(data)
      })
      .catch(() => {
        setDealers([])
      })
  }, [])

  const currentSlide = slides[activeSlide]
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length)

  const visibleProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return Object.values(productsByCategory).flat()
    }
    const selected = categories.find((category) => category.name === selectedCategory)
    if (!selected) return []
    return productsByCategory[selected.id] ?? []
  }, [categories, productsByCategory, selectedCategory])

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-6 md:px-5">
      <div
        className="relative overflow-hidden rounded-3xl p-4 md:px-6 md:py-5 lg:px-6 lg:py-4"
        style={{
          backgroundImage: currentSlide.tone,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 lg:hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.62)), url(${currentSlide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />
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

        <div className="relative z-10 grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_470px] lg:items-center">
          <div className="max-w-[620px] lg:justify-self-start lg:pl-12">
            {/* <p className="mb-3 inline-flex rounded-full border border-brand-green/20 bg-white/70 px-3 py-1 text-xs font-medium text-brand-green md:text-sm">
              {currentSlide.eyebrow}
            </p> */}
            <h1 className="text-3xl font-semibold leading-[1.08] text-slate-950 md:text-4xl lg:text-[2.2rem]">
              {currentSlide.title}
            </h1>
            <p className="mt-3 text-base text-slate-700 lg:text-[1rem]">
              {currentSlide.subtitle}
            </p>
            <button
              onClick={() => navigate('/products')}
              className="mt-5 rounded-full bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 md:text-base"
            >
              {currentSlide.cta}
            </button>
          </div>

          <div className="hidden items-center justify-end lg:flex">
            <div className="w-full max-w-[470px] pr-10">
              <img
                src={currentSlide.image}
                alt="Featured bulk order product"
                className="h-[260px] w-full rounded-[26px] bg-white/20 p-1 object-contain object-center"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-2 flex items-center justify-center gap-2">
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
        categories={categories.map((item) => item.name)}
        onSelectProductCategory={setSelectedCategory}
      />

      <section className="mt-9 space-y-10">
        {loadingProducts ? (
          <HomeShelvesSkeleton />
        ) : (
          <>
            <ProductShelf
              label="Most Popular"
              title="Trusted essentials customers reorder often"
              products={mostPopularProducts}
            />
            {categories.map((category) => (
              <ProductShelf
                key={category.id}
                label={category.name}
                title={`Top picks in ${category.name}`}
                products={productsByCategory[category.id] ?? []}
              />
            ))}
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
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-green">
            {label}
          </p>
          <h2 className="mt-1 truncate text-lg font-semibold text-slate-900 sm:text-2xl md:text-3xl">
            {title}
          </h2>
        </div>
        <button className="shrink-0 inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/5 px-3 py-1.5 text-xs font-semibold text-brand-green transition hover:border-brand-green hover:bg-brand-green hover:text-white sm:px-4 sm:py-2 sm:text-sm">
          View all
          <span aria-hidden="true">→</span>
        </button>
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

function toStorefrontProduct(
  item: StoreProductItem,
  fallbackCategoryName: string,
  seed: number,
): Product {
  return {
    id: toStableNumberId(item.id, seed),
    routeId: item.id,
    name: item.name,
    description: '',
    category: item.category?.name ?? fallbackCategoryName,
    brand: 'Mankind',
    packSize: '1 pack',
    manufacturer: 'Mankind Life Sciences',
    price: Number(item.price),
    image: item.imageUrl,
  }
}

function toStableNumberId(value: string, seed = 0) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash + seed) || seed + 1
}

function HomeShelvesSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, sectionIndex) => (
        <section key={sectionIndex} className="animate-pulse">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="mt-2 h-8 w-72 rounded bg-slate-200" />
          <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((__, itemIndex) => (
              <div key={itemIndex} className="rounded-2xl border border-slate-200 bg-white p-3">
                <div className="h-40 rounded-xl bg-slate-200" />
                <div className="mt-3 h-4 w-4/5 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
                <div className="mt-3 h-5 w-2/5 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
