"use client";
import React, { Fragment, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSkeleton from "@/components/BlogSkeleton";
import BlogSlider from "@/pages/slider/BlogSlider";
import Testimonial from "@/pages/slider/testimonial";
import Location from "@/pages/sales-page/Location";
import axios from "axios";
import Link from "next/link";
import "../../styles/skeleton.css";

const assets = "/assets";

function Offer() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/offers`)
      .then((response) => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching offers data:", error);
        setLoading(false);
      });
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000); // Hide message after 2 seconds
  };

  return (
    <Fragment>
      <Header />

      <div className="main-content">
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title h3">
                    Limited-Time Deals: Save Big on RDP and VPS Services!
                  </h1>
                  <ul className="page-list my-4">
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Support</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item active">Offers</li>
                  </ul>
                  <p className="description b1">
                    Upgrade to high-performance RDP and VPS services without
                    breaking the bank. Grab our limited-time promo codes and enjoy premium
                    solutions at discounted rates. Don’t miss these limited-time offers—claim
                    your code today and start saving instantly!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container-fluid">
            <div className="rainbow-blog-area rainbow-section-gap bg-color-1">
              <div className="container container-new">
                <div className="row row--30">
                  <div className="col-lg-12">
                    <div className="row mt_dec--30">
                      <div className="col-lg-12">
                        <div className="row row--15">
                          {loading
                            ? Array.from({ length: 8 }).map((_, index) => (
                                <BlogSkeleton key={index} />
                              ))
                            : offers.map((offer, index) => (
                                <div
                                  key={index}
                                  className="col-lg-3 col-md-6 col-12 mt--30"
                                >
                                  <div className="rainbow-card undefined">
                                    <div className="inner">
                                      <div className="thumbnail">
                                        <Link className="image" href="/blog-details">
                                          <img
                                            src={`${assets}/images/added/offer-1.jpg`}
                                            alt="Blog"
                                          />
                                        </Link>
                                      </div>
                                      <div className="content">
                                        <ul className="rainbow-meta-list">
                                          <li className="catagory-meta add">
                                            <i className="fa fa-tag"></i> Coupon
                                          </li>
                                        </ul>
                                        <h4 className="title">{offer.name}</h4>
                                        <p className="description">
                                          {offer.description}
                                        </p>
                                        <div className="d-flex w-100 justify-content-between align-items-center">
                                          <Link
                                            href={`${offer.url}` ? `${offer.url}` : `/`}
                                            className="btn btn-default btn-default-new btn-icon w-100"
                                          >
                                            <span>{offer.offer_code}</span>
                                            <button
                                            className="btn btn-secondary ml-2 copy-icon" style={{ float : "right"}}
                                            onClick={() => handleCopy(offer.offer_code)}
                                          >
                                            <i className="fa fa-copy" style={{ fontSize: "25px" }}></i>
                                          </button>
                                          </Link>
                                         
                                        </div>
                                        {copiedCode === offer.offer_code && (
                                          <span className="mt-2" >
                                            Copied!
                                          </span>
                                        )}
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
              </div>
            </div>

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
          </div>
        </div>
      </div>

      <Location />
      <Footer />
    </Fragment>
  );
}

export default Offer;
