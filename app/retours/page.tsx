import Footer from "components/layout/footer";

export const metadata = {
  title: "Retours & Garantie — CubeCraft",
};

export default function RetoursPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-rubik font-black text-pierre text-3xl sm:text-4xl mb-2">Retours & Garantie</h1>
        <p className="text-pierre/40 text-sm font-inter mb-8">Votre satisfaction est notre priorité.</p>

        {/* Garantie highlight */}
        <div className="bg-creeper/10 border-2 border-creeper/30 rounded-2xl p-6 mb-10 text-center">
          <div className="text-4xl mb-2">🛡️</div>
          <h2 className="font-rubik font-black text-creeper-dark text-xl mb-1">Garantie « Créativité ou Remboursé »</h2>
          <p className="text-pierre/70 font-inter text-sm">
            Si vos enfants ne sont pas fans dans les <strong>30 jours</strong>, on vous rembourse intégralement — sans question, sans complication.
          </p>
        </div>

        <div className="font-inter text-pierre/80 space-y-8">

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Comment initier un retour</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Contactez-nous sous 30 jours après réception à <a href="mailto:contact@cubecraft.fr" className="text-creeper hover:underline">contact@cubecraft.fr</a> ou au <a href="tel:00755532648" className="text-creeper hover:underline">00755532648</a>.</li>
              <li>Indiquez votre numéro de commande et la raison du retour.</li>
              <li>Nous vous enverrons les instructions d'expédition.</li>
              <li>Renvoyez le produit dans son emballage d'origine.</li>
              <li>Le remboursement est effectué sous 5 à 10 jours ouvrés après réception.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Conditions de retour</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Délai : 30 jours après réception</li>
              <li>Produit dans son état d'origine (emballage intact si possible)</li>
              <li>Frais de retour à la charge du client sauf produit défectueux</li>
            </ul>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Produit défectueux</h2>
            <p>
              En cas de produit défectueux ou endommagé, les frais de retour sont intégralement pris en charge par CubeCraft. Un remplacement ou remboursement vous sera proposé dans les meilleurs délais.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Garantie légale</h2>
            <p>
              Tous nos produits bénéficient de la garantie légale de conformité (2 ans) et de la garantie contre les vices cachés, conformément aux articles L.217-4 et suivants du Code de la consommation.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
