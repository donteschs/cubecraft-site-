import { NextResponse } from "next/server";
import { SITE_IMAGES } from "lib/site-images";

const SITE = "https://cubecrafte.com";
const IMAGE = `${SITE}${SITE_IMAGES.heroPack.src}`;

const products = [
  {
    id: "cubecraft-100",
    title: "CubeCraft — Cubes Magnétiques 100 pièces",
    description:
      "100 cubes magnétiques avec aimants néodyme N52, 3x plus puissants. Textures Minecraft. Construction 3D libre. Certifié CE & EN 71. Pour les enfants de 6 à 14 ans.",
    price: "39.90",
    originalPrice: "59.90",
    mpn: "CC-100",
  },
  {
    id: "cubecraft-200",
    title: "CubeCraft — Cubes Magnétiques 200 pièces",
    description:
      "200 cubes magnétiques avec aimants néodyme N52. Constructions ambitieuses, châteaux, robots, villes entières. Certifié CE & EN 71. Pour les enfants de 6 à 14 ans.",
    price: "69.90",
    originalPrice: "99.90",
    mpn: "CC-200",
  },
  {
    id: "cubecraft-400",
    title: "CubeCraft — Pack Famille 400 pièces",
    description:
      "400 cubes magnétiques pour jouer à plusieurs. Le pack idéal pour toute la famille. Aimants néodyme N52. Certifié CE & EN 71. Pour les enfants de 6 à 14 ans.",
    price: "119.90",
    originalPrice: "179.90",
    mpn: "CC-400",
  },
];

function buildFeed(): string {
  const items = products
    .map(
      (p) => `
    <item>
      <g:id>${p.id}</g:id>
      <g:title><![CDATA[${p.title}]]></g:title>
      <g:description><![CDATA[${p.description}]]></g:description>
      <g:link>${SITE}/commander</g:link>
      <g:image_link>${IMAGE}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${p.price} EUR</g:price>
      <g:sale_price>${p.price} EUR</g:sale_price>
      <g:brand>CubeCraft</g:brand>
      <g:condition>new</g:condition>
      <g:mpn>${p.mpn}</g:mpn>
      <g:product_type>Jouets &gt; Jeux de construction &gt; Cubes magnétiques</g:product_type>
      <g:google_product_category>Jouets et jeux &gt; Jouets pour enfants</g:google_product_category>
      <g:shipping>
        <g:country>FR</g:country>
        <g:service>Livraison standard</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:return_policy_label>free-returns</g:return_policy_label>
      <g:age_group>kids</g:age_group>
      <g:target_country>FR</g:target_country>
      <g:identifier_exists>false</g:identifier_exists>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>CubeCraft — Cubes Magnétiques</title>
    <link>${SITE}</link>
    <description>Cubes magnétiques inspirés de Minecraft. Aimants N52. Certifié CE &amp; EN 71.</description>
    ${items}
  </channel>
</rss>`;
}

export async function GET() {
  return new NextResponse(buildFeed(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
