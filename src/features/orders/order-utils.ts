import type { Order, OrderPaymentStatus } from '../../api/orders.api'

export function formatPaymentStatus(status: OrderPaymentStatus) {
  switch (status) {
    case 'pending_payment':
      return 'Awaiting payment'
    case 'partially_paid':
      return 'Partially paid'
    case 'paid':
      return 'Paid'
    case 'cancelled':
      return 'Cancelled'
    default:
      return status
  }
}

export function paymentStatusClass(status: OrderPaymentStatus) {
  switch (status) {
    case 'paid':
      return 'bg-emerald-100 text-emerald-700'
    case 'partially_paid':
      return 'bg-amber-100 text-amber-700'
    case 'cancelled':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}

export function canPayOrder(order: Pick<Order, 'paymentStatus' | 'balanceDue'>) {
  return order.paymentStatus !== 'paid' && order.paymentStatus !== 'cancelled' && order.balanceDue > 0
}

export function formatOrderDate(value: string) {
  return new Date(value).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
