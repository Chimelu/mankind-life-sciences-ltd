import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, sendRegistrationOtp } from '../../../api/auth.api'

export function SignUpPage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [cac, setCac] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    setIsSubmitting(true)

    try {
      await registerUser({
        fullName,
        companyName,
        cac,
        address,
        email,
        password,
      })
      await sendRegistrationOtp(email)
      navigate(`/auth/otp?flow=register&email=${encodeURIComponent(email)}`)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-10 md:px-5">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">Get Started</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-500">Set up your account for orders and tracking.</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Full name"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />
          <input
            required
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            placeholder="Company name"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />
          <input
            required
            value={cac}
            onChange={(event) => setCac(event.target.value)}
            placeholder="CAC number"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />
          <input
            required
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Address"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
          />

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/auth/sign-in" className="font-semibold text-brand-green hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}
