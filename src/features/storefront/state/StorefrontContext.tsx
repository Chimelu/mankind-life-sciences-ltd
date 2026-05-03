import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { useAuth } from '../../../app/auth/AuthContext'
import { addFavourite, getFavouriteIds, removeFavourite } from '../../../api/favourites.api'

const CART_STORAGE_KEY = 'mankind-cart-items'
const FAVOURITES_STORAGE_KEY = 'mankind-favourite-ids'

export type CartItem = {
  id: number
  name: string
  sku: string
  price: number
  quantity: number
  moq: number
  pack: string
  image: string
}

type StorefrontContextValue = {
  cartItems: CartItem[]
  favouriteIds: number[]
  addToCart: (
    product: { id: number; name: string; price: number; image: string; packSize?: string },
    quantity?: number,
  ) => void
  setCartItemQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  addToFavourites: (productId: number) => Promise<void>
  removeFromFavourites: (productId: number) => Promise<void>
  isFavourite: (productId: number) => boolean
}

const StorefrontContext = createContext<StorefrontContextValue | null>(null)

function toCartItem(
  product: { id: number; name: string; price: number; image: string; packSize?: string },
  quantity: number,
): CartItem {
  return {
    id: product.id,
    name: product.name,
    sku: `MNK-${String(product.id)}`,
    price: product.price,
    quantity,
    moq: 1,
    pack: product.packSize ?? 'Pack',
    image: product.image,
  }
}

function readLocalJson<T>(key: string, fallback: T): T {
  const raw = window.localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    window.localStorage.removeItem(key)
    return fallback
  }
}

export function StorefrontProvider({ children }: PropsWithChildren) {
  const { isSignedIn } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [favouriteIds, setFavouriteIds] = useState<number[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setCartItems(readLocalJson<CartItem[]>(CART_STORAGE_KEY, []))
    setFavouriteIds(readLocalJson<number[]>(FAVOURITES_STORAGE_KEY, []))
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems, isHydrated])

  useEffect(() => {
    if (!isSignedIn) {
      setFavouriteIds(readLocalJson<number[]>(FAVOURITES_STORAGE_KEY, []))
      return
    }

    void (async () => {
      const localIds = readLocalJson<number[]>(FAVOURITES_STORAGE_KEY, [])
      if (localIds.length > 0) {
        for (const productId of localIds) {
          try {
            await addFavourite(productId)
          } catch {
            // Best effort sync from guest to signed-in account.
          }
        }
        window.localStorage.removeItem(FAVOURITES_STORAGE_KEY)
      }

      try {
        const ids = await getFavouriteIds()
        setFavouriteIds(ids)
      } catch {
        setFavouriteIds([])
      }
    })()
  }, [isSignedIn])

  const addToCart = (
    product: { id: number; name: string; price: number; image: string; packSize?: string },
    quantity = 1,
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (!existing) return [...prev, toCartItem(product, Math.max(1, quantity))]
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + Math.max(1, quantity) }
          : item,
      )
    })
  }

  const setCartItemQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    )
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const addToFavourites = async (productId: number) => {
    if (!isSignedIn) {
      setFavouriteIds((prev) => {
        if (prev.includes(productId)) return prev
        const next = [...prev, productId]
        window.localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(next))
        return next
      })
      return
    }

    const ids = await addFavourite(productId)
    setFavouriteIds(ids)
  }

  const removeFromFavourites = async (productId: number) => {
    if (!isSignedIn) {
      setFavouriteIds((prev) => {
        const next = prev.filter((id) => id !== productId)
        window.localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(next))
        return next
      })
      return
    }

    const ids = await removeFavourite(productId)
    setFavouriteIds(ids)
  }

  const value = useMemo<StorefrontContextValue>(
    () => ({
      cartItems,
      favouriteIds,
      addToCart,
      setCartItemQuantity,
      removeFromCart,
      addToFavourites,
      removeFromFavourites,
      isFavourite: (productId: number) => favouriteIds.includes(productId),
    }),
    [cartItems, favouriteIds],
  )

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>
}

export function useStorefront() {
  const ctx = useContext(StorefrontContext)
  if (!ctx) throw new Error('useStorefront must be used within StorefrontProvider')
  return ctx
}
