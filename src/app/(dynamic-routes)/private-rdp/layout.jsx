// Generate metadata dynamically
export async function generateMetadata() {

    return {
      title: "RDP By Location",
      description: "Here for RDP? Look no where else, we will setup Windows RDP tailored to your needs no matter the scale.",
    }
  }
  
  const Layout = async ({ children }) => {
      // Vars
    
      return <>{children}</>;
    };
    
    export default Layout;