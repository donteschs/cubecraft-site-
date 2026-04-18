"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { addItemAndCheckout } from "components/cart/actions";
import { buildMetaProductPayload, trackMetaEvent } from "lib/meta-pixel";
import { trackTikTokEvent } from "lib/tiktok";
import { trackPinterestEvent } from "lib/pinterest";
import { VideoSection } from "./video-section";

/* ─────────────────── data ─────────────────── */

const GALLERY_IMAGES = [
  {
    src: "/images/Whisk_21fe8406a0537f38ec8479f261076368dr.png",
    alt: "CubeCraft — pack cubes magnétiques, vue principale",
  },
  {
    src: "/images/Whisk_04c245b3be0535c81d242e1c301414f5dr.png",
    alt: "Gros plan sur les cubes 3D colorés",
  },
  {
    src: "/images/Whisk_49ebf466efa83188d3c4771deac3c2bcdr.png",
    alt: "6 créations différentes sur socles blancs",
  },
  {
    src: "/images/Whisk_86eed3c52579d98badd4ea718118cbd0dr.png",
    alt: "Arrangement de cubes, vue de dessus",
  },
  {
    src: "/images/Whisk_0f4f789c58d8d62974e423a8f570af63dr.png",
    alt: "Emballage cadeau premium CubeCraft",
  },
  {
    src: "/images/Whisk_55d0052c7faf764a3484e82a295cc64bdr.png",
    alt: "Château Minecraft construit en cubes magnétiques",
  },
];

const VARIANTS = [
  {
    id: "100",
    label: "100 pièces",
    normalPrice: 59.9,
    launchPrice: 39.9,
    savings: 20,
    badge: null,
    tag: "Idéal pour débuter",
    stock: 42,
  },
  {
    id: "200",
    label: "200 pièces",
    normalPrice: 99.9,
    launchPrice: 69.9,
    savings: 30,
    badge: "⭐ Le + populaire",
    tag: "Choix des familles",
    stock: 31,
  },
  {
    id: "400",
    label: "400 pièces",
    normalPrice: 179.9,
    launchPrice: 119.9,
    savings: 60,
    badge: "🏆 Meilleure valeur",
    tag: "Projets épiques",
    stock: 18,
  },
];

const TRUST_BADGES = [
  {
    title: "Livraison gratuite",
    sub: "Dès 39,90 € d'achat",
    icon: <IconTruck />,
  },
  { title: "Expédié sous 24h", sub: "Jours ouvrés", icon: <IconBolt /> },
  {
    title: "Garantie 30 jours",
    sub: "Satisfait ou remboursé",
    icon: <IconShield />,
  },
  { title: "Paiement sécurisé", sub: "SSL · CB · PayPal", icon: <IconLock /> },
  { title: "4,9 / 5 étoiles", sub: "2 847 avis vérifiés", icon: <IconStar /> },
  {
    title: "Certifié CE & EN 71",
    sub: "Aimants néodyme N52",
    icon: <IconBadge />,
  },
];

const ACCORDION_ITEMS = [
  {
    title: "Contenu de la boîte",
    content:
      "Cubes magnétiques (100/200/400 selon le pack), pochette de rangement premium, guide d'inspiration avec 20 modèles, accès communauté CubeCraft, certificat CE & EN 71.",
  },
  {
    title: "Sécurité & certifications",
    content:
      "Certifié CE · EN 71. Aimants néodyme N52 encapsulés dans l'ABS non toxique. Recommandé dès 6 ans. Sous surveillance parentale pour les moins de 8 ans.",
  },
  {
    title: "Livraison & délais",
    content:
      "Expédition sous 24h ouvrées depuis la France. Livraison gratuite en métropole. Suivi par email. Délai : 2–4 jours ouvrés.",
  },
  {
    title: "Retours & garantie",
    content:
      "Satisfait ou remboursé 30 jours, sans justification. Retour offert. Remboursement complet sous 5 jours. Garantie 1 an contre les défauts de fabrication.",
  },
  {
    title: "Compatibilité",
    content:
      "Tous les packs CubeCraft s'assemblent entre eux. Combinez le pack 100 et le 200 — les aimants s'imbriquent dans tous les sens (faces, arêtes, coins).",
  },
];

const REVIEWS = [
  {
    name: "Sophie M.",
    location: "Paris",
    rating: 5,
    date: "Il y a 3 jours",
    title: "Mon fils a lâché sa tablette !",
    body: "Commandé le pack 200 pièces pour son anniversaire. Il a oublié sa tablette pendant une semaine entière. Qualité premium, aimants puissants, livraison ultra rapide. Je recommande à 1000%.",
    helpful: 47,
  },
  {
    name: "Thomas R.",
    location: "Lyon",
    rating: 5,
    date: "Il y a 1 semaine",
    title: "Cadeau parfait pour un fan de Minecraft",
    body: "Mon neveu a adoré. En 2h il avait déjà construit un village entier. Emballage cadeau magnifique. La qualité justifie largement le prix.",
    helpful: 31,
  },
  {
    name: "Marie-Claire L.",
    location: "Bordeaux",
    rating: 5,
    date: "Il y a 2 semaines",
    title: "Valeur incroyable pour le prix",
    body: "J'étais sceptique mais la qualité est clairement premium. ABS solide, aimants très puissants. Mes 3 enfants jouent ensemble avec les 400 pièces. Meilleur achat de l'année.",
    helpful: 58,
  },
  {
    name: "Nathalie V.",
    location: "Montpellier",
    rating: 5,
    date: "Il y a 3 semaines",
    title: "Recommandé par une enseignante Montessori",
    body: "En tant qu'enseignante, je confirme : c'est un véritable outil pédagogique déguisé en jouet. Géométrie spatiale, architecture, créativité — tout ça en jouant. Exceptionnel.",
    helpful: 74,
  },
];

