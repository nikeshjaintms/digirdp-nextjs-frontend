const fetchData = async (slug) => {
  try {
    const [sliderRes, rdpRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/slider`, { next: { revalidate: 3600 } }),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/web-hosting/${slug}`, { next: { revalidate: 3600 } }),
    ]);

    const [sliders, rdpData] = await Promise.all([
      sliderRes.json(),
      rdpRes.json(),
    ]);

    return {
      sliders,
      rdp: rdpData[0],
      rdpplans: rdpData[1],
      rdpfaqs: rdpData[2],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { rdp } = await fetchData(slug);
   const canonicalUrl = slug ? `/hosting/${slug}` : "/hosting"; 

  return {
    title: rdp?.title || "Web Hosting VPS Server",
    description: rdp?.meta_description || "Web Hosting VPS Server Description",
    keywords: rdp?.keyword || "",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: rdp?.og_title || "Web Hosting VPS Server", // Assuming rdp might have og_title
      description: rdp?.og_description || "Web Hosting VPS Server Description", // Assuming rdp might have og_description
      url: `https://digirdp.com${canonicalUrl}`, // Use the dynamic canonical URL here
      siteName: "DigiRDP",
      images: [
        {
          url: process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL +'/' + rdp?.logo || "/og-image.jpg", // Assuming rdp might have og_image
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
