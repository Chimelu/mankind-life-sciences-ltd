import type { PropsWithChildren } from 'react'
import { Navbar } from '../../features/storefront/components/Navbar'
import { Footer } from '../../features/storefront/components/Footer'

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-ink">
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </div>
  )
}
