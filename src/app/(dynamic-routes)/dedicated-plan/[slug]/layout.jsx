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

  return {
    title: dedicated.title || "Dedicated Server",
    description: dedicated.meta_description || "Dedicated Server Description",
    keywords: dedicated?.keyword || "",
  };
}

const Layout = async ({ children }) => {
  // Vars

  return <>{children}</>;
};

export default Layout;
