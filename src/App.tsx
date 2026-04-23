import { MainLayout } from './app/layout/MainLayout'
import { RequireAuth } from './app/routing/RequireAuth'
import { ScrollToTop } from './app/routing/ScrollToTop'
import { MyOrdersPage } from './features/dashboard/pages/MyOrdersPage'
import { OrderDetailsPage } from './features/dashboard/pages/OrderDetailsPage'
import { ProfilePage } from './features/dashboard/pages/ProfilePage'
import { AboutUsPage } from './features/storefront/pages/AboutUsPage'
import { AllProductsPage } from './features/storefront/pages/AllProductsPage'
import { CartPage } from './features/storefront/pages/CartPage'
import { ContactUsPage } from './features/storefront/pages/ContactUsPage'
import { FavouritesPage } from './features/storefront/pages/FavouritesPage'
import { HomePage } from './features/storefront/pages/HomePage'
import { PlaceholderPage } from './features/storefront/pages/PlaceholderPage'
import { ProductDetailsPage } from './features/storefront/pages/ProductDetailsPage'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Navigate to="/dashboard/profile" replace />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <RequireAuth>
              <MyOrdersPage />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/orders/:orderId"
          element={
            <RequireAuth>
              <OrderDetailsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/stores"
          element={
            <PlaceholderPage
              title="Our Stores"
              description="View our store locations and distribution centers across Nigeria."
            />
          }
        />
        <Route
          path="/contact"
          element={<ContactUsPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  )
}

export default App
