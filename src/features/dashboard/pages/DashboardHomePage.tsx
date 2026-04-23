import { useState } from 'react'
import { useAuth } from '../../../app/auth/AuthContext'
import { Link } from 'react-router-dom'
import { dashboardOrders } from '../data/orders'

export function DashboardHomePage() {
  const { user, signOut, updateUser } = useAuth()
  const [formState, setFormState] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    organization: user?.organization ?? '',
  })

  const saveProfile = () => {
    updateUser({
      name: formState.name,
      email: formState.email,
      organization: formState.organization,
    })
  }

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
              User Dashboard
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
              Welcome back, {user?.name.split(' ')[0]}
            </h1>
          </div>
          <button
            onClick={signOut}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr,1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6">
          <h2 className="text-xl font-bold text-slate-900">My Orders</h2>
          <div className="mt-4 space-y-3">
            {dashboardOrders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{order.id}</p>
                  <span className="rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-semibold text-brand-green">
                    {order.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Date: {order.date} · Items: {order.items}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Total: ₦{order.total.toLocaleString()}
                </p>
                <Link
                  to={`/dashboard/orders/${order.id}`}
                  className="mt-2 inline-flex text-xs font-semibold text-brand-green"
                >
                  Open order →
                </Link>
              </article>
            ))}
          </div>
          <Link
            to="/dashboard/orders"
            className="mt-4 inline-flex rounded-full border border-brand-green/25 bg-brand-green/5 px-4 py-2 text-sm font-semibold text-brand-green"
          >
            View all my orders
          </Link>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6">
          <h2 className="text-xl font-bold text-slate-900">Profile Information</h2>
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Name</span>
              <input
                value={formState.name}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, name: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
              <input
                value={formState.email}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, email: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Organization
              </span>
              <input
                value={formState.organization}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    organization: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />
            </label>
          </div>

          <button
            onClick={saveProfile}
            className="mt-5 w-full rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white"
          >
            Update profile
          </button>
        </section>
      </div>
    </section>
  )
}
