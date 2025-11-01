"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSkeleton from "@/components/BlogSkeleton";
import Testimonial from "@/pages/slider/testimonial";
import BlogSlider from "@/pages/slider/BlogSlider";
import axios from "axios";
import Link from "next/link";
import Location from "@/pages/sales-page/Location";
import { convertCurrency } from "../../../../utils/currencyUtils";
import { useParams } from "next/navigation";
const assets = "/assets";
import { useCurrency } from "@/context/CurrencyProvider";
import "../../../styles/skeleton.css";
import { useRouter } from 'next/router';
import CustomeNOTFound from "../../../not-found.js";

const DedicatedPlan = () => {
  const [dedicateds, setDedicateds] = useState([]);
  const [dedicatedplans, setDedicatedplans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Copy");
  const [sliders, setSliders] = useState([]);
  const { currency } = useCurrency();
  const params = useParams();
  const url_text = params.slug;
    const [notFound, setNotFound] = useState(false);
  
    // const router = useRouter();
  
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
    // console.log("cloudvpsplan",cloudvpsplans);
    // console.log("cloudvps",cloudvps);
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
    const fetchDedicatedplan = async () => {
      setLoading(true);
      try {
        if (currency) {
          setSelectedSymbol(currency.prefix);
          setSelectedCurrency(currency.suffix);
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dedicated_plan/${url_text}`
        );
        //console.log("dedicated API Response:", response.data[0]);
        //console.log("dedicated plan API Response:", response.data[1]);
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
        setDedicateds(response.data[0]);
        setDedicatedplans(convertedPlans);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);  // optional state for UI if needed
          router.replace('/404'); // 🔥 Redirect to 404 page
        }
        console.error("Error fetching dedicated plan data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (url_text) {
      fetchDedicatedplan();
    }
  }, [url_text, currency]);

  const matchedSliders = sliders.filter(
    (slider) => slider.page_id === dedicateds.id
  );
  const categoryMatchedSliders = sliders.filter(
    (slider) =>
      slider.category_id === 2 &&
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
        dedicatedplans.map(async (plan) => {
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
      setDedicatedplans(convertedPlans);
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
                  <h1 className="title h3">{dedicateds.name}</h1>
                  <ul className="page-list my-4">
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/dedicated-server">Dedicated Plan</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item active">
                      {dedicateds.name}
                    </li>
                  </ul>
                  <p className="description b1">{dedicateds.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  -->

            

                {/* <!-- Start Pricing Style-2  --> */}
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
                                onClick={() => handleCopyCoupon("#SAVE20")}
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
                      className="section-title text-center sal-animate"
                      data-sal="slide-up"
                      data-sal-duration="400"
                      data-sal-delay="150"
                    >
                      <h4 className="subtitle">
                        <span className="theme-gradient">
                          Instant and Custom Servers
                        </span>
                      </h4>
                      <h2 className="title w-600 mb--20">
                        Bare Metal Dedicated Servers{" "}
                      </h2>
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
                <div>
                  <p>
                    <span className="min">
                      <i className="fa-solid fa-clock"></i>
                      <span> Setup Instant to upto 24 hours</span>
                    </span>
                  </p>
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
                          <div className="row row--15">
                            {loading ? (
                              Array.from({ length: 8 }).map((_, index) => (
                                <BlogSkeleton key={index} />
                              ))
                            ) : (
                              <div className="col-lg-12">
                                <div className="rainbow-compare-table style-1 table-style mt-5">
                                  <div className="table-responsive-wrapper">
                                    <table className="table-responsive">
                                      <thead>
                                        <tr>
                                          <th className="style-prymary">
                                            <div className="d-flex align-items-center justify-content-center">
                                              <img
                                                src={`${assets}/images/added/cpu.png`}
                                                alt="cpu"
                                              />
                                              <span className="ms-2">CPU</span>
                                            </div>
                                          </th>
                                          <th className="style-prymary">
                                            <div className="d-flex align-items-center justify-content-center">
                                              <img
                                                src={`${assets}/images/added/storage.png`}
                                                alt="cpu"
                                              />
                                              <span className="ms-2">
                                                Storage
                                              </span>
                                            </div>
                                          </th>
                                          <th className="style-prymary">
                                            <div className="d-flex align-items-center justify-content-center">
                                              <img
                                                src={`${assets}/images/added/memory.png`}
                                                alt="cpu"
                                              />
                                              <span className="ms-2">
                                                Memory
                                              </span>
                                            </div>
                                          </th>
                                          <th className="style-prymary">
                                            <div className="d-flex align-items-center justify-content-center">
                                              <img
                                                src={`${assets}/images/added/transfer.png`}
                                                alt="cpu"
                                              />
                                              <span className="ms-2">
                                                Transfer
                                              </span>
                                            </div>
                                          </th>
                                          <th className="style-prymary">
                                            <div className="d-flex align-items-center justify-content-center">
                                              <img
                                                src={`${assets}/images/added/location.png`}
                                                alt="cpu"
                                              />
                                              <span className="ms-2">
                                                Location
                                              </span>
                                            </div>
                                          </th>
                                          <th className="style-prymary">
                                            <div className="d-flex align-items-center justify-content-center">
                                              <img
                                                src={`${assets}/images/added/timer.png`}
                                                alt="cpu"
                                              />
                                              <span className="ms-2">
                                                Setup
                                              </span>
                                            </div>
                                          </th>
                                          <th className="style-prymary">
                                            <div className="d-flex align-items-center justify-content-center">
                                              {/* <img
                                              src={`${assets}/images/added/price.png`}
                                              alt="cpu"
                                            /> */}
                                              <span>{currency.prefix}</span>
                                              <span className="ms-2">
                                                Price/mo
                                              </span>
                                            </div>
                                          </th>
                                          <th></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {dedicatedplans.map(
                                          (dedicatedplan, index) => (
                                            <tr key={index}>
                                              <td>{dedicatedplan.processor}</td>
                                              <td>{dedicatedplan.drives} </td>
                                              <td>{dedicatedplan.ram}</td>
                                              <td>
                                                {dedicatedplan.description}
                                              </td>
                                              <td>{dedicatedplan.location}</td>
                                              <td>
                                                <span className="min">
                                                  <i className="fa-solid fa-clock"></i>
                                                  <span>{dedicatedplan.setup ? `${dedicatedplan.setup}` : "min"}</span>
                                                </span>
                                              </td>
                                              <td>
                                                {currency.prefix}{" "}
                                                {dedicatedplan.offer_price}{" "}
                                                <span className="price-line">
                                                  {dedicatedplan.price}
                                                </span>{" "}
                                                /mo
                                              </td>
                                              <td>
                                                <Link
                                                  className="btn-default color-blacked"
                                                  href={dedicatedplan.plan_url}
                                                >
                                                  Order Now
                                                </Link>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}
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
                          <div className="row row--15">
                            <div className="col-lg-12">
                              <div className="rainbow-compare-table style-1 table-style mt-5">
                                <div className="table-responsive-wrapper">
                                  <table className="table-responsive">
                                    <thead>
                                      <tr>
                                        <th className="style-prymary">
                                          <div className="d-flex align-items-center justify-content-center">
                                            <img
                                              src={`${assets}/images/added/cpu.png`}
                                              alt="cpu"
                                            />
                                            <span className="ms-2">CPU</span>
                                          </div>
                                        </th>
                                        <th className="style-prymary">
                                          <div className="d-flex align-items-center justify-content-center">
                                            <img
                                              src={`${assets}/images/added/storage.png`}
                                              alt="cpu"
                                            />
                                            <span className="ms-2">
                                              Storage
                                            </span>
                                          </div>
                                        </th>
                                        <th className="style-prymary">
                                          <div className="d-flex align-items-center justify-content-center">
                                            <img
                                              src={`${assets}/images/added/memory.png`}
                                              alt="cpu"
                                            />
                                            <span className="ms-2">Memory</span>
                                          </div>
                                        </th>
                                        <th className="style-prymary">
                                          <div className="d-flex align-items-center justify-content-center">
                                            <img
                                              src={`${assets}/images/added/transfer.png`}
                                              alt="cpu"
                                            />
                                            <span className="ms-2">
                                              Transfer
                                            </span>
                                          </div>
                                        </th>
                                        <th className="style-prymary">
                                          <div className="d-flex align-items-center justify-content-center">
                                            <img
                                              src={`${assets}/images/added/location.png`}
                                              alt="cpu"
                                            />
                                            <span className="ms-2">
                                              Location
                                            </span>
                                          </div>
                                        </th>
                                        <th className="style-prymary">
                                          <div className="d-flex align-items-center justify-content-center">
                                            <img
                                              src={`${assets}/images/added/timer.png`}
                                              alt="cpu"
                                            />
                                            <span className="ms-2">Setup</span>
                                          </div>
                                        </th>
                                        <th className="style-prymary">
                                          <div className="d-flex align-items-center justify-content-center">
                                            {/* <img
                                              src={`${assets}/images/added/price.png`}
                                              alt="cpu"
                                            /> */}
                                            <span>{currency.prefix}</span>
                                            <span className="ms-2">
                                              Price/yr
                                            </span>
                                          </div>
                                        </th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {dedicatedplans.map(
                                        (dedicatedplan, index) => (
                                          <tr key={index}>
                                            <td>{dedicatedplan.processor}</td>
                                            <td>{dedicatedplan.drives} </td>
                                            <td>{dedicatedplan.ram}</td>
                                            <td>{dedicatedplan.description}</td>
                                            <td>{dedicatedplan.location}</td>
                                            <td>
                                              <span className="min">
                                                <i className="fa-solid fa-clock"></i>
                                                <span>{dedicatedplan.setup ? `${dedicatedplan.setup}` : "min"}</span>
                                              </span>
                                            </td>
                                            <td>
                                              {currency.prefix}{" "}
                                              {dedicatedplan.price_annually}{" "}
                                              <span className="price-line">
                                                {parseInt(dedicatedplan.price * 12)}
                                              </span>{" "}
                                              /yr
                                            </td>
                                            <td>
                                              <Link
                                                className="btn-default color-blacked"
                                                href={dedicatedplan.plan_url}
                                              >
                                                Order Now
                                              </Link>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                        <span className="theme-gradient">Features</span>
                      </h4>
                      <h2 className="title w-600 mb--20">
                        These features come <br /> standard in all of our plans
                      </h2>
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
                        fit for your application's deployment needs. <br /> Get
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
};

export default DedicatedPlan;
