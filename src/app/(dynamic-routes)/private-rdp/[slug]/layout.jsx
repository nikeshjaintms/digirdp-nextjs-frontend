const fetchData = async (slug) => {
  try {
    const [sliderRes, rdpRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/slider`, { next: { revalidate: 3600 } }),
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/rdplocation_plan/${slug}`,
        { next: { revalidate: 3600 } }
      ),
    ]);


    const [sliders, rdpData] = await Promise.all([
      sliderRes.json(),
      rdpRes.json(),
    ]);

    return { sliders, rdplocation: rdpData[0], rdplocationplans: rdpData[1] };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { rdplocation } = await fetchData(slug);
  const canonicalUrl = slug ? `/private-rdp/${slug}` : "/private-rdp";

  return {
    title: rdplocation?.title || "RDP Location Server",
    description: rdplocation?.meta_description || "RDP Location Server Description",
    keywords: rdplocation?.keyword || "",
        alternates: {
      canonical: canonicalUrl,
    },
      openGraph: {
      title: rdplocation?.title || "Cloud VPS Server", // Assuming cloudvps might have og_title
      description: rdplocation?.meta_description || rdplocation?.description || "Web Hosting VPS Server Description", // Assuming rdp might have og_description
      url: `https://digirdp.com${canonicalUrl}`, // Use the dynamic canonical URL here
      siteName: "DigiRDP",
      images: [
        {
          url: process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL +'/' + rdplocation?.logo || "/og-image.jpg", // Assuming rdp might have og_image
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
     metadataBase: new URL("https://digirdp.com"),
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
