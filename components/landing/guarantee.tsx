import Image from "next/image";
import Link from "next/link";

export function Guarantee() {
  return (
    <section className="bg-dark py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-creeper/5 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Shield icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-creeper/10 border border-creeper/20 mb-8">
          <svg className="w-10 h-10 text-creeper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>

        <span className="font-pixel text-[9px] text-creeper tracking-widest uppercase block mb-4">
          Notre Promesse
        </span>

        <h2 className="font-rubik font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
          Garantie{" "}
          <span className="text-gradient-green">
            &laquo;&nbsp;Créativité ou Remboursé&nbsp;&raquo;
          </span>
        </h2>

        <p className="text-white/60 text-xl font-inter leading-relaxed mb-8 max-w-2xl mx-auto">
          On est tellement convaincus que votre enfant va adorer CubeCraft qu&apos;on prend{" "}
          <strong className="text-white/80">le risque à votre place</strong>.
        </p>

        <div className="bg-dark-card border border-dark-border rounded-2xl p-8 sm:p-10 mb-10">
          <div className="font-rubik font-black text-or text-6xl mb-4">30</div>
          <div className="font-fredoka font-semibold text-white text-2xl mb-4">
            jours pour changer d&apos;avis
          </div>
          <p className="text-white/50 font-inter text-base leading-relaxed max-w-lg mx-auto">
            Si votre enfant ne joue pas avec ses CubeCraft dans les 30 jours, on vous{" "}
            <strong className="text-white/80">rembourse intégralement</strong>. Sans question.
            Sans justification. Renvoi gratuit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {[
            "Aucun risque financier",
            "Renvoi gratuit et facile",
            "Remboursement sous 48h",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-white/60 font-inter text-sm">
              <svg className="w-4 h-4 text-creeper flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd" />
              </svg>
              {item}
            </div>
          ))}
        </div>

        <Link
          href="/commander"
          className="btn-shimmer cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl w-full sm:w-auto px-8 py-4 font-rubik font-bold text-white text-lg shadow-lg shadow-creeper/30 transition-all duration-200 hover:scale-105 animate-pulse-green min-h-[52px]"
        >
          Je commande sans risque
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
