import { Link } from 'react-router-dom'
import { useStorefront } from '../state/StorefrontContext'

export type Product = {
  id: number
  routeId?: string
  name: string
  description?: string
  category: string
  brand?: string
  packSize?: string
  manufacturer?: string
  price: number
  image: string
}

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToFavourites, isFavourite } = useStorefront()
  const productRouteId = product.routeId ?? String(product.id)

  return (
    <article className="rounded-2xl bg-white p-2.5 transition hover:shadow-sm">
      <Link to={`/products/${productRouteId}`} className="block">
        <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-100/70">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-2"
            loading="lazy"
          />
        </div>
      </Link>
      <Link to={`/products/${productRouteId}`} className="block">
        <p className="mt-3 line-clamp-2 min-h-11 text-[16px] font-semibold leading-5 text-slate-800 hover:text-brand-green">
          {product.name}
        </p>
      </Link>
      <p className="mt-1 text-sm text-slate-500">{product.category}</p>
      <p className="mt-1.5 text-3xl font-semibold leading-none text-slate-800">
        ₦{product.price.toLocaleString()}
      </p>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="inline-flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brand-red px-3 text-xs font-semibold text-white transition hover:opacity-90 active:scale-[0.98] sm:px-3.5 sm:text-sm"
        >
          <MiniCartIcon />
          <span>Add to cart</span>
        </button>
        <button
          type="button"
          onClick={() => addToFavourites(product.id)}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
            isFavourite(product.id)
              ? 'border-brand-red bg-brand-red text-white'
              : 'border-slate-300 text-slate-700 hover:border-brand-red hover:text-brand-red'
          }`}
          aria-label="Add to favourites"
        >
          <HeartIcon />
        </button>
      </div>
    </article>
  )
}

function MiniCartIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
      <path d="M3 4h2l2.1 10.3a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.7L21 7H6.2" />
    </svg>
  )
}

function HeartIcon() {
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
      <path d="M20.8 8.6a5 5 0 0 0-8.8-3.2 5 5 0 0 0-8.8 3.2c0 5.8 8.8 10.8 8.8 10.8s8.8-5 8.8-10.8Z" />
    </svg>
  )
}
