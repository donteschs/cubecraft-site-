"use client";

import { useState } from "react";

/**
 * Bloc newsletter — email + bouton.
 *
 * Intégration API à venir (Brevo / MailerLite) : remplacer le corps de
 * `subscribe()` par un fetch vers /api/newsletter (route à créer) qui appelle
 * l'API du fournisseur. Le composant est déjà prêt (états loading/success/error).
 *
 * Utilisable dans les articles MDX :  <Newsletter />
 * ou avec un titre custom :           <Newsletter title="..." subtitle="..." />
 */
type NewsletterBlockProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterBlock({
  title = "Recevez gratuitement nos meilleures idées de jouets pour enfant",
  subtitle = "Une sélection par mois, des idées cadeaux et nos guides anti-écran. Zéro spam, désinscription en un clic.",
  className = "",
}: NewsletterBlockProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");

    try {
      // TODO Brevo/MailerLite : décommenter une fois la route /api/newsletter créée.
      // const res = await fetch("/api/newsletter", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // if (!res.ok) throw new Error("subscribe failed");

      // Stub temporaire (aucune intégration encore) :
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className={`not-prose overflow-hidden rounded-2xl bg-dark pixel-grid p-6 sm:p-8 ${className}`}
    >
      <div className="mx-auto max-w-xl text-center">
        <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-2.5 py-1 rounded-sm tracking-wider">
          NEWSLETTER
        </span>
        <h3 className="mt-4 font-rubik font-black text-white text-xl leading-tight sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 font-inter text-sm text-white/60">{subtitle}</p>

        {status === "success" ? (
          <p className="mt-6 rounded-xl bg-creeper/15 px-4 py-3 font-rubik font-bold text-creeper">
            🎉 Merci ! Vérifiez votre boîte mail pour confirmer.
          </p>
        ) : (
          <form
            onSubmit={subscribe}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Votre adresse email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              autoComplete="email"
              className="min-h-[48px] flex-1 rounded-xl border border-white/15 bg-white/5 px-4 font-inter text-white placeholder:text-white/35 focus:border-creeper focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-shimmer inline-flex min-h-[48px] items-center justify-center rounded-xl px-6 font-rubik font-bold text-white shadow-md shadow-creeper/20 transition-transform duration-150 hover:scale-105 active:scale-100 disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "loading" ? "Inscription…" : "Je m'inscris"}
            </button>
          </form>
        )}

        {status === "error" ? (
          <p className="mt-3 font-inter text-sm text-or">
            Une erreur est survenue. Réessayez dans un instant.
          </p>
        ) : null}
      </div>
    </section>
  );
}
