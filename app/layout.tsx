import { Fredoka, Inter, Press_Start_2P, Rubik } from "next/font/google";
import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { ChatWidget } from "components/ui/chat-widget";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

// Safe cart fetcher — returns undefined silently when Shopify is not configured
function safeGetCart() {
  if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    return Promise.resolve(undefined);
  }
  return getCart();
}

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--rubik",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--fredoka",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  variable: "--pixel",
  weight: "400",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CubeCraft — Construis ton monde. Pour de vrai.",
    template: `%s | CubeCraft`,
  },
  description:
    "Les cubes magnétiques CubeCraft transforment les heures d'écran en heures de génie créatif. Certifiés CE & EN 71, aimants N52. Pour enfants de 6 à 14 ans.",
  keywords: [
    "cubes magnétiques",
    "jouet éducatif",
    "Minecraft",
    "construction magnétique",
    "anti-écran",
    "STEM",
    "Montessori",
    "cadeau enfant",
  ],
  robots: { follow: true, index: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "CubeCraft",
    title: "CubeCraft — Le Minecraft qu'ils peuvent toucher",
    description:
      "64 cubes magnétiques premium. Certifié CE, aimants N52. Offre lancement -30%.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cart = safeGetCart();

  return (
    <html
      lang="fr"
      className={`${rubik.variable} ${fredoka.variable} ${pressStart.variable} ${inter.variable}`}
    >
      <body className="bg-blanc font-inter text-pierre antialiased selection:bg-creeper-light selection:text-creeper-dark">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>{children}</main>
          <Toaster closeButton />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
