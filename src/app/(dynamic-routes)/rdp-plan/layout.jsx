// Generate metadata dynamically
export async function generateMetadata() {
  return {
    title: "Windows RDP",
    description:
      "Looking for RDP? You’re in the right place! We provide customized Windows RDP solutions to match your requirements, no matter the scale.",
    keywords: [
      "cheap RDP",
      "buy cheap RDP",
      "cheap RDP Online",
      "Buy cheap RDP online",
      "buy RDP",
      "buy RDP online",
      "shared RDP",
      "admin RDP",
      "USA RDP",
      "UK RDP",
      "france rdp",
      "netherlands rdp",
      "encoding rdp",
      "rdp seller",
      "buy rdp with paypal",
      "buy rdp with bitcoins",
      "buy rdp with credit card",
    ],
    openGraph: {
      title: "DigiRDP - Windows PLAN",
      description:
        "DigiRDP provides cheap Dedicated RDP SSD. Buy Cheap Dedicated RDP in USA, UK, Netherlands, France & India location on affordable prices",
      url: "https://digirdp.com/rdp-plan/",
      siteName: "DigiRDP",
      images: [
        {
          url: "/og-image.jpg", // Update with your actual image path
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    metadataBase: new URL("https://digirdp.com"),
    alternates: {
      canonical: "/rdp-plan",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
  };
}

const Layout = async ({ children }) => {
  // Vars

  return <>{children}</>;
};

export default Layout;
