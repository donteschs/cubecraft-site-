import Footer from "components/layout/footer";

export const metadata = {
  title: "Livraison — CubeCraft",
  description: "Livraison gratuite en France métropolitaine. Expédition sous 24-48h. Suivi de commande inclus. Tout savoir sur la livraison de vos cubes magnétiques CubeCraft.",
};

export default function LivraisonPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-rubik font-black text-pierre text-3xl sm:text-4xl mb-2">Livraison</h1>
        <p className="text-pierre/40 text-sm font-inter mb-8">Tout ce que vous devez savoir sur la livraison de votre commande.</p>

        <div className="font-inter text-pierre/80 space-y-8">

          {/* Cards résumé */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { icon: "🚚", title: "Livraison gratuite", desc: "Offerte en France métropolitaine, sans minimum d'achat." },
              { icon: "⚡", title: "Expédition rapide", desc: "Votre commande est préparée et expédiée sous 24–48h ouvrées." },
              { icon: "📦", title: "Délai de livraison", desc: "Comptez 3 à 4 jours ouvrés pour recevoir votre colis." },
            ].map((item) => (
              <div key={item.title} className="bg-creeper-light/20 border border-creeper/20 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-rubik font-bold text-pierre text-sm mb-1">{item.title}</div>
                <p className="text-pierre/60 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Zones de livraison</h2>
            <p>
              Nous livrons actuellement en <strong>France métropolitaine</strong>. Pour les DOM-TOM et l'international, veuillez nous contacter au <a href="tel:00755532648" className="text-creeper hover:underline">00755532648</a> ou par email à <a href="mailto:contact@cubecraft.fr" className="text-creeper hover:underline">contact@cubecraft.fr</a>.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Suivi de commande</h2>
            <p>
              Dès l'expédition de votre colis, vous recevrez un email avec votre numéro de suivi. Vous pouvez suivre votre livraison directement sur le site du transporteur.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Colis endommagé ou non reçu</h2>
            <p>
              En cas de colis endommagé à la réception, refusez le colis et contactez-nous immédiatement. Si votre colis n'est pas arrivé dans les délais prévus, contactez notre service client :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Tél. : <a href="tel:00755532648" className="text-creeper hover:underline">00755532648</a></li>
              <li>Email : <a href="mailto:contact@cubecraft.fr" className="text-creeper hover:underline">contact@cubecraft.fr</a></li>
            </ul>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
