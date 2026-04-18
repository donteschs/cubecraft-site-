"use client";

import dynamic from "next/dynamic";

const PromoPopup = dynamic(() => import("./promo-popup").then(m => ({ default: m.PromoPopup })), { ssr: false });

export function PromoPopupLoader({ variantIds }: { variantIds: Record<string, string | undefined> }) {
  return <PromoPopup variantIds={variantIds} />;
}
