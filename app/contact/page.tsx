import Footer from "components/layout/footer";

export const metadata = {
  title: "Contact — CubeCraft",
  description: "Contactez l'équipe CubeCraft. Réponse sous 24h. Email, adresse et formulaire de contact pour toute question sur vos cubes magnétiques.",
};

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-rubik font-black text-pierre text-3xl sm:text-4xl mb-2">Nous contacter</h1>
        <p className="text-pierre/40 text-sm font-inter mb-10">Notre équipe répond dans les 24h ouvrées.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: "📍",
              title: "Adresse",
              lines: ["14 rue de la Santé", "France"],
            },
            {
              icon: "📞",
              title: "Téléphone",
              lines: ["00755532648"],
              href: "tel:00755532648",
            },
            {
              icon: "✉️",
              title: "Email",
              lines: ["contact@cubecraft.fr"],
              href: "mailto:contact@cubecraft.fr",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 text-center hover:shadow-md transition-shadow duration-200">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-rubik font-bold text-pierre text-sm mb-2">{item.title}</div>
              {item.href ? (
                <a href={item.href} className="text-creeper hover:underline font-inter text-sm">
                  {item.lines[0]}
                </a>
              ) : (
                item.lines.map((line) => (
                  <p key={line} className="text-pierre/60 font-inter text-sm">{line}</p>
                ))
              )}
            </div>
          ))}
        </div>

        <div className="bg-creeper-light/20 border border-creeper/20 rounded-2xl p-6 sm:p-8">
          <h2 className="font-rubik font-bold text-pierre text-xl mb-1">Horaires du service client</h2>
          <p className="text-pierre/50 text-sm font-inter mb-5">Nous sommes disponibles pour vous aider</p>
          <div className="space-y-2 font-inter text-sm">
            <div className="flex justify-between">
              <span className="text-pierre/70">Lundi – Vendredi</span>
              <span className="font-semibold text-pierre">9h – 18h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-pierre/70">Samedi</span>
              <span className="font-semibold text-pierre">10h – 13h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-pierre/70">Dimanche</span>
              <span className="text-pierre/40">Fermé</span>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
