import Image from "next/image";
import { SITE_IMAGES } from "lib/site-images";

const painPoints = [
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Baisse de concentration",
    desc: "Les écrans court-circuitent l'attention. Les profs le voient tous les jours.",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    title: "Troubles du sommeil",
    desc: "La lumière bleue des tablettes perturbe la mélatonine et le cycle de sommeil.",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: "Créativité en chute libre",
    desc: "Ils consomment au lieu de créer. L'imagination s'atrophie faute d'exercice.",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Moins de moments famille",
    desc: "Chacun sur son écran. Ces années passent vite et ne reviennent pas.",
  },
];

export function Problem() {
  return (
    <section id="benefits" className="bg-blanc py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-pixel text-[9px] text-terre tracking-widest uppercase block mb-3">
            Le Problème
          </span>
          <h2 className="font-rubik font-black text-pierre text-2xl sm:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6">
            Votre enfant passe combien d&apos;heures
            <span className="text-gradient-green block sm:inline"> par jour sur un écran&nbsp;?</span>
          </h2>
          <p className="text-pierre/70 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-inter">
            Selon l&apos;OMS, les enfants de 6 à 12 ans passent en moyenne{" "}
            <strong className="text-pierre font-semibold">4h30 par jour</strong> devant un écran.
            Les conséquences sont alarmantes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-terre mb-3 sm:mb-4">{point.icon}</div>
              <h3 className="font-rubik font-bold text-pierre text-base sm:text-lg mb-2">{point.title}</h3>
              <p className="text-pierre/60 text-sm leading-relaxed font-inter">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* Bridge to solution */}
        <div className="bg-gradient-to-r from-creeper-light to-ciel/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-1 text-center lg:text-left">
            <p className="font-rubik font-bold text-pierre text-lg sm:text-2xl leading-snug mb-3">
              Vous avez essayé de limiter les écrans.
              <br />
              Mais proposer quoi à la place ?
            </p>
            <p className="text-pierre/70 text-base sm:text-lg font-inter leading-relaxed">
              Un jouet qui soit{" "}
              <strong className="text-creeper-dark">aussi captivant qu&apos;un jeu vidéo</strong>.
              Mais en vrai.
            </p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Image
              src={SITE_IMAGES.childPlaying.src}
              alt="Enfant concentre qui joue avec les cubes magnetiques CubeCraft"
              width={320}
              height={280}
              className="rounded-2xl shadow-xl object-cover w-full sm:w-auto max-w-sm mx-auto lg:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
