import { useState } from 'react'
import { useAuth } from '../../../app/auth/AuthContext'

export function ProfilePage() {
  const { user, updateUser, signOut } = useAuth()
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
              Account
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
              Profile Information
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

      <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
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
        </div>

        <label className="mt-4 block">
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

        <button
          onClick={saveProfile}
          className="mt-5 rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white"
        >
          Update profile
        </button>
      </section>
    </section>
  )
}
