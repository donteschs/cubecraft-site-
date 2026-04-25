import { getAllPosts, formatPostDate } from "lib/blog";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog CubeCraft — Conseils jouets éducatifs & anti-écran",
  description:
    "Conseils parents, idées cadeaux et astuces pour remplacer les écrans par des jouets éducatifs. Le blog CubeCraft.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-blanc">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-creeper-light text-creeper-dark text-xs font-rubik font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Blog
          </span>
          <h1 className="font-rubik font-black text-pierre text-4xl md:text-5xl mb-4">
            Conseils pour parents
          </h1>
          <p className="text-pierre/60 text-lg max-w-xl mx-auto">
            Jouets éducatifs, alternatives aux écrans, idées cadeaux — tout ce
            qu'il faut savoir pour les parents.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-pierre/40">
            Articles en cours de génération...
          </p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post, index) => {
              const isTop3 = index < 3;
              return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group block rounded-2xl border p-6 transition-all duration-200 ${
                  isTop3
                    ? "bg-creeper-light/20 border-creeper/30 shadow-sm hover:border-creeper/50 hover:shadow-md"
                    : "bg-white border-gray-200/60 hover:border-creeper/40 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {isTop3 ? (
                      <span className="inline-flex items-center bg-creeper text-white text-[10px] font-rubik font-bold px-3 py-1 rounded-full uppercase tracking-[0.18em] mb-3">
                        Nouveau
                      </span>
                    ) : null}
                    <p className="text-xs text-pierre/40 font-inter mb-2">
                      {formatPostDate(post.date)}
                    </p>
                    <h2 className="font-rubik font-bold text-pierre text-xl mb-2 group-hover:text-creeper transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-pierre/60 text-sm leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  <span className="text-creeper text-xl flex-shrink-0 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
              );
            })}
          </div>
        )}

        <div className="mt-16 bg-creeper-light rounded-2xl p-8 text-center">
          <p className="font-rubik font-black text-creeper-dark text-2xl mb-2">
            Prêt à passer à l'action ?
          </p>
          <p className="text-creeper-dark/70 mb-6">
            Découvrez CubeCraft — le jouet qui remplace vraiment les écrans.
          </p>
          <Link
            href="/commander"
            className="inline-flex btn-shimmer items-center gap-2 rounded-xl px-6 py-3 font-rubik font-bold text-white shadow-md"
          >
            Commander maintenant — -30% →
          </Link>
        </div>
      </div>
    </main>
  );
}
