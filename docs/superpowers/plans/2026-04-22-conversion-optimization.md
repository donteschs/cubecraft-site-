# Conversion Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add countdown timer, live visitors counter, sticky CTA bar, and exit intent popup to maximize conversion on /commander.

**Architecture:** Four independent UI components wired into `product-ui.tsx` (client component) and `app/layout.tsx`. All state is client-side only (sessionStorage/localStorage). No backend changes.

**Tech Stack:** Next.js 15 App Router, React hooks (useState, useEffect, useRef), Tailwind CSS, dynamic import for lazy loading.

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `components/ui/countdown-timer.tsx` | Create | Reusable 15-min countdown, session-based |
| `components/ui/exit-intent-popup.tsx` | Create | Exit intent overlay with pack selector + countdown |
| `app/commander/product-ui.tsx` | Modify | Add countdown above "Valider", visitors counter, sticky CTA bar |
| `app/layout.tsx` | Modify | Lazy-load ExitIntentPopup globally |

---

### Task 1: CountdownTimer component

**Files:**
- Create: `components/ui/countdown-timer.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Verify the file exists**

```bash
ls components/ui/countdown-timer.tsx
```

Expected: file listed.

- [ ] **Step 3: Commit**

```bash
git add components/ui/countdown-timer.tsx
git commit -m "feat: add session-based countdown timer component"
```

---

### Task 2: Add countdown + visitors counter to product-ui.tsx

**Files:**
- Modify: `app/commander/product-ui.tsx`

The countdown goes inside the `cartVisible` section, just above the "Valider mon panier" button (currently around line 819).
The visitors counter goes just after the stock urgency `div` (currently around line 743).

- [ ] **Step 1: Add import at the top of product-ui.tsx**

Find the existing imports block (line 1–15). Add after the last import:

```tsx
import { CountdownTimer } from "components/ui/countdown-timer";
```

- [ ] **Step 2: Add live visitors counter state**

In the `ProductUI` function, after the existing `useState` declarations (around line 410), add:

```tsx
const [visitors, setVisitors] = useState<number | null>(null);
```

- [ ] **Step 3: Add visitors counter effect**

After the existing `useEffect` for pixel tracking (around line 450), add:

```tsx
useEffect(() => {
  const randomBetween = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  setVisitors(randomBetween(18, 42));

  const interval = setInterval(() => {
    setVisitors(randomBetween(18, 42));
  }, 25_000);

  return () => clearInterval(interval);
}, []);
```

- [ ] **Step 4: Add visitors counter JSX after stock urgency div**

Find this block (around line 734):
```tsx
            {/* Stock urgency */}
            <div className="flex items-center gap-2 bg-or/5 border border-or/20 rounded-lg px-4 py-2.5">
```

After the closing `</div>` of that block, add:

```tsx
            {/* Live visitors */}
            {visitors !== null && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200/50 rounded-lg px-4 py-2.5">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-sm font-inter text-red-700">
                  <strong>{visitors} personnes</strong> regardent ce produit en ce moment
                </span>
              </div>
            )}
```

- [ ] **Step 5: Add CountdownTimer inside cartVisible section**

Find this JSX (around line 819):
```tsx
                {/* Bouton valider */}
                <button
                  onClick={handleOrder}
```

Just before that comment, add:

```tsx
                <CountdownTimer />
```

- [ ] **Step 6: Verify the app builds**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add app/commander/product-ui.tsx
git commit -m "feat: add live visitors counter and countdown timer to product page"
```

---

### Task 3: Sticky CTA bar in product-ui.tsx

**Files:**
- Modify: `app/commander/product-ui.tsx`

The sticky bar appears when the user scrolls past the main "Ajouter au panier" button. It shows the selected pack name + price + Commander button. Attach a `ref` to the main CTA button, use `IntersectionObserver` to detect when it leaves viewport.

- [ ] **Step 1: Add stickyVisible state and ctaRef**

In the `ProductUI` function, after the existing state declarations, add:

```tsx
const [stickyVisible, setStickyVisible] = useState(false);
const ctaRef = useRef<HTMLButtonElement>(null);
```

- [ ] **Step 2: Add IntersectionObserver effect**

After the visitors counter effect, add:

```tsx
useEffect(() => {
  const el = ctaRef.current;
  if (!el) return;
  const observer = new IntersectionObserver(
    ([entry]) => setStickyVisible(!entry!.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(el);
  return () => observer.disconnect();
}, []);
```

- [ ] **Step 3: Attach ctaRef to the main CTA button**

Find the main "Ajouter au panier" button (around line 764):
```tsx
            <button
              type="button"
              onClick={() => setCartVisible(true)}
              className="w-full rounded-xl py-5 sm:py-5 font-rubik font-black text-xl sm:text-xl text-white shadow-xl ...
```

Add `ref={ctaRef}` to that button:

```tsx
            <button
              ref={ctaRef}
              type="button"
              onClick={() => setCartVisible(true)}
              className="w-full rounded-xl py-5 sm:py-5 font-rubik font-black text-xl sm:text-xl text-white shadow-xl transition-all duration-200 cursor-pointer btn-shimmer animate-pulse-green hover:scale-[1.02] active:scale-100 shadow-creeper/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-creeper focus-visible:ring-offset-2"
            >
```

