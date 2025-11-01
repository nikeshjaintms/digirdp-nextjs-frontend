"use client";
import React, { Fragment, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSkeleton from "@/components/BlogSkeleton";
import Testimonial from "@/pages/slider/testimonial";
import BlogSlider from "@/pages/slider/BlogSlider";
import Location from "@/pages/sales-page/Location";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import "../../styles/skeleton.css";


const assets = "/assets";

const Dedicated = () => {
  const [dataCenters, set_DataCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/data-center`)
      .then((response) => {
        set_DataCenters(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Dedicated data:", error);
      });
  }, []);

  return (
    <Fragment>
      <Head>
        {/* Google Analytics Script */}
        <title>Our Global Data Center Locations</title>
        <meta
          name="description"
          content=" Explore our data center locations and find the perfect fit
                    for your business today!"
        />
      </Head>
      <Header />

      {/* <!-- Start Pricing Area  --> */}
      <div className="main-content">
        {/* <!-- Start Breadcarumb area  --> */}
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h3 className="title h3">Our Global Data Center Locations</h3>
                  <p className="description b1">
                    Explore our data center locations and find the perfect fit for your business today!
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
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="container">
                <div className="testimonial-wrapper ">
                  <div className="row has-show-more-inner-content">
                  {loading ? Array.from({ length: 8 }).map((_, index) => (
                                  <BlogSkeleton key={index} />
                                    
                                )) : (
                  dataCenters.map((dataCenter, index) => (
                        <div
                          key={dataCenter.id || index}
                          className="cursor-pointer col-lg-4 col-md-6 col-12 mt--30 sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="700"
                        >
                          <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                            <Link
                              href={`/datacenter/${dataCenter.url_text}`}
                            >
                              <div className="inner-new-box">
                                <div className="content">
                                  <div className="bottom-content">
                                    <img
                                      src={`${dataCenter.image}` ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${dataCenter.image}` : `${assets}/images/datacenter/1.png`}
                                      alt={dataCenter.city}
                                    />
                                  </div>
                                  <h5 className="pt-5">{dataCenter.city}</h5>
                                  <p className="m-0">{dataCenter.country}</p>
                                  <br />
                                  <Link
                                    className="btn-new"
                                    href={`/datacenter/${dataCenter.url_text}`}
                                  >
                                    <span>
                                      View Datacenter{" "}
                                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Start Features Area --> */}
          {/* testimonial */}
          
            {/* <!-- End Testimonial Area  --> */}

            {/* <!-- Start blog Area  --> */}
           
            {/* <!-- End blog Area  --> */}
          </div>
        </div>
        {/* <!-- End Pricing Style-2  --> */}
      {/* <!-- Start Pricing Area  --> */}

      <Location />
      <Footer />
    </Fragment>
  );
};

export default Dedicated;
