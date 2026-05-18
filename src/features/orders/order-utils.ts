import type { Order, OrderPaymentStatus } from '../../api/orders.api'

export type OrderFulfillmentStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

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

export function formatFulfillmentStatus(status: string) {
  switch (status) {
    case 'pending':
      return 'Pending'
    case 'processing':
      return 'Processing'
    case 'shipped':
      return 'Shipped'
    case 'delivered':
      return 'Delivered'
    case 'cancelled':
      return 'Cancelled'
    default:
      return status.replace(/_/g, ' ')
  }
}

export function fulfillmentStatusClass(status: string) {
  switch (status) {
    case 'delivered':
      return 'bg-emerald-100 text-emerald-700'
    case 'shipped':
      return 'bg-blue-100 text-blue-700'
    case 'processing':
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
