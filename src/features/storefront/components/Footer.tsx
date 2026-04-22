import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-14 bg-slate-950 text-white">
      <div className="bg-brand-surface">
        <div className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5 md:py-10">
          <section className="rounded-2xl bg-white p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                  Licensing and compliance
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                  NAFDAC Approved Products
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">
                  Mankind Life-Sciences provides pharmaceutical products sourced
                  and distributed under strict quality controls in line with
                  NAFDAC regulatory requirements.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-green-800">
                  <img
                    src="/nafdac-logo.png"
                    alt="NAFDAC certification logo"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  NAFDAC Certified Supply
                </div>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-3 py-2">
                <img
                  src="/nafdac-logo.png"
                  alt="NAFDAC approved logo"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-green-700">
                    Regulatory status
                  </p>
                  <p className="text-sm font-bold text-red-600">NAFDAC Approved</p>
                </div>
              </div>
            </div>

            <div className="mt-5 inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-700">
              NAFDAC licensed and quality focused
            </div>
          </section>
        </div>
      </div>

      <div className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5 md:py-10">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
              Frequently asked questions
            </p>
            <div className="mt-3 space-y-3">
              <FaqItem
                question="Do you handle wholesale and hospital supply?"
                answer="Yes. We support pharmacies, clinics, hospitals and distributors with scalable supply options."
              />
              <FaqItem
                question="Can I place bulk orders for my business?"
                answer="Yes. We provide wholesale ordering support and structured fulfillment for recurring demand."
              />
              <FaqItem
                question="How can I verify product authenticity?"
                answer="Our team can guide you with product batch details and verification support before fulfillment."
              />
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[96rem] gap-10 px-3 py-12 md:grid-cols-4 md:px-5">
        <div className="md:col-span-2">
          <h4 className="text-2xl font-bold text-brand-green">
            Mankind Life-Sciences Ltd
          </h4>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            We combine pharmaceutical manufacturing and strategic trading to
            deliver quality-assured healthcare products for pharmacies,
            hospitals, distributors and wellness providers.
          </p>
          <div className="mt-5 inline-flex rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-green">
            NAFDAC quality assurance standard
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            Navigation
          </h5>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>
              <Link to="/" className="transition hover:text-brand-red">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="transition hover:text-brand-red">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition hover:text-brand-red">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-brand-red">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            Contact
          </h5>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <li>2, Aggrey Road, Fegge Onitsha, Anambra State, Nigeria.</li>
            <li>+234 803 727 4597</li>
            <li>manpharma1@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="mx-auto w-full max-w-[96rem] px-3 py-5 text-center text-xs font-medium tracking-wide text-slate-400 md:px-5">
          © {new Date().getFullYear()} Mankind Life-Sciences Ltd. Built for
          trusted pharmaceutical care.
        </p>
      </div>
    </footer>
  )
}

type FaqItemProps = {
  question: string
  answer: string
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="group rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white marker:content-none">
        <span>{question}</span>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green transition group-open:rotate-180">
          <ChevronDownIcon />
        </span>
      </summary>
      <p className="mt-3 border-t border-slate-700 pt-3 text-xs leading-5 text-slate-300">
        {answer}
      </p>
    </details>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
