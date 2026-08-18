const pills = [
  {
    title: '20+ Yıllık Deneyim',
    subtitle: 'TÜRSAB güvencesi',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: '7/24 Destek',
    subtitle: 'WhatsApp ile anında yanıt',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Güvenli Ödeme',
    subtitle: '3D Secure & taksit',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M3.75 6.75h16.5A1.5 1.5 0 0121.75 8.25v7.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z" />
      </svg>
    ),
  },
];

export default function TrustPillsBar() {
  return (
    <section className="relative z-10 my-8 px-4">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
        {pills.map((pill) => (
          <div
            key={pill.title}
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-lg shadow-slate-900/5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
              {pill.icon}
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{pill.title}</p>
              <p className="text-xs text-slate-500">{pill.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
