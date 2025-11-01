// import { Geist, Geist_Mono } from "next/font/google";
import "../../public/assets/css/vendor/bootstrap.min.css";
import "../../public/assets/css/plugins/fontawesome-all.min.css";
import "../../public/assets/css/plugins/feature.css";
import "../../public/assets/css/plugins/animation.css";
import "../../public/assets/css/plugins/slick.css";
import "../../public/assets/css/plugins/slick-theme.css";
import "../../public/assets/css/plugins/bootstrap-select.min.css";
import "../../public/assets/css/plugins/prism.css";
import "../../public/assets/css/style.css";
import "./globals.css";
import Head from "next/head";
import Providers from "../context/Providers";
import Script from "next/script";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "DigiRDP - Secure & Fast RDP and Cloud VPS Solutions",
  description:
    "DigiRDP offers secure, fast, and reliable RDP and dedicated Cloud VPS solutions. Enjoy 24/7 expert support and unmatched performance with SSD-powered servers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="theme-style-mode" content="0" />
      </Head>
      <Providers>
        <body style={{ fontFamily: "'Sora', sans-serif" }}>
          {children}
          <script src="/assets/js/vendor/bootstrap.min.js"></script>
           <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-11363971771" />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-11363971771');
              `,
            }}
          />
          <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11363971771"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11363971771');
            `,
          }}
        />
        </body>
        
      </Providers>
    </html>
  );
}
