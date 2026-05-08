import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Renders GA4 + Meta Pixel only when the env vars are set.
 * - NEXT_PUBLIC_GA_ID. e.g. G-XXXXXXXXXX
 * - NEXT_PUBLIC_FB_PIXEL_ID. numeric pixel ID
 *
 * Both are public-safe to expose to the browser.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {pixelId ? <MetaPixel id={pixelId} /> : null}
    </>
  );
}

function MetaPixel({ id }: { id: string }) {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
