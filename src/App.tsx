import { MainLayout } from './app/layout/MainLayout'
import { AboutUsPage } from './features/storefront/pages/AboutUsPage'
import { AllProductsPage } from './features/storefront/pages/AllProductsPage'
import { ContactUsPage } from './features/storefront/pages/ContactUsPage'
import { HomePage } from './features/storefront/pages/HomePage'
import { PlaceholderPage } from './features/storefront/pages/PlaceholderPage'
import { ProductDetailsPage } from './features/storefront/pages/ProductDetailsPage'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
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
