import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

export function OtpPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const [otp, setOtp] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    navigate(`/auth/reset-password?email=${encodeURIComponent(email)}`)
  }

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-10 md:px-5">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">Verification</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Enter OTP code</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter the code sent to {email || 'your email address'}.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            required
            maxLength={6}
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="6-digit code"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-center text-lg tracking-[0.35em] outline-none focus:border-brand-green"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Verify code
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to="/auth/forgot-password" className="font-semibold text-brand-green hover:underline">
            Resend code
          </Link>
          <Link to="/auth/sign-in" className="font-semibold text-slate-600 hover:text-brand-green">
            Back to sign in
          </Link>
        </div>
      </div>
    </section>
  )
}
