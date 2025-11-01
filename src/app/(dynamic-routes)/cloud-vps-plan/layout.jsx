// Generate metadata dynamically
export async function generateMetadata() {

    return {
        title: "Cloud VPS",
        description: "Our Cloud VPS service is best suited for any kind of website, production environment or pre-production environment.",
      }
  }
  
  const Layout = async ({ children }) => {
      // Vars
    
      return <>{children}</>;
    };
    
    export default Layout;