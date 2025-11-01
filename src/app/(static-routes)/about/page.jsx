"use client";
import React, { Fragment, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonial from "@/pages/slider/testimonial";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "sal.js/dist/sal.css";
import Promo from "../../../pages/slider/Promo";
import Location from "../../../pages/sales-page/Location";
import axios from "axios";
import Link from "next/link";

const assets = "/assets";

function AboutUs() {
  const [aboutuss, setAboutuss] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/aboutus`)
      .then((response) => {
        setAboutuss(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching RDP data:", error);
      });
  }, []);

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
                  <h1 className="title h3">About our company</h1>
                  <ul className="page-list my-4">
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item active">About Us</li>
                  </ul>
                  <p className="description b1">
                    Our company culture, and how we do things
                  </p>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  -->
                <!-- Start Pricing Style-2  --> */}

        {/* <!-- End Pricing Style-2  --> */}

        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container-fluid">

            {/* <!-- Start Tab__Style--one Area  --> */}
            <div className="rainbow-service-area rainbow-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center pb--60">
                      <h4 className="subtitle">
                        <span className="theme-gradient">About us</span>
                      </h4>
                      <h2 className="title mb--0">{aboutuss.heading}</h2>
                    </div>
                  </div>
                </div>

                <div className="row row--30 align-items-center">
                  <div className="col-lg-12">
                    <div dangerouslySetInnerHTML={{ __html: aboutuss.About }} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title ">
                      <h3 className="title mb--0">
                        A Quick Guide On RDP Plans
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="row row--30 align-items-center">
                  <div className="col-lg-12">
                    <p>
                      When you purchase any RDP Plans, you get access to a tools
                      and components to help you working with the page more
                      efficiently.With SSD storage, high-memory variants and
                      latest processors, use our servers to get the best
                      performance
                    </p>

                    <p>
                      With multiple data center locations, redundant cooling,
                      emergency generators, and constant monitoring, we are able
                      to offer our 100% Uptime Guarantee.
                    </p>

                    <p>
                      Tech veterans, geeks, and nerds are all standing by to
                      optimize your experience. Whether you get in touch with
                      our support, read our knowledge base, or start a thread
                    </p>

                    <h6>Some Quick Features on RDP Plans </h6>
                    <div>
                      <ul>
                        <li>Date Safe & Secure</li>
                        <li>Fast And Reliable</li>
                        <li>Date Safe & Secure</li>
                        <li>Custom Control Panel</li>
                        <li>One Click Setup</li>
                        <li>Real Time Developer Support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title">
                      <h3 className="title mb--0">VPS RDP Plans</h3>
                    </div>
                  </div>
                </div>
                <div className="row row--30 align-items-center">
                  <div className="col-lg-12">
                    <p>
                      Our Cloud VPS service is best suited for any kind of
                      website, production environment or pre-production
                      environment.
                    </p>
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
                          <Link href="/rdp-plan" className="nav-link tab-button ">
                            <div className="tab">
                              <h2 className="title">240 + </h2>
                              <p className="description sal-animate">
                                Windows RDP Plans
                              </p>
                            </div>
                          </Link>
                        </li>

                        <li className="col-lg-3 nav-item" role="presentation">
                          <Link href="/cloud-vps" className="nav-link tab-button">
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
          </div>
        </div>
      </div>
      {/* <!-- Start Pricing Area  --> */}

      <Location />

      <Footer />
    </Fragment>
  );
}
export default AboutUs;
