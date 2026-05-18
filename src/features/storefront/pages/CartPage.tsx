import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createOrder } from '../../../api/orders.api'
import { useAuth } from '../../../app/auth/AuthContext'
import { useStorefront } from '../state/StorefrontContext'

export function CartPage() {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()
  const { cartItems: items, setCartItemQuantity, removeFromCart, clearCart } = useStorefront()
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'pickup' | 'delivery'>(
    'delivery',
  )
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setItemQuantity = (id: number, quantity: number) => {
    setCartItemQuantity(id, quantity)
  }

  const removeItem = (id: number) => {
    removeFromCart(id)
  }

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )
  const serviceFee = Math.round(subtotal * 0.015)
  const grandTotal = subtotal + serviceFee
  const totalUnits = items.reduce((count, item) => count + item.quantity, 0)

  const handleCheckout = async () => {
    if (!isSignedIn) {
      toast.info('Sign in to place your order')
      navigate('/auth/sign-in')
      return
    }

    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    const missingProductIds = items.filter((item) => !item.productId)
    if (missingProductIds.length > 0) {
      toast.error('Some cart items are outdated. Remove them and add products again.')
      return
    }

    if (fulfillmentMethod === 'delivery' && !deliveryAddress.trim()) {
      toast.error('Enter a delivery address')
      return
    }

    setIsSubmitting(true)
    try {
      const order = await createOrder({
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        fulfillmentMethod,
        deliveryAddress: fulfillmentMethod === 'delivery' ? deliveryAddress.trim() : undefined,
      })

      clearCart()
      toast.success('Order placed successfully')
      navigate(`/dashboard/orders/${order.id}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to place order')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 pb-28 md:px-5 md:pb-32">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
          Bulk Order Cart
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
          Shop Cart
        </h1>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.8fr,1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-xl border border-slate-200 bg-slate-50 object-cover p-1"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    SKU: {item.sku} · {item.pack}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-brand-green">
                    MOQ: {item.moq} units
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-[auto,auto,auto] sm:items-center">
                  <p className="text-lg font-bold text-slate-900">
                    ₦{item.price.toLocaleString()}
                  </p>
                  <div className="inline-flex items-center rounded-lg border border-slate-300">
                    <button
                      onClick={() => setItemQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-slate-700"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) =>
                        setItemQuantity(
                          item.id,
                          Number.parseInt(event.target.value || '1', 10),
                        )
                      }
                      className="w-14 border-x border-slate-300 bg-transparent px-2 py-1.5 text-center text-sm font-semibold outline-none"
                    />
                    <button
                      onClick={() => setItemQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-slate-700"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="mt-4 text-right text-sm text-slate-600">
                Line total:{' '}
                <span className="font-bold text-slate-900">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </p>
            </article>
          ))}

          {items.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-600">Your bulk cart is empty.</p>
              <Link
                to="/products"
                className="mt-4 inline-flex rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white"
              >
                Browse products
              </Link>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>

          <div className="mt-4 border-b border-slate-200 pb-4">
            <p className="text-sm font-semibold text-slate-700">Fulfillment option</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => setFulfillmentMethod('pickup')}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  fulfillmentMethod === 'pickup'
                    ? 'bg-brand-green text-white'
                    : 'border border-slate-300 text-slate-700'
                }`}
              >
                Pickup
              </button>
              <button
                onClick={() => setFulfillmentMethod('delivery')}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
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
                placeholder="Enter delivery address"
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />
            </label>
          )}

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p className="flex items-center justify-between">
              <span>Total line items</span>
              <span className="font-semibold text-slate-900">{items.length}</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Total units</span>
              <span className="font-semibold text-slate-900">{totalUnits}</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">
                ₦{subtotal.toLocaleString()}
              </span>
            </p>
            <p className="flex items-center justify-between">
              <span>Handling & logistics</span>
              <span className="font-semibold text-slate-900">
                ₦{serviceFee.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Grand total
            </p>
            <p className="mt-1 text-3xl font-bold text-brand-red">
              ₦{grandTotal.toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            onClick={() => void handleCheckout()}
            disabled={isSubmitting || items.length === 0}
            className="mt-5 w-full rounded-full bg-brand-green py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Placing order...' : 'Proceed to payment'}
          </button>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Your order is placed on credit. You can pay in full or in parts from the order
            page after checkout.
          </p>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-3 backdrop-blur md:px-5">
        <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-700">
            Total: <span className="text-brand-red">₦{grandTotal.toLocaleString()}</span>
          </p>
          <button
            type="button"
            onClick={() => void handleCheckout()}
            disabled={isSubmitting || items.length === 0}
            className="rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Placing...' : 'Proceed to payment'}
          </button>
        </div>
      </div>
    </section>
  )
}
