import { useState } from 'react'
import { type Order } from '../../api/orders.api'
import { canPayOrder } from './order-utils'
import { PayAmountModal } from './PayAmountModal'

type PayOrderButtonProps = {
  order: Pick<
    Order,
    'id' | 'orderNumber' | 'paymentStatus' | 'balanceDue' | 'totalAmount' | 'amountPaid'
  >
  label?: string
  className?: string
}

export function PayOrderButton({
  order,
  label,
  className = 'rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60',
}: PayOrderButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!canPayOrder(order)) {
    return null
  }

  const buttonLabel =
    label ??
    (order.paymentStatus === 'partially_paid' ? 'Continue payment' : 'Pay now')

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        {buttonLabel}
      </button>

      <PayAmountModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderId={order.id}
        orderNumber={order.orderNumber}
        totalAmount={order.totalAmount}
        amountPaid={order.amountPaid}
        balanceDue={order.balanceDue}
      />
    </>
  )
}
