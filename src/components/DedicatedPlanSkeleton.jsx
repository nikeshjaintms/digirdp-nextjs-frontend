// components/BlogSkeleton.js
import React from "react";

const DedicatedPlanSkeleton  = () => {
  return (
    <tbody>
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="skeleton-box w-24 h-6"></td>
          <td className="skeleton-box w-24 h-6"></td>
          <td className="skeleton-box w-24 h-6"></td>
          <td className="skeleton-box w-36 h-6"></td>
          <td className="skeleton-box w-24 h-6"></td>
          <td className="skeleton-box w-16 h-6"></td>
          <td className="skeleton-box w-24 h-6"></td>
          <td className="skeleton-box w-24 h-8"></td>
        </tr>
      ))}
    </tbody>
  );
};

export default DedicatedPlanSkeleton ;
