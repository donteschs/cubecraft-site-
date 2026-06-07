import { getAllSelections } from "lib/affiliate/selections";
import { getAllPosts } from "lib/blog";
import { getCollections, getPages, getProducts } from "lib/shopify";
import { baseUrl, validateEnvironmentVariables } from "lib/utils";
import {
  BLOG_DEFAULT_IMAGE,
  COMMANDER_SEO_IMAGES,
  HOME_SEO_IMAGES,
  absoluteImageUrl,
  absoluteImageUrls,
} from "lib/site-images";
import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export const revalidate = 86400; // revalidate sitemap once per day

const NON_INDEXABLE_ROUTES = new Set(["/cgv", "/privacy", "/legal"]);

function getBlogRoutes() {
  const blogDir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(blogDir)) return [];
  return getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || "2026-04-22",
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [absoluteImageUrl(BLOG_DEFAULT_IMAGE)],
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = [
    {
      url: `${baseUrl}`,
      lastModified: "2026-04-22",
      changeFrequency: "weekly" as const,
      priority: 1.0,
      images: absoluteImageUrls(HOME_SEO_IMAGES),
    },
    {
      url: `${baseUrl}/commander`,
      lastModified: "2026-04-22",
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: absoluteImageUrls(COMMANDER_SEO_IMAGES),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: "2026-04-22",
      changeFrequency: "daily" as const,
      priority: 0.8,
      images: [absoluteImageUrl(BLOG_DEFAULT_IMAGE)],
    },
    ...["/contact", "/livraison", "/retours"].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: "2026-01-01",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt,
    })),
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt,
      images: product.featuredImage?.url
        ? [product.featuredImage.url]
        : undefined,
    })),
  );

  const pagesPromise = getPages().then((pages) =>
    pages
      .filter((page) => !NON_INDEXABLE_ROUTES.has(`/${page.handle}`))
      .map((page) => ({
        url: `${baseUrl}/${page.handle}`,
        lastModified: page.updatedAt,
      })),
  );

  let fetchedRoutes: MetadataRoute.Sitemap = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  const blogRoutes = getBlogRoutes();

  const selectionRoutes = [
    {
      url: `${baseUrl}/selection`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/collaborations`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    ...getAllSelections().map((s) => ({
      url: `${baseUrl}/selection/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const all = [
    ...routesMap,
    ...selectionRoutes,
    ...fetchedRoutes,
    ...blogRoutes,
  ];
  const seen = new Set<string>();
  return all.filter((r) => {
    const route = new URL(r.url).pathname;
    if (NON_INDEXABLE_ROUTES.has(route)) return false;
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });
}
