import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    navigate('/auth/sign-in?reset=1')
  }

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-10 md:px-5">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">Reset Access</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Set new password</h1>
        <p className="mt-2 text-sm text-slate-500">
          Update password for {email || 'your account'}.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="New password"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm new password"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Reset password
          </button>
        </form>
      </div>
    </section>
  )
}
