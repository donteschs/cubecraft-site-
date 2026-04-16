import Image from "next/image";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-creeper-dark via-creeper to-creeper-dark py-20 sm:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pixel-grid opacity-30 pointer-events-none" />
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <Image
          src="/images/Whisk_155d0dfae92253caf61441483e36bfc2dr.png"
          alt=""
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-pixel text-[9px] text-white/60 tracking-widest uppercase block mb-6">
          Dernière chance
        </span>

        <h2 className="font-rubik font-black text-white text-3xl sm:text-5xl lg:text-6xl leading-tight mb-6">
          Votre enfant mérite
          <br />
          <span className="text-or">mieux que les écrans.</span>
        </h2>

        <p className="text-white/80 text-xl font-inter leading-relaxed mb-10 max-w-2xl mx-auto">
          127 familles peuvent encore profiter de l&apos;offre de lancement à -30%.
          Ne laissez pas vos enfants rater ça.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Link
            href="/commander"
            className="bg-or text-dark font-rubik font-black text-xl px-10 py-5 rounded-xl shadow-xl shadow-or/30 hover:bg-or-dark hover:scale-105 active:scale-100 transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
          >
            J&apos;en profite maintenant
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </Link>
          <span className="text-white/60 text-sm font-inter">
            ✓ Livraison gratuite · ✓ Garantie 30 jours · ✓ Retour facile
          </span>
        </div>

        {/* Social proof micro */}
        <div className="inline-flex items-center gap-2 text-white/60 text-sm font-inter">
          <div className="flex -space-x-1">
            {["SM", "TR", "ML", "KB"].map((init) => (
              <div
                key={init}
                className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-[10px] font-bold text-white"
              >
                {init}
              </div>
            ))}
          </div>
          <span>
            <strong className="text-white">2 847 parents</strong> ont déjà fait le bon choix
          </span>
        </div>
      </div>
    </section>
  );
}
