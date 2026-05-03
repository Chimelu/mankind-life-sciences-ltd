import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './app/auth/AuthContext'
import './index.css'
import App from './App.tsx'
import { StorefrontProvider } from './features/storefront/state/StorefrontContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StorefrontProvider>
          <App />
        </StorefrontProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
