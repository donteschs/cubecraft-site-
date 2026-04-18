"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Bénéfices", href: "/#benefits" },
  { label: "Témoignages", href: "/#testimonials" },
  { label: "Tarifs", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full pt-3 pb-2">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-sm px-4 sm:px-5">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 group"
              prefetch={true}
            >
              <Image
                src="https://res.cloudinary.com/druvbvnob/image/upload/v1776440369/Whisk_5e8f8a6c8e94bfc94584807d324df370dr-removebg-preview_johci7.png"
                alt="CubeCraft"
                width={36}
                height={36}
                className="flex-shrink-0 object-contain"
                priority
              />
              <span className="font-rubik font-black text-pierre text-lg tracking-tight group-hover:text-creeper transition-colors duration-150">
                CubeCraft
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className={`px-3 py-2 rounded-lg text-sm font-inter font-medium transition-all duration-150 hover:bg-creeper-light hover:text-creeper-dark ${
                      pathname === link.href
                        ? "text-creeper bg-creeper-light"
                        : "text-pierre/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: CTA + Cart */}
            <div className="flex items-center gap-2">
              <Link
                href="/commander"
                className="hidden sm:inline-flex btn-shimmer cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 font-rubik font-bold text-white text-sm shadow-md shadow-creeper/20 hover:scale-105 active:scale-100 transition-transform duration-150"
              >
                Commander
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M6.22 11.03a.75.75 0 000 1.06l2.5 2.5a.75.75 0 001.06-1.06L7.94 11.5l1.84-2.03a.75.75 0 00-1.06-1.06l-2.5 2.75z" clipRule="evenodd" />
                </svg>
              </Link>
              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg text-pierre/70 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-lg overflow-hidden">
              <ul className="p-3 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-sm font-inter font-medium text-pierre/70 hover:bg-creeper-light hover:text-creeper-dark transition-all duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-gray-100 mt-1">
                  <Link
                    href="/#pricing"
                    onClick={() => setMobileOpen(false)}
                    className="block btn-shimmer cursor-pointer text-center rounded-xl px-4 py-3 font-rubik font-bold text-white text-sm"
                  >
                    Commander maintenant →
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
