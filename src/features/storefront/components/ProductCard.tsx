import { Link } from 'react-router-dom'

export type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
}

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-2xl bg-white p-2.5 transition hover:shadow-sm">
      <Link to={`/products/${product.id}`} className="block">
        <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-100/70">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-2"
            loading="lazy"
          />
        </div>
      </Link>
      <Link to={`/products/${product.id}`} className="block">
        <p className="mt-3 line-clamp-2 min-h-11 text-[16px] font-semibold leading-5 text-slate-800 hover:text-brand-green">
          {product.name}
        </p>
      </Link>
      <p className="mt-1 text-sm text-slate-500">{product.category}</p>
      <p className="mt-1.5 text-3xl font-semibold leading-none text-slate-800">
        ₦{product.price.toLocaleString()}
      </p>
      <button className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-red px-3.5 text-sm font-medium text-white transition hover:opacity-90">
        <MiniCartIcon />
        <span>Add to cart</span>
      </button>
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
