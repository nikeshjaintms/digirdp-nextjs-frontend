"use client";

import React, { Fragment, useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSkeleton from "@/components/BlogSkeleton";
import Testimonial from "@/pages/slider/testimonial";
import BlogSlider from "@/pages/slider/BlogSlider";
import WhyUs from "@/pages/slider/WhyUs";
import Link from "next/link";
import axios from "axios";
import Location from "@/pages/sales-page/Location";
import { convertCurrency } from "../../../../utils/currencyUtils";
import { useCurrency } from "@/context/CurrencyProvider";
import { useParams } from "next/navigation";
import "../../../styles/skeleton.css";
const assets = "/assets";
import { useRouter } from 'next/router';
import CustomeNOTFound from "../../../not-found.js";

const RDPPlan = () => {
  const [rdp, setRDP] = useState([]);
  const [rdpplans, setRDPplans] = useState([]);
  const [rdpfaqs, setRDPFAQS] = useState([]);
  const [buttonText, setButtonText] = useState("Copy");
  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const { currency } = useCurrency();
    const [notFound, setNotFound] = useState(false);
  
    // const router = useRouter();
  


  const params = useParams();
  const url_text = params.slug;
  //console.log(url_text);

  useEffect(() => {
    const fetchslider = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/slider`
        );
        //console.log("Slider API Response:", response.data[0]);
        setSliders(response.data);
      } catch (error) {
        console.error("Error fetching cloud vps plan data:", error);
        //   setCloudVpsPlan(null);
        //   setCloudVps(null);
      } finally {
        setLoading(false);
      }
    };

    fetchslider();
  }, []);
  const handleCopyCoupon = async (couponCode) => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setButtonText("Copied!");
      setTimeout(() => setButtonText("Copy"), 3000);
    } catch (error) {
      console.error("Failed to copy the coupon code:", error);
    }
  };

  //console.log(url_text);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (currency) {
            setSelectedSymbol(currency.prefix);
            setSelectedCurrency(currency.suffix);
          }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/rdp_plans/${url_text}`
        );
        const plans = response.data[1];

        const convertedPlans = await Promise.all(
          plans.map(async (plan) => {
            const convertedOfferPrice = await convertCurrency(
              plan.offer_price,
              "USD",
              currency.code
            );
            const convertedPrice = await convertCurrency(
              plan.price,
              "USD",
              currency.code
            );
            const annuallyPrice = await convertCurrency(
              plan.price_annually,
              "USD",
              currency.code
            );
            return {
              ...plan,
              offer_price: convertedOfferPrice.toFixed(2),
              price: convertedPrice.toFixed(2),
              price_annually: annuallyPrice.toFixed(2),
            };
          })
        );

        setRDP(response.data[0]);
        setRDPplans(convertedPlans);
        setRDPFAQS(response.data[2]);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);  // optional state for UI if needed
          router.replace('/404'); // 🔥 Redirect to 404 page
        }
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (url_text) {
      fetchData();
    }
  }, [url_text, currency]);

  const [btnTexts, setBtnTexts] = useState({});
  const [couponCode, setCouponCode] = useState(
    rdp?.couponCode || "STEALDEAL20"
  );

  // Update couponCode whenever cloudvps.couponCode changes, ensuring cloudvps is defined
  useEffect(() => {
    setCouponCode(rdp?.couponCode || "STEALDEAL20");
  }, [rdp?.couponCode]);

  // Handle copying of coupon code
  const handleCopy = async (promocode, index) => {
    try {
      await navigator.clipboard.writeText(promocode); // Copy the coupon code
      setBtnTexts((prev) => ({ ...prev, [index]: "COPIED!" }));

      setTimeout(() => {
        setBtnTexts((prev) => ({ ...prev, [index]: "Copy Code" }));
      }, 3000);
    } catch (error) {
      console.error("Failed to copy the code", error);
    }
  };

  const matchedSliders = sliders.filter((slider) => slider.page_id === rdp.id);
  const categoryMatchedSliders = sliders.filter(
    (slider) =>
      slider.category_id === 1 &&
      (slider.page_id === 0 || slider.page_id === null)
  );
  const displayedSliders =
    matchedSliders.length > 0 ? matchedSliders : categoryMatchedSliders;
  const repeatedSliders = [...displayedSliders];
  while (repeatedSliders.length < 4 && displayedSliders.length > 0) {
    repeatedSliders.push(...displayedSliders);
  }

  // Ensure we don't exceed 4 elements
  const finalSliders = repeatedSliders.slice(0, 6);

  // dropdoen for currency
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(currency.prefix);
  const [selectedCurrency, setSelectedCurrency] = useState(currency.suffix);
  const [currencies, setCurrencies] = useState([]);
  const { setAnotherCurrency } = useCurrency();

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.post(
          "https://manage.digirdp.com/includes/api.php",
          new URLSearchParams({
            action: "GetCurrencies",
            identifier: process.env.NEXT_PUBLIC_WHMCS_API_IDENTIFIER,
            secret: process.env.NEXT_PUBLIC_WHMCS_API_SECRET,
            accesskey: process.env.NEXT_PUBLIC_WHMCS_API_ACCESS_KEY,
            responsetype: "json",
          })
        );
        if (response.data.result === "success") {
          setCurrencies(response.data.currencies.currency);
        } else {
          console.error("WHMCS API Error:", response.data.message);
        }
      } catch (error) {
        console.error("API Request Failed:", error);
      }
    };

    fetchCurrencies();
  }, []);

  // dropdoen for currency
  const dropdownRef = useRef(null); // Ref to detect clicks outside

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Select currency and close dropdown
  const selectCurrency = (curr) => {
    setSelectedSymbol(curr.prefix);
    setSelectedCurrency(curr.suffix);
    setAnotherCurrency(curr); // Update global currency state
    convertPrices(curr); // Convert prices
    setIsOpen(false); // Close dropdown
  };

  // Convert currency prices
  const convertPrices = async (curr) => {
    try {
      const convertedPlans = await Promise.all(
        rdpplans.map(async (plan) => {
          const convertedOfferPrice = await convertCurrency(
            plan.offer_price,
            "USD",
            curr.code
          );
          const convertedPrice = await convertCurrency(
            plan.price,
            "USD",
            curr.code
          );
          const annuallyPrice = await convertCurrency(
            plan.price_annually,
            "USD",
            curr.code
          );

          return {
            ...plan,
            offer_price: convertedOfferPrice.toFixed(2),
            price: convertedPrice.toFixed(2),
            price_annually: annuallyPrice.toFixed(2),
          };
        })
      );
      setRDPplans(convertedPlans);
    } catch (error) {
      console.error("Currency conversion failed:", error);
    }
  };
  if (notFound) {
    return <CustomeNOTFound />; // Or show a custom 404 component
  }
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
                  <h1 className="title h3">{rdp.name}</h1>
                  <ul className="page-list my-4">
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/rdp-plan">Windows RDP</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item active">
                      {rdp.name}
                    </li>
                  </ul>
                  <p className="description b1">{rdp.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  -->
                <!-- Start Pricing Style-2  --> */}
        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container-fluid">
            {finalSliders.length > 0 && (
              <div className="rainbow-blog-area">
                <div className="container-fluid">
                  <div className="col-lg-12">
                    <div
                      className="section-title text-center"
                      data-sal-duration="400"
                      data-sal-delay="150"
                    >
                      <h4 className="subtitle">
                        <span className="theme-gradient">Our Offers</span>
                      </h4>
                    </div>
                  </div>
                  <div className="burger-slider">
                    <div className="slider-wrapper row">
                      {finalSliders.map((slider) => (
                        <div
                          className="slide col-lg-3 col-md-6 col-sm-12"
                          key={slider.id}
                        >
                          <div className="img-container">
                            <img
                              src={`${slider.slider_image}`}
                              alt=""
                              className="burger-image"
                            />
                            <div className="burger-info">
                              <div className="burger-title" title="">
                                {slider.slider_details}
                              </div>
                              <div className="burger-description" offer_code="">
                                {slider.slider_heading}
                              </div>
                              <button
                                className="add-to-cart"
                                onClick={handleCopyCoupon("#SAVE20")}
                              >
                                {buttonText}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                      <div className="single-settings-box" ref={dropdownRef}>
                        <div className="select-area mt--20">
                          <div className="rbt-modern-select bg-transparent height-45">
                            <button
                              className="dropdown-toggle"
                              onClick={toggleDropdown}
                            >
                              <p>{selectedSymbol}</p>
                              <span>{selectedCurrency}</span>
                            </button>

                            {isOpen && (
                              <ul className="dropdown-menu">
                                {currencies.map((curr) => (
                                  <li key={curr.id}>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => selectCurrency(curr)}
                                    >
                                      <p>{curr.prefix}</p>
                                      <span>{curr.suffix}</span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
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
                    className="tab-content p-0 bg-transparent border-0 bg-light"
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
                            {loading
                              ? Array.from({ length: 8 }).map((_, index) => (
                                  <BlogSkeleton key={index} />
                                ))
                              : rdpplans.map((rdpplan, index) => (
                                  <div
                                    key={index}
                                    className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30"
                                  >
                                    <div className="rainbow-pricing style-aiwave ">
                                      <div className="pricing-table-inner">
                                        <div className="pricing-top">
                                          <div className="pricing-header">
                                            <h4 className="title color-var-one">
                                              {rdpplan.name}
                                            </h4>
                                            <div className="pricing">
                                              <span className="price-text">
                                                {currency.prefix}{" "}
                                                {rdpplan.offer_price}
                                              </span>
                                              <span className="text d-flex">
                                                <span
                                                  style={{
                                                    textDecoration:
                                                      "line-through",
                                                  }}
                                                >
                                                  {rdpplan.price}
                                                </span>
                                                /Month
                                              </span>
                                            </div>
                                          </div>
                                          <div className="pricing-footer">
                                            <Link
                                              className="btn-default"
                                              href={rdpplan.plan_url}
                                            >
                                              Buy Now
                                            </Link>
                                          </div>
                                          {rdpplan.promocode ? (
                                            <div className="coupon-card">
                                              <div className="coupon-row">
                                                {/* Display the coupon code dynamically */}
                                                <span id="cpnCode">
                                                  {rdpplan.promocode}
                                                </span>

                                                {/* The Copy button */}
                                                <span
                                                  id="cpnBtn"
                                                  onClick={() =>
                                                    handleCopy(
                                                      rdpplan.promocode,
                                                      index
                                                    )
                                                  }
                                                >
                                                  {btnTexts[index] ||
                                                    "Copy Code"}
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
                                                  {rdpplan.users} User
                                                </li>
                                                <li>
                                                  <i className="fa-regular fa-circle-check"></i>{" "}
                                                  {rdpplan.processor}
                                                </li>
                                                <li>
                                                  <i className="fa-regular fa-circle-check"></i>{" "}
                                                  {rdpplan.cpu} CPU
                                                </li>
                                                <li>
                                                  <i className="fa-regular fa-circle-check"></i>{" "}
                                                  {rdpplan.traffic}
                                                </li>
                                                <li>
                                                  <i className="fa-regular fa-circle-check"></i>{" "}
                                                  {rdpplan.os}
                                                </li>
                                                <li>
                                                  <i className="fa-regular fa-circle-check"></i>{" "}
                                                  {rdpplan.ram} RAM
                                                </li>
                                                <li>
                                                  <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                                  Bandwidth {rdpplan.bandwidth}
                                                </li>
                                                <li>
                                                  <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                                  IP Address {rdpplan.ip}
                                                </li>
                                                <li>
                                                  <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                                  {rdpplan.drives}
                                                </li>
                                                <li>
                                                  <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                                  {rdpplan.uptime} uptime
                                                </li>
                                                <li>
                                                  <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                                  {rdpplan.description}
                                                </li>
                                                <li>
                                                  <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                                  {rdpplan.free}
                                                </li>
                                              </ul>
                                              <div className="rbt-show-more-btn">
                                                Show More
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
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
                            {rdpplans.map((rdpplan, index) => (
                              <div
                                className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30"
                                key={index}
                              >
                                <div className="rainbow-pricing style-aiwave ">
                                  <div className="pricing-table-inner">
                                    <div className="pricing-top">
                                      <div className="pricing-header">
                                        <h4 className="title color-var-one">
                                          {rdpplan.name}
                                        </h4>
                                        <div className="pricing">
                                          <span className="price-text">
                                            {currency.prefix}{" "}
                                            {rdpplan.price_annually}
                                          </span>
                                          <span className="text d-flex">
                                            <span
                                              style={{
                                                textDecoration: "line-through",
                                              }}
                                            >
                                              {parseInt(rdpplan.price * 12)}
                                            </span>
                                            /Year
                                          </span>
                                        </div>
                                      </div>
                                      <div className="pricing-footer">
                                        <Link
                                          className="btn-default"
                                          href={rdpplan.plan_url}
                                        >
                                          Buy Now
                                        </Link>
                                      </div>
                                      {rdpplan.promocode_annually ? (
                                        <div className="coupon-card">
                                          <div className="coupon-row">
                                            {/* Display the coupon code dynamically */}
                                            <span id="cpnCode">
                                              {rdpplan.promocode_annually}
                                            </span>

                                            {/* The Copy button */}
                                            <span
                                              id="cpnBtn"
                                              onClick={() =>
                                                handleCopy(
                                                  rdpplan.promocode_annually,
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
                                              {rdpplan.users} User
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.processor}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.cpu} CPU
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.traffic}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.os}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.ram} RAM
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              Bandwidth {rdpplan.bandwidth}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              IP Address {rdpplan.ip}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.drives}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.uptime} uptime
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.description}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.free}
                                            </li>
                                          </ul>
                                          <div className="rbt-show-more-btn">
                                            Show More
                                          </div>
                                        </div>
                                      </div>
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
            </div>

            {/* <!-- Start blog Area  --> */}
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="section-title text-center pb--60 sal-animate"
                    data-sal="slide-up"
                    data-sal-duration="700"
                    data-sal-delay="100"
                  >
                    <h4 className="subtitle">
                      <span className="theme-gradient">
                        Maintaining quality is always our top priority
                      </span>
                    </h4>
                    <h2 className="title mb--0"> Why Choose Us</h2>
                    <h5>
                      Pricing , focusing on speed, security, and guaranteed
                      uptime.
                    </h5>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="service-wrapper rainbow-service-slider-actvation slick-grid-15 rainbow-slick-dot rainbow-gradient-arrows">
                      <WhyUs />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End blog Area  --> */}

            {/* <!-- Start Accordion Area --> */}
            {rdpfaqs && rdpfaqs.length > 0 ? (
              <div className="rainbow-accordion-area rainbow-section-gap">
                <div className="container">
                  <div className="row justify-content-between">
                    <div className="col-lg-12 col-xl-4 col-12">
                      <div className="split-inner">
                        <h2
                          className="title sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="200"
                        >
                          we have answers!
                        </h2>
                        <p
                          className="description sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="300"
                        >
                          Just send us a message with your query.
                        </p>
                        <div
                          className="contact-button mt--35 sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="400"
                        >
                          <Link
                            className="rainbow-gradient-btn without-shape"
                            target="_blank"
                            href="/contact"
                          >
                            <span>Contact us</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-7 col-12">
                      <div className="rainbow-accordion-style rainbow-accordion-02 accordion">
                        <div className="accordion" id="accordionExampleb">
                          {rdpfaqs.map((rdpfaq, index) => (
                            <div key={index} className="accordion-item card">
                              <h2
                                className="accordion-header card-header"
                                id={`heading-${rdpfaq.id}`}
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse-${rdpfaq.id}`}
                                  aria-expanded="false"
                                  aria-controls={`collapse-${rdpfaq.id}`}
                                >
                                  {rdpfaq.question}
                                </button>
                              </h2>
                              <div
                                id={`collapse-${rdpfaq.id}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading-${rdpfaq.id}`}
                                data-bs-parent="#accordionExampleb"
                              >
                                <div className="accordion-body card-body">
                                  {rdpfaq.answer}
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
            ) : (
              ""
            )}

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
                      <h2 className="title mb--60">
                        What our users are saying
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
};

export default RDPPlan;
