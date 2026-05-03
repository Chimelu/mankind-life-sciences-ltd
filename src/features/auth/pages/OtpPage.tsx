import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  sendPasswordResetOtp,
  sendRegistrationOtp,
  verifyPasswordResetOtp,
  verifyRegistrationOtp,
} from '../../../api/auth.api'

export function OtpPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const flow = searchParams.get('flow') ?? 'reset'
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setNotice('')

    if (flow === 'register') {
      setIsSubmitting(true)
      try {
        await verifyRegistrationOtp({ email, otp })
        navigate('/auth/sign-in?registered=1')
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'OTP verification failed')
      } finally {
        setIsSubmitting(false)
      }
      return
    }

    setIsSubmitting(true)
    try {
      await verifyPasswordResetOtp({ email, otp })
      navigate(`/auth/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'OTP verification failed')
    } finally {
      setIsSubmitting(false)
    }
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
            disabled={isSubmitting}
            className="w-full rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {isSubmitting ? 'Verifying...' : 'Verify code'}
          </button>
        </form>
        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
        {notice && <p className="mt-3 text-sm font-medium text-brand-green">{notice}</p>}

        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={async () => {
              if (flow === 'register') {
                try {
                  await sendRegistrationOtp(email)
                  setNotice('OTP resent to your email.')
                  setError('')
                } catch (requestError) {
                  setError(requestError instanceof Error ? requestError.message : 'Failed to resend OTP')
                }
                return
              }
              try {
                await sendPasswordResetOtp(email)
                setNotice('OTP resent to your email.')
                setError('')
              } catch (requestError) {
                setError(requestError instanceof Error ? requestError.message : 'Failed to resend OTP')
              }
            }}
            className="font-semibold text-brand-green hover:underline"
          >
            Resend code
          </button>
          <Link to="/auth/sign-in" className="font-semibold text-slate-600 hover:text-brand-green">
            Back to sign in
          </Link>
        </div>
      </div>
    </section>
  )
}
