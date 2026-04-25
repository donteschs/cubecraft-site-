"use client";

import dynamic from "next/dynamic";

const ExitIntentPopup = dynamic(
  () => import("components/ui/exit-intent-popup").then((m) => m.ExitIntentPopup),
  { ssr: false }
);

export function ExitIntentPopupLoader() {
  return <ExitIntentPopup />;
}
