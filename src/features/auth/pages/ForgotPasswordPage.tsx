import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    navigate(`/auth/otp?email=${encodeURIComponent(email)}`)
  }

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-10 md:px-5">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">Password Help</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter your account email. We will send a verification code.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Send code
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link to="/auth/sign-in" className="font-semibold text-brand-green hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </section>
  )
}
