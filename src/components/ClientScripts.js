"use client";

import Script from "next/script";
import { useEffect } from "react";

const ClientScripts = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure jQuery is available globally
      window.$ = window.jQuery = require("jquery");
      // Load Bootstrap after jQuery is available
      import("bootstrap");

      // Initialize WOW.js after everything is loaded
      import("wow.js").then((WOW) => {
        new WOW.default().init();
      });
    }
  }, []);

  return (
    <>
      {/* Load jQuery first */}
      <Script
        src="/assets/js/vendor/jquery.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          window.$ = window.jQuery = require("jquery");
        }}
      />

      {/* Load Bootstrap after jQuery */}
      <Script
        src="/assets/js/vendor/bootstrap.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          require("bootstrap");
        }}
      />

      {/* Load other scripts */}
      <Script
        src="/assets/js/vendor/modernizr.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/js/vendor/waypoint.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/js/vendor/wow.min.js" strategy="afterInteractive" />
      <Script
        src="/assets/js/vendor/counterup.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/js/vendor/sal.min.js" strategy="afterInteractive" />
      <Script
        src="/assets/js/vendor/slick.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/vendor/text-type.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/js/vendor/prism.js" strategy="afterInteractive" />
      <Script
        src="/assets/js/vendor/bootstrap-select.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/vendor/backto-top.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/vendor/js.cookie.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/vendor/jquery.style.swicher.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/vendor/jquery-one-page-nav.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  );
};

export default ClientScripts;
