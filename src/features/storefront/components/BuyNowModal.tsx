import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createOrder, type Order } from '../../../api/orders.api'
import { PayAmountModal } from '../../orders/PayAmountModal'

type BuyNowModalProps = {
  open: boolean
  onClose: () => void
  productId: string
  productName: string
  quantity: number
  estimatedTotal: number
}

export function BuyNowModal({
  open,
  onClose,
  productId,
  productName,
  quantity,
  estimatedTotal,
}: BuyNowModalProps) {
  const navigate = useNavigate()
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [submitting, setSubmitting] = useState<'later' | 'now' | null>(null)
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)
  const [allowSkipPayment, setAllowSkipPayment] = useState(false)

  useEffect(() => {
    if (!open) {
      setFulfillmentMethod('pickup')
      setDeliveryAddress('')
      setSubmitting(null)
      setPlacedOrder(null)
      setAllowSkipPayment(false)
    }
  }, [open])

  const closeAll = () => {
    setPlacedOrder(null)
    setAllowSkipPayment(false)
    onClose()
  }

  const validateForm = () => {
    if (fulfillmentMethod === 'delivery' && !deliveryAddress.trim()) {
      toast.error('Enter a delivery address')
      return false
    }
    return true
  }

  const placeOrder = async () => {
    return createOrder({
      items: [{ productId, quantity }],
      fulfillmentMethod,
      deliveryAddress: fulfillmentMethod === 'delivery' ? deliveryAddress.trim() : undefined,
    })
  }

  const handlePayLater = async () => {
    if (!validateForm()) return

    setSubmitting('later')
    try {
      const order = await placeOrder()
      toast.success('Order placed successfully')
      setAllowSkipPayment(true)
      setPlacedOrder(order)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to place order')
    } finally {
      setSubmitting(null)
    }
  }

  const handlePayNow = async () => {
    if (!validateForm()) return

    setSubmitting('now')
    try {
      const order = await placeOrder()
      setAllowSkipPayment(false)
      setPlacedOrder(order)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to place order')
    } finally {
      setSubmitting(null)
    }
  }

  if (placedOrder) {
    return (
      <PayAmountModal
        open
        onClose={closeAll}
        orderId={placedOrder.id}
        orderNumber={placedOrder.orderNumber}
        totalAmount={placedOrder.totalAmount}
        amountPaid={placedOrder.amountPaid}
        balanceDue={placedOrder.balanceDue}
        allowSkip={allowSkipPayment}
        title={allowSkipPayment ? 'Pay later — choose amount' : 'Pay now'}
        onSkipped={() => {
          navigate(`/dashboard/orders/${placedOrder.id}`)
          closeAll()
        }}
      />
    )
  }

  if (!open) return null

  const isBusy = submitting !== null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-5">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        onClick={isBusy ? undefined : onClose}
        aria-label="Close"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="buy-now-title"
        className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
              Checkout
            </p>
            <h2 id="buy-now-title" className="mt-1 text-xl font-bold text-slate-900">
              Buy now
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {productName} · Qty {quantity}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isBusy}
            className="rounded-full border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 disabled:opacity-50"
          >
            Close
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          Estimated total (incl. handling):{' '}
          <span className="font-bold text-brand-red">
            ₦{Math.round(estimatedTotal * 1.015).toLocaleString()}
          </span>
        </p>

        <div className="mt-5">
          <p className="text-sm font-semibold text-slate-700">Fulfillment</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => setFulfillmentMethod('pickup')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-60 ${
                fulfillmentMethod === 'pickup'
                  ? 'bg-brand-green text-white'
                  : 'border border-slate-300 text-slate-700'
              }`}
            >
              Pickup
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => setFulfillmentMethod('delivery')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-60 ${
                fulfillmentMethod === 'delivery'
                  ? 'bg-brand-green text-white'
                  : 'border border-slate-300 text-slate-700'
              }`}
            >
              Delivery
            </button>
          </div>
        </div>

        {fulfillmentMethod === 'delivery' && (
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">Delivery address</span>
            <textarea
              value={deliveryAddress}
              onChange={(event) => setDeliveryAddress(event.target.value)}
              rows={3}
              disabled={isBusy}
              placeholder="Street, city, state"
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green disabled:bg-slate-50"
            />
          </label>
        )}

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => void handlePayLater()}
            disabled={isBusy}
            className="rounded-full border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-green hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting === 'later' ? 'Placing order...' : 'Pay later'}
          </button>
          <button
            type="button"
            onClick={() => void handlePayNow()}
            disabled={isBusy}
            className="rounded-full bg-brand-red py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting === 'now' ? 'Placing order...' : 'Pay now'}
          </button>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Pay later places your order on credit, then you choose how much to pay now (or skip).
          Pay now places the order and opens payment for the amount you enter.
        </p>
      </div>
    </div>
  )
}
