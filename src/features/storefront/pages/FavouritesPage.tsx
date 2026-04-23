import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { catalogProducts } from '../data/catalogProducts'

export function FavouritesPage() {
  const [favouriteIds, setFavouriteIds] = useState<number[]>([101, 103, 107, 110])
  const [addedToCartIds, setAddedToCartIds] = useState<number[]>([])
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  const favouriteProducts = useMemo(
    () => catalogProducts.filter((product) => favouriteIds.includes(product.id)),
    [favouriteIds],
  )

  const removeFavourite = (productId: number) => {
    setFavouriteIds((prev) => prev.filter((id) => id !== productId))
    setAddedToCartIds((prev) => prev.filter((id) => id !== productId))
  }

  const addToCart = (productId: number) => {
    setAddedToCartIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]))
  }

  const pendingDeleteProduct = favouriteProducts.find(
    (product) => product.id === pendingDeleteId,
  )

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
              Saved Items
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              My Favourites
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {favouriteProducts.length} saved product
              {favouriteProducts.length === 1 ? '' : 's'} ready for reorder.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full border border-brand-green px-4 py-2 text-sm font-semibold text-brand-green transition hover:bg-brand-green hover:text-white"
          >
            Explore products
          </Link>
        </div>
      </div>

      {favouriteProducts.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
            <HeartIcon className="h-7 w-7 text-brand-green" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">No favourites yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Save products you order often so your team can quickly add them to cart
            during wholesale restock.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Add favourites
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {favouriteProducts.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-slate-200 bg-white p-2.5 transition hover:shadow-sm sm:p-3.5"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-xl bg-slate-100/80 p-2 sm:h-36 sm:p-2.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </Link>

              <Link to={`/products/${product.id}`} className="block">
                <p className="mt-2 line-clamp-2 min-h-10 text-xs font-semibold leading-4 text-slate-800 hover:text-brand-green sm:mt-3 sm:min-h-11 sm:text-sm sm:leading-5">
                  {product.name}
                </p>
              </Link>

              <p className="mt-1 line-clamp-1 text-[11px] text-slate-500 sm:text-xs">
                {product.category}
              </p>
              <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                ₦{product.price.toLocaleString()}
              </p>

              <div className="mt-2.5 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  className={`inline-flex min-h-9 flex-1 items-center justify-center rounded-full px-2.5 py-2 text-[11px] font-semibold transition active:scale-[0.98] sm:min-h-10 sm:px-3 sm:text-xs ${
                    addedToCartIds.includes(product.id)
                      ? 'bg-brand-green text-white'
                      : 'bg-brand-red text-white hover:opacity-90'
                  }`}
                >
                  {addedToCartIds.includes(product.id) ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDeleteId(product.id)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-red-300 hover:text-red-600"
                  aria-label={`Remove ${product.name} from favourites`}
                >
                  <TrashIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {pendingDeleteId !== null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            onClick={() => setPendingDeleteId(null)}
            aria-label="Close remove confirmation"
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Remove saved item?</h3>
            <p className="mt-2 text-sm text-slate-600">
              {pendingDeleteProduct?.name
                ? `Are you sure you want to remove ${pendingDeleteProduct.name} from your saved items?`
                : 'Are you sure you want to remove this item from your saved items?'}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setPendingDeleteId(null)}
                className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (pendingDeleteId !== null) {
                    removeFavourite(pendingDeleteId)
                  }
                  setPendingDeleteId(null)
                }}
                className="flex-1 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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

function TrashIcon() {
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
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  )
}
