import { getLatestPosts, formatPostDate } from "lib/blog";
import Link from "next/link";

export function LatestArticles() {
  const posts = getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <section className="bg-blanc py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-12">
          <div>
            <span className="font-pixel text-[9px] text-creeper-dark tracking-widest uppercase block mb-4">
              Nouveautés
            </span>
            <h2 className="font-rubik font-black text-pierre text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Les derniers articles du{" "}
              <span className="text-gradient-green">blog</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-creeper-dark font-rubik font-bold hover:text-creeper transition-colors"
          >
            Voir tout le blog
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative rounded-3xl border border-creeper/15 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-creeper/40 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <span className="inline-flex items-center rounded-full bg-creeper text-white px-3 py-1 text-[10px] font-rubik font-bold uppercase tracking-[0.18em]">
                  Nouveau
                </span>
                <span className="text-pierre/35 text-xs font-inter">
                  #{index + 1}
                </span>
              </div>

              <p className="text-xs text-pierre/45 font-inter mb-3">
                {formatPostDate(post.date)}
              </p>

              <h3 className="font-rubik font-black text-pierre text-xl leading-snug mb-3 group-hover:text-creeper transition-colors">
                {post.title}
              </h3>

              <p className="text-pierre/65 text-sm leading-relaxed font-inter line-clamp-3 mb-5">
                {post.description}
              </p>

              <div className="inline-flex items-center gap-2 text-creeper font-rubik font-bold text-sm">
                Lire l&apos;article
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
