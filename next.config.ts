export default {
  async redirects() {
    return [
      {
        source: "/blog/jouets-stem-enfant",
        destination: "/blog/jouet-stem-enfant-2026",
        permanent: true,
      },
      {
        source: "/blog/meilleur-jouet-anti-ecran-2025",
        destination: "/blog/10-meilleurs-jeux-anti-ecran-enfant",
        permanent: true,
      },
    ];
  },
  experimental: {
    ppr: true,
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
