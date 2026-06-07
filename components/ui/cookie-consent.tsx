"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Bannière de consentement cookies + Google Consent Mode v2.
 *
 * Le défaut « refusé » est posé en amont (script beforeInteractive dans le
 * layout). Ici, on met à jour le consentement selon le choix de l'utilisateur
 * et on le mémorise. Conforme RGPD / exigence AdSense (EEE).
 */
const STORAGE_KEY = "cc-consent";

type GtagFn = (...args: unknown[]) => void;

function applyConsent(granted: boolean): void {
  const value = granted ? "granted" : "denied";
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      applyConsent(true); // visiteur déjà consentant
      return;
    }
    if (stored === "denied") return;
    setVisible(true);
  }, []);

  function choose(granted: boolean): void {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    applyConsent(granted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-dark-border bg-dark/95 p-4 shadow-2xl backdrop-blur-md sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-inter text-sm leading-relaxed text-white/70">
          🍪 Nous utilisons des cookies pour mesurer l&apos;audience et afficher
          des annonces (Google&nbsp;AdSense). Vous pouvez accepter ou refuser.{" "}
          <Link href="/privacy" className="text-creeper underline hover:text-creeper-light">
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-xl border border-white/20 px-4 py-2.5 font-rubik text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="btn-shimmer rounded-xl px-5 py-2.5 font-rubik text-sm font-bold text-white shadow-md shadow-creeper/20 transition-transform hover:scale-105 active:scale-100"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
