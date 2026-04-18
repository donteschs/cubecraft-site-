import { Fredoka, Inter, Press_Start_2P, Rubik } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { ChatWidgetLoader } from "components/ui/chat-widget-loader";
import { PromoPopupLoader } from "components/ui/promo-popup-loader";
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

const GTM_ID = "GTM-NPJTZDZ3";
const GA_MEASUREMENT_ID = "G-MHQTF67MPH";

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
  other: { "p:domain_verify": "efd0f24559d4799c43986cc9992ecad1" },
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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="tiktok-pixel" strategy="lazyOnload">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('D7H1L2JC77UDOSQMH5B0');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        <Script id="meta-pixel" strategy="lazyOnload">
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
        <Script id="pinterest-tag" strategy="lazyOnload">
          {`
            !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
              n=window.pintrk;n.queue=[],n.version="3.0";var
              t=document.createElement("script");t.async=!0,t.src=e;var
              r=document.getElementsByTagName("script")[0];
              r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '2612400588771', {em: ''});
            pintrk('page');
          `}
        </Script>
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://ct.pinterest.com/v3/?event=init&tid=2612400588771&pd[em]=&noscript=1"
          />
        </noscript>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>{children}</main>
          <Toaster closeButton />
          <ChatWidgetLoader />
          <PromoPopupLoader variantIds={variantIds} />
        </CartProvider>
      </body>
    </html>
  );
}
