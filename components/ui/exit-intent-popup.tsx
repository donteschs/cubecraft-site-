"use client";

import { useEffect, useState, useCallback } from "react";
import { CountdownTimer } from "components/ui/countdown-timer";

const SEEN_KEY = "cubecraft_exit_intent_v1";
const PROMO_KEY = "cubecraft_popup_seen_v2";

const PACKS = [
  { id: "100", label: "100 pièces", price: 39.9, url: "/commander" },
  { id: "200", label: "200 pièces", price: 69.9, url: "/commander" },
  { id: "400", label: "400 pièces", price: 119.9, url: "/commander" },
];

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [selectedPack, setSelectedPack] = useState(1);

  const tryShow = useCallback(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    if (localStorage.getItem(PROMO_KEY)) return;
    sessionStorage.setItem(SEEN_KEY, "1");
    setVisible(true);
  }, []);

  useEffect(() => {
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) tryShow();
    }
    document.addEventListener("mouseleave", onMouseLeave);

    let lastY = 0;
    let lastTime = 0;

    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      const now = Date.now();
      const dy = touch.clientY - lastY;
      const dt = now - lastTime;
      if (dt > 0 && dy > 0) {
        const velocity = (dy / dt) * 1000;
        if (velocity > 300) tryShow();
      }
      lastY = touch.clientY;
      lastTime = now;
    }
    document.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [tryShow]);

  if (!visible) return null;

  const pack = PACKS[selectedPack]!;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setVisible(false); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-pixel text-[8px] text-creeper tracking-widest uppercase mb-1">
              OFFRE SPÉCIALE
            </p>
            <h2 className="font-rubik font-black text-pierre text-xl leading-tight">
              Tu t&apos;en vas ?<br />
              <span className="text-creeper">L&apos;offre -30% expire bientôt…</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="text-pierre/30 hover:text-pierre transition-colors ml-2 mt-1 cursor-pointer"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        <CountdownTimer />

        <div className="grid grid-cols-3 gap-2">
          {PACKS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPack(i)}
              aria-pressed={selectedPack === i}
              className={`rounded-xl border-2 p-2.5 text-left transition-all duration-150 cursor-pointer ${selectedPack === i ? "border-creeper bg-creeper-light/20" : "border-gray-200 hover:border-creeper/40"}`}
            >
              <div className="font-rubik font-black text-pierre text-xs">{p.label}</div>
              <div className="font-rubik font-bold text-creeper-dark text-sm">
                {p.price.toFixed(2).replace(".", ",")} €
              </div>
            </button>
          ))}
        </div>

        <a
          href={pack.url}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-4 font-rubik font-black text-base text-white btn-shimmer shadow-lg shadow-creeper/30 cursor-pointer"
          onClick={() => setVisible(false)}
        >
          Je profite de l&apos;offre →
        </a>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="text-center text-pierre/40 text-xs font-inter hover:text-pierre/60 transition-colors cursor-pointer"
        >
          Non merci, je passe mon tour
        </button>
      </div>
    </div>
  );
}
