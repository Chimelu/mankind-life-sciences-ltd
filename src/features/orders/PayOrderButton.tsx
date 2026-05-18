import { useState } from 'react'
import { toast } from 'react-toastify'
import { initiatePayment, type Order } from '../../api/orders.api'
import { canPayOrder } from './order-utils'

type PayOrderButtonProps = {
  order: Pick<Order, 'id' | 'paymentStatus' | 'balanceDue'>
  label?: string
  className?: string
  onPaymentStarted?: () => void
}

export function PayOrderButton({
  order,
  label,
  className = 'rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60',
  onPaymentStarted,
}: PayOrderButtonProps) {
  const [isPaying, setIsPaying] = useState(false)

  if (!canPayOrder(order)) {
    return null
  }

  const buttonLabel =
    label ??
    (order.paymentStatus === 'partially_paid' ? 'Continue payment' : 'Pay now')

  const handlePay = async () => {
    setIsPaying(true)
    try {
      const callbackUrl = `${window.location.origin}/dashboard/orders/${order.id}`
      const result = await initiatePayment(order.id, { callbackUrl })
      onPaymentStarted?.()
      window.location.href = result.authorizationUrl
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not start payment')
      setIsPaying(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handlePay()}
      disabled={isPaying}
      className={className}
    >
      {isPaying ? 'Redirecting to Paystack...' : buttonLabel}
    </button>
  )
}
