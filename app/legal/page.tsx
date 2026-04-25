import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";

export const metadata = {
  title: "Mentions légales — CubeCraft",
  description: "Mentions légales du site CubeCraft. Éditeur, hébergeur, propriété intellectuelle et informations légales.",
};

export default function LegalPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-rubik font-black text-pierre text-3xl sm:text-4xl mb-8">Mentions légales</h1>

        <div className="prose prose-pierre max-w-none font-inter text-pierre/80 space-y-8">

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Éditeur du site</h2>
            <p>
              <strong>CubeCraft</strong><br />
              54 rue de Bezons, 92400 Courbevoie<br />
              France<br />
              Email : <a href="mailto:contact@cubecrafte.com" className="text-creeper hover:underline">contact@cubecrafte.com</a>
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Hébergement</h2>
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, logos, visuels) est la propriété exclusive de CubeCraft et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable écrite.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Responsabilité</h2>
            <p>
              CubeCraft s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, CubeCraft ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
            </p>
          </section>

          <section>
            <h2 className="font-rubik font-bold text-pierre text-xl mb-3">Droit applicable</h2>
            <p>
              Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
