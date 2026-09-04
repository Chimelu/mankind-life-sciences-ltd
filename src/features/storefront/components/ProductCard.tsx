import { Link } from 'react-router-dom'
// `useStorefront` is only needed by the commented-out cart and favourites buttons.
// import { useStorefront } from '../state/StorefrontContext'

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
  // `addToCart`, `addToFavourites` and `isFavourite` are unused while the cart and
  // favourites buttons are commented out below.
  // const { addToCart, addToFavourites, isFavourite } = useStorefront()
  const productRouteId = product.routeId ?? String(product.id)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.28)]">
      <div className="relative">
        <Link to={`/products/${productRouteId}`} className="block">
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/70">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>
        {/* Add to favourites hidden for now
        <button
          type="button"
          onClick={() => addToFavourites(product.id)}
          className={`absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${
            isFavourite(product.id)
              ? 'bg-brand-red text-white shadow-sm'
              : 'bg-white/85 text-slate-600 shadow-sm hover:bg-white hover:text-brand-red'
          }`}
          aria-label="Add to favourites"
        >
          <HeartIcon />
        </button>
        */}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-green sm:text-[11px]">
          {product.category}
        </p>
        <Link to={`/products/${productRouteId}`} className="block">
          <h3 className="mt-1.5 line-clamp-2 min-h-10 text-[14px] font-semibold leading-[1.35] text-slate-800 transition group-hover:text-brand-green sm:min-h-11 sm:text-[16px]">
            {product.name}
          </h3>
        </Link>

        {/* Price hidden for now
        <p className="mt-1.5 text-3xl font-semibold leading-none text-slate-800">
          ₦{product.price.toLocaleString()}
        </p>
        */}

        <div className="mt-auto flex items-center gap-2 pt-4">
          {/* Add to cart hidden for now
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brand-red px-3 text-xs font-semibold text-white transition hover:opacity-90 active:scale-[0.98] sm:px-3.5 sm:text-sm"
          >
            <MiniCartIcon />
            <span>Add to cart</span>
          </button>
          */}
          <Link
            to={`/products/${productRouteId}`}
            className="inline-flex h-9 w-full items-center justify-center gap-1 whitespace-nowrap rounded-full bg-slate-100 px-2 text-[12px] font-semibold text-slate-700 transition hover:bg-brand-green hover:text-white active:scale-[0.98] sm:h-10 sm:gap-1.5 sm:px-4 sm:text-sm"
          >
            <span>View details</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  )
}

/* Used by the commented-out add-to-cart button
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
*/

function ArrowIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

/* Used by the commented-out favourites button
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
*/