const MINI_FAQ = [
  {
    q: "À partir de quel âge ?",
    a: "Recommandé dès 6 ans. Sous surveillance pour les 6–8 ans, autonome à partir de 8 ans. Les aimants N52 sont encapsulés dans l'ABS — aussi sûr qu'un LEGO.",
  },
  {
    q: "Les packs sont-ils compatibles entre eux ?",
    a: "Oui, tous les packs CubeCraft s'assemblent parfaitement. Vous pouvez commencer par le 100 pièces et ajouter le 200 pièces plus tard.",
  },
  {
    q: "Combien de temps pour la livraison ?",
    a: "Expédié sous 24h ouvrées depuis la France. Livraison en 2–4 jours ouvrés en France métropolitaine, entièrement gratuite.",
  },
  {
    q: "Que faire si mon enfant n'aime pas ?",
    a: "On prend le risque à votre place : garantie 30 jours satisfait ou remboursé. Renvoi gratuit, remboursement intégral sous 5 jours ouvrés. Sans question.",
  },
];

/* ─────────────────── icons ─────────────────── */
function IconTruck() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.9 17.9 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  );
}
function IconShield() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}
function IconLock() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}
function IconStar() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
function IconBadge() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6h.008v.008H6V6z"
      />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z"
      />
    </svg>
  );
}
function IconX() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22z" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Stars({ n, size = "sm" }: { n: number; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <span className="flex" aria-label={`${n} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${sz} ${i < n ? "text-or fill-or" : "text-gray-200 fill-gray-200"}`}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* ─────────────────── main component ─────────────────── */
export function ProductUI({
  variantIds,
  checkoutUrls,
  upsellVariantId,
}: {
  variantIds: Record<string, string | undefined>;
  checkoutUrls: Record<string, string>;
  upsellVariantId?: string;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeVariant, setActiveVariant] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [upsellChecked, setUpsellChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartVisible, setCartVisible] = useState(false);
  const trackedViewRef = useRef<string | null>(null);

  const variant = VARIANTS[activeVariant]!;
  const discountPct = Math.round((variant.savings / variant.normalPrice) * 100);

  useEffect(() => {
    if (trackedViewRef.current === variant.id) {
      return;
    }

    trackMetaEvent(
      "ViewContent",
      buildMetaProductPayload({
        contentId: variantIds[variant.id] || variant.id,
        title: "Cubes Magnétiques CubeCraft",
        price: variant.launchPrice,
        currency: "EUR",
        variantTitle: variant.label,
      }),
    );
    trackTikTokEvent("ViewContent", {
      contents: [{ content_id: variantIds[variant.id] || variant.id, content_type: "product", content_name: `CubeCraft ${variant.label}` }],
      value: variant.launchPrice,
      currency: "EUR",
    });
    trackPinterestEvent("pagevisit");

    trackedViewRef.current = variant.id;
  }, [variant, variantIds]);

  function handleOrder() {
    const payload = {
      contentId: variantIds[variant.id] || variant.id,
      title: "Cubes Magnétiques CubeCraft",
      price: variant.launchPrice,
      currency: "EUR",
      variantTitle: variant.label,
    };
    trackMetaEvent("InitiateCheckout", buildMetaProductPayload(payload));
    trackTikTokEvent("AddToCart", {
      contents: [{ content_id: payload.contentId, content_type: "product", content_name: `CubeCraft ${variant.label}` }],
      value: variant.launchPrice,
      currency: "EUR",
    });
    trackTikTokEvent("InitiateCheckout", {
      contents: [{ content_id: payload.contentId, content_type: "product", content_name: `CubeCraft ${variant.label}` }],
      value: variant.launchPrice,
      currency: "EUR",
    });
    trackPinterestEvent("addtocart", { value: variant.launchPrice, order_quantity: 1, currency: "EUR" });

    const variantId = variantIds[variant.id];
    if (variantId) {
      startTransition(async () => {
        await addItemAndCheckout(variantId, quantity, upsellChecked && upsellVariantId ? upsellVariantId : undefined);
      });
    } else {
      const url = checkoutUrls[variant.id];
      if (url) window.location.href = url;
    }
  }

  return (
    <div className="bg-blanc min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm font-inter text-pierre/50">
          <Link
            href="/"
            className="hover:text-creeper transition-colors duration-150"
          >
            Accueil
          </Link>
          <svg
            className="w-3 h-3 flex-shrink-0"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M4.5 2.5L7.5 6l-3 3.5" strokeLinecap="round" />
          </svg>
          <span className="text-pierre font-medium truncate">
            Cubes Magnétiques CubeCraft
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          §1 — GALLERY + BUY BOX
      ══════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-14 items-start">
          {/* Gallery */}
          <div className="lg:sticky lg:top-6">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-3 group">
              <Image
                key={activeImage}
                src={GALLERY_IMAGES[activeImage]!.src}
                alt={GALLERY_IMAGES[activeImage]!.alt}
                fill
                className="object-contain p-4 transition-opacity duration-200"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={activeImage === 0}
              />
              <div className="absolute top-3 left-3 bg-or text-dark font-rubik font-black text-base w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-or/40 rotate-6">
                -{discountPct}%
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Image ${i + 1}`}
                  aria-pressed={activeImage === i}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-150 min-h-[44px] ${activeImage === i ? "border-creeper shadow-md shadow-creeper/20" : "border-gray-100 hover:border-creeper/40"}`}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
            {/* Cert strip */}
            <div className="mt-4 flex items-center justify-center gap-4 py-3 px-4 bg-creeper-light/20 rounded-xl border border-creeper/10">
              {["CE", "EN 71", "N52"].map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1.5 text-xs font-rubik font-bold text-creeper-dark"
                >
                  <span className="w-4 h-4 bg-creeper rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 10 10"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.54 2.54a.75.75 0 010 1.06L4.47 7.67a.75.75 0 01-1.06 0L1.46 5.72a.75.75 0 011.06-1.06l1.42 1.41L7.48 2.54a.75.75 0 011.06 0z"
                      />
                    </svg>
                  </span>
                  {c}
                </span>
              ))}
              <span className="text-pierre/40 text-xs font-inter">
                · Aimants encapsulés ABS
              </span>
            </div>
          </div>

          {/* Buy box */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-pixel text-[8px] text-creeper tracking-widest uppercase">
                MINECRAFT IRL · 2026
              </span>
              <h1 className="font-rubik font-black text-pierre text-2xl sm:text-3xl xl:text-4xl leading-tight mt-1">
                Cubes Magnétiques CubeCraft
                <span className="block text-creeper">Pack {variant.label}</span>
              </h1>
              <div className="flex items-center gap-3 flex-wrap mt-2">
                <Stars n={5} size="md" />
                <span className="font-rubik font-bold text-pierre text-sm">
                  4,9/5
                </span>
                <a
                  href="#reviews"
                  className="text-ciel text-sm font-inter hover:underline"
                >
                  2 847 avis
                </a>
                <span className="text-creeper text-sm font-inter">
                  · {variant.stock} restants
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-creeper-light/30 to-blanc rounded-2xl border border-creeper/10 p-4 sm:p-5">
              <div className="flex items-end gap-3 mb-1">
                <span className="font-rubik font-black text-4xl sm:text-5xl text-creeper-dark leading-none">
                  {variant.launchPrice.toFixed(2).replace(".", ",")} €
                </span>
                <span className="text-pierre/40 line-through text-lg font-inter mb-1">
                  {variant.normalPrice.toFixed(2).replace(".", ",")} €
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-or text-dark text-xs font-rubik font-black px-2.5 py-1 rounded-full">
                  -{discountPct}% offre de lancement
                </span>
                <span className="text-creeper-dark text-sm font-inter">
                  Économisez {variant.savings} €
                </span>
              </div>
              <p className="text-pierre/40 text-xs font-inter mt-1.5">
                Prix TTC · Livraison gratuite · Offre valable jusqu&apos;à
                épuisement du stock
              </p>
            </div>

            {/* Variant selector */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-rubik font-bold text-pierre text-sm">
                  Votre pack
                </span>
                <span className="text-pierre/40 text-xs font-inter">
                  Tous compatibles entre eux
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {VARIANTS.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVariant(i)}
                    aria-pressed={activeVariant === i}
                    className={`relative rounded-xl border-2 p-2.5 sm:p-3 text-left transition-all duration-150 cursor-pointer min-h-[70px] ${activeVariant === i ? "border-creeper bg-creeper-light/20 shadow-md shadow-creeper/10" : "border-gray-200 bg-white hover:border-creeper/40"}`}
                  >
                    {v.badge && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-or text-dark text-[9px] font-rubik font-black px-1.5 py-0.5 rounded-full">
                        {v.badge}
                      </div>
                    )}
                    <div className="font-rubik font-black text-pierre text-sm mt-0.5">
                      {v.label}
                    </div>
                    <div className="font-rubik font-bold text-creeper-dark text-base">
                      {v.launchPrice.toFixed(2).replace(".", ",")} €
                    </div>
                    <div className="text-pierre/50 text-[10px] font-inter leading-tight">
                      {v.tag}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock urgency */}
            <div className="flex items-center gap-2 bg-or/5 border border-or/20 rounded-lg px-4 py-2.5">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-or opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-or" />
              </span>
              <span className="text-sm font-inter text-or-dark">
                <strong>{variant.stock} unités restantes</strong> à ce prix —
                offre de lancement
              </span>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <span className="font-rubik font-bold text-pierre text-sm">Quantité</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-pierre hover:bg-gray-100 transition-colors font-bold text-lg cursor-pointer"
                >−</button>
                <span className="w-10 text-center font-rubik font-black text-pierre">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-pierre hover:bg-gray-100 transition-colors font-bold text-lg cursor-pointer"
                >+</button>
              </div>
            </div>

            {/* CTA — Ajouter au panier */}
            <button
              type="button"
              onClick={() => setCartVisible(true)}
              className="w-full rounded-xl py-4 sm:py-5 font-rubik font-black text-lg sm:text-xl text-white shadow-xl transition-all duration-200 cursor-pointer btn-shimmer animate-pulse-green hover:scale-[1.02] active:scale-100 shadow-creeper/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-creeper focus-visible:ring-offset-2"
            >
              <span className="flex items-center justify-center gap-2">
                🛒 Ajouter au panier — {(variant.launchPrice * quantity).toFixed(2).replace(".", ",")} €
              </span>
            </button>

            {/* Mini panier */}
            {cartVisible && (
              <div className="rounded-2xl border-2 border-creeper bg-creeper-light/10 p-4 flex flex-col gap-3">
                <div className="font-rubik font-black text-pierre text-sm flex items-center justify-between">
                  <span>🛒 Mon panier</span>
                  <button type="button" onClick={() => setCartVisible(false)} className="text-pierre/30 hover:text-pierre transition-colors cursor-pointer"><IconX /></button>
                </div>
                {/* Ligne produit principal */}
                <div className="flex items-center justify-between gap-2 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
                  <div className="flex-1 min-w-0">
                    <div className="font-rubik font-bold text-pierre text-sm">CubeCraft {variant.label}</div>
                    <div className="text-pierre/50 text-xs font-inter">× {quantity}</div>
                  </div>
                  <span className="font-rubik font-black text-creeper-dark text-sm whitespace-nowrap">
                    {(variant.launchPrice * quantity).toFixed(2).replace(".", ",")} €
                  </span>
                </div>
                {/* Ligne upsell si cochée */}
                {upsellChecked && (
                  <div className="flex items-center justify-between gap-2 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
                    <div className="flex-1 min-w-0">
                      <div className="font-rubik font-bold text-pierre text-sm">Jeu Magnétique</div>
                      <div className="text-pierre/50 text-xs font-inter">× 1</div>
                    </div>
                    <span className="font-rubik font-black text-creeper-dark text-sm">14,90 €</span>
                  </div>
                )}
                {/* Total */}
                <div className="flex items-center justify-between pt-1 border-t border-creeper/20">
                  <span className="font-rubik font-bold text-pierre text-sm">Total</span>
                  <span className="font-rubik font-black text-creeper-dark text-lg">
                    {(variant.launchPrice * quantity + (upsellChecked ? 14.9 : 0)).toFixed(2).replace(".", ",")} €
                  </span>
                </div>
                {/* Bouton valider */}
                <button
                  onClick={handleOrder}
                  disabled={isPending}
                  className={`w-full rounded-xl py-4 font-rubik font-black text-base text-white shadow-lg transition-all duration-200 cursor-pointer focus-visible:outline-none ${isPending ? "bg-creeper-dark" : "bg-creeper hover:bg-creeper-dark hover:scale-[1.01] active:scale-100"}`}
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                      </svg>
                      Redirection…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      ✓ Valider mon panier <IconArrow />
                    </span>
                  )}
                </button>
                <p className="text-center text-pierre/40 text-[10px] font-inter">🔒 Paiement sécurisé · Livraison gratuite</p>
              </div>
            )}

            {/* Upsell — Jeu Magnétique */}
            <button
              type="button"
              onClick={() => setUpsellChecked(!upsellChecked)}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer ${upsellChecked ? "border-creeper bg-creeper-light/20 shadow-md shadow-creeper/10" : "border-gray-200 bg-white hover:border-creeper/40"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${upsellChecked ? "bg-creeper border-creeper" : "border-gray-300"}`}>
                  {upsellChecked && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="currentColor">
                      <path fillRule="evenodd" d="M10.28 2.28a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06L4.25 7.19l4.97-4.97a.75.75 0 011.06.06z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-rubik font-black text-pierre text-sm">Ajouter le Jeu Magnétique</span>
                    <span className="bg-or text-dark text-[9px] font-rubik font-black px-1.5 py-0.5 rounded-full">-25%</span>
                  </div>
                  <p className="text-pierre/50 text-xs font-inter mt-0.5">Jeu de stratégie — pierres aimantées · Famille &amp; enfants dès 6 ans</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-rubik font-black text-creeper-dark text-base">14,90 €</span>
                    <span className="text-pierre/40 line-through text-sm font-inter">19,90 €</span>
                    <span className="text-pierre/40 text-xs font-inter">· livré avec ta commande</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Trust badges 3×2 */}
            <div className="grid grid-cols-3 gap-2">
              {TRUST_BADGES.map((b) => (
                <div
                  key={b.title}
                  className="flex flex-col items-center text-center gap-1 rounded-xl bg-white border border-gray-100 p-2.5 sm:p-3 shadow-sm"
                >
                  <span className="text-creeper">{b.icon}</span>
                  <span className="font-rubik font-bold text-pierre text-[10px] sm:text-[11px] leading-tight">
                    {b.title}
                  </span>
                  <span className="text-pierre/50 text-[9px] font-inter leading-tight">
                    {b.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {ACCORDION_ITEMS.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === i ? null : i)
                    }
                    aria-expanded={openAccordion === i}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer min-h-[48px]"
                  >
                    <span className="font-rubik font-bold text-pierre text-sm">
                      {item.title}
                    </span>
                    <svg
                      className={`w-4 h-4 text-pierre/40 transition-transform duration-200 flex-shrink-0 ml-2 ${openAccordion === i ? "rotate-180" : ""}`}
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {openAccordion === i && (
                    <div className="px-4 pb-4 pt-1 bg-gray-50/50 text-sm font-inter text-pierre/70 leading-relaxed">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          §2 — SOCIAL PROOF STRIP
      ══════════════════════════════════════════ */}
      <div className="border-y border-gray-100 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto scrollbar-hide pb-1 sm:pb-0 sm:justify-center flex-nowrap sm:flex-wrap">
            {[
              { icon: <Stars n={5} size="sm" />, label: "4,9/5 · 2 847 avis" },
              {
                icon: (
                  <span className="font-rubik font-black text-creeper text-lg">
                    CE
                  </span>
                ),
                label: "Certifié CE & EN 71",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5 text-creeper"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124A17.902 17.902 0 0016.5 9.557M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677"
                    />
                  </svg>
                ),
                label: "Livraison gratuite",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5 text-creeper"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                ),
                label: "Expédié sous 24h",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5 text-creeper"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                ),
                label: "Garantie 30 jours",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5 text-creeper"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                ),
                label: "Paiement sécurisé",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                {item.icon}
                <span className="text-sm font-rubik font-semibold text-pierre whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          §2b — VIDEOS
      ══════════════════════════════════════════ */}
      <VideoSection />

      {/* ══════════════════════════════════════════
          §3 — BENEFITS (Ce que ça change)
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-blanc">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="font-pixel text-[8px] text-creeper tracking-widest uppercase block mb-3">
              Pourquoi CubeCraft
            </span>
            <h2 className="font-rubik font-black text-pierre text-2xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              Ce que ça change dans
              <br className="hidden sm:block" />
              <span className="text-gradient-green"> votre famille</span>
            </h2>
            <p className="text-pierre/60 text-base sm:text-lg font-inter max-w-xl mx-auto">
              Ce n&apos;est pas juste un jouet. C&apos;est un outil de
              développement déguisé en plaisir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10">
            {[
              {
                stat: "–73%",
                statLabel: "de temps écran",
                title: "Ils posent la tablette. Naturellement.",
                desc: "CubeCraft active les mêmes circuits de récompense qu'un jeu vidéo — satisfaction, défi, progression — sans lumière bleue ni dopamine artificielle. Les parents constatent la différence dès la première semaine.",
                img: "/images/Whisk_4416eb927c0020d8a5046ad544d19c74dr.png",
                accent: "bg-creeper",
                light: "bg-creeper-light/20",
                border: "border-creeper/20",
              },
              {
                stat: "3×",
                statLabel: "plus créatifs",
                title: "Leur imagination explose.",
                desc: "Sans mode d'emploi, sans règles imposées — juste 64 cubes et une imagination sans limite. Chaque jour ils inventent quelque chose de nouveau. Les neuro-pédiatres le confirment : la construction libre est l'une des meilleures activités pour le cerveau en développement.",
                img: "/images/Whisk_49ebf466efa83188d3c4771deac3c2bcdr.png",
                accent: "bg-or",
                light: "bg-or/10",
                border: "border-or/20",
              },
              {
                stat: "2h+",
                statLabel: "de concentration",
                title: "L'état de flow. Sans effort.",
                desc: "Concentrés pendant 2, 3, parfois 4 heures d'affilée. Ce n'est pas de la discipline — c'est du plaisir pur. Les psychologues appellent ça le « flow state » : absorption totale dans une activité créatrice. CubeCraft le déclenche naturellement.",
                img: "/images/Whisk_19a009ed6a33513908946a206c5af180dr.png",
                accent: "bg-ciel",
                light: "bg-ciel/10",
                border: "border-ciel/20",
              },
              {
                stat: "100%",
                statLabel: "moments partagés",
                title: "Toute la famille crée ensemble.",
                desc: "Parents, enfants, frères et sœurs — tout le monde peut jouer. Les CubeCraft créent des moments de complicité authentiques que les écrans ne peuvent pas offrir. Ces souvenirs-là restent pour toujours.",
                img: "/images/Whisk_4416eb927c0020d8a5046ad544d19c74dr.png",
                accent: "bg-terre",
                light: "bg-terre/10",
                border: "border-terre/20",
              },
            ].map((b, i) => (
              <div
                key={i}
                className={`rounded-2xl border-2 ${b.border} ${b.light} p-5 sm:p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      className={`font-rubik font-black text-4xl sm:text-5xl ${i === 0 ? "text-creeper-dark" : i === 1 ? "text-or-dark" : i === 2 ? "text-ciel" : "text-terre"}`}
                    >
                      {b.stat}
                    </div>
                    <div className="font-inter text-pierre/60 text-sm">
                      {b.statLabel}
                    </div>
                  </div>
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                    <Image
                      src={b.img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-rubik font-black text-pierre text-lg sm:text-xl mb-2">
                    {b.title}
                  </h3>
                  <p className="text-pierre/65 text-sm leading-relaxed font-inter">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* STEM row */}
          <div className="bg-dark rounded-2xl p-5 sm:p-8 grid sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="sm:col-span-1 flex items-center">
              <div>
                <div className="font-pixel text-[8px] text-creeper tracking-widest uppercase mb-2">
                  Compétences
                </div>
                <h3 className="font-rubik font-black text-white text-xl sm:text-2xl">
                  Développées en jouant
                </h3>
              </div>
            </div>
            {[
              {
                label: "Géométrie spatiale",
                sub: "Visualisation 3D naturelle",
              },
              { label: "Motricité fine", sub: "Coordination œil-main" },
              { label: "Pensée créative", sub: "Innovation & originalité" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-start gap-3 bg-dark-card border border-dark-border rounded-xl p-4"
              >
                <span className="mt-0.5 flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-creeper"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <div className="font-rubik font-bold text-white text-sm">
                    {s.label}
                  </div>
                  <div className="text-white/40 text-xs font-inter">
                    {s.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §4 — AVANT / APRÈS
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="font-pixel text-[8px] text-creeper tracking-widest uppercase block mb-3">
              Avant / Après
            </span>
            <h2 className="font-rubik font-black text-pierre text-2xl sm:text-4xl lg:text-5xl leading-tight">
              La vie des familles
              <br className="hidden sm:block" />
              <span className="text-gradient-green"> avec CubeCraft</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* AVANT */}
            <div className="rounded-2xl overflow-hidden border-2 border-red-100 bg-red-50/50">
              <div className="bg-red-500 text-white px-5 py-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-rubik font-black text-base">
                  Avant CubeCraft
                </span>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                {[
                  "Tablette à table, au lit, dans la voiture…",
                  "Crises quand on éteint les écrans",
                  "Aucune activité ne dure plus de 10 minutes",
                  "Créativité en baisse, l'enfant s'ennuie vite",
                  "Peu de moments de partage en famille",
                  "Sommeil perturbé par la lumière bleue",
                  "Concentration difficile à l'école",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-red-400">
                      <IconX />
                    </span>
                    <span className="text-sm font-inter text-pierre/75 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* APRÈS */}
            <div className="rounded-2xl overflow-hidden border-2 border-creeper/30 bg-creeper-light/20">
              <div className="bg-creeper text-white px-5 py-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-rubik font-black text-base">
                  Avec CubeCraft
                </span>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                {[
                  "2–3 heures de jeu créatif par session",
                  "Demande à jouer au lieu de demander la tablette",
                  "Construit des projets de plus en plus ambitieux",
                  "Imagination qui s'emballe, nouvelles idées chaque jour",
                  "Toute la famille crée ensemble le week-end",
                  "Endormissement plus facile le soir",
                  "Plus concentré à l'école selon les enseignants",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-creeper">
                      <IconCheck />
                    </span>
                    <span className="text-sm font-inter text-pierre/75 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quote pull */}
          <div className="bg-creeper-dark rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />
            <div className="relative">
              <svg
                className="w-8 h-8 text-creeper-light/50 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="font-rubik font-bold text-white text-lg sm:text-2xl lg:text-3xl leading-snug mb-5 max-w-3xl mx-auto">
                « Mon fils a posé sa tablette tout seul au bout de 3 jours. Il
                m&apos;a dit :
                <em className="text-or">
                  {" "}
                  "Maman, les cubes c&apos;est mieux parce que c&apos;est MOI
                  qui décide."
                </em>
                Ces mots valent tout l&apos;or du monde. »
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-rubik font-black text-white text-sm">
                  SM
                </div>
                <div className="text-left">
                  <div className="font-rubik font-bold text-white text-sm">
                    Sophie M.
                  </div>
                  <div className="text-white/50 text-xs font-inter">
                    Maman de Lucas, 8 ans · Paris
                  </div>
                </div>
                <Stars n={5} size="md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §5 — COMPARISON TABLE
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-blanc">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-pixel text-[8px] text-creeper tracking-widest uppercase block mb-3">
              Comparatif
            </span>
            <h2 className="font-rubik font-black text-pierre text-2xl sm:text-4xl leading-tight">
              Pourquoi{" "}
              <span className="text-gradient-green">CubeCraft gagne</span>
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm font-inter min-w-[520px]">
              <thead>
                <tr className="bg-dark text-white">
                  <th className="text-left px-4 py-3.5 font-rubik font-bold text-sm w-[38%]">
                    Critère
                  </th>
                  <th className="px-4 py-3.5 font-rubik font-bold text-center bg-creeper text-sm">
                    CubeCraft
                  </th>
                  <th className="px-4 py-3.5 font-rubik font-semibold text-center text-white/60 text-sm">
                    Tablette
                  </th>
                  <th className="px-4 py-3.5 font-rubik font-semibold text-center text-white/60 text-sm">
                    LEGO
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {[
                  { crit: "100% sans écran", cc: true, tab: false, lego: true },
                  {
                    crit: "Stimule la créativité libre",
                    cc: "★★★",
                    tab: "★",
                    lego: "★★",
                  },
                  {
                    crit: "Jeu collaboratif famille",
                    cc: "★★★",
                    tab: "★",
                    lego: "★★",
                  },
                  {
                    crit: "Développement cognitif",
                    cc: "★★★",
                    tab: "★",
                    lego: "★★",
                  },
                  {
                    crit: "Certifié CE & EN 71",
                    cc: true,
                    tab: true,
                    lego: true,
                  },
                  {
                    crit: "Aimants (résistance)",
                    cc: "N52",
                    tab: false,
                    lego: false,
                  },
                  {
                    crit: "Packs combinables",
                    cc: true,
                    tab: false,
                    lego: true,
                  },
                  {
                    crit: "Prix d'entrée",
                    cc: "39,90 €",
                    tab: "300 €+",
                    lego: "29,90 €+",
                  },
                  {
                    crit: "Addictif mais sain",
                    cc: true,
                    tab: false,
                    lego: true,
                  },
                  {
                    crit: "Garantie 30 jours",
                    cc: true,
                    tab: false,
                    lego: false,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    <td className="px-4 py-3 font-inter text-pierre/80 text-sm">
                      {row.crit}
                    </td>
                    <td className="px-4 py-3 text-center bg-creeper-light/10">
                      <CellValue v={row.cc} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CellValue v={row.tab} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CellValue v={row.lego} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §6 — TESTIMONIALS STRIP
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="font-pixel text-[8px] text-creeper tracking-widest uppercase block mb-3">
              Témoignages
            </span>
            <h2 className="font-rubik font-black text-pierre text-2xl sm:text-4xl leading-tight mb-2">
              <span className="text-gradient-green">2 847 familles</span> ont
              déjà sauté le pas
            </h2>
            <div className="inline-flex items-center gap-2 bg-or/10 border border-or/20 rounded-full px-4 py-2 mt-2">
              <Stars n={5} size="sm" />
              <span className="font-rubik font-bold text-pierre text-sm">
                4,9/5
              </span>
              <span className="text-pierre/50 font-inter text-xs">
                — avis vérifiés
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {REVIEWS.map((r, i) => (
              <article
                key={i}
                className="bg-blanc border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-creeper-light rounded-full flex items-center justify-center font-rubik font-black text-creeper-dark text-sm flex-shrink-0">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-rubik font-bold text-pierre text-sm">
                        {r.name}
                      </div>
                      <div className="text-pierre/40 text-[10px] font-inter">
                        {r.location}
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-creeper text-[9px] font-inter bg-creeper-light/30 px-2 py-0.5 rounded-full flex-shrink-0">
                    <svg
                      className="w-2.5 h-2.5"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L5 8.586l5.293-5.293z"
                      />
                    </svg>
                    Vérifié
                  </span>
                </div>
                <Stars n={r.rating} />
                <p className="font-rubik font-bold text-pierre text-sm">
                  {r.title}
                </p>
                <p className="text-pierre/60 text-xs font-inter leading-relaxed flex-1">
                  {r.body}
                </p>
                <div className="text-pierre/30 text-[10px] font-inter pt-2 border-t border-gray-100">
                  {r.date}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §7 — GUARANTEE
      ══════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-creeper/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-creeper/10 border border-creeper/20 rounded-2xl flex items-center justify-center">
              <svg
                className="w-10 h-10 text-creeper"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <div>
              <div className="font-pixel text-[8px] text-creeper tracking-widest uppercase mb-2">
                Notre promesse
              </div>
              <h3 className="font-rubik font-black text-white text-xl sm:text-2xl mb-2">
                Garantie « Créativité ou Remboursé »
              </h3>
              <p className="text-white/60 text-sm font-inter leading-relaxed mb-3">
                30 jours pour changer d&apos;avis. Si votre enfant ne joue pas
                avec ses CubeCraft, on vous rembourse intégralement.{" "}
                <strong className="text-white/80">
                  Sans question. Sans justification. Renvoi gratuit.
                </strong>
              </p>
              <div className="flex flex-wrap gap-3">
                {["Aucun risque", "Renvoi gratuit", "Remboursement 48h"].map(
                  (t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 text-white/60 text-xs font-inter"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-creeper flex-shrink-0"
                        viewBox="0 0 14 14"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.03 3.47a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06l1.97 1.97 4.97-4.97a.75.75 0 011.06 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §8 — MINI FAQ
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-blanc">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-rubik font-black text-pierre text-2xl sm:text-3xl">
              Questions fréquentes
            </h2>
          </div>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
            {MINI_FAQ.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer min-h-[56px]"
                >
                  <span className="font-rubik font-bold text-pierre text-sm sm:text-base pr-4">
                    {item.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-creeper flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 pt-1 bg-gray-50/50 text-sm font-inter text-pierre/70 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §9 — FINAL CTA BLOCK
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-creeper-dark via-creeper to-creeper-dark relative overflow-hidden">
        <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <span className="font-pixel text-[8px] text-white/50 tracking-widest uppercase block mb-4">
            Dernière chance
          </span>
          <h2 className="font-rubik font-black text-white text-2xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Votre enfant mérite
            <br />
            <span className="text-or">mieux que les écrans.</span>
          </h2>
          <p className="text-white/80 text-base sm:text-lg font-inter leading-relaxed mb-8">
            {variant.stock} familles peuvent encore profiter de l&apos;offre de
            lancement à -{discountPct}%.
          </p>
          <button
            onClick={handleOrder}
            disabled={isPending}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-10 py-5 font-rubik font-black text-xl transition-all duration-200 cursor-pointer mb-4 ${isPending ? "bg-white/20 text-white" : "bg-or text-dark hover:bg-or-dark hover:scale-105 active:scale-100 shadow-xl shadow-or/30"}`}
          >
            {isPending
              ? "Redirection…"
              : `J'en profite maintenant — ${variant.launchPrice.toFixed(2).replace(".", ",")} €`}
          </button>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-sm font-inter">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-white/50"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z"
                  clipRule="evenodd"
                />
              </svg>
              Livraison gratuite
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-white/50"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z"
                  clipRule="evenodd"
                />
              </svg>
              Garantie 30 jours
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-white/50"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z"
                  clipRule="evenodd"
                />
              </svg>
              Expédié sous 24h
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §10 — FULL REVIEWS
      ══════════════════════════════════════════ */}
      <section
        id="reviews"
        className="border-t border-gray-100 bg-blanc py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-pixel text-[8px] text-creeper tracking-widest uppercase block mb-2">
                Avis clients
              </span>
              <h2 className="font-rubik font-black text-pierre text-2xl sm:text-3xl mb-1">
                Ce que disent les familles
              </h2>
              <p className="text-pierre/50 font-inter text-sm">
                2 847 avis · 4,9 / 5 étoiles
              </p>
            </div>
            <div className="flex items-center gap-5 bg-creeper-light/20 border border-creeper/10 rounded-2xl px-5 py-4 flex-shrink-0">
              <div className="text-center">
                <div className="font-rubik font-black text-4xl text-creeper-dark leading-none">
                  4,9
                </div>
                <Stars n={5} size="md" />
                <div className="text-pierre/40 text-[10px] font-inter mt-1">
                  sur 5
                </div>
              </div>
              <div className="space-y-1.5 min-w-[110px]">
                {[5, 4, 3, 2, 1].map((s) => {
                  const pct = s === 5 ? 89 : s === 4 ? 8 : s === 3 ? 2 : 0.5;
                  return (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className="text-[10px] text-pierre/40 w-2">
                        {s}
                      </span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-or rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-pierre/30 w-5 text-right">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {REVIEWS.map((r, i) => (
              <article
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-creeper-light rounded-full flex items-center justify-center font-rubik font-black text-creeper-dark text-sm flex-shrink-0">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-rubik font-bold text-pierre text-sm">
                        {r.name}
                      </div>
                      <div className="text-pierre/40 text-[10px] font-inter">
                        {r.location}
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-0.5 text-creeper text-[9px] font-inter bg-creeper-light/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
                    <svg
                      className="w-2.5 h-2.5"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L5 8.586l5.293-5.293z"
                      />
                    </svg>
                    Vérifié
                  </span>
                </div>
                <Stars n={r.rating} />
                <p className="font-rubik font-bold text-pierre text-sm">
                  {r.title}
                </p>
                <p className="text-pierre/60 text-xs font-inter leading-relaxed flex-1">
                  {r.body}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-pierre/30 text-[10px] font-inter">
                    {r.date}
                  </span>
                  <span className="text-pierre/30 text-[10px] font-inter">
                    {r.helpful} utile
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-rubik font-bold text-pierre/50 hover:text-pierre border border-gray-200 rounded-xl px-6 py-3 hover:border-gray-300 transition-all text-sm"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d="M10 12L6 8l4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sticky mobile bottom bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl px-4 pb-safe pt-3"
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-rubik font-black text-pierre text-sm leading-tight">
              Pack {variant.label}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-rubik font-black text-creeper-dark text-lg">
                {variant.launchPrice.toFixed(2).replace(".", ",")} €
              </span>
              <span className="text-pierre/35 line-through text-sm font-inter">
                {variant.normalPrice.toFixed(2).replace(".", ",")} €
              </span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            disabled={isPending}
            className={`flex-shrink-0 rounded-xl px-5 py-3.5 font-rubik font-black text-base text-white transition-all duration-150 cursor-pointer min-h-[48px] ${isPending ? "bg-creeper-dark" : "btn-shimmer"}`}
          >
            {isPending ? "…" : "Commander →"}
          </button>
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden />
    </div>
  );
}

function CellValue({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="inline-flex justify-center">
        <svg
          className="w-5 h-5 text-creeper"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex justify-center">
        <svg
          className="w-5 h-5 text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  return <span className="font-rubik font-bold text-pierre text-xs">{v}</span>;
}
