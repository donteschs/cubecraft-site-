import Link from "next/link";

export function UrgencyBanner() {
  return (
    <div className="bg-creeper-dark text-white sticky top-0 z-50 py-2 px-4">
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-3 text-sm font-rubik">
        <span className="hidden sm:inline-flex items-center gap-1.5">
          <span className="text-or font-bold">🔥</span>
          <span className="font-semibold">Offre de lancement :</span>
          <span>-30% sur tout le catalogue</span>
          <span className="mx-2 opacity-40">|</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-or opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-or" />
          </span>
          <span className="font-semibold">127 unités restantes</span>
          <span className="hidden xs:inline opacity-60">sur cette production</span>
        </span>
        <span className="mx-2 opacity-40 hidden sm:inline">|</span>
        <Link
          href="/commander"
          className="hidden sm:inline font-bold underline underline-offset-2 hover:text-or transition-colors duration-150 cursor-pointer"
        >
          En profiter →
        </Link>
      </div>
    </div>
  );
}
