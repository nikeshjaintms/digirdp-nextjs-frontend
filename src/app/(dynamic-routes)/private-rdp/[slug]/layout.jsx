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

  return {
    title: rdplocation?.title || "RDP Location Server",
    description: rdplocation?.meta_description || "RDP Location Server Description",
    keywords: rdplocation?.keyword || "",
  };
}

const Layout = async ({ children }) => {
  // Vars

  return <>{children}</>;
};

export default Layout;
