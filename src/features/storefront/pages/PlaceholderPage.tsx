type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <h1 className="text-3xl font-semibold text-brand-ink md:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-brand-muted">{description}</p>
      </div>
    </section>
  )
}
