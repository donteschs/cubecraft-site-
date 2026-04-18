"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { addItemAndCheckout } from "components/cart/actions";
import { buildMetaProductPayload, trackMetaEvent } from "lib/meta-pixel";

const STORAGE_KEY = "cubecraft_popup_seen_v2";

const PACKS = [
  {
    id: "64",
    label: "Pack Découverte",
    pieces: "64 pièces",
    old: "59,90 €",
    price: "39,90 €",
    badge: null,
  },
  {
    id: "128",
    label: "Pack Créateur",
    pieces: "128 pièces",
    old: "99,90 €",
    price: "69,90 €",
    badge: "⭐ Le + populaire",
  },
  {
    id: "256",
    label: "Pack Famille",
    pieces: "256 pièces",
    old: "179,90 €",
    price: "119,90 €",
    badge: "💎 Meilleure valeur",
  },
] as const;

export function PromoPopup({
  variantIds,
}: {
  variantIds: Record<string, string | undefined>;
}) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<"64" | "128" | "256">("128");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, "1");
      setVisible(true);
    }, 10_000);
    return () => clearTimeout(t);
  }, []);

  function close() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  function handleOrder() {
    const variantId = variantIds[selected];
    trackMetaEvent(
      "InitiateCheckout",
      buildMetaProductPayload({
        contentId: variantId || selected,
        title: "Cubes Magnétiques CubeCraft",
        price: Number(chosen.price.replace(" €", "").replace(",", ".")),
        currency: "EUR",
        variantTitle: chosen.label,
      }),
    );
    close();
    if (variantId) {
      startTransition(async () => {
        await addItemAndCheckout(variantId);
      });
    } else {
      window.location.href = "/commander";
    }
  }

  const chosen = PACKS.find((p) => p.id === selected)!;

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Offre spéciale CubeCraft"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Card */}
      <div className="relative z-10 w-full sm:max-w-3xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl bg-white animate-popup flex flex-col sm:flex-row max-h-[92vh] sm:max-h-[90vh]">
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-colors"
          aria-label="Fermer"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22z" />
          </svg>
        </button>

        {/* ── LEFT — image (desktop) / top image (mobile) ── */}
        <div className="relative w-full sm:w-[42%] shrink-0 h-44 sm:h-auto bg-gradient-to-br from-[#1b2e1b] to-[#2d4a2d]">
          <Image
            src="/images/Whisk_21fe8406a0537f38ec8479f261076368dr.png"
            alt="CubeCraft cubes magnétiques"
            fill
            className="object-cover opacity-90"
            sizes="(max-width:640px) 100vw, 42vw"
            priority
          />
          {/* Ribbon */}
          <div className="absolute top-4 left-0 bg-[#FFB300] text-black text-[11px] font-rubik font-bold px-4 py-1.5 rounded-r-full shadow-md">
            🎉 −30% offre lancement
          </div>
          {/* Certifs */}
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {["CE", "EN 71", "N52"].map((c) => (
              <span
                key={c}
                className="text-[10px] font-rubik font-bold bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-white/30"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT — content ── */}
        <div className="flex flex-col flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6 gap-4">
          {/* Header */}
          <div>
            <p className="text-[11px] font-inter font-semibold text-[#4CAF50] uppercase tracking-widest mb-1">
              Offre exclusive — 48h seulement
            </p>
            <h2 className="font-rubik font-bold text-[#1a2e1a] text-xl sm:text-2xl leading-snug">
              Choisis ton pack CubeCraft
            </h2>
            <p className="text-sm text-[#455A64]/70 font-inter mt-1 leading-relaxed">
              Des cubes magnétiques qui remplacent les écrans — que tes enfants
              adorent vraiment.
            </p>
          </div>

          {/* Pack selector */}
          <div className="flex flex-col gap-2.5">
            {PACKS.map((p) => {
              const active = selected === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id as typeof selected)}
                  className={`relative w-full text-left rounded-2xl border-2 px-4 py-3 transition-all duration-150 focus:outline-none ${
                    active
                      ? "border-[#4CAF50] bg-[#f0faf0] shadow-sm shadow-[#4CAF50]/20"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {/* Badge */}
                  {p.badge && (
                    <span className="absolute -top-2.5 left-4 text-[10px] font-rubik font-bold bg-[#FFB300] text-black px-2 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    {/* Radio + label */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? "border-[#4CAF50]" : "border-gray-300"}`}
                      >
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
                        )}
                      </span>
                      <div>
                        <p
                          className={`text-sm font-rubik font-bold ${active ? "text-[#2e7d32]" : "text-[#455A64]"}`}
                        >
                          {p.label}
                        </p>
                        <p className="text-xs font-inter text-[#455A64]/60">
                          {p.pieces}
                        </p>
                      </div>
                    </div>

                    {/* Prices */}
                    <div className="text-right shrink-0">
                      <p className="text-xs font-inter text-[#455A64]/40 line-through">
                        {p.old}
                      </p>
                      <p
                        className={`text-base font-rubik font-bold ${active ? "text-[#4CAF50]" : "text-[#455A64]"}`}
                      >
                        {p.price}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            onClick={handleOrder}
            disabled={isPending}
            className="block w-full text-center bg-[#4CAF50] hover:bg-[#388E3C] active:scale-[0.98] text-white font-rubik font-bold text-base rounded-2xl py-3.5 transition-all shadow-lg shadow-[#4CAF50]/30 disabled:opacity-70 disabled:cursor-wait"
          >
            {isPending
              ? "Redirection…"
              : `Commander le ${chosen.label} — ${chosen.price} →`}
          </button>

          {/* Trust + dismiss */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-3 text-[11px] font-inter text-[#455A64]/50">
              <span>🚚 Livraison gratuite</span>
              <span>·</span>
              <span>🔒 Paiement sécurisé</span>
              <span>·</span>
              <span>↩ 30j satisfait</span>
            </div>
            <button
              onClick={close}
              className="text-[11px] font-inter text-[#455A64]/35 hover:text-[#455A64]/60 transition-colors"
            >
              Non merci, je préfère payer plein prix
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popup-in {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-popup {
          animation: popup-in 0.32s cubic-bezier(0.34, 1.4, 0.64, 1) both;
        }
      `}</style>
    </div>
  );
}
