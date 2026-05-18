import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders, type Order } from '../../../api/orders.api'
import { PayOrderButton } from '../../orders/PayOrderButton'
import {
  formatOrderDate,
  formatPaymentStatus,
  paymentStatusClass,
} from '../../orders/order-utils'

export function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError('')

    getOrders({ page: 1, limit: 50 })
      .then((result) => {
        if (mounted) setOrders(result.items)
      })
      .catch((err: unknown) => {
        if (mounted) {
          setOrders([])
          setError(err instanceof Error ? err.message : 'Failed to load orders')
        }
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
          Dashboard
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
          My Orders
        </h1>
      </div>

      {error && (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading && (
        <div className="mt-5 space-y-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={`order-skeleton-${index}`}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-64 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-32 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      )}

      {!loading && orders.length === 0 && !error && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">You have not placed any orders yet.</p>
          <Link
            to="/products"
            className="mt-4 inline-flex rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white"
          >
            Browse products
          </Link>
        </div>
      )}

      <div className="mt-5 space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-green/40 hover:shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Link
                  to={`/dashboard/orders/${order.id}`}
                  className="font-semibold text-slate-900 hover:text-brand-green"
                >
                  {order.orderNumber}
                </Link>
                <span
                  className={`ml-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${paymentStatusClass(order.paymentStatus)}`}
                >
                  {formatPaymentStatus(order.paymentStatus)}
                </span>
              </div>
              <PayOrderButton order={order} />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Date: {formatOrderDate(order.createdAt)} ·{' '}
              {order.fulfillmentMethod === 'delivery' ? 'Delivery' : 'Pickup'}
            </p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <p className="font-semibold text-slate-900">
                Total: ₦{order.totalAmount.toLocaleString()}
              </p>
              <p className="text-slate-600">Paid: ₦{order.amountPaid.toLocaleString()}</p>
              {order.balanceDue > 0 && (
                <p className="font-semibold text-brand-red">
                  Balance: ₦{order.balanceDue.toLocaleString()}
                </p>
              )}
            </div>
            <Link
              to={`/dashboard/orders/${order.id}`}
              className="mt-3 inline-block text-sm font-semibold text-brand-green hover:underline"
            >
              View details
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
