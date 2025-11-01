// components/BlogSkeleton.js
import React from "react";

const BlogSkeleton = () => {
  return (
    <div className="col-lg-3 col-md-6 col-12 mt--30">
      <div className="rainbow-card">
        <div className="inner">
          <div className="thumbnail skeleton">
            <div className="image skeleton-image"></div>
          </div>
          <div className="content">
            <ul className="rainbow-meta-list">
              <li className="skeleton-text"></li>
              <li className="separator"></li>
              <li className="skeleton-text"></li>
            </ul>
            <h4 className="title skeleton-text"></h4>
            <div className="btn-read-more skeleton-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
