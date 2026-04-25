export const revalidate = 86400;

import { getPostBySlug, getAllPosts, formatPostDate } from "lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "components/json-ld";
import { BLOG_DEFAULT_IMAGE, absoluteImageUrl } from "lib/site-images";

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
    alternates: {
      canonical: `https://cubecrafte.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [absoluteImageUrl(BLOG_DEFAULT_IMAGE)],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteImageUrl(BLOG_DEFAULT_IMAGE)],
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://cubecrafte.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://cubecrafte.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://cubecrafte.com/blog/${slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [absoluteImageUrl(BLOG_DEFAULT_IMAGE)],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "CubeCraft",
      url: "https://cubecrafte.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CubeCraft",
      url: "https://cubecrafte.com",
      logo: {
        "@type": "ImageObject",
        url: "https://cubecrafte.com/apple-icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cubecrafte.com/blog/${slug}`,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
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
            {formatPostDate(post.date)}
          </p>
          <h1 className="font-rubik font-black text-pierre text-3xl md:text-4xl leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-pierre/60 text-lg border-l-4 border-creeper pl-4 mb-10">
            {post.description}
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-rubik prose-headings:font-bold prose-headings:text-pierre prose-p:text-pierre/70 prose-p:leading-relaxed prose-a:text-creeper prose-a:no-underline hover:prose-a:underline prose-strong:text-pierre prose-li:text-pierre/70 prose-table:w-full prose-th:bg-creeper-light prose-th:text-creeper-dark prose-th:font-bold prose-th:p-3 prose-th:text-sm prose-td:p-3 prose-td:border prose-td:border-pierre/20 prose-td:text-pierre/70 prose-td:text-sm prose-tr:even:bg-pierre/5">
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
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
    </>
  );
}
