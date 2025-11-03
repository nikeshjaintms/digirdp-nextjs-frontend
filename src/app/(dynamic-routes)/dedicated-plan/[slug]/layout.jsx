// Fetch data on the server
async function getData(slug) {
  try {
    const [sliderRes, dedicatedRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/slider`,{ next: { revalidate: 3600 } }),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dedicated_plan/${slug}`,{ next: { revalidate: 3600 } }),
    ]);

    const sliders = await sliderRes.json();
    const dedicatedData = await dedicatedRes.json();

    return {
      sliders,
      dedicated: dedicatedData[0] || {},
      dedicatedplans: dedicatedData[1] || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { sliders: [], dedicated: {}, dedicatedplans: [] };
  }
}

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { dedicated } = await getData(slug);
   const canonicalUrl = slug ? `/dedicated-plan/${slug}` : "/dedicated-plan"; 


  return {
    title: dedicated.title || "Dedicated Server",
    description: dedicated.meta_description || dedicated.description || "Dedicated Server Description",
    keywords: dedicated?.keyword || "",
    alternates: {
      canonical: canonicalUrl,
    },
      openGraph: {
      title: dedicated?.title || "Cloud VPS Server", // Assuming cloudvps might have og_title
      description: dedicated?.meta_description || dedicated.description || "Web Hosting VPS Server Description", // Assuming rdp might have og_description
      url: `https://digirdp.com${canonicalUrl}`, // Use the dynamic canonical URL here
      siteName: "DigiRDP",
      images: [
        {
          url: process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL +'/' + dedicated?.logo || "/og-image.jpg", // Assuming rdp might have og_image
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
