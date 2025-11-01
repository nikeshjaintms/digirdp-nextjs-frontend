import Script from "next/script";
import dynamic from "next/dynamic";
import { useEffect } from "react";

// Dynamically import this component in Home.js
const TawkToChat = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Wait until window is loaded before initializing Tawk.to
      window.Tawk_API = window.Tawk_API || {};
    }
  }, []);

  return (
    <Script
      src="https://embed.tawk.to/5d4c52d37d27204601c9ff11/default"
      strategy="lazyOnload" // Load it lazily to avoid blocking rendering
    />
  );
};

// Export dynamically (No SSR)
export default dynamic(() => Promise.resolve(TawkToChat), { ssr: false });
