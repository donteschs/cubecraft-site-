import Image from "next/image";

const galleryImages = [
  {
    src: "/images/Whisk_04c245b3be0535c81d242e1c301414f5dr.png",
    alt: "Construction 3D de cubes magnétiques CubeCraft",
  },
  {
    src: "/images/Whisk_092747553965cd5ae3e4e996c106e938dr.png",
    alt: "CubeCraft posé sur une table, lifestyle",
  },
  {
    src: "/images/Whisk_155d0dfae92253caf61441483e36bfc2dr.png",
    alt: "Tour spectaculaire de cubes CubeCraft",
  },
  {
    src: "/images/Whisk_19a009ed6a33513908946a206c5af180dr.png",
    alt: "Enfants jouant ensemble avec CubeCraft",
  },
  {
    src: "/images/Whisk_21fe8406a0537f38ec8479f261076368dr.png",
    alt: "CubeCraft – cube Minecraft style en ABS",
  },
  {
    src: "/images/Whisk_0f4f789c58d8d62974e423a8f570af63dr.png",
    alt: "CubeCraft en boîte cadeau pour Noël",
  },
];

export function Gallery() {
  return (
    <section className="bg-blanc py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="font-pixel text-[9px] text-creeper-dark tracking-widest uppercase block mb-3">
            Galerie
          </span>
          <h2 className="font-rubik font-black text-pierre text-2xl sm:text-3xl">
            Ils construisent. Ils créent. Ils s&apos;épanouissent.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                idx === 0 ? "row-span-2 col-span-1" : ""
              }`}
              style={{ aspectRatio: idx === 0 ? "1/2" : "1/1" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
