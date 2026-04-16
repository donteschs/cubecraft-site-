import { Marquee } from "components/ui/marquee";

/* ── Item types ── */
type BadgeItem =
  | { type: "stat";    value: string; label: string; icon: React.ReactNode }
  | { type: "review";  author: string; text: string }
  | { type: "badge";   label: string; icon: React.ReactNode };

/* ── Row 1: stats + certifications ── */
const row1: BadgeItem[] = [
  {
    type: "stat",
    value: "2 847",
    label: "parents satisfaits",
    icon: (
      <svg className="w-4 h-4 text-or" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ),
  },
  {
    type: "badge",
    label: "Certifié CE & EN 71",
    icon: (
      <svg className="w-4 h-4 text-creeper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
  },
  {
    type: "review",
    author: "Sophie M.",
    text: "« Mon fils a lâché sa tablette ! »",
  },
  {
    type: "badge",
    label: "Livraison gratuite dès 39,90 €",
    icon: (
      <svg className="w-4 h-4 text-ciel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124A17.9 17.9 0 0016.5 9.557M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677"/>
      </svg>
    ),
  },
  {
    type: "stat",
    value: "4,9/5",
    label: "note moyenne",
    icon: (
      <svg className="w-4 h-4 text-or" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ),
  },
  {
    type: "badge",
    label: "Aimants néodyme N52",
    icon: (
      <svg className="w-4 h-4 text-pierre" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
      </svg>
    ),
  },
  {
    type: "review",
    author: "Thomas R.",
    text: "« Qualité premium, livraison ultra rapide »",
  },
  {
    type: "badge",
    label: "Garantie 30 jours",
    icon: (
      <svg className="w-4 h-4 text-creeper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
      </svg>
    ),
  },
  {
    type: "stat",
    value: "-30%",
    label: "offre lancement",
    icon: (
      <svg className="w-4 h-4 text-or-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z"/>
      </svg>
    ),
  },
  {
    type: "badge",
    label: "Expédié sous 24h",
    icon: (
      <svg className="w-4 h-4 text-creeper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
      </svg>
    ),
  },
];

/* ── Row 2: micro-reviews (reverse direction) ── */
const row2: BadgeItem[] = [
  {
    type: "review",
    author: "Marie L.",
    text: "« Ma fille a construit une maison de 3 étages ! »",
  },
  {
    type: "stat",
    value: "6 ans+",
    label: "dès 6 ans",
    icon: (
      <svg className="w-4 h-4 text-ciel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
      </svg>
    ),
  },
  {
    type: "badge",
    label: "Paiement 100% sécurisé",
    icon: (
      <svg className="w-4 h-4 text-creeper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
      </svg>
    ),
  },
  {
    type: "review",
    author: "Karim B.",
    text: "« Mes jumeaux n'arrêtent plus ! »",
  },
  {
    type: "badge",
    label: "Minecraft IRL",
    icon: (
      <svg className="w-4 h-4 text-or" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
      </svg>
    ),
  },
  {
    type: "stat",
    value: "100%",
    label: "sans écran",
    icon: (
      <svg className="w-4 h-4 text-creeper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
      </svg>
    ),
  },
  {
    type: "review",
    author: "Nathalie V.",
    text: "« Un vrai outil pédagogique Montessori »",
  },
  {
    type: "badge",
    label: "ABS non toxique",
    icon: (
      <svg className="w-4 h-4 text-creeper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
  },
  {
    type: "stat",
    value: "1 an",
    label: "de garantie",
    icon: (
      <svg className="w-4 h-4 text-or" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
  },
];

/* ── Renderers ── */
function StatChip({ item }: { item: Extract<BadgeItem, { type: "stat" }> }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm whitespace-nowrap">
      <span>{item.icon}</span>
      <span className="font-rubik font-black text-pierre text-sm">{item.value}</span>
      <span className="text-pierre/50 text-xs font-inter">{item.label}</span>
    </div>
  );
}

function ReviewChip({ item }: { item: Extract<BadgeItem, { type: "review" }> }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm whitespace-nowrap">
      <svg className="w-3.5 h-3.5 text-or flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      <span className="text-pierre/80 text-xs font-inter italic">{item.text}</span>
      <span className="text-pierre/40 text-xs font-inter">— {item.author}</span>
    </div>
  );
}

function BadgeChip({ item }: { item: Extract<BadgeItem, { type: "badge" }> }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm whitespace-nowrap">
      <span>{item.icon}</span>
      <span className="text-pierre/70 text-xs font-inter font-medium">{item.label}</span>
    </div>
  );
}

function renderItem(item: BadgeItem, i: number) {
  if (item.type === "stat")   return <StatChip   key={i} item={item} />;
  if (item.type === "review") return <ReviewChip key={i} item={item} />;
  return                             <BadgeChip  key={i} item={item} />;
}

/* ── Main export ── */
export function MarqueeStrip() {
  const r1 = row1.map(renderItem);
  const r2 = row2.map(renderItem);

  return (
    <section className="bg-blanc border-y border-gray-100 py-4 overflow-hidden">
      <div className="flex flex-col gap-3">
        <Marquee items={r1} speed={35} gap="gap-3" />
        <Marquee items={r2} reverse speed={28} gap="gap-3" />
      </div>
    </section>
  );
}
