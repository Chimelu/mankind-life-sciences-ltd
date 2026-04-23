import type { Dealer } from '../data/dealers'

type DealerCardProps = {
  dealer: Dealer
  badgeLabel?: string
  showFocus?: boolean
}

export function DealerCard({
  dealer,
  badgeLabel = 'Mankind Dealer',
  showFocus = true,
}: DealerCardProps) {
  return (
    <article className="group rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-green/30">
      <span className="inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-green">
        {badgeLabel}
      </span>

      <h3 className="mt-3 text-lg font-bold leading-tight text-slate-900">
        {dealer.name}
      </h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
        {dealer.city}, {dealer.state}
      </p>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{dealer.address}</p>

      <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
        <p className="flex items-start gap-2 text-slate-700">
          <PhoneIcon />
          <span>
            <span className="font-semibold text-brand-ink">Phone:</span>{' '}
            <a href={`tel:${dealer.phone}`} className="hover:text-brand-green">
              {dealer.phone}
            </a>
          </span>
        </p>
        <p className="flex items-start gap-2 text-slate-700">
          <MailIcon />
          <span>
            <span className="font-semibold text-brand-ink">Email:</span>{' '}
            <a href={`mailto:${dealer.email}`} className="hover:text-brand-green">
              {dealer.email}
            </a>
          </span>
        </p>
        <p className="flex items-start gap-2 text-slate-700">
          <ClockIcon />
          <span>
            <span className="font-semibold text-brand-ink">Hours:</span>{' '}
            {dealer.supportHours}
          </span>
        </p>
      </div>

      {showFocus && (
        <p className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600">
          {dealer.focus}
        </p>
      )}

      <div className="mt-5 flex gap-2">
        <a
          href={`tel:${dealer.phone}`}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-green px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Call now
        </a>
        <a
          href={`mailto:${dealer.email}`}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/5 px-3 py-2 text-sm font-semibold text-brand-green transition group-hover:border-brand-green"
        >
          Send email
        </a>
      </div>
    </article>
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
