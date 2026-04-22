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
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-green/30 hover:shadow-md">
      <span className="inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-green">
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
        <p className="text-slate-700">
          <span className="font-semibold text-brand-ink">Phone:</span>{' '}
          <a href={`tel:${dealer.phone}`} className="hover:text-brand-green">
            {dealer.phone}
          </a>
        </p>
        <p className="text-slate-700">
          <span className="font-semibold text-brand-ink">Email:</span>{' '}
          <a href={`mailto:${dealer.email}`} className="hover:text-brand-green">
            {dealer.email}
          </a>
        </p>
        <p className="text-slate-700">
          <span className="font-semibold text-brand-ink">Hours:</span>{' '}
          {dealer.supportHours}
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
