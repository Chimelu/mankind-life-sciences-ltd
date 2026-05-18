import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders, type Order } from '../../../api/orders.api'
import { PayOrderButton } from '../../orders/PayOrderButton'
import {
  formatFulfillmentStatus,
  formatOrderDate,
  formatPaymentStatus,
  fulfillmentStatusClass,
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
            <div className="min-w-0">
              <Link
                to={`/dashboard/orders/${order.id}`}
                className="break-all font-semibold text-slate-900 hover:text-brand-green"
              >
                {order.orderNumber}
              </Link>
              <div className="mt-2 flex flex-wrap gap-2">
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${paymentStatusClass(order.paymentStatus)}`}
                >
                  Payment: {formatPaymentStatus(order.paymentStatus)}
                </span>
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${fulfillmentStatusClass(order.fulfillmentStatus)}`}
                >
                  Order: {formatFulfillmentStatus(order.fulfillmentStatus)}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Date: {formatOrderDate(order.createdAt)} ·{' '}
                {order.fulfillmentMethod === 'delivery' ? 'Delivery' : 'Pickup'}
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-2 text-sm lg:grid lg:grid-cols-3 lg:gap-3">
              <div className="rounded-lg bg-slate-50 px-3 py-2.5">
                <p className="text-xs text-slate-500">Total</p>
                <p className="mt-0.5 font-semibold text-slate-900">
                  ₦{order.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2.5">
                <p className="text-xs text-slate-500">Paid</p>
                <p className="mt-0.5 font-semibold text-emerald-700">
                  ₦{order.amountPaid.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border border-brand-red/15 bg-red-50/80 px-3 py-2.5">
                <p className="text-xs font-medium text-brand-red">Balance</p>
                <p className="mt-0.5 font-semibold text-brand-red">
                  ₦{order.balanceDue.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <PayOrderButton
                order={order}
                className="flex w-full items-center justify-center rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white sm:w-auto sm:rounded-full"
              />
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
