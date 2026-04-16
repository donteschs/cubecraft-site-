import Footer from "components/layout/footer";

export const metadata = {
  title: "Conditions Générales de Vente — CubeCraft",
};

export default function CGVPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-rubik font-black text-pierre text-3xl sm:text-4xl mb-2">Conditions Générales de Vente</h1>
        <p className="text-pierre/40 text-sm font-inter mb-8">Dernière mise à jour : avril 2026</p>

        <div className="font-inter text-pierre/80 space-y-8">

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Article 1 — Vendeur</h2>
            <p>
              <strong>CubeCraft</strong><br />
              14 rue de la Santé, France<br />
              Tél. : 00755532648<br />
              Email : contact@cubecraft.fr
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Article 2 — Produits</h2>
            <p>
              Les produits proposés à la vente sont des cubes magnétiques de construction (sets de 64, 128 et 256 pièces). Les photographies des produits sont non contractuelles. CubeCraft se réserve le droit de modifier la composition ou le design des produits sans préavis.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Article 3 — Prix</h2>
            <p>
              Les prix sont indiqués en euros TTC. CubeCraft se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix applicable à la commande est celui en vigueur au jour de la validation de la commande.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Article 4 — Commande</h2>
            <p>
              La commande est réputée ferme et définitive après validation du paiement. Un email de confirmation est envoyé à l'adresse indiquée par le client. CubeCraft se réserve le droit d'annuler toute commande en cas de stock insuffisant, avec remboursement intégral.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Article 5 — Paiement</h2>
            <p>
              Le paiement s'effectue en ligne par carte bancaire via une plateforme sécurisée (SSL). Les données bancaires ne sont jamais stockées par CubeCraft.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Article 6 — Livraison</h2>
            <p>
              La livraison est offerte en France métropolitaine. Les commandes sont expédiées sous 24–48h ouvrées et livrées en 3 à 4 jours ouvrés. CubeCraft ne saurait être tenu responsable des retards imputables au transporteur.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Article 7 — Droit de rétractation</h2>
            <p>
              Conformément à l'article L.221-18 du Code de la consommation, le client dispose d'un délai de 14 jours à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier de motifs. Le retour s'effectue aux frais du client sauf si le produit est défectueux.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Article 8 — Garantie</h2>
            <p>
              Tous les produits CubeCraft bénéficient d'une garantie légale de conformité (2 ans) et de la garantie contre les vices cachés (articles 1641 à 1649 du Code Civil). De plus, CubeCraft offre sa garantie commerciale « Créativité ou Remboursé » de 30 jours.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Article 9 — Litiges</h2>
            <p>
              En cas de litige, le client peut recourir gratuitement à un médiateur de la consommation. Les présentes CGV sont soumises au droit français.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
