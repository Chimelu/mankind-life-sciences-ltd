import { Link, useParams } from 'react-router-dom'
import { catalogProducts } from '../../storefront/data/catalogProducts'
import { dashboardOrders } from '../data/orders'

const demoLineItems = [
  { name: 'Mankind Paracetamol 500mg', quantity: 40, unitPrice: 300 },
  { name: 'Mankind Cough Relief Syrup', quantity: 24, unitPrice: 1850 },
  { name: 'Mankind Rapid Test Cassette', quantity: 10, unitPrice: 9600 },
]

export function OrderDetailsPage() {
  const { orderId } = useParams()
  const order = dashboardOrders.find((item) => item.id === orderId)
  const lineItemsWithImages = demoLineItems.map((item) => {
    const matchedProduct = catalogProducts.find((product) => product.name === item.name)
    return {
      ...item,
      image: matchedProduct?.image ?? '/logo_no_background.png',
    }
  })

  if (!order) {
    return (
      <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Order not found</h1>
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

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5">
      <div className="mb-3">
        <Link
          to="/dashboard/orders"
          className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-brand-green hover:text-brand-green"
        >
          <span aria-hidden="true">←</span>
          Back to orders
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
          Order Details
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">{order.id}</h1>
        <p className="mt-2 text-sm text-slate-600">
          Date: {order.date} · Status: {order.status} · Destination:{' '}
          {order.destination}
        </p>
      </div>

      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
        <h2 className="text-xl font-bold text-slate-900">Items</h2>
        <div className="mt-4 space-y-3">
          {lineItemsWithImages.map((item) => (
            <article
              key={item.name}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-800">{item.name}</p>
                  <p className="text-sm text-slate-600">
                    Qty: {item.quantity} · Unit: ₦{item.unitPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-right text-sm font-semibold text-slate-700">
                ₦{(item.quantity * item.unitPrice).toLocaleString()}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
