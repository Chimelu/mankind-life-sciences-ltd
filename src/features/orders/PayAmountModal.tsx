import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { initiatePayment } from '../../api/orders.api'

const MIN_PAYMENT_NAIRA = 100

type PayAmountModalProps = {
  open: boolean
  onClose: () => void
  orderId: string
  orderNumber?: string
  totalAmount: number
  amountPaid: number
  balanceDue: number
  allowSkip?: boolean
  onSkipped?: () => void
  title?: string
}

export function PayAmountModal({
  open,
  onClose,
  orderId,
  orderNumber,
  totalAmount,
  amountPaid,
  balanceDue,
  allowSkip = false,
  onSkipped,
  title = 'Make a payment',
}: PayAmountModalProps) {
  const [amountInput, setAmountInput] = useState('')
  const [isPaying, setIsPaying] = useState(false)

  useEffect(() => {
    if (open) {
      setAmountInput(String(balanceDue))
      setIsPaying(false)
    }
  }, [open, balanceDue])

  if (!open) return null

  const parsedAmount = Number.parseFloat(amountInput.replace(/,/g, ''))

  const handlePay = async () => {
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast.error('Enter a valid payment amount')
      return
    }

    if (parsedAmount < MIN_PAYMENT_NAIRA) {
      toast.error(`Minimum payment is ₦${MIN_PAYMENT_NAIRA.toLocaleString()}`)
      return
    }

    if (parsedAmount > balanceDue) {
      toast.error(`Amount cannot exceed your balance of ₦${balanceDue.toLocaleString()}`)
      return
    }

    setIsPaying(true)
    try {
      const callbackUrl = `${window.location.origin}/dashboard/orders/${orderId}`
      const result = await initiatePayment(orderId, {
        amount: parsedAmount,
        callbackUrl,
      })
      window.location.href = result.authorizationUrl
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not start payment')
      setIsPaying(false)
    }
  }

  const handleSkip = () => {
    onSkipped?.()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-5">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        onClick={isPaying ? undefined : onClose}
        aria-label="Close"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pay-amount-title"
        className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
              Payment
            </p>
            <h2 id="pay-amount-title" className="mt-1 text-xl font-bold text-slate-900">
              {title}
            </h2>
            {orderNumber && (
              <p className="mt-1 text-sm text-slate-600">Order {orderNumber}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPaying}
            className="rounded-full border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 disabled:opacity-50"
          >
            Close
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-brand-red/20 bg-red-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">
            Amount owing
          </p>
          <p className="mt-1 text-3xl font-bold text-brand-red">
            ₦{balanceDue.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Order total ₦{totalAmount.toLocaleString()} · Paid so far ₦
            {amountPaid.toLocaleString()}
          </p>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-700">
            How much do you want to pay now?
          </span>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
              ₦
            </span>
            <input
              type="number"
              min={MIN_PAYMENT_NAIRA}
              max={balanceDue}
              step="1"
              value={amountInput}
              onChange={(event) => setAmountInput(event.target.value)}
              disabled={isPaying}
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-8 pr-3 text-sm font-semibold outline-none focus:border-brand-green disabled:bg-slate-50"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Pay in full or enter a partial amount (min ₦{MIN_PAYMENT_NAIRA.toLocaleString()}).
          </p>
        </label>

        <div className={`mt-6 grid gap-2 ${allowSkip ? 'sm:grid-cols-2' : ''}`}>
          {allowSkip && (
            <button
              type="button"
              onClick={handleSkip}
              disabled={isPaying}
              className="rounded-full border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-green hover:text-brand-green disabled:opacity-60"
            >
              Skip for now
            </button>
          )}
          <button
            type="button"
            onClick={() => void handlePay()}
            disabled={isPaying}
            className="rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPaying ? 'Redirecting to Paystack...' : 'Continue to Paystack'}
          </button>
        </div>
      </div>
    </div>
  )
}
