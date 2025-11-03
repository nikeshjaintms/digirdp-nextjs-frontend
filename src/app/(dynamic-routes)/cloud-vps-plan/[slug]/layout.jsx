async function getCloudVpsData(slug) {
  try {
    const [sliderRes, cloudVpsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/slider`,{ next: { revalidate: 3600 } }),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cloud_vps_plan/${slug}`,{ next: { revalidate: 3600 } }),
    ]);

    const sliders = await sliderRes.json();
    const cloudVpsData = await cloudVpsRes.json();

    return {
      sliders,
      cloudvps: cloudVpsData[0] || {},
      cloudvpsplans: cloudVpsData[1] || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { sliders: [], cloudvps: {}, cloudvpsplans: [] };
  }
}

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { cloudvps } = await getCloudVpsData(slug);
   const canonicalUrl = slug ? `/cloud-vps-plan/${slug}` : "/cloud-vps-plan"; 


  return {
    title: cloudvps.title || "Cloud VPS Server",
    description: cloudvps.meta_description || cloudvps.description || "Cloud VPS Server Description",
    keywords: cloudvps?.keyword || "",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: cloudvps?.title || "Cloud VPS Server", // Assuming cloudvps might have og_title
      description: cloudvps?.meta_description || cloudvps.description || "Web Hosting VPS Server Description", // Assuming rdp might have og_description
      url: `https://digirdp.com${canonicalUrl}`, // Use the dynamic canonical URL here
      siteName: "DigiRDP",
      images: [
        {
          url: process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL +'/' + cloudvps?.logo || "/og-image.jpg", // Assuming rdp might have og_image
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

  return <>{children}</>;
};

export default Layout;
