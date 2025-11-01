"use client";
import React, { Fragment, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSlider from "@/pages/slider/BlogSlider";
import Testimonial from "@/pages/slider/testimonial";
import axios from "axios";
import Promo from "@/pages/slider/Promo";
import Location from "@/pages/sales-page/Location";
import Link from "next/link";
import Head from "next/head";

const assets = "/assets";

function KnowledgeBase() {
  const [faqs, setFaqs] = useState([]);
  const [faqs_category, setFaqs_category] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/faqs`
        );
        setFaqs(response.data[0]);
        setFaqs_category(response.data[1]);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    fetchFaqs();
  }, []);

  const [activeCategory, setActiveCategory] = useState(null);

  const [activeFAQ, setActiveFAQ] = useState({});

  const toggleFAQ = (categoryId, faqId) => {
    setActiveFAQ((prevState) => ({
      ...prevState,
      [categoryId]: prevState[categoryId] === faqId ? null : faqId,
    }));
  };

  const toggleCategory = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <Fragment>
      <Header />
      {/* <!-- Start Pricing Area  --> */}
      <div className="main-content">
        {/* <!-- Start Breadcarumb area  --> */}
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title h3">Knowledge Base</h1>
                  <ul className="page-list my-4">
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Support</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item active">
                      Knowledge base
                    </li>
                  </ul>
                  <p className="description b1">
                  Here are answers to some commonly asked questions
                  </p>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  -->
                <!-- Start Pricing Style-2  --> */}
        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container-fluid">

            {/* <!-- Start RDP FAQs Area --> */}
            <div className="rainbow-accordion-area rainbow-section-gap">
              <div className="container">
                {faqs_category.map((category) => (
                  <div key={category.category_id} className="row">
                    <div className="col-lg-12">
                      <div
                        className="section-title text-center"
                        data-sal-duration="400"
                        data-sal-delay="150"
                      >
                        <h4 className="subtitle">
                          <span className="theme-gradient"></span>
                        </h4>
                        <h2 className="title w-600 mb--20">
                          {category.category_name}
                        </h2>
                        <p>Let's see if we can help.</p>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-12 col-12 has-show-more">
                      <div
                        className="rainbow-accordion-style rainbow-accordion-02 has-show-more-inner-content has-show-more-inner-content-new large-height"
                        id={`accordion-${category.category_id}`}
                      >
                        <div
                          className="accordion"
                          id={`accordionExample-${category.category_id}`}
                        >
                          {faqs
                            .filter(
                              (faq) => faq.category_id === category.category_id
                            )
                            .map((faq, index) => {
                              const isActive =
                                activeFAQ[category.category_id] === faq.id;
                              const isFirst = index === 0; // Check if it's the first FAQ in the category

                              return (
                                <div
                                  className="accordion-item card"
                                  key={faq.id}
                                >
                                  <h2
                                    className={`accordion-header card-header ${
                                      isActive ? "text-purple" : ""
                                    }`}
                                    id={`heading-${faq.id}`}
                                  >
                                    <button
                                      className={`accordion-button ${
                                        isActive ? "" : "collapsed"
                                      }`}
                                      type="button"
                                      onClick={() =>
                                        toggleFAQ(category.category_id, faq.id)
                                      }
                                      aria-expanded={
                                        isFirst || isActive ? "true" : "false"
                                      }
                                      aria-controls={`collapse-${faq.id}`}
                                    >
                                      {faq.question}
                                    </button>
                                  </h2>
                                  <div
                                    id={`collapse-${faq.id}`}
                                    className={`accordion-collapse collapse ${
                                      isActive ? "show" : ""
                                    }`}
                                    aria-labelledby={`heading-${faq.id}`}
                                    data-bs-parent={`#accordion-${category.category_id}`}
                                  >
                                    <div className="accordion-body card-body">
                                      {faq.answer}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className="rbt-show-more-btn">Show More</div>
                    </div>
                  </div>
                ))}
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
                  {/* <div className="bg-shape">
                    <img
                      src={`${assets}/images/cta-img/bg-shape-01.png`}
                      alt="BG Shape"
                    />
                  </div> */}
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
                        <span className="theme-gradient">Customer Reviews</span>
                      </h4>
                      <h2 className="title mb--60">What our users are saying</h2>
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

export default KnowledgeBase;
