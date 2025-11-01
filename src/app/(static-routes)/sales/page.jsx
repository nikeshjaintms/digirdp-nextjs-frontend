"use client";
import React, { Fragment, useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import BlogSkeleton from "../../../components/BlogSkeleton";
import CountDown from "../../../pages/sales-page/CountDown";
import Location from "../../../pages/sales-page/Location";
import Link from "next/link";
import axios from "axios";
import Loading from "../../__loading";

const assets = "/assets";

const BlackFriday = () => {
  const [sales_page, setsales_page] = useState([]);
  const [sales, setsales] = useState([]);
  const [salesplan, setsalesplan] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchSalesPageData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sales_page`
        );
        setsales_page(response.data[0][0]);

        setsalesplan(response.data[2]);

        setLoading(false);

      //console.log(response.data[0]["start_date"]);
      //console.log(response.data[0]["end_date"]);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      }
    };

    fetchSalesPageData();
  }, []);

  const [btnTexts, setBtnTexts] = useState({});
  const [couponCode, setCouponCode] = useState(
    sales.promocode || "STEALDEAL20"
  );

  // Update couponCode whenever cloudvps.couponCode changes, ensuring cloudvps is defined
  useEffect(() => {
    setCouponCode(sales?.couponCode || "STEALDEAL20");
  }, [sales?.couponCode]);

  // Handle copying of coupon code
  const handleCopy = async (couponCode, index) => {
    const codeToCopy = couponCode || "STEALDEAL20"; // Use provided code or default
    try {
      await navigator.clipboard.writeText(codeToCopy); // Copy the coupon code
      setBtnTexts((prev) => ({ ...prev, [index]: "COPIED!" }));

      setTimeout(() => {
        setBtnTexts((prev) => ({ ...prev, [index]: "Copy Code" }));
      }, 3000);
    } catch (error) {
      console.error("Failed to copy the code", error);
    }
  };

  var startDate = sales_page.start_date
    ? sales_page.start_date.replace(" ", "T")
    : "";
  var endDate = sales_page.end_date
    ? sales_page.end_date.replace(" ", "T")
    : "2025-01-31T00:00:00"; // Fallback end date if not provided
//console.log("Start Date: " + startDate);
//console.log("End Date: " + endDate);


  return (
    <Fragment>
      <Header />
      {/* main top */}

      <div className="slider-area slider-style-1 variation-default slider-bg-image  slider-bg-shape sales-banner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="inner text-center mt--140">
                <h4 className="subtitle">
                  <span>
                    <span>🔥</span>{" "}
                    <span className="theme-gradient">What’s on Offer?</span>{" "}
                  </span>
                </h4>
                <h1 className="title display-one">
                  <span className="highlight-1">{sales_page.title_1}</span>{" "}
                </h1>
                <div id="neon">{sales_page.title_2}</div>
                <p className="description p-0">{sales_page.description}</p>
                <Link
                  className="btn-default @@btnclassName"
                  href={`${sales_page.url}`}
                >
                  {" "}
                  Contact Us Now{" "}
                </Link>
                <div className="inner-shape">
                  <img
                    src={`${assets}/images/bg/icon-shape/icon-shape-one.png`}
                    alt="Icon Shape"
                    className="iconshape iconshape-one"
                  />
                  <img
                    src={`${assets}/images/bg/icon-shape/icon-shape-two.png`}
                    alt="Icon Shape"
                    className="iconshape iconshape-two"
                  />
                  <img
                    src={`${assets}/images/bg/icon-shape/icon-shape-three.png`}
                    alt="Icon Shape"
                    className="iconshape iconshape-three"
                  />
                  <img
                    src={`${assets}/images/bg/icon-shape/icon-shape-four.png`}
                    alt="Icon Shape"
                    className="iconshape iconshape-four"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-shape">
          <img
            className="bg-shape-one"
            src={`${assets}/images/bg/bg-shape-four.png`}
            alt="Bg Shape"
          />
          <img
            className="bg-shape-two"
            src={`${assets}/images/bg/bg-shape-five.png`}
            alt="Bg Shape"
          />
        </div>
      </div>

      <CountDown StartDate={startDate} EndDate={endDate} />

      {/* <!-- Pricing Part --> */}

      <div className="wrapper rainbow-section-gap">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12">
              <div
                className="section-title text-center slide-up"
                data-sal-duration="400"
                data-sal-delay="150"
              >
                <h4 className="subtitle">
                  <span className="theme-gradient">Pricing</span>
                </h4>
                <h2 className="title w-600 mb--20">Our product</h2>
                <p className="description b1">
                  Priced to fit your specific needs
                </p>
              </div>

              <nav className="aiwave-tab">
                <div
                  className="tab-btn-grp nav nav-tabs text-center justify-content-center"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    className="nav-link active"
                    id="nav-month-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-month"
                    type="button"
                    role="tab"
                    aria-controls="nav-month"
                    aria-selected="false"
                  >
                    Monthly
                  </button>
                  <button
                    className="nav-link with-badge "
                    id="nav-year-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-year"
                    type="button"
                    role="tab"
                    aria-controls="nav-year"
                    aria-selected="true"
                  >
                    Yearly
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <div className="row row--15 mt-5">
            <div
              className="tab-content p-0 bg-transparent border-0 border bg-light"
              id="nav-tabContent"
            >
              <div
                className="tab-pane fade active show"
                id="nav-month"
                role="tabpanel"
                aria-labelledby="nav-month-tab"
              >
                <div
                  className="tab-content p-0 bg-transparent border-0 bg-light"
                  id="nav-tabContent"
                >
                  <div
                    className="tab-pane fade active show"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="row row--15 mt_dec--40">
                      {loading ? 
                        Array.from({ length: 8 }).map((_, index) => (
                          <BlogSkeleton key={index} />
                        )):
                      salesplan.map((saleplan, index) => (
                        <div
                          key={index}
                          className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30"
                        >
                          <div className="rainbow-pricing style-aiwave ">
                            <div className="pricing-table-inner">
                              <div className="pricing-top">
                                <div className="pricing-header">
                                  <h4 className="title color-var-one">
                                    {saleplan.name}
                                  </h4>
                                  <div className="pricing">
                                    <span className="price-text">
                                      ${saleplan.offer_price}{" "}
                                    </span>
                                    <span className="text d-flex">
                                      <span
                                        style={{
                                          textDecoration: "line-through",
                                        }}
                                      >
                                        {saleplan.price}
                                      </span>
                                      /Per Month
                                    </span>
                                  </div>
                                </div>
                                <div className="pricing-footer">
                                  <Link
                                    className="btn-default"
                                    href={saleplan.plan_url}
                                  >
                                    Buy Now
                                  </Link>
                                </div>
                                {saleplan.promocode ? (
                                  <div className="coupon-card">
                                    <div className="coupon-row">
                                      {/* Display the coupon code dynamically */}
                                      <span id="cpnCode">
                                        {saleplan.promocode}
                                      </span>

                                      {/* The Copy button */}
                                      <span
                                        id="cpnBtn"
                                        onClick={() =>
                                          handleCopy(saleplan.promocode, index)
                                        }
                                      >
                                        {btnTexts[index] || "Copy Code"}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div className="pricing-body">
                                  <div className="features-section has-show-more">
                                    <h6>Features</h6>
                                    <ul className="list-style--1 has-show-more-inner-content">
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.users} Users
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.processor}
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.cpu}
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.traffic}
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.os}
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.ram} Ram
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        Bandwidth {saleplan.bandwidth}
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        IP Address {saleplan.ip}
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        {saleplan.drives}
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        {saleplan.uptime} uptime
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        {saleplan.description}
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        {saleplan.free}
                                      </li>
                                      {saleplan.a ? (
                                        <li>
                                          <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                          {saleplan.a}
                                        </li>
                                      ) : (
                                        ""
                                      )}
                                      {saleplan.b ? (
                                        <li>
                                          <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                          {saleplan.b}
                                        </li>
                                      ) : (
                                        ""
                                      )}
                                      {saleplan.c ? (
                                        <li>
                                          <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                          {saleplan.c}
                                        </li>
                                      ) : (
                                        ""
                                      )}
                                    </ul>
                                    <div className="rbt-show-more-btn">
                                      Show More
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {saleplan ? (
                              <div className="feature-badge">
                                {saleplan.tag}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade "
                id="nav-year"
                role="tabpanel"
                aria-labelledby="nav-year-tab"
              >
                <div
                  className="tab-content p-0 bg-transparent border-0 bg-light"
                  id="nav-tabContent"
                >
                  <div
                    className="tab-pane fade active show"
                    id="nav-home1"
                    role="tabpanel"
                    aria-labelledby="nav-home1-tab"
                  >
                    {/* <h4 className="title w-600 mb--40 text-center">Explore to our smart Cloud VPS plans</h4> */}
                    <div className="row row--15 mt_dec--40">
                      {salesplan.map((saleplan, index) => (
                        <div
                          key={index}
                          className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30"
                        >
                          <div className="rainbow-pricing style-aiwave ">
                            <div className="pricing-table-inner">
                              <div className="pricing-top">
                                <div className="pricing-header">
                                  <h4 className="title color-var-one">
                                    {saleplan.name}
                                  </h4>
                                  <div className="pricing">
                                    <span className="price-text">
                                      ${saleplan.price_annually}{" "}
                                    </span>
                                    <span className="text d-flex">
                                      <span
                                        style={{
                                          textDecoration: "line-through",
                                        }}
                                      >
                                        {saleplan.price * 12}
                                      </span>
                                      /Per Year
                                    </span>
                                  </div>
                                </div>
                                <div className="pricing-footer">
                                  <Link
                                    className="btn-default"
                                    href={saleplan.plan_url}
                                  >
                                    Buy Now
                                  </Link>
                                </div>
                                {saleplan.promocode_annually ? (
                                  <div className="coupon-card">
                                    <div className="coupon-row">
                                      {/* Display the coupon code dynamically */}
                                      <span id="cpnCode">
                                        {saleplan.promocode_annually}
                                      </span>

                                      {/* The Copy button */}
                                      <span
                                        id="cpnBtn"
                                        onClick={() =>
                                          handleCopy(
                                            saleplan.promocode_annually,
                                            index
                                          )
                                        }
                                      >
                                        {btnTexts[index] || "Copy Code"}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div className="pricing-body">
                                  <div className="features-section has-show-more">
                                    <h6>Features</h6>
                                    <ul className="list-style--1 has-show-more-inner-content">
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.users} Users
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.processor}
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.cpu}
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.traffic}
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.os}
                                      </li>
                                      <li>
                                        <i className="fa-regular fa-circle-check"></i>{" "}
                                        {saleplan.ram} Ram
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        Bandwidth {saleplan.bandwidth}
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        IP Address {saleplan.ip}
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        {saleplan.drives}
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        {saleplan.uptime} uptime
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        {saleplan.description}
                                      </li>
                                      <li>
                                        <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                        {saleplan.free}
                                      </li>
                                      {saleplan.a ? (
                                        <li>
                                          <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                          {saleplan.a}
                                        </li>
                                      ) : (
                                        ""
                                      )}
                                      {saleplan.b ? (
                                        <li>
                                          <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                          {saleplan.b}
                                        </li>
                                      ) : (
                                        ""
                                      )}
                                      {saleplan.c ? (
                                        <li>
                                          <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                          {saleplan.c}
                                        </li>
                                      ) : (
                                        ""
                                      )}
                                    </ul>
                                    <div className="rbt-show-more-btn">
                                      Show More
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {saleplan ? (
                              <div className="feature-badge">
                                {saleplan.tag}
                              </div>
                            ) : (
                              ""
                            )}
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
                    Partner with us and transform the way you do business. As a
                    reseller, you’ll gain access to top-tier products, tailored
                    support, and a platform to maximize your success.{" "}
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

      <Location />
      <Footer />
    </Fragment>
  );
};

export default BlackFriday;
