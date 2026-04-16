import { AnimateOnScroll } from "components/ui/animate-on-scroll";

const reviews = [
  { stars: 5, text: "Mon fils de 8 ans a complètement lâché sa tablette. Il passe des heures à construire des châteaux et des robots. Je n'y croyais pas. Merci CubeCraft.", author: "Sophie M.", role: "Maman de Lucas, 8 ans", avatar: "SM", color: "bg-ciel/20 text-ciel" },
  { stars: 5, text: "On a offert ça pour Noël. Résultat : toute la famille à quatre pattes dans le salon en train de construire ensemble. Ça n'a pas de prix.", author: "Thomas R.", role: "Papa de Léa (6 ans) et Hugo (10 ans)", avatar: "TR", color: "bg-creeper/20 text-creeper" },
  { stars: 5, text: "La qualité est incroyable. Les aimants tiennent super bien. Ma fille a construit une maison de 3 étages qui tient debout toute seule. Elle était tellement fière.", author: "Marie L.", role: "Maman d'Emma, 7 ans", avatar: "ML", color: "bg-or/20 text-or-dark" },
  { stars: 5, text: "J'ai acheté pour mes jumeaux de 9 ans. Ils se défient chaque soir à qui fera la plus belle construction. Enfin de la compétition saine !", author: "Karim B.", role: "Papa d'Adam et Yassine", avatar: "KB", color: "bg-terre/20 text-terre" },
  { stars: 5, text: "Livraison ultra rapide, emballage magnifique. Mon neveu a ouvert la boîte et ses yeux ont brillé. C'est exactement ce que je voulais pour son anniversaire.", author: "Isabelle D.", role: "Tata de Mathieu, 9 ans", avatar: "ID", color: "bg-pierre/20 text-pierre" },
  { stars: 5, text: "En tant qu'enseignante Montessori, je recommande CubeCraft à tous les parents. C'est un véritable outil pédagogique déguisé en jouet. Exceptionnel.", author: "Nathalie V.", role: "Enseignante Montessori, maman de 2", avatar: "NV", color: "bg-ciel/20 text-ciel" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-or fill-current" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const reassuranceBadges = [
  { icon: <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>, label: "Note 4,9/5" },
  { icon: <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>, label: "2 847 avis vérifiés" },
  { icon: <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd"/></svg>, label: "Certifié CE" },
  { icon: <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path d="M6.5 9a.5.5 0 000 1h7a.5.5 0 000-1h-7zM4 1a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H4zm0 1.5h12a.5.5 0 01.5.5v14a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5z"/></svg>, label: "Livraison 24h" },
  { icon: <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd"/></svg>, label: "Retour gratuit 30j" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-blanc py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-pixel text-[9px] text-creeper-dark tracking-widest uppercase block mb-3 sm:mb-4">
            Témoignages
          </span>
          <h2 className="font-rubik font-black text-pierre text-2xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Ce que disent{" "}
            <span className="text-gradient-green">les parents</span>
          </h2>
          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-3 bg-or/10 border border-or/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5">
            <Stars count={5} />
            <span className="font-rubik font-bold text-pierre text-base sm:text-lg">4,9/5</span>
            <span className="text-pierre/60 font-inter text-xs sm:text-sm">— 2 847 avis vérifiés</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((review, i) => (
            <AnimateOnScroll key={review.author} direction="up" delay={i * 80}>
            <div
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-3 sm:gap-4 h-full"
            >
              <Stars count={review.stars} />
              <blockquote className="text-pierre/80 text-sm leading-relaxed font-inter flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-rubik font-bold text-sm flex-shrink-0 ${review.color}`}>
                  {review.avatar}
                </div>
                <div>
                  <div className="font-rubik font-semibold text-pierre text-sm">{review.author}</div>
                  <div className="text-pierre/50 text-xs font-inter">{review.role}</div>
                </div>
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Reassurance */}
        <div className="mt-10 sm:mt-14 text-center">
          <p className="text-pierre/40 text-xs font-inter uppercase tracking-widest mb-4 sm:mb-6">
            Recommandé par les parents et les éducateurs
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
            {reassuranceBadges.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 text-pierre/50 text-sm font-inter font-medium">
                <span className="text-creeper">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
