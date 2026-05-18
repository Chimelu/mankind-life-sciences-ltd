import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOrderById, verifyPayment, type Order } from '../../../api/orders.api'
import { PayOrderButton } from '../../orders/PayOrderButton'
import {
  formatFulfillmentStatus,
  formatOrderDate,
  formatPaymentStatus,
  fulfillmentStatusClass,
  paymentStatusClass,
} from '../../orders/order-utils'

function formatPaymentRecordStatus(status: string) {
  if (status === 'success') return 'Successful'
  if (status === 'failed') return 'Failed'
  return 'Pending'
}

function paymentRecordClass(status: string) {
  if (status === 'success') return 'bg-emerald-100 text-emerald-700'
  if (status === 'failed') return 'bg-red-100 text-red-700'
  return 'bg-amber-100 text-amber-700'
}

const payButtonClassName =
  'flex w-full items-center justify-center rounded-xl bg-brand-green px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 sm:inline-flex sm:w-auto sm:rounded-full sm:py-2.5'

export function OrderDetailsPage() {
  const { orderId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const verifiedReferenceRef = useRef<string | null>(null)

  const loadOrder = useCallback(async () => {
    if (!orderId) {
      setLoading(false)
      setError('Order id is missing')
      return
    }

    setLoading(true)
    setError('')
    try {
      const data = await getOrderById(orderId)
      setOrder(data)
    } catch (err) {
      setOrder(null)
      setError(err instanceof Error ? err.message : 'Failed to load order')
    } finally {
      setLoading(false)
    }
  }, [orderId])

  useEffect(() => {
    void loadOrder()
  }, [loadOrder])

  useEffect(() => {
    const reference =
      searchParams.get('reference') ?? searchParams.get('trxref') ?? undefined
    if (!reference || verifiedReferenceRef.current === reference) return

    verifiedReferenceRef.current = reference
    setIsVerifying(true)
    verifyPayment(reference)
      .then((verifiedOrder) => {
        setOrder(verifiedOrder)
        toast.success('Payment verified successfully')
        setSearchParams({}, { replace: true })
      })
      .catch((err: unknown) => {
        toast.error(err instanceof Error ? err.message : 'Payment verification failed')
      })
      .finally(() => {
        setIsVerifying(false)
      })
  }, [searchParams, setSearchParams])

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-[96rem] animate-pulse px-3 py-8 md:px-5">
        <div className="h-10 w-40 rounded bg-slate-200" />
        <div className="mt-5 h-36 rounded-3xl bg-slate-200" />
        <div className="mt-5 h-64 rounded-3xl bg-slate-200" />
      </section>
    )
  }

  if (!order) {
    return (
      <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Order not found</h1>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <Link
            to="/dashboard/orders"
            className="mt-4 inline-flex rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white"
          >
            Back to orders
          </Link>
        </div>
      </section>
    )
  }

  const payments = order.payments ?? []

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 pb-24 md:px-5 md:pb-8">
      <div className="mb-3">
        <Link
          to="/dashboard/orders"
          className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-brand-green hover:text-brand-green"
        >
          <span aria-hidden="true">←</span>
          Back to orders
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 md:p-7">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
            Order Details
          </p>
          <h1 className="mt-2 break-all text-2xl font-bold text-slate-900 sm:text-3xl">
            {order.orderNumber}
          </h1>
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
            Placed {formatOrderDate(order.createdAt)} ·{' '}
            {order.fulfillmentMethod === 'delivery' ? 'Delivery' : 'Pickup'}
          </p>
          {order.deliveryAddress && (
            <p className="mt-1 break-words text-sm text-slate-600">
              Address: {order.deliveryAddress}
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Order total
            </p>
            <p className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-lg">
              ₦{order.totalAmount.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total paid
            </p>
            <p className="mt-1 break-words text-xl font-bold text-emerald-700 sm:text-lg">
              ₦{order.amountPaid.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-brand-red/15 bg-red-50/80 p-4 sm:col-span-1">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-red">
              Balance due
            </p>
            <p className="mt-1 break-words text-xl font-bold text-brand-red sm:text-lg">
              ₦{order.balanceDue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t border-slate-200 pt-4">
          <PayOrderButton order={order} className={payButtonClassName} />
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 md:p-7">
        <h2 className="text-xl font-bold text-slate-900">Items</h2>
        <div className="mt-4 space-y-3">
          {(order.items ?? []).map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5">
                  <img
                    src={item.productImageUrl || '/logo_no_background.png'}
                    alt={item.productName}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 sm:truncate">{item.productName}</p>
                  <p className="text-sm text-slate-600">
                    Qty: {item.quantity} · Unit: ₦{item.unitPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-700 sm:text-right">
                ₦{item.lineTotal.toLocaleString()}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 md:p-7">
        <h2 className="text-xl font-bold text-slate-900">Payment history</h2>
        {isVerifying && (
          <p className="mt-3 text-sm text-slate-600">Verifying your payment...</p>
        )}
        {payments.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">No payments recorded yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-3 py-2 font-semibold">Date</th>
                    <th className="px-3 py-2 font-semibold">Amount</th>
                    <th className="px-3 py-2 font-semibold">Channel</th>
                    <th className="px-3 py-2 font-semibold">Reference</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-slate-100">
                      <td className="px-3 py-3 text-slate-700">
                        {payment.paidAt
                          ? formatOrderDate(payment.paidAt)
                          : formatOrderDate(payment.createdAt)}
                      </td>
                      <td className="px-3 py-3 font-semibold text-slate-900">
                        ₦{payment.amount.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-slate-700">
                        {payment.channel || '—'}
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-slate-600">
                        {payment.paystackReference}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${paymentRecordClass(payment.status)}`}
                        >
                          {formatPaymentRecordStatus(payment.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        )}
      </div>
    </section>
  )
}
