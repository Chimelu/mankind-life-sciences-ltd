import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
          <ToastContainer
            position="top-right"
            autoClose={2200}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
            toastClassName="rounded-xl border border-slate-200 shadow-lg"
            className="text-sm font-medium"
          />
        </StorefrontProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
