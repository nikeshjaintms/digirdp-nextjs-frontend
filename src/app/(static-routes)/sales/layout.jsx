// Type Imports
async function getSalesPageData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sales_page`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    return {
      sales_page: data[0][0] || {},
      salesPlan: data[2] || [],
      startDate: data[0]?.start_date || null,
      endDate: data[0]?.end_date || null,
    };
  } catch (error) {
    console.error("Error fetching sales page data:", error);
    return {
      sales_page: {},
      salesPlan: [],
      startDate: null,
      endDate: null,
    };
  }
}

// Generate metadata dynamically
export async function generateMetadata() {
  const { sales_page } = await getSalesPageData();

  return {
    title: `${
      sales_page.title_1 ? sales_page.title_1 : "Sales Page || DigiRDP"
    }`,
    description: sales_page.description,
  };
}

const Layout = async ({ children }) => {
  // Vars

  return <>{children}</>;
};

export default Layout;
