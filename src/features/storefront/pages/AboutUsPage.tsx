import { DealerCard } from '../components/DealerCard'
import { dealers } from '../data/dealers'

export function AboutUsPage() {
  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5 md:py-10">
      <div className="rounded-3xl bg-white px-6 py-10 md:px-10">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
            Mankind Life-Sciences
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            About Us
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg">
            Manufacturing excellence, pharmaceutical trading reliability, and
            trusted dealer distribution - all under one brand focused on
            quality, consistency, and healthcare impact.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-8 bg-white p-2 md:grid-cols-[1.3fr,1fr] md:p-4">
        <article className="space-y-4 text-[15px] leading-7 text-slate-700 md:text-base">
          <h2 className="text-2xl font-bold text-slate-900">Who we are</h2>
          <p>
            <strong>Mankind Life Sciences Nigeria Limited</strong>, conceived in
            2011, has continually improved its business processes to create a
            strong reputation in delivering quality, innovative and affordable
            healthcare products in Nigeria.
          </p>
          <p>
            The company is powered by professionals in Pharmacy, Statistics and
            Management. This strong multidisciplinary team drives our commitment
            to ethical practice, excellence, and consistent value for
            healthcare providers and end users.
          </p>
          <p>
            We are active in pharmaceutical trading and manufacturing, with
            products sourced from reputable partners and supported by strict
            quality assurance standards. Our brands are trusted across Nigeria
            and the West African sub-region.
          </p>
          <p>
            At our core, we are focused on professionalism, sustainability, and
            healthy living - values that continue to shape our growth and
            impact in the healthcare sector.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80"
              alt="Pharmaceutical quality process"
              className="h-44 w-full rounded-2xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80"
              alt="Healthcare product distribution"
              className="h-44 w-full rounded-2xl object-cover"
            />
          </div>
        </article>

        <aside className="rounded-2xl bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-brand-green">Our Promise</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>Quality-assured pharmaceutical products</li>
            <li>Ethical and professional service delivery</li>
            <li>Reliable nationwide and regional distribution</li>
            <li className="font-semibold text-emerald-900">
              NAFDAC approved standards
            </li>
          </ul>

          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80"
            alt="Pharmaceutical team collaboration"
            className="mt-6 h-44 w-full rounded-2xl object-cover"
          />
        </aside>
      </div>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
              Dealers Network
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              Our dealers across key locations
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Partnering with trusted dealers for reliable delivery
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {dealers.map((dealer) => (
            <DealerCard key={dealer.id} dealer={dealer} badgeLabel="Authorized Dealer" />
          ))}
        </div>
      </section>
    </section>
  )
}
