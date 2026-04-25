"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "cubecraft_offer_expires";
const DURATION_MS = 15 * 60 * 1000;

function getOrCreateExpiry(): number {
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (stored) {
    const expiry = parseInt(stored, 10);
    if (expiry > Date.now()) return expiry;
  }
  const expiry = Date.now() + DURATION_MS;
  sessionStorage.setItem(SESSION_KEY, String(expiry));
  return expiry;
}

export function CountdownTimer({ className = "" }: { className?: string }) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const expiry = getOrCreateExpiry();
    const remaining = expiry - Date.now();
    if (remaining <= 0) {
      setExpired(true);
      return;
    }
    setTimeLeft(remaining);

    const interval = setInterval(() => {
      const left = expiry - Date.now();
      if (left <= 0) {
        setExpired(true);
        clearInterval(interval);
      } else {
        setTimeLeft(left);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) return null;

  if (expired) {
    return (
      <div className={`flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-inter text-pierre/60 ${className}`}>
        ⏱ Offre expirée — rechargez la page pour la renouveler
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60_000);
  const seconds = Math.floor((timeLeft % 60_000) / 1000);
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return (
    <div className={`flex items-center justify-center gap-2 bg-or/10 border border-or/30 rounded-xl px-4 py-2.5 ${className}`}>
      <span className="text-or text-base">⏱</span>
      <span className="font-rubik font-black text-or-dark text-sm">
        Offre -30% réservée encore{" "}
        <span className="tabular-nums">
          {mm}:{ss}
        </span>
      </span>
    </div>
  );
}
