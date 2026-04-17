import { Fredoka, Inter, Press_Start_2P, Rubik } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { ChatWidget } from "components/ui/chat-widget";
import { PromoPopup } from "components/ui/promo-popup";
import { getCart, getProduct } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

// Safe cart fetcher — returns undefined silently when Shopify is not configured
function safeGetCart() {
  if (
    !process.env.SHOPIFY_STORE_DOMAIN ||
    !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  ) {
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

  const [p64, p128, p256] = await Promise.all([
    getProduct("cubecraft-64-pieces").catch(() => undefined),
    getProduct("cubecraft-128-pieces").catch(() => undefined),
    getProduct("cubecraft-pack-famille-256-pieces").catch(() => undefined),
  ]);
  const variantIds: Record<string, string | undefined> = {
    "64": p64?.variants[0]?.id,
    "128": p128?.variants[0]?.id,
    "256": p256?.variants[0]?.id,
  };

  return (
    <html
      lang="fr"
      className={`${rubik.variable} ${fredoka.variable} ${pressStart.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-blanc font-inter text-pierre antialiased selection:bg-creeper-light selection:text-creeper-dark">
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3181479418727481');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3181479418727481&ev=PageView&noscript=1"
          />
        </noscript>
        <Script id="pinterest-tag" strategy="afterInteractive">
          {`
            !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '2612400588771');
            pintrk('track', 'pagevisit', { event_id: 'pv-' + Date.now() });
          `}
        </Script>
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://ct.pinterest.com/v3/?event=init&tid=2612400588771&noscript=1"
          />
        </noscript>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>{children}</main>
          <Toaster closeButton />
          <ChatWidget />
          <PromoPopup variantIds={variantIds} />
        </CartProvider>
      </body>
    </html>
  );
}
