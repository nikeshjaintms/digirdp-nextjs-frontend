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

  return {
    title: cloudvps.title || "Cloud VPS Server",
    description: cloudvps.meta_description || "Cloud VPS Server Description",
    keywords: cloudvps?.keyword || "",
  };
}

const Layout = async ({ children }) => {
  // Vars

  return <>{children}</>;
};

export default Layout;
