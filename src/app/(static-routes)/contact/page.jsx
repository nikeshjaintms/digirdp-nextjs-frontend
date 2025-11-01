"use client";

import React from "react";
import { Fragment, useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Testimonial from "../../../pages/slider/testimonial";
import BlogSlider from "../../../pages/slider/BlogSlider";
import Promo from "../../../pages/slider/Promo";
import Location from "../../../pages/sales-page/Location";
import Head from "next/head";
const assets = "/assets";

function ContactUs() {
 
  return (
    <Fragment>
      <Header />
      {/* <!-- Start Breadcrumb Area  --> */}
      <div className="main-content">
        {/* <!-- Start Breadcarumb area  --> */}
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title h3">
                    Get Started with a free quotation
                  </h1>
                  <ul className="page-list my-4">
                    <li className="rainbow-breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="rainbow-breadcrumb-item active">Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  --> */}
      </div>

      {/* <!-- Start Contact Area  --> */}
      <div className="main-content">
        {/* <br /> */}
        {/* <Promo /> */}

        <div className="rainbow-contact-area rainbow-section-gapTop-big">
          <div className="container">
            <div className="row mt--40 row--15">
              <div className="col-lg-8">
                <div className="contact-details-box">
                  <h3 className="title">Still have questions? </h3>
                  <p>
                    Reach out to us and our dedicated support team will provide
                    a prompt solution to any issues you’re encountering with our
                    application. We’re here to help!{" "}
                  </p>

                  <div className="profile-details-tab">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="image-genarator"
                        role="tabpanel"
                        aria-labelledby="image-genarator-tab"
                      >
                        {/* <!-- Start image-genarator Row  --> */}
                        <form
                          action="https://manage.digirdp.com/submitticket.php?"
                          className="rbt-profile-row rbt-default-form row row--15"
                        >
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                          <input id="step" type="hidden" name='step' value={'2'} />
                          <input id="deptid" type="hidden" name='deptid' value={'4Q'} />
                            <div className="form-group">
                              <label htmlFor="name">Full Name</label>
                              <input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                id="email"
                                type="email"
                                placeholder="Your Email"
                                name="email"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                              <label htmlFor="subject">Subject</label>
                              <input
                                id="subject"
                                type="text"
                                placeholder="Enter Message Subject"
                                name="subject"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="message">Message</label>
                              <textarea
                                id="message"
                                cols="20"
                                rows="5"
                                placeholder="Enter Your Message"
                                name="message"
                                required
                              ></textarea>
                            </div>
                          </div>

                          <div className="col-12 mt--20">
                            <div className="form-group mb--0">
                              <button className="btn-default" type="submit">
                                Submit Request
                              </button>
                            </div>
                          </div>
                        </form>
                        {/* <!-- End Profile Row  --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt_md--30 mt_sm--30">
                <div className="rainbow-address">
                  <div className="icon">
                    <i className="fa-sharp fa-regular fa-location-dot"></i>
                  </div>
                  <div className="inner">
                    <h4 className="title">Sales</h4>
                    <p className="b2">
                      Ready to get started? Have questions about opening an
                      account or purchasing a product? We're here to guide you
                      every step of the way!{" "}
                    </p>
                    <a
                      className=""
                      style={{
                        borderBottom: "1px solid #3f85c6",
                        padding: "10px 0 6px",
                      }}
                      target="_post"
                      href="https://manage.digirdp.com/submitticket.php"
                    >
                      Submit Request
                    </a>
                  </div>
                </div>
                <div className="rainbow-address">
                  <div className="icon">
                    <i className="fa-sharp fa-solid fa-headphones"></i>
                  </div>
                  <div className="inner">
                    <h4 className="title">Support</h4>
                    <p className="b2">
                      {" "}
                      Need help with a recent purchase or assistance with your
                      account? Contact us at{" "}
                      <a href="mailto:support@digirdp.com">
                        <b>support@digirdp.com</b>
                      </a>{" "}
                      and our dedicated team will provide prompt and reliable
                      support!{" "}
                    </p>
                  </div>
                </div>
                <div className="rainbow-address">
                  <div className="icon">
                    <i className="fa-sharp fa-regular fa-envelope"></i>
                  </div>
                  <div className="inner">
                    <h4 className="title">Chat with us</h4>
                    <p className="b2">
                      <a
                        href="https://www.instagram.com/digirdp/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Want to connect with us? Head over to our social media
                        page and start a conversation today!{" "}
                      </a>{" "}
                    </p>
                  </div>
                </div>
              </div>
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
                      Partner with us and transform the way you do business. As
                      a reseller, you’ll gain access to top-tier products,
                      tailored support, and a platform to maximize your success.{" "}
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
                    <a className="btn-default" href="/reseller-program">
                      Grow with DigiRDP{" "}
                    </a>
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
        </div>
        {/* <!-- End blog Area  --> */}
      </div>
      {/* <!-- End Contact Area  --> */}

      <Location />

      <Footer />
    </Fragment>
  );
}

export default ContactUs;
