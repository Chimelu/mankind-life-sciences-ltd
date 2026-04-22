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
            <li>
              <span className="font-semibold text-brand-ink">Address:</span> 2,
              Aggrey Road, Fegge Onitsha, Anambra State, Nigeria.
            </li>
            <li>
              <span className="font-semibold text-brand-ink">Phone:</span> +234
              803 727 4597
            </li>
            <li>
              <span className="font-semibold text-brand-ink">Email:</span>{' '}
              manpharma1@gmail.com
            </li>
            <li>
              <span className="font-semibold text-brand-ink">Support Hours:</span>{' '}
              Monday - Saturday, 8:00 AM - 6:00 PM
            </li>
          </ul>

          <div className="mt-5 rounded-2xl bg-brand-green/10 p-4">
            <p className="text-sm font-semibold text-brand-green">Need urgent support?</p>
            <p className="mt-1 text-sm text-slate-600">
              Call our response line for bulk order processing and product
              verification support.
            </p>
          </div>
        </aside>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
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
