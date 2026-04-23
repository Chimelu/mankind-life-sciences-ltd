import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../../app/auth/AuthContext'

export function SignInPage() {
  const navigate = useNavigate()
  const { signInDemo } = useAuth()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isRegisteredNotice = searchParams.get('registered') === '1'
  const isResetNotice = searchParams.get('reset') === '1'

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    signInDemo()
    navigate('/dashboard/profile')
  }

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-10 md:px-5">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
          Account Access
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-500">
          Continue to your dashboard, orders, and profile.
        </p>

        {isRegisteredNotice && (
          <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Account created. Sign in to continue.
          </p>
        )}
        {isResetNotice && (
          <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Password reset successful. Sign in with your new password.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
            />
          </label>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="rounded border-slate-300" />
              Remember me
            </label>
            <Link to="/auth/forgot-password" className="font-semibold text-brand-green hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="w-full rounded-full border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-green hover:text-brand-green"
          >
            Continue as guest
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          New here?{' '}
          <Link to="/auth/sign-up" className="font-semibold text-brand-green hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </section>
  )
}
