/**
 * Mention légale liens affiliés (transparence + bonne pratique SEO/UE).
 * À placer une fois par article contenant des liens affiliés.
 */
export function AffiliateDisclosure({
  className = "",
}: {
  className?: string;
}) {
  return (
    <p
      className={`rounded-lg border border-pierre/10 bg-blanc px-3 py-2 font-inter text-[11px] italic leading-relaxed text-pierre/50 sm:text-xs ${className}`}
    >
      Certains liens présents dans cet article peuvent être affiliés. Cela ne
      change rien au prix pour vous, et nous touchons une petite commission qui
      soutient le site.
    </p>
  );
}
