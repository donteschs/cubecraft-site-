import Footer from "components/layout/footer";

export const metadata = {
  title: "Politique de Confidentialité — CubeCraft",
  description: "Politique de confidentialité CubeCraft. Collecte, utilisation et protection de vos données personnelles conformément au RGPD.",
  robots: { index: false, follow: true },
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
              Email : snuggiesservices@gmail.com
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
              Conformément au RGPD, vous disposez des droits suivants : accès, rectification, suppression, portabilité, limitation et opposition. Pour les exercer, contactez-nous à <a href="mailto:snuggiesservices@gmail.com" className="text-creeper hover:underline">snuggiesservices@gmail.com</a>.
            </p>
            <p className="mt-2">
              Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">7. Cookies</h2>
            <p>
              Notre site utilise des cookies techniques (nécessaires au fonctionnement), analytiques (mesure d'audience, via Google Analytics) et publicitaires (voir section 8). Vous pouvez gérer vos préférences via les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">8. Publicité et fournisseurs tiers (Google AdSense)</h2>
            <p>
              Ce site affiche des annonces publicitaires diffusées par <strong>Google AdSense</strong> et ses partenaires.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Google, en tant que fournisseur tiers, utilise des cookies pour diffuser des annonces sur notre site.</li>
              <li>Le cookie publicitaire de Google (cookie « DoubleClick / AdSense ») permet à Google et à ses partenaires de diffuser des annonces en fonction de vos visites sur ce site et sur d'autres sites.</li>
              <li>Des annonceurs tiers peuvent également déposer des cookies lorsque vous interagissez avec leurs annonces.</li>
            </ul>
            <p className="mt-2">
              Vous pouvez désactiver la publicité personnalisée dans les{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-creeper hover:underline">Paramètres des annonces Google</a>, ou refuser les cookies de fournisseurs tiers via{" "}
              <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-creeper hover:underline">www.aboutads.info</a> et{" "}
              <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-creeper hover:underline">youronlinechoices.com</a>.
            </p>
            <p className="mt-2">
              Pour en savoir plus sur l'utilisation des données par Google, consultez la{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-creeper hover:underline">page de Google relative aux sites partenaires</a>.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">9. Liens affiliés</h2>
            <p>
              Certains liens présents sur ce site (notamment vers Amazon) sont des liens affiliés. Si vous effectuez un achat via ces liens, nous pouvons percevoir une commission, sans surcoût pour vous. Cela n'influence pas notre sélection éditoriale.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
