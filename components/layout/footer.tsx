import LogoIcon from "components/icons/logo";
import Link from "next/link";

const footerLinks = {
  Produit: [
    { label: "Pack 64 pièces", href: "/#pricing" },
    { label: "Pack 128 pièces", href: "/#pricing" },
    { label: "Pack Famille 256", href: "/#pricing" },
    { label: "Comment ça marche", href: "/#how-it-works" },
  ],
  "À propos": [
    { label: "Notre mission", href: "/#benefits" },
    { label: "Témoignages", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/blog" },
  ],
  "Service client": [
    { label: "Contact", href: "/contact" },
    { label: "Livraison", href: "/livraison" },
    { label: "Retours & garantie", href: "/retours" },
    { label: "Mentions légales", href: "/legal" },
  ],
};

const certifications = [
  { label: "CE Certifié", icon: "🔐" },
  { label: "EN 71 Conforme", icon: "✅" },
  { label: "Aimants N52", icon: "🧲" },
  { label: "ABS Premium", icon: "🏆" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: Logo + tagline + links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <LogoIcon size="sm" />
              <span className="font-rubik font-black text-xl text-white group-hover:text-creeper transition-colors duration-150">
                CubeCraft
              </span>
            </Link>
            <p className="font-fredoka text-white/60 text-sm leading-relaxed mb-5">
              « Construis ton monde. Pour de vrai. »
            </p>
            <p className="text-white/40 text-xs font-inter leading-relaxed">
              Le Minecraft que vos enfants peuvent toucher.
              Certifié CE & EN 71.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-rubik font-bold text-white text-sm mb-4 uppercase tracking-wider">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 text-sm font-inter hover:text-creeper transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications row */}
        <div className="border-t border-dark-border py-8 flex flex-wrap gap-4 items-center justify-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span
                key={cert.label}
                className="inline-flex items-center gap-1.5 bg-dark-card border border-dark-border rounded-full px-3 py-1.5 text-xs font-inter text-white/50"
              >
                <span>{cert.icon}</span>
                {cert.label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-or text-sm font-rubik font-semibold">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4,9/5 · 2 847 avis vérifiés
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30 font-inter">
          <p>
            © {currentYear} CubeCraft. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link href="/legal" className="hover:text-white/60 transition-colors">Mentions légales</Link>
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Confidentialité</Link>
            <Link href="/cgv" className="hover:text-white/60 transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
