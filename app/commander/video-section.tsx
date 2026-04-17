"use client";

import { trackPinterestEvent } from "lib/pinterest";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── Cloudinary helpers ─────────────────────────────────────────────── */
const CLOUD = "druvbvnob";

function cldVideo(publicId: string, version: string) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/f_auto,q_auto,vc_auto/v${version}/${publicId}.mp4`;
}
function cldPoster(publicId: string, version: string) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/f_jpg,q_auto,so_2/v${version}/${publicId}.jpg`;
}

/* ── Video data — vertical reels only ──────────────────────────────── */
const REELS = [
  { publicId: "V1_2_cbfmle",  version: "1776306192", label: "Première construction",     duration: "0:51" },
  { publicId: "V3_2_nbjfwb",  version: "1776306192", label: "Château en 23 secondes",    duration: "0:23" },
  { publicId: "V5_vrkscs",    version: "1776306193", label: "Le clic magnétique",         duration: "0:25" },
  { publicId: "V4_2_fkshuv",  version: "1776306194", label: "Famille qui crée ensemble",  duration: "0:46" },
  { publicId: "V2_2_ktgfr3",  version: "1776306193", label: "Tour de force",              duration: "1:16" },
];

/* ── Single reel card ───────────────────────────────────────────────── */
function ReelCard({ reel, priority = false }: { reel: typeof REELS[0]; priority?: boolean }) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [muted, setMuted]     = useState(true);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded]   = useState(false);
  const trackedRef = useRef(false);

  /* autoplay / pause on viewport visibility */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          el.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); }
    else           { el.pause(); setPlaying(false); }
  }

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }

  return (
    <div className="relative flex-shrink-0 snap-center"
         style={{ width: "clamp(200px, 72vw, 260px)" }}>

      {/* Phone shell */}
      <div
        onClick={togglePlay}
        className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-dark cursor-pointer select-none"
        style={{
          aspectRatio: "9/16",
          boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Poster shown until video loads */}
        {!loaded && (
          <div className="absolute inset-0 bg-dark-card animate-pulse" />
        )}

        <video
          ref={videoRef}
          src={cldVideo(reel.publicId, reel.version)}
          poster={cldPoster(reel.publicId, reel.version)}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          className="w-full h-full object-cover"
          onLoadedData={() => setLoaded(true)}
          onPlay={() => {
            setPlaying(true);
            if (!trackedRef.current) {
              trackedRef.current = true;
              trackPinterestEvent("watchvideo", { video_title: reel.label });
            }
          }}
          onPause={() => setPlaying(false)}
        />

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

        {/* Top row: fake notch + duration */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-3.5 pointer-events-none">
          <div className="w-14 h-1 bg-white/25 rounded-full" />
          <span className="text-white/70 text-[10px] font-rubik font-bold tabular-nums">{reel.duration}</span>
        </div>

        {/* CubeCraft watermark */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <span className="font-pixel text-[7px] text-white/40 tracking-wider">CUBECRAFT</span>
        </div>

        {/* Pause indicator (centred, shown only when paused after first play) */}
        {loaded && !playing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v14l11-7-11-7z"/>
              </svg>
            </span>
          </div>
        )}

        {/* Bottom: label + sound button */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 px-3.5 pb-4">
          <p className="text-white text-[12px] sm:text-[13px] font-rubik font-bold leading-tight line-clamp-2 drop-shadow">
            {reel.label}
          </p>

          {/* Sound toggle — always visible, large touch target */}
          <button
            onClick={toggleMute}
            aria-label={muted ? "Activer le son" : "Couper le son"}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
          >
            {muted ? (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/>
                <path d="M17 16.95A7 7 0 015.07 7M15.54 8.46a3 3 0 01.92 2.54M19.07 4.93A10 10 0 0121 12a10 10 0 01-2.05 6.12"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Home bar */}
      <div className="flex justify-center mt-2.5">
        <div className="w-8 h-[3px] bg-white/15 rounded-full" />
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────────────── */
export function VideoSection() {
  return (
    <section className="py-12 sm:py-16 bg-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-[8px] text-creeper tracking-widest uppercase">
                CubeCraft en action
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"/>
              </span>
            </div>
            <h2 className="font-rubik font-black text-white text-xl sm:text-3xl leading-tight">
              Vus sur TikTok &amp; Instagram
            </h2>
            <p className="text-white/35 text-xs sm:text-sm font-inter mt-1">
              Appuyer sur une vidéo pour pause · Icône son pour activer l&apos;audio
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            {[
              {
                name: "TikTok",
                icon: (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                  </svg>
                ),
              },
              {
                name: "Instagram",
                icon: (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                ),
              },
            ].map((p) => (
              <span key={p.name}
                className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-white/60 text-xs font-inter">
                {p.icon}
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Reels scroll row */}
        <div
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 touch-pan-x"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {REELS.map((reel, i) => (
            <ReelCard key={reel.publicId} reel={reel} priority={i < 2} />
          ))}

          {/* CTA card */}
          <div className="relative flex-shrink-0 snap-center"
               style={{ width: "clamp(200px, 72vw, 260px)" }}>
            <div
              className="rounded-[24px] sm:rounded-[28px] overflow-hidden border border-creeper/30 bg-gradient-to-br from-creeper-dark via-[#1a3a1a] to-dark flex flex-col items-center justify-center gap-5 p-6"
              style={{ aspectRatio: "9/16" }}
            >
              {/* Floating cubes icon */}
              <div className="w-16 h-16 rounded-2xl bg-creeper/15 border border-creeper/25 flex items-center justify-center">
                <svg className="w-8 h-8 text-creeper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
                </svg>
              </div>

              <div className="text-center space-y-1.5">
                <p className="font-pixel text-[8px] text-creeper tracking-widest uppercase">-30%</p>
                <p className="font-rubik font-black text-white text-base leading-tight">
                  À toi de construire
                </p>
                <p className="text-white/45 text-[11px] font-inter">
                  à partir de<br/>
                  <span className="text-creeper font-rubik font-black text-lg">39,90 €</span>
                </p>
              </div>

              <Link
                href="#buy"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full bg-creeper hover:bg-creeper-dark text-white font-rubik font-black text-sm text-center rounded-xl py-3 transition-colors active:scale-95"
              >
                Commander →
              </Link>

              <div className="w-8 h-[3px] bg-white/15 rounded-full" />
            </div>
          </div>
        </div>

        {/* Scroll hint — mobile only */}
        <div className="flex items-center justify-center gap-1.5 mt-2 sm:hidden">
          <svg className="w-3.5 h-3.5 text-white/25" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.354 8.354a.5.5 0 000-.708l-3-3a.5.5 0 10-.708.708L10.293 8l-2.647 2.646a.5.5 0 00.708.708l3-3z"/>
          </svg>
          <span className="text-white/25 text-[10px] font-inter tracking-wide">Glissez pour voir plus</span>
          <svg className="w-3.5 h-3.5 text-white/25" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.354 8.354a.5.5 0 000-.708l-3-3a.5.5 0 10-.708.708L10.293 8l-2.647 2.646a.5.5 0 00.708.708l3-3z"/>
          </svg>
        </div>

      </div>
    </section>
  );
}
