import { Link } from 'react-router-dom'
import { dashboardOrders } from '../data/orders'

export function MyOrdersPage() {
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

      <div className="mt-5 space-y-4">
        {dashboardOrders.map((order) => (
          <Link
            key={order.id}
            to={`/dashboard/orders/${order.id}`}
            className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-green/40 hover:shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold text-slate-900">{order.id}</p>
              <span className="rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-semibold text-brand-green">
                {order.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Date: {order.date} · Items: {order.items} · Destination:{' '}
              {order.destination}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Total: ₦{order.total.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
