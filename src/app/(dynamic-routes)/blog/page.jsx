"use client";
import React, { Fragment, useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import BlogSlider from "../../../pages/slider/BlogSlider";
import Testimonial from "../../../pages/slider/testimonial";
import axios from "axios";
import Link from "next/link";
import Promo from "../../../pages/slider/Promo";
import Location from "../../../pages/sales-page/Location";
const assets = "/assets";
import BlogSkeleton from "../../../components/BlogSkeleton";
import "../../styles/skeleton.css";

function Blog() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [blogs_catgoery, setBlogs_Category] = useState([]);

  useEffect(() => {
    // Fetch slider data from Laravel API
    const fetchBlogsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/DBblog`
        );
        setBlogs_Category(response.data[0]);
        setBlogs(response.data[1]);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };
    fetchBlogsData();
  }, []);

  const [activeCategory, setActiveCategory] = useState("all"); // State to track active category

  const handleFilterClick = (category) => {
  //console.log("Selected category:", category); // Should be the ID of the clicked category
    setActiveCategory(category);
  };

  return (
    <Fragment>
      <Header />
      {/* <!-- Start Pricing Area  --> */}
      <div className="main-content">
        {/* <!-- Start Breadcarumb area  --> */}
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h3 className="title h3">Welcome to DigiRDP Blog Posts</h3>
                  <p className="description b1">
                    Enjoy The Convenience & Power Of Our Platform, With Full
                    Root Admin Access.
                  </p>
                  <ul className="page-list my-4">
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Support</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item active">Blog</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  -->

                <!-- Start Pricing Style-2  --> */}
        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container-fluid">
            {/* <!-- Start Blog Area  --> */}
            <div className="rainbow-blog-area rainbow-section-gap bg-color-1">
              <div className="container container-new">
                <div className="row row--30">
                  <div className="filters">
                    <div className="filter-cta">
                      <Link
                        className={`link ${
                          activeCategory === "all" ? "selected" : ""
                        }`}
                        onClick={() => handleFilterClick("all")}
                        href="#all"
                      >
                        All
                      </Link>
                      {blogs_catgoery.map((category, index) => (
                        <Link
                          key={category.id}
                          className={`link ${
                            activeCategory === category.id ? "selected" : ""
                          }`}
                          onClick={() => handleFilterClick(category.id)}
                          href={`#${category.slug}`}
                          id={category.slug}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="row mt_dec--30">
                  <div className="col-lg-12">
                    <div className="row row--15" id="blog-list">
                      {loading
                        ? // Show skeleton loading while data is being fetched
                          Array.from({ length: 8 }).map((_, index) => (
                            <BlogSkeleton key={index} />
                          ))
                        : // Show actual blog cards once data is loaded
                          blogs
                            .filter((blog) => {
                            //console.log("activeCategory:", activeCategory);
                            {/* console.log(
                                "blog.category_id:",
                                blog.category_id
                              ); */}
                              return (
                                activeCategory === "all" ||
                                String(blog.category_id) ===
                                  String(activeCategory)
                              );
                            })
                            .map((blog) => (
                              <div
                                key={blog.id}
                                className={`col-lg-3 col-md-6 col-12 mt--30 ${blog.category}`}
                              >
                                <div className="rainbow-card">
                                  <div className="inner">
                                    <div className="thumbnail">
                                      <Link
                                        className="image"
                                        href={`/blog/${blog.slug}`}
                                      >
                                        <img
                                          src={
                                            `${blog.feature_image}`
                                              ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${blog.feature_image}`
                                              : `${assets}/images/added/big-one.png`
                                          }
                                          alt="img"
                                        />
                                      </Link>
                                    </div>
                                    <div className="content">
                                      <ul className="rainbow-meta-list">
                                        <li>{blog.category_name}</li>
                                        <li className="separator"></li>
                                        <li className="catagory-meta add">
                                          {blog.user_name}
                                        </li>
                                      </ul>
                                      <h4 className="title">
                                        <Link href={`/blog/${blog.slug}`}>
                                          {blog.title}
                                        </Link>
                                      </h4>
                                      <Link
                                        className="btn-read-more border-transparent"
                                        href={`/blog/${blog.slug}`}
                                      >
                                        <span>
                                          Read More{" "}
                                          <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Start Features Area --> */}
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="section-title text-center sal-animate"
                      data-sal-duration="400"
                      data-sal-delay="150"
                    >
                      <h4 className="subtitle">
                        <span className="theme-gradient"></span>
                      </h4>
                      <h2 className="title w-600 mb--20">
                        Our Hosting Solutions{" "}
                      </h2>
                      <p>
                        Explore our tailored solutions with Windows RDP, Cloud
                        VPS, and Dedicated servers to find <br /> the perfect
                        fit for your application deployment needs. <br /> Get
                        the performance, reliability, and ease you deserve with
                        our expertly crafted plans{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 mt--60">
                    <div className="advance-tab-button advance-tab-button-1 right-top">
                      <ul className="nav nav-tabs tab-button-list">
                        <li className="col-lg-3 nav-item" role="presentation">
                          <Link
                            href="/rdp-plan"
                            className="nav-link tab-button "
                          >
                            <div className="tab">
                              <h2 className="title">240 + </h2>
                              <p className="description sal-animate">
                                Windows RDP Plans
                              </p>
                            </div>
                          </Link>
                        </li>

                        <li className="col-lg-3 nav-item" role="presentation">
                          <Link
                            href="/cloud-vps"
                            className="nav-link tab-button"
                          >
                            <div className="tab">
                              <h2 className="title">110 +</h2>
                              <p className="description sal-animate">
                                Cloud VPS Plans
                              </p>
                            </div>
                          </Link>
                        </li>

                        <li className="col-lg-3 nav-item" role="presentation">
                          <Link
                            href="/dedicated-server"
                            className="nav-link tab-button"
                          >
                            <div className="tab">
                              <h2 className="title">59 +</h2>
                              <p className="description sal-animate">
                                Dedicated Server Plans
                              </p>
                            </div>
                          </Link>
                        </li>
                        <li className="col-lg-3 nav-item" role="presentation">
                          <Link
                            href="/private_rdp"
                            className="nav-link tab-button"
                          >
                            <div className="tab">
                              <h2 className="title">114 +</h2>
                              <p className="description sal-animate">
                                Private RDP Plans
                              </p>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="view-more-button text-center mt--35 sal-animate" data-sal="slide-up" data-sal-duration="400" data-sal-delay="400">
                                        <Link className="btn-default color-blacked" href="/contact">View Plans <i className="fa-sharp fa-light fa-arrow-right ml--5"></i></Link>
                                    </div> */}
                </div>
              </div>
            </div>

            {/* <!-- Start CTA Style-one Area  --> */}
            <div className="rainbow-rn-cta mt-5">
              <div className="container">
                <div className="row row--0 align-items-center content-wrapper">
                  <div className="col-lg-8">
                    <div className="inner">
                      <div className="content text-left">
                        <h4
                          className="title sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="200"
                        >
                          Become a Reseller Today{" "}
                        </h4>
                        <p
                          className="sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="300"
                        >
                          Partner with us and transform the way you do business.
                          As a reseller, you’ll gain access to top-tier
                          products, tailored support, and a platform to maximize
                          your success.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="right-content">
                      <div
                        className="call-to-btn text-start text-lg-end sal-animate"
                        data-sal="slide-up"
                        data-sal-duration="400"
                        data-sal-delay="400"
                      >
                        <div className="team-image">
                          <img
                            src={`${assets}/images/cta-img/team-01.png`}
                            alt="Group"
                          />
                        </div>
                        <Link className="btn-default" href="/reseller-program">
                          Grow with DigiRDP{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-shape">
                    <img
                      src={`${assets}/images/cta-img/bg-shape-01.png`}
                      alt="BG Shape"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* testimonial */}
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="section-title text-left sal-animate"
                      data-sal="slide-up"
                      data-sal-duration="400"
                      data-sal-delay="150"
                    >
                      <h4 className="subtitle">
                        <span className="theme-gradient">Testimonials</span>
                      </h4>
                      <h2 className="title mb--60">
                        The opinions of the community
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <Testimonial />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Testimonial Area  --> */}

            {/* <!-- Start blog Area  --> */}
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="section-title text-center sal-animate"
                      data-sal="slide-up"
                      data-sal-duration="400"
                      data-sal-delay="150"
                    >
                      <h4 className="subtitle">
                        <span className="theme-gradient">Blogs</span>
                      </h4>
                      <h2 className="title mb--60">Explore Our Insights</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="service-wrapper rainbow-service-slider-actvation slick-grid-15 rainbow-slick-dot rainbow-gradient-arrows">
                      <BlogSlider />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div
                className="view-more-button text-center mt--45 sal-animate"
                data-sal="slide-up"
                data-sal-duration="400"
                data-sal-delay="400"
              >
                <Link className="btn-default color-blacked" href="/blog">
                  View Blogs{" "}
                  <i className="fa-sharp fa-light fa-arrow-right ml--5"></i>
                </Link>
              </div>
            </div>
            {/* <!-- End blog Area  --> */}
          </div>
        </div>
        {/* <!-- End Pricing Style-2  --> */}
      </div>
      {/* <!-- Start Pricing Area  --> */}

      <Location />
      <Footer />
    </Fragment>
  );
}

export default Blog;
