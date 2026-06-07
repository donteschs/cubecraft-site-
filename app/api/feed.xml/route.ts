import { NextResponse } from "next/server";
import { getProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";

export const revalidate = 3600;

const SITE = "https://cubecrafte.com";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildItems(products: Product[]): string {
  return products
    .filter((p) => p.featuredImage?.url)
    .map((p) => {
      const price = Number(p.priceRange.maxVariantPrice.amount).toFixed(2);
      const currency = p.priceRange.maxVariantPrice.currencyCode || "EUR";
      const desc = (p.description || p.title).replace(/\s+/g, " ").trim().slice(0, 4000);
      const category = p.tags?.[0] || "Jouets éducatifs";
      return `
    <item>
      <g:id>${esc(p.handle)}</g:id>
      <g:title><![CDATA[${p.title}]]></g:title>
      <g:description><![CDATA[${desc}]]></g:description>
      <g:link>${SITE}/product/${esc(p.handle)}</g:link>
      <g:image_link>${esc(p.featuredImage.url)}</g:image_link>
      <g:availability>${p.availableForSale ? "in_stock" : "out_of_stock"}</g:availability>
      <g:price>${price} ${currency}</g:price>
      <g:brand>CubeCraft</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>Jouets et jeux &gt; Jouets pour enfants</g:google_product_category>
      <g:product_type><![CDATA[${category}]]></g:product_type>
      <g:age_group>kids</g:age_group>
      <g:identifier_exists>false</g:identifier_exists>
      <g:shipping>
        <g:country>FR</g:country>
        <g:service>Livraison standard</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
    </item>`;
    })
    .join("\n");
}

export async function GET() {
  let products: Product[] = [];
  try {
    products = await getProducts({});
  } catch {
    products = [];
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>CubeCraft — Jouets créatifs &amp; éducatifs</title>
    <link>${SITE}</link>
    <description>Jouets créatifs et éducatifs anti-écran pour enfants. Certifiés CE &amp; EN 71. Livraison 4-5 jours.</description>${buildItems(products)}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
