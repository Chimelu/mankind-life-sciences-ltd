import { DealerCard } from '../components/DealerCard'
import { dealers } from '../data/dealers'

export function ContactUsPage() {
  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5 md:py-10">
      <div className="rounded-3xl bg-white px-6 py-10 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
          Contact Mankind
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
          Reach our team and dealer network
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg">
          For wholesale, retail, hospital supply, and dealership inquiries,
          contact our team directly or connect with a nearby authorized dealer.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr,1.4fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">Head Office Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5">
              <AddressIcon />
              <span>
                <span className="font-semibold text-brand-ink">Address:</span> 2,
                Aggrey Road, Fegge Onitsha, Anambra State, Nigeria.
              </span>
            </li>
            <li className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5">
              <PhoneIcon />
              <span>
                <span className="font-semibold text-brand-ink">Phone:</span> +234
                803 727 4597
              </span>
            </li>
            <li className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5">
              <MailIcon />
              <span>
                <span className="font-semibold text-brand-ink">Email:</span>{' '}
                manpharma1@gmail.com
              </span>
            </li>
            <li className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5">
              <ClockIcon />
              <span>
                <span className="font-semibold text-brand-ink">Support Hours:</span>{' '}
                Monday - Saturday, 8:00 AM - 6:00 PM
              </span>
            </li>
          </ul>

          <div className="mt-5 rounded-2xl bg-brand-green/10 p-4">
            <p className="text-sm font-semibold text-brand-green">Need urgent support?</p>
            <p className="mt-1 text-sm text-slate-600">
              Call our response line for bulk order processing and product
              verification support.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="absolute inset-x-6 top-2 h-1.5 rounded-full bg-slate-200/80" />
              <div className="mt-3 flex h-40 items-center justify-center rounded-lg bg-slate-100 p-2">
                <img
                  src="/WhatsApp Image 2026-04-23 at 17.43.27.jpeg"
                  alt="Mankind team with distributors"
                  className="h-full w-full rounded-md object-contain transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="absolute inset-x-6 top-2 h-1.5 rounded-full bg-slate-200/80" />
              <div className="mt-3 flex h-40 items-center justify-center rounded-lg bg-slate-100 p-2">
                <img
                  src="/WhatsApp Image 2026-04-23 at 17.48.12.jpeg"
                  alt="Mankind product and distributor engagement"
                  className="h-full w-full rounded-md object-contain transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </aside>

        <div className="p-1">
          <h2 className="text-xl font-bold text-slate-900">Dealers by location</h2>
          <p className="mt-1 text-sm text-slate-500">
            Our authorized dealers provide nearby fulfillment and product support.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {dealers.map((dealer) => (
              <DealerCard key={dealer.id} dealer={dealer} badgeLabel="Dealer Location" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AddressIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-green"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-green"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19 19.5 19.5 0 0 1 5 12.8 19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2L8 9.9a16 16 0 0 0 6.1 6.1l1.5-1.3a2 2 0 0 1 2-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-green"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-green"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
