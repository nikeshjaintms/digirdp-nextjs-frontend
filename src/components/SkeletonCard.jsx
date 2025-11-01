// components/BlogSkeleton.js
import React from "react";

const SkeletonCard  = () => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30">
    <div className="rainbow-pricing style-aiwave animate-pulse">
      <div className="pricing-table-inner bg-gray-200 p-4 rounded-lg shadow-md">
        <div className="pricing-top">
          <div className="pricing-header">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
          </div>
          <div className="pricing-footer">
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
        <div className="pricing-body">
          <div className="features-section">
            <ul className="list-style--1">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <li key={index} className="h-4 bg-gray-300 rounded w-3/4 mb-2"></li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SkeletonCard ;
