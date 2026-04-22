import { navLinks } from '../data/navigation'
import { Link, NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[96rem] items-center gap-3 px-3 py-3 md:px-5">
        <Link to="/" className="flex items-center gap-1">
          <img
            src="/logo_no_background.png"
            alt="Mankind logo"
            className="h-10 w-10 object-contain"
          />
          <span className="-ml-0.5 text-2xl font-semibold tracking-tight text-brand-green">
            Mankind
          </span>
        </Link>

        <label className="relative hidden flex-1 md:block">
          <input
            type="search"
            placeholder="Search for drugs and healthcare products"
            className="w-full rounded-full border border-slate-300 px-5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-green"
          />
        </label>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="relative rounded-full p-2 transition hover:bg-slate-100"
            aria-label="Cart"
          >
            <CartIcon />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
              0
            </span>
          </button>
          <button
            className="relative rounded-full p-2 transition hover:bg-slate-100"
            aria-label="Wishlist"
          >
            <HeartIcon />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
              0
            </span>
          </button>
          <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-brand-ink transition hover:border-brand-green hover:text-brand-green">
            Sign in
          </button>
        </div>
      </div>

      <div className="bg-slate-950 text-white">
        <nav className="mx-auto flex w-full max-w-[96rem] items-center justify-center gap-6 overflow-x-auto px-3 py-3 text-sm md:px-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `whitespace-nowrap font-medium transition hover:text-brand-red ${
                  isActive ? 'text-brand-red' : 'text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function CartIcon() {
  return (
    <svg
      className="h-5 w-5 text-brand-ink"
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
      className="h-5 w-5 text-brand-ink"
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
