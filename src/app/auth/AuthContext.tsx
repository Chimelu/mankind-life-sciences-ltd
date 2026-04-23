import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

type User = {
  name: string
  email: string
  organization: string
}

type AuthContextValue = {
  user: User | null
  isSignedIn: boolean
  signInDemo: () => void
  signOut: () => void
  updateUser: (nextUser: User) => void
}

const STORAGE_KEY = 'mankind-auth-user'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setUser(JSON.parse(saved) as User)
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const signInDemo = () => {
    const demoUser: User = {
      name: 'Chinedu Okafor',
      email: 'buyer@mankinddealer.ng',
      organization: 'Okafor Community Pharmacy',
    }
    setUser(demoUser)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
  }

  const signOut = () => {
    setUser(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  const updateUser = (nextUser: User) => {
    setUser(nextUser)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isSignedIn: Boolean(user),
      signInDemo,
      signOut,
      updateUser,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