- [ ] **Step 4: Add sticky bar JSX just before the closing `</div>` of the root `<div className="bg-blanc min-h-screen">`**

The root div starts at line 507. The sticky bar must be a fixed overlay. Add it at the very end of the returned JSX, before the closing `</div>`:

```tsx
      {/* Sticky CTA bar */}
      {stickyVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex items-center gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-rubik font-black text-pierre text-sm leading-tight">
              CubeCraft {variant.label}
            </div>
            <div className="font-rubik font-black text-creeper-dark text-base leading-tight">
              {variant.launchPrice.toFixed(2).replace(".", ",")} €
              <span className="text-pierre/40 line-through text-xs ml-2 font-inter font-normal">
                {variant.normalPrice.toFixed(2).replace(".", ",")} €
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setCartVisible(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex-shrink-0 rounded-xl px-5 py-3 font-rubik font-black text-sm text-white btn-shimmer shadow-md shadow-creeper/30 cursor-pointer"
          >
            Commander →
          </button>
        </div>
      )}
```

- [ ] **Step 5: Verify build**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add app/commander/product-ui.tsx
git commit -m "feat: add sticky CTA bar on /commander"
```

---

### Task 4: Exit intent popup component

**Files:**
- Create: `components/ui/exit-intent-popup.tsx`

Logic:
- Desktop: `mouseleave` event where `e.clientY <= 0` (leaving through top)
- Mobile: scroll-up velocity > 300px/s (using `touchmove` + timestamp delta)
- Shows once per session; separate key `cubecraft_exit_intent_v1`
- Skips if the 10s promo popup already fired (`cubecraft_popup_seen_v2`)
- Content: heading + 15min countdown + pack selector + CTA

- [ ] **Step 1: Create the component**

```tsx
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
    // Desktop: mouse leaves through the top of the viewport
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) tryShow();
    }
    document.addEventListener("mouseleave", onMouseLeave);

    // Mobile: fast scroll-up detection
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
```

- [ ] **Step 2: Verify the file exists**

```bash
ls components/ui/exit-intent-popup.tsx
```

Expected: file listed.

- [ ] **Step 3: Commit**

```bash
git add components/ui/exit-intent-popup.tsx
git commit -m "feat: add exit intent popup component"
```

---

### Task 5: Wire ExitIntentPopup into app/layout.tsx

**Files:**
- Modify: `app/layout.tsx`

Lazy-load so it doesn't block page paint. Pattern mirrors how `PromoPopupLoader` is already done.

- [ ] **Step 1: Create the loader wrapper**

Create `components/ui/exit-intent-popup-loader.tsx`:

```tsx
"use client";

import dynamic from "next/dynamic";

const ExitIntentPopup = dynamic(
  () => import("components/ui/exit-intent-popup").then((m) => m.ExitIntentPopup),
  { ssr: false }
);

export function ExitIntentPopupLoader() {
  return <ExitIntentPopup />;
}
```

- [ ] **Step 2: Import and add to layout.tsx**

In `app/layout.tsx`, add after the existing `PromoPopupLoader` import:

```tsx
import { ExitIntentPopupLoader } from "components/ui/exit-intent-popup-loader";
```

Then in the JSX, add `<ExitIntentPopupLoader />` right after `<PromoPopupLoader variantIds={variantIds} />`:

```tsx
          <PromoPopupLoader variantIds={variantIds} />
          <ExitIntentPopupLoader />
```

- [ ] **Step 3: Verify build**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/exit-intent-popup-loader.tsx app/layout.tsx
git commit -m "feat: wire exit intent popup into root layout"
```

---

### Task 6: Deploy to production

- [ ] **Step 1: Run full build check**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` or `Route (app)` table with no errors.

- [ ] **Step 2: Deploy**

```bash
vercel --prod
```

Expected: deployment URL printed, status READY.

- [ ] **Step 3: Smoke-test on production URL**

Visit `/commander`:
- Scroll down past "Ajouter au panier" → sticky bar appears at bottom
- Open cart (click "Ajouter au panier") → countdown timer visible above "Valider"
- Live visitors counter visible below stock urgency

Visit any page, then move mouse out of browser window through the top → exit intent popup appears.

---

## Self-Review

**Spec coverage:**
- ✅ Countdown timer (15 min, session-based) — Task 1 + Task 2 step 5
- ✅ Live visitors counter (18–42, every 25s) — Task 2 steps 2–4
- ✅ Sticky CTA bar (scroll-triggered) — Task 3
- ✅ Exit intent popup (desktop mouseleave + mobile scroll) — Task 4
- ✅ Exit intent skips if promo popup already fired — Task 4 step 1 (`PROMO_KEY` check)
- ✅ All features wired into layout/page — Task 5

**Placeholder scan:** None found.

**Type consistency:** `CountdownTimer` imported and used identically in Task 1, Task 2 step 5, and Task 4 step 1.
