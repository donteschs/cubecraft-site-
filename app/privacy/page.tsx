import Footer from "components/layout/footer";

export const metadata = {
  title: "Politique de Confidentialité — CubeCraft",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-rubik font-black text-pierre text-3xl sm:text-4xl mb-2">Politique de Confidentialité</h1>
        <p className="text-pierre/40 text-sm font-inter mb-8">Dernière mise à jour : avril 2026</p>

        <div className="font-inter text-pierre/80 space-y-8">

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">1. Responsable du traitement</h2>
            <p>
              CubeCraft — 14 rue de la Santé, France<br />
              Tél. : 00755532648 — Email : contact@cubecraft.fr
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">2. Données collectées</h2>
            <p>Dans le cadre de nos services, nous collectons les données suivantes :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nom, prénom, adresse email</li>
              <li>Adresse de livraison et de facturation</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Données de navigation (cookies, adresse IP)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">3. Finalités du traitement</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Traiter et livrer vos commandes</li>
              <li>Vous envoyer des confirmations et mises à jour de commande</li>
              <li>Améliorer notre site et notre service client</li>
              <li>Vous envoyer des offres promotionnelles (avec votre consentement)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">4. Base légale</h2>
            <p>
              Le traitement de vos données est fondé sur l'exécution du contrat (traitement des commandes), votre consentement (newsletters), et notre intérêt légitime (amélioration du service).
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">5. Conservation des données</h2>
            <p>
              Vos données de commande sont conservées pendant 5 ans à compter de la dernière commande, conformément aux obligations légales. Les données marketing sont conservées jusqu'à votre désinscription.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">6. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants : accès, rectification, suppression, portabilité, limitation et opposition. Pour les exercer, contactez-nous à <a href="mailto:contact@cubecraft.fr" className="text-creeper hover:underline">contact@cubecraft.fr</a>.
            </p>
            <p className="mt-2">
              Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">7. Cookies</h2>
            <p>
              Notre site utilise des cookies techniques (nécessaires au fonctionnement) et analytiques (mesure d'audience). Vous pouvez gérer vos préférences via les paramètres de votre navigateur.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
