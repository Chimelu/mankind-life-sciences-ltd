import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../app/auth/AuthContext'
import { navLinks } from '../data/navigation'
import { catalogProducts } from '../data/catalogProducts'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

export function Navbar() {
  const navigate = useNavigate()
  const { isSignedIn, signOut, user } = useAuth()
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false)
  const [isProfilePinned, setIsProfilePinned] = useState(false)
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const closeTimeoutRef = useRef<number | null>(null)
  const initials = user?.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  useEffect(() => {
    setIsMobileProfileOpen(false)
    setIsProfilePinned(false)
    setIsLogoutConfirmOpen(false)
    setIsMobileSearchOpen(false)
    setSearchQuery('')
  }, [location.pathname])

  const isDesktopViewport = () =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches

  const openProfileMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsMobileProfileOpen(true)
  }

  const handleProfileTriggerClick = () => {
    setIsMobileProfileOpen((prevOpen) => {
      if (prevOpen && isProfilePinned) {
        setIsProfilePinned(false)
        return false
      }
      setIsProfilePinned(true)
      return true
    })
  }

  const scheduleCloseProfileMenu = () => {
    if (!isDesktopViewport()) return
    if (isProfilePinned) return
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMobileProfileOpen(false)
    }, 120)
  }

  const isProfileRoute = location.pathname.startsWith('/dashboard/profile')
  const isOrdersRoute = location.pathname.startsWith('/dashboard/orders')
  const searchSuggestions = searchQuery.trim()
    ? catalogProducts
        .filter((product) => product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
        .slice(0, 8)
    : []

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[96rem] items-center gap-3 px-3 py-3 md:px-5">
        <Link to="/" className="flex items-center gap-0.5">
          <img
            src="/logo_no_background.png"
            alt="Mankind logo"
            className="h-10 w-10 object-contain"
          />
          <span className="-ml-0.5 text-xl font-semibold tracking-tight text-brand-green md:text-2xl">
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
            type="button"
            onClick={() => setIsMobileSearchOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full p-2 transition hover:bg-slate-100 md:hidden"
            aria-label="Open search"
          >
            <SearchIcon />
          </button>
          <Link
            to="/cart"
            className="relative rounded-full p-2 transition hover:bg-slate-100"
            aria-label="Cart"
          >
            <CartIcon />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
              3
            </span>
          </Link>
          <Link
            to="/favourites"
            className="relative rounded-full p-2 transition hover:bg-slate-100"
            aria-label="Favourites"
          >
            <HeartIcon />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
              4
            </span>
          </Link>
          {isSignedIn ? (
            <>
              <button
                onClick={handleProfileTriggerClick}
                onMouseEnter={() => {
                  if (isDesktopViewport()) {
                    setIsProfilePinned(false)
                    openProfileMenu()
                  }
                }}
                onMouseLeave={scheduleCloseProfileMenu}
                className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/5 px-3 py-1.5 text-sm font-semibold text-brand-green transition hover:bg-brand-green hover:text-white"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">
                  {initials || 'U'}
                </span>
                <span className="hidden md:inline">Profile</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth/sign-in"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            >
              Sign in
            </Link>
          )}
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

      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-[85] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              setIsMobileSearchOpen(false)
              setSearchQuery('')
            }}
            aria-label="Close search"
          />
          <div className="relative rounded-b-3xl border-b border-slate-200 bg-white px-3 pb-4 pt-3 shadow-xl">
            <div className="flex items-center gap-2">
              <label className="relative flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </span>
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-full border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-green"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsMobileSearchOpen(false)
                  setSearchQuery('')
                }}
                className="rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>

            {searchQuery.trim() && (
              <div className="mt-3 max-h-[55vh] overflow-auto rounded-2xl border border-slate-200 bg-white p-2">
                {searchSuggestions.length === 0 ? (
                  <p className="px-2 py-3 text-sm text-slate-500">
                    No matching products found.
                  </p>
                ) : (
                  <div className="space-y-1">
                    {searchSuggestions.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setIsMobileSearchOpen(false)
                          setSearchQuery('')
                          navigate(`/products/${product.id}`)
                        }}
                        className="block w-full rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-100"
                      >
                        <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.category}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isSignedIn && isMobileProfileOpen && (
        <div className="fixed inset-0 z-[80] md:pointer-events-none">
          <button
            className="absolute inset-0 bg-black/40 md:hidden"
            onClick={() => setIsMobileProfileOpen(false)}
            aria-label="Close profile menu"
          />
          <aside
            onMouseEnter={() => {
              if (isDesktopViewport() && !isProfilePinned) openProfileMenu()
            }}
            onMouseLeave={scheduleCloseProfileMenu}
            className="absolute right-0 top-0 h-dvh w-[78%] max-w-xs bg-white p-5 shadow-2xl md:pointer-events-auto md:w-[360px] md:max-w-none md:border-l md:border-slate-200"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
                  {initials || 'U'}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.organization}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsProfilePinned(false)
                  setIsMobileProfileOpen(false)
                }}
                className="rounded-full border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <Link
                to="/dashboard/profile"
                className={`block rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                  isProfileRoute
                    ? 'border-brand-green/30 bg-brand-green/10 text-brand-green'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                Profile
              </Link>
              <Link
                to="/dashboard/orders"
                className={`block rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                  isOrdersRoute
                    ? 'border-brand-green/30 bg-brand-green/10 text-brand-green'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                My Orders
              </Link>
              <button
                onClick={() => setIsLogoutConfirmOpen(true)}
                className="block w-full rounded-xl border border-red-200 px-3 py-2.5 text-left text-sm font-medium text-red-600"
              >
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {isSignedIn && isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
          <button
            className="absolute inset-0 bg-black/45"
            onClick={() => setIsLogoutConfirmOpen(false)}
            aria-label="Close logout confirmation"
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Confirm logout</h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to logout from your dashboard?
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsLogoutConfirmOpen(false)
                  setIsMobileProfileOpen(false)
                  signOut()
                }}
                className="flex-1 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand-ink" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}
