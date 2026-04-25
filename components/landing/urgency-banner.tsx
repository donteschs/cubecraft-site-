import Link from "next/link";

const ITEMS = [
  { icon: "🔥", text: "Offre de lancement : -30% sur tout le catalogue" },
  { icon: "📦", text: "127 unités restantes — offre limitée" },
  { icon: "🚚", text: "Livraison gratuite en France" },
  { icon: "⭐", text: "4,9/5 · +200 familles conquises" },
  { icon: "🔥", text: "Offre de lancement : -30% sur tout le catalogue" },
  { icon: "📦", text: "127 unités restantes — offre limitée" },
  { icon: "🚚", text: "Livraison gratuite en France" },
  { icon: "⭐", text: "4,9/5 · +200 familles conquises" },
];

export function UrgencyBanner() {
  return (
    <div className="bg-creeper-dark text-white sticky top-0 z-50 py-2 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {ITEMS.map((item, i) => (
          <Link
            key={i}
            href="/commander"
            className="inline-flex items-center gap-2 px-8 text-sm font-rubik font-semibold whitespace-nowrap cursor-pointer hover:text-or transition-colors duration-150"
          >
            <span>{item.icon}</span>
            <span>{item.text}</span>
            <span className="mx-3 opacity-30">✦</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
