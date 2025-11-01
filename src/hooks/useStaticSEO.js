// hooks/useStaticSEO.js
import { useEffect } from "react";

const useStaticSEO = ({ title, description }) => {
  useEffect(() => {
    // Set the document title
    document.title = title;

    // Create or update the meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      // Update the existing meta description
      metaDescription.setAttribute("content", description);
    } else {
      // Create a new meta description tag
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = description;
      document.head.appendChild(metaDescription);
    }
  }, [title, description]); // Re-run the effect if title or description changes
};

export default useStaticSEO;
