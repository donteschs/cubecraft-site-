import { getPostBySlug, getAllPosts } from "lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-blanc">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-pierre/50 hover:text-creeper text-sm font-inter mb-8 transition-colors"
        >
          ← Retour au blog
        </Link>

        <article>
          <p className="text-xs text-pierre/40 font-inter mb-3">
            {new Date(post.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1 className="font-rubik font-black text-pierre text-3xl md:text-4xl leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-pierre/60 text-lg border-l-4 border-creeper pl-4 mb-10">
            {post.description}
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-rubik prose-headings:font-bold prose-headings:text-pierre prose-p:text-pierre/70 prose-p:leading-relaxed prose-a:text-creeper prose-a:no-underline hover:prose-a:underline prose-strong:text-pierre prose-li:text-pierre/70">
            <MDXRemote source={post.content} />
          </div>
        </article>

        <div className="mt-16 bg-creeper-light rounded-2xl p-8 text-center">
          <p className="font-rubik font-black text-creeper-dark text-2xl mb-2">
            Prêt à essayer CubeCraft ?
          </p>
          <p className="text-creeper-dark/70 mb-6">
            Offre de lancement -30% · Certifié CE · Livraison rapide
          </p>
          <Link
            href="/commander"
            className="inline-flex btn-shimmer items-center gap-2 rounded-xl px-6 py-3 font-rubik font-bold text-white shadow-md"
          >
            Commander maintenant →
          </Link>
        </div>
      </div>
    </main>
  );
}
