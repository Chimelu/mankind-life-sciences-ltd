import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { catalogProducts } from '../data/catalogProducts'

const reviews = [
  {
    id: 1,
    name: 'CityCare Pharmacy, Enugu',
    rating: 5,
    text: 'Consistent quality and clean packaging. Reliable for repeat institutional orders.',
  },
  {
    id: 2,
    name: 'PrimeMed Clinic Supply',
    rating: 4,
    text: 'Delivery process is professional and product documentation is clear.',
  },
  {
    id: 3,
    name: 'HealthLine Dealer Network',
    rating: 5,
    text: 'Manufacturer-grade support and dependable stock updates across our branches.',
  },
]

export function ProductDetailsPage() {
  const { productId } = useParams()
  const product = catalogProducts.find((item) => String(item.id) === productId)
  const [quantity, setQuantity] = useState(1)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [isZoomed, setIsZoomed] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [activeInfoTab, setActiveInfoTab] = useState<'description' | 'reviews'>('description')

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return catalogProducts
      .filter((item) => item.id !== product.id && item.group === product.group)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <section className="mx-auto w-full max-w-[96rem] px-3 py-10 md:px-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
          <p className="mt-2 text-slate-600">
            This product is not available in the demo catalog.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white"
          >
            Back to all products
          </Link>
        </div>
      </section>
    )
  }

  const totalPrice = product.price * quantity
  const productUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://mankind.ng/products/${product.id}`

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Mankind.`,
          url: productUrl,
        })
        return
      }
      await navigator.clipboard.writeText(productUrl)
      setShareMessage('Product link copied.')
      window.setTimeout(() => setShareMessage(''), 1800)
    } catch {
      setShareMessage('Unable to share right now.')
      window.setTimeout(() => setShareMessage(''), 1800)
    }
  }

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5">
      <div className="mb-5 text-sm text-slate-500">
        <Link to="/" className="hover:text-brand-green">
          Home
        </Link>{' '}
        {'>'}{' '}
        <Link to="/products" className="hover:text-brand-green">
          All Products
        </Link>{' '}
        {'>'} <span className="font-medium text-brand-red">{product.name}</span>
      </div>

      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-5 md:grid-cols-[1fr,1.1fr] md:p-8">
        <div>
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-brand-green hover:text-brand-green"
            >
              <ShareIcon />
              Share
            </button>
          </div>
          <div className="flex h-[360px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-150 ease-out"
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
              }}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                const x = ((event.clientX - rect.left) / rect.width) * 100
                const y = ((event.clientY - rect.top) / rect.height) * 100
                setZoomPosition({ x, y })
              }}
            />
          </div>
          <div className="mt-3 flex gap-2">
            <img
              src={product.image}
              alt={`${product.name} thumbnail`}
              className="h-16 w-16 rounded-xl border border-slate-200 bg-white object-cover p-1"
            />
            <img
              src={product.image}
              alt={`${product.name} second thumbnail`}
              className="h-16 w-16 rounded-xl border border-slate-200 bg-white object-cover p-1"
            />
          </div>
          {shareMessage && <p className="mt-2 text-right text-xs font-medium text-brand-green">{shareMessage}</p>}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
            Manufactured by Mankind
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-medium text-amber-500">★★★★☆</span>
            <span className="text-slate-500">(4.8 / 5)</span>
            <span className="rounded-full bg-brand-green/10 px-2 py-0.5 text-xs font-semibold text-brand-green">
              58 Reviews
            </span>
          </div>

          <p className="mt-4 text-slate-600">{product.description}</p>

          <div className="mt-5 space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Category:</span>{' '}
              {product.category}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Brand:</span>{' '}
              {product.brand}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Pack size:</span>{' '}
              {product.packSize}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Manufacturer:</span>{' '}
              {product.manufacturer}
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Price</p>
            <p className="mt-1 text-4xl font-bold text-slate-900">
              ₦{product.price.toLocaleString()}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <p className="text-sm font-semibold text-slate-700">Quantity</p>
              <div className="inline-flex items-center rounded-lg border border-slate-300">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 text-slate-700"
                >
                  -
                </button>
                <span className="min-w-8 text-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1.5 text-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              Total Price:{' '}
              <span className="font-bold text-brand-red">
                ₦{totalPrice.toLocaleString()}
              </span>
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white">
                Buy now
              </button>
              <button className="rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 md:p-8">
        <div className="border-b border-slate-200">
          <div className="flex items-center gap-5 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveInfoTab('description')}
              className={`border-b-2 px-1 pb-2 pt-1 transition ${
                activeInfoTab === 'description'
                  ? 'border-brand-red text-brand-red'
                  : 'border-transparent text-slate-500'
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveInfoTab('reviews')}
              className={`border-b-2 px-1 pb-2 pt-1 transition ${
                activeInfoTab === 'reviews'
                  ? 'border-brand-red text-brand-red'
                  : 'border-transparent text-slate-500'
              }`}
            >
              Ratings & Review
            </button>
          </div>
        </div>

        {activeInfoTab === 'description' ? (
          <div className="mt-4 text-sm leading-7 text-slate-700">
            <p>{product.description}</p>
            <p className="mt-3">
              This product is supplied through our quality-controlled import and distribution
              channels, with professional support for pharmacies, clinics, and wholesale buyers.
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-4xl font-bold text-slate-900">4.8</p>
              <p className="text-amber-500">★★★★★</p>
              <p className="text-sm text-slate-500">Based on 58 verified reviews</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                  <p className="mt-1 text-xs text-amber-500">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
          You may also like
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          Related manufacturer products
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </section>
  )
}

function ShareIcon() {
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
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.4 15.4 17.6" />
      <path d="M15.4 6.4 8.6 10.6" />
    </svg>
  )
}
