import Image from "next/image";
import { SITE_IMAGES } from "lib/site-images";

const galleryImages = [
  {
    src: SITE_IMAGES.detailColors.src,
    alt: "Detail des cubes magnetiques CubeCraft et de leurs textures Minecraft",
    label: "Créativité infinie",
  },
  {
    src: SITE_IMAGES.childrenPlaying.src,
    alt: "Enfants jouant ensemble avec les cubes magnetiques CubeCraft",
    label: "Jouez ensemble",
  },
  {
    src: SITE_IMAGES.tower.src,
    alt: "Tour spectaculaire construite avec les cubes magnetiques CubeCraft",
    label: "Construis haut",
  },
];

export function Gallery() {
  return (
    <section className="bg-blanc py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-pixel text-[9px] text-creeper-dark tracking-widest uppercase block mb-3">
            Galerie
          </span>
          <h2 className="font-rubik font-black text-pierre text-2xl sm:text-4xl">
            Ils construisent. Ils créent. Ils s&apos;épanouissent.
          </h2>
          <p className="mt-3 font-inter text-pierre/60 text-sm sm:text-base max-w-xl mx-auto">
            Des heures de jeu, une créativité sans limite — le tout sans écran.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ aspectRatio: "1/1" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-fredoka text-white text-lg drop-shadow">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
