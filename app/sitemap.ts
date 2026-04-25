import { getCollections, getPages, getProducts } from "lib/shopify";
import { baseUrl, validateEnvironmentVariables } from "lib/utils";
import { BLOG_DEFAULT_IMAGE, COMMANDER_SEO_IMAGES, HOME_SEO_IMAGES, absoluteImageUrl, absoluteImageUrls } from "lib/site-images";
import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export const revalidate = 86400; // revalidate sitemap once per day

function getBlogRoutes() {
  const blogDir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, "");
      const stat = fs.statSync(path.join(blogDir, file));
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: stat.mtime.toISOString().split("T")[0],
        changeFrequency: "monthly" as const,
        priority: 0.7,
        images: [absoluteImageUrl(BLOG_DEFAULT_IMAGE)],
      };
    });
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
    ...["/cgv", "/contact", "/livraison", "/retours", "/privacy", "/legal"].map((route) => ({
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
      images: product.featuredImage?.url ? [product.featuredImage.url] : undefined,
    })),
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
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

  const all = [...routesMap, ...fetchedRoutes, ...blogRoutes];
  const seen = new Set<string>();
  return all.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });
}
