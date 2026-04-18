import Image from "next/image";
import Link from "next/link";

const STARS = "★★★★★";

export function Hero() {
  return (
    <section className="relative bg-dark pixel-grid overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-card to-[#0a1f0a] opacity-90 pointer-events-none" />

      {/* Decorative cubes – top right, hidden on small mobile to avoid overflow */}
      <div className="absolute top-8 right-0 sm:right-8 lg:right-16 opacity-10 sm:opacity-20 pointer-events-none select-none w-40 sm:w-56 lg:w-72">
        <Image
          src="/images/Whisk_04c245b3be0535c81d242e1c301414f5dr.png"
          alt=""
          width={280}
          height={280}
          className="animate-float w-full h-auto"
          priority={false}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
        {/* ── Left: Copy ── */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Gaming tag */}
          <div className="inline-flex items-center gap-2 w-fit">
            <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-3 py-1.5 rounded-sm tracking-wider">
              MINECRAFT IRL
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-rubik font-black text-white leading-tight">
            <span className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl block">
              Ils adorent
            </span>
            <span className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl block text-gradient-green">
              Minecraft&nbsp;?
            </span>
            <span className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl block text-white/90 mt-1 sm:mt-2">
              Offrez-leur le vrai
            </span>
            <span className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl block text-or">
              monde des blocs.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/70 text-base sm:text-xl leading-relaxed font-inter max-w-xl">
            Les cubes magnétiques CubeCraft transforment les heures d&apos;écran en{" "}
            <strong className="text-white/90">heures de génie créatif</strong>.
            100 blocs aimantés. Des milliers de possibilités.
          </p>

          {/* Social proof inline */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-or text-base sm:text-lg tracking-tight" aria-label="5 étoiles">
                {STARS}
              </span>
              <span className="text-white/70 text-sm font-inter">
                <strong className="text-white">2 847</strong> parents satisfaits
              </span>
            </div>
            <span className="text-white/20 hidden sm:inline">|</span>
            <div className="flex items-center gap-2 text-sm text-white/60 flex-wrap">
              <span className="text-creeper">✓</span> Certifié CE &amp; EN 71
              <span className="text-creeper ml-1 sm:ml-2">✓</span> Aimants N52
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <Link
              href="/commander"
              className="btn-shimmer cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-6 sm:px-8 py-4 font-rubik font-bold text-white text-base sm:text-lg shadow-lg shadow-creeper/30 transition-all duration-200 hover:scale-105 hover:shadow-creeper/50 active:scale-100 animate-pulse-green min-h-[52px]"
            >
              Commander maintenant
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="#how-it-works"
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-rubik font-semibold text-white/80 border border-white/20 hover:border-creeper hover:text-creeper transition-all duration-200 text-sm sm:text-base min-h-[52px]"
            >
              Voir comment ça marche
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap mt-1">
            {[
              { icon: <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124A17.9 17.9 0 0016.5 9.557M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677" /></svg>, label: "Livraison gratuite" },
              { icon: <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>, label: "Garantie 30 jours" },
              { icon: <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>, label: "Expédié sous 24h" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-1.5 text-white/50 text-xs font-inter">
                <span className="text-creeper/70">{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Product visual ── */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <div className="absolute inset-0 bg-creeper/20 blur-3xl rounded-full scale-75 animate-pulse" />
            <Image
              src="/images/Whisk_21fe8406a0537f38ec8479f261076368dr.png"
              alt="CubeCraft — cubes magnétiques Minecraft style"
              width={500}
              height={500}
              className="relative z-10 w-full h-auto drop-shadow-[0_20px_60px_rgba(76,175,80,0.3)] animate-float"
              priority
            />

            {/* Floating badge: -30% */}
            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 z-20 bg-or text-dark font-rubik font-black w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center shadow-lg shadow-or/50 rotate-12">
              <span className="text-xs sm:text-sm font-black">-30%</span>
              <span className="text-[9px] sm:text-[10px] font-bold leading-tight text-center">Offre<br/>lancement</span>
            </div>

            {/* Floating price */}
            <div className="absolute -bottom-2 left-2 sm:left-4 z-20 bg-dark-card border border-dark-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-xl">
              <div className="text-white/40 text-xs font-inter line-through">
                À partir de 59,90 €
              </div>
              <div className="text-creeper font-rubik font-black text-xl sm:text-2xl">
                39,90 €
              </div>
              <div className="text-white/50 text-xs font-inter">
                Pack 100 pièces
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#FAFAFA"/>
        </svg>
      </div>
    </section>
  );
}
