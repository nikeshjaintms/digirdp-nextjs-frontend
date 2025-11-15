"use client";
import React, { Fragment, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Head from "next/head"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSkeleton from "@/components/BlogSkeleton";
import "../app/styles/skeleton.css";
import Testimonial from "./slider/testimonial";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sal from "sal.js";
import "sal.js/dist/sal.css";
import BlogSlider from "./slider/BlogSlider";
import FeatureSlider from "./slider/FeatureSlider";
import Location from "../pages/sales-page/Location";
import Categories from "./slider/Categories";
import axios from "axios";
const assets = "/assets";
import { convertCurrency } from "../utils/currencyUtils";
import { useCurrency } from "@/context/CurrencyProvider";
import { useConfig  } from "@/context/ConfigProvider"
import $ from "jquery";

const HomePage = () => {
  useEffect(() => {
    sal();
  }, []);

  const [winrdp, setWinRDP] = useState([]);
  const [cloudvps, setCloudVPS] = useState([]);
  const [dedicated, setdedicated] = useState([]);
  const { currency } = useCurrency();
  const { config } = useConfig();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        if (currency) {
          setSelectedSymbol(currency.prefix);
          setSelectedCurrency(currency.suffix);
        }
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/triooffer`,
          { signal: abortController.signal }
        );

        const convertedPlans = async (plans) => {
          return await Promise.all(
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
        };

        setWinRDP(await convertedPlans(response.data[0]));
        setCloudVPS(await convertedPlans(response.data[2]));
        setdedicated(await convertedPlans(response.data[1]));
        setLoading(false);
        z;
      } catch (error) {
        if (error.name !== "AbortError") {
          //console.log("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort(); // Cancel the request if the component unmounts
    };
  }, [currency]);

  const [btnTexts, setBtnTexts] = useState({});
  // const [couponCode, setCouponCode] = useState(vps?.couponCode || "STEALDEAL20");

  // Update couponCode whenever vps.couponCode changes, ensuring vps is defined
  // useEffect(() => {
  //     setCouponCode(vps?.couponCode || "STEALDEAL20");
  // }, [vps?.couponCode]);

  // Handle copying of coupon code
  const handleCopy = (promocode, index) => {
    try {
      navigator.clipboard.writeText(promocode).then(() => {
        setBtnTexts((prev) => ({ ...prev, [index]: "COPIED!" }));
        setTimeout(() => {
          setBtnTexts((prev) => ({ ...prev, [index]: "Copy Code" }));
        }, 3000);
      });
    } catch (error) {
      console.error("Failed to copy the code", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const $ = require("jquery");

      var animationDelay = 2500,
        barAnimationDelay = 3800,
        barWaiting = barAnimationDelay - 3000,
        lettersDelay = 50,
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800,
        revealDuration = 600,
        revealAnimationDelay = 1500;

      initHeadline();

      function initHeadline() {
        singleLetters($(".cd-headline.letters").find("b"));
        animateHeadline($(".cd-headline"));
      }

      function singleLetters($words) {
        $words.each(function () {
          var word = $(this),
            letters = word.text().split(""),
            selected = word.hasClass("is-visible");
          for (let i in letters) {
            if (word.parents(".rotate-2").length > 0)
              letters[i] = "<em>" + letters[i] + "</em>";
            letters[i] = selected
              ? '<i class="in">' + letters[i] + "</i>"
              : "<i>" + letters[i] + "</i>";
          }
          var newLetters = letters.join("");
          word.html(newLetters).css("opacity", 1);
        });
      }

      function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function () {
          var headline = $(this);

          if (headline.hasClass("loading-bar")) {
            duration = barAnimationDelay;
            setTimeout(function () {
              headline.find(".cd-words-wrapper").addClass("is-loading");
            }, barWaiting);
          } else if (headline.hasClass("clip")) {
            var spanWrapper = headline.find(".cd-words-wrapper"),
              newWidth = spanWrapper.width() + 10;
            spanWrapper.css("width", newWidth);
          } else if (!headline.hasClass("type")) {
            var words = headline.find(".cd-words-wrapper b"),
              width = 0;
            words.each(function () {
              var wordWidth = $(this).width();
              if (wordWidth > width) width = wordWidth;
            });
            headline.find(".cd-words-wrapper").css("width", width);
          }

          setTimeout(function () {
            hideWord(headline.find(".is-visible").eq(0));
          }, duration);
        });
      }

      function hideWord($word) {
        var nextWord = takeNext($word);
        switchWord($word, nextWord);
        setTimeout(function () {
          hideWord(nextWord);
        }, animationDelay);
      }

      function takeNext($word) {
        return !$word.is(":last-child")
          ? $word.next()
          : $word.parent().children().eq(0);
      }

      function switchWord($oldWord, $newWord) {
        $oldWord.removeClass("is-visible").addClass("is-hidden");
        $newWord.removeClass("is-hidden").addClass("is-visible");
      }
    }
  }, []);

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

  console.log("config ",config)

  return (
    <Fragment>
            <Head>
                {/* Load header script only when config exists */}
                {config?.code_box_header && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: config.code_box_header,
                        }}
                    />
                )}

                {/* Keywords (fallback to empty string to avoid errors) */}
                <meta name="keywords" content={config?.keywords ?? ""} />
            </Head>
      <Header />

      {/* <div className="max-w-[1360px] mx-auto"> */}
      {/* main top */}
      <div className="slider-area slider-style-1 variation-default slider-bg-image bg-banner1 slider-bg-shape">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="inner text-center mt--140">
                <h1 className="title display-one mb-0">
                  Unlock the power of
                  <br />
                  <span className="header-caption">
                    <span className="cd-headline rotate-1">
                      <span
                        className="cd-words-wrapper"
                        style={{ textAlign: "center", width: "auto" }}
                      >
                        <b className="theme-gradient is-visible">Premium RDP</b>
                        <b className="theme-gradient is-hidden">Cloud VPS</b>
                        <b className="theme-gradient is-hidden">Servers</b>
                      </span>
                    </span>
                  </span>
                  <br />
                designed for top-tier performance.</h1>
                <p className="description">
                  Get RDP & Cloud VPS So Fast, You’ll Wonder If It’s Magic –
                  Spoiler: It’s Not{" "}
                </p>
                <Link className="btn-default @@btnclassName" href="/contact">
                  Contact Us Now
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

      {/* <!-- Start Brand Area --> */}
      <div className="rainbow-brand-area rainbow-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title rating-title text-center sal-animate"
                data-sal="slide-up"
                data-sal-duration="700"
                data-sal-delay="100"
              >
                <p className="b1 mb--0 small-title">
                  Supported by industry-leading data centers, cutting-edge
                  networking infrastructure, and top-tier hardware providers.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mt--10">
              <div className="brand-slider-container">
                <ul className="brand-list brand-style-2 slider-brand">
                  <li className="slide-single-layout">
                    <Link href="/">
                      <img src={`${assets}/images/added/1d-light.png`} className="logo-light" alt="Brand" />
                      <img src={`${assets}/images/added/1d.png`} className="logo-dark" alt="Brand" />
                    </Link>
                  </li>
                  <li className="slide-single-layout">
                    <Link href="/">
                      <img src={`${assets}/images/added/2d-light.png`} className="logo-light"  alt="Brand" />
                      <img src={`${assets}/images/added/2d.svg`} className="logo-dark" alt="Brand" />
                    </Link>
                  </li>
                  <li className="slide-single-layout">
                    <Link href="/">
                      <img src={`${assets}/images/added/3d-light.png`} className="logo-light" alt="Brand" />
                      <img src={`${assets}/images/added/3d.png`} className="logo-dark" alt="Brand" />
                    </Link>
                  </li>
                  <li className="slide-single-layout">
                    <Link href="/">
                      <img src={`${assets}/images/added/EDR-Image.png`} className="logo-light" alt="Brand" />
                      <img src={`${assets}/images/added/evocative.png`} className="logo-dark" alt="Brand" />
                    </Link>
                  </li>
                  <li className="slide-single-layout">
                    <Link href="/">
                      <img src={`${assets}/images/added/5d.png`} className="logo-light" alt="Brand" />
                      <img src={`${assets}/images/added/5d-dark.png`} className="logo-dark" alt="Brand" />
                    </Link>
                  </li>
                  <li className="slide-single-layout">
                    <Link href="/">
                      <img src={`${assets}/images/added/6d-light.png`} className="logo-light" alt="Brand" />
                      <img src={`${assets}/images/added/6d.png`} className="logo-dark" alt="Brand" />
                    </Link>
                  </li>
                  <li className="slide-single-layout">
                    <Link href="/">
                      <img src={`${assets}/images/added/7d-light.png`} className="logo-light" alt="Brand" />
                      <img src={`${assets}/images/added/7d.svg`} className="logo-dark" alt="Brand" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Start Tab__Style--one Area  --> */}
      <div className="rainbow-service-area rainbow-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center pb--60"
                data-sal="slide-up"
                data-sal-duration="700"
                data-sal-delay="100"
              >
                <h4 className="subtitle">
                  <span className="theme-gradient">We Offer</span>
                </h4>
                <h2 className="title mb--0">The Best Services</h2>
              </div>
            </div>
          </div>

          <div className="row row--30 align-items-center">
            <div className="col-lg-12">
              <div className="rainbow-default-tab style-three generator-tab-defalt">
                <ul className="nav nav-tabs tab-button" role="tablist">
                  <li className="nav-item tabs__tab " role="presentation">
                    <button
                      className="nav-link rainbow-gradient-btn without-shape-circle active"
                      id="dash-generator-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#dash-generate"
                      type="button"
                      role="tab"
                      aria-controls="dash-generate"
                      aria-selected="false"
                    >
                      <span className="generator-icon">
                        <img
                          src={`${assets}/images/added/dash.svg`}
                          alt="Vedio Generator Icon"
                        />
                        Dashboard
                      </span>
                      <span className="border-bottom-style"></span>
                    </button>
                  </li>
                  <li className="nav-item tabs__tab " role="presentation">
                    <button
                      className="nav-link rainbow-gradient-btn without-shape-circle"
                      id="video-generator-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#video-generate"
                      type="button"
                      role="tab"
                      aria-controls="video-generate"
                      aria-selected="false"
                    >
                      <span className="generator-icon">
                        <img
                          src={`${assets}/images/added/Safe.svg`}
                          alt="Vedio Generator Icon"
                        />
                        Date Safe & Secure
                      </span>
                      <span className="border-bottom-style"></span>
                    </button>
                  </li>
                  <li className="nav-item tabs__tab" role="presentation">
                    <button
                      className="nav-link rainbow-gradient-btn without-shape-circle "
                      id="audio-generator-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#audio-generate"
                      type="button"
                      role="tab"
                      aria-controls="audio-generate"
                      aria-selected="true"
                    >
                      <span className="generator-icon">
                        <img
                          src={`${assets}/images/added/fast.svg`}
                          alt="Vedio Generator Icon"
                        />
                        Fast & Reliable
                      </span>
                      <span className="border-bottom-style"></span>
                    </button>
                  </li>
                  <li className="nav-item tabs__tab " role="presentation">
                    <button
                      className="nav-link rainbow-gradient-btn without-shape-circle"
                      id="photo-generator-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#photo-generate"
                      type="button"
                      role="tab"
                      aria-controls="photo-generate"
                      aria-selected="false"
                    >
                      <span className="generator-icon">
                        <img
                          src={`${assets}/images/added/24-support.svg`}
                          alt="Vedio Generator Icon"
                        />
                        24/7 Expert Support
                      </span>
                      <span className="border-bottom-style"></span>
                    </button>
                  </li>
                </ul>

                <div className="rainbow-tab-content tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="dash-generate"
                    role="tabpanel"
                    aria-labelledby="video-generator-tab"
                  >
                    <div className="inner">
                      <div className="row">
                        <div className="col-xl-6 col-md-6 col-12">
                          <div className="section-title">
                            <h2 className="title">
                              The Ultimate DigiRDP Dashboard
                            </h2>
                            <p>
                              The DigiRDP Dashboard is designed for a seamless,
                              user-friendly experience, helping you manage your
                              account efficiently in one place:
                            </p>
                            <div className="features-section">
                              <ul className="list-style--1">
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>{" "}
                                  Services:{" "}
                                  <span>Easily manage active services.</span>{" "}
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>{" "}
                                  Quotes:{" "}
                                  <span>Track and review tailored quotes.</span>
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>{" "}
                                  Tickets:{" "}
                                  <span>
                                    Resolve support requests efficiently.
                                  </span>{" "}
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>{" "}
                                  Unpaid Bills:{" "}
                                  <span>
                                    Stay updated on outstanding payments.
                                  </span>{" "}
                                </li>
                              </ul>
                            </div>
                            <div className="read-more">
                              <Link
                                className="btn-default color-blacked"
                                href="/rdp-plan"
                              >
                                Start Exploring Now{" "}
                                <i className="fa-sharp fa-solid fa-arrow-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-md-6 col-12 mt_md--30 mt_sm--30">
                          <div className="export-img">
                            <div className="inner-without-padding">
                              <div className="export-img img-bg-shape">
                                <img
                                  className="logo-light"
                                  src={`${assets}/images/added/main.png`}
                                  alt="Chat example"
                                />
                                <img
                                  className="logo-dark"
                                  src={`${assets}/images/added/main-light.png`}
                                  alt="ChatBot Logo"
                                />
                                <div className="image-shape"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="video-generate"
                    role="tabpanel"
                    aria-labelledby="video-generator-tab"
                  >
                    <div className="inner">
                      <div className="row">
                        <div className="col-xl-6 col-md-6 col-12">
                          <div className="section-title">
                            <h2 className="title"> Date Safe & Secure</h2>
                            <p>
                              Say goodbye to the frustration of security
                              breaches! With DigiRDP’s encrypted and fully
                              secure servers, you can confidently manage your
                              data without worry.{" "}
                            </p>
                            <p>
                              Experience seamless, protected remote working like
                              never before!
                            </p>
                            <div className="features-section">
                              <ul className="list-style--1">
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Encrypted Servers
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Attack Protection
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Secure Management
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Reliable Encryption
                                </li>
                              </ul>
                            </div>
                            <div className="read-more">
                              <Link
                                className="btn-default color-blacked"
                                href="/dedicated-server"
                              >
                                Start Exploring Now{" "}
                                <i className="fa-sharp fa-solid fa-arrow-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-md-6 col-12 mt_md--30 mt_sm--30">
                          <div className="export-img">
                            <div className="inner-without-padding">
                              <div className="export-img img-bg-shape">
                                <img
                                  src={`${assets}/images/added/secure.jpg`}
                                  alt="Chat example"
                                />
                                <div className="image-shape"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade "
                    id="audio-generate"
                    role="tabpanel"
                    aria-labelledby="audio-generator-tab"
                  >
                    <div className="inner">
                      <div className="row">
                        <div className="col-xl-6 col-md-6 col-12">
                          <div className="section-title">
                            <h2 className="title">Fast & Reliable</h2>
                            <p>
                              We exclusively use SSDs on our RDP servers,
                              offering speeds up to ten times faster than
                              traditional RDP or HDD solutions.{" "}
                            </p>
                            <p>
                              Experience top-tier performance and unmatched
                              reliability with Solid-State Drives, ensuring the
                              best for your remote work needs.
                            </p>
                            <div className="features-section">
                              <ul className="list-style--1">
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  SSD Performance
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Speed & Efficiency
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  High Reliability
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Optimal Speed
                                </li>
                              </ul>
                            </div>
                            <div className="read-more">
                              <Link
                                className="btn-default color-blacked"
                                href="/cloud-vps"
                              >
                                Start Exploring Now{" "}
                                <i className="fa-sharp fa-solid fa-arrow-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-md-6 col-12 mt_md--30 mt_sm--30">
                          <div className="export-img">
                            <div className="inner-without-padding">
                              <div className="export-img img-bg-shape">
                                <img
                                  className="shape-dark"
                                  src={`${assets}/images/added/fast.jpg`}
                                  alt="Chat example"
                                />
                                <img
                                  className="shape-light"
                                  src={`${assets}/images/added/fast.jpg`}
                                  alt="Chat example"
                                />
                                <div className="image-shape"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="photo-generate"
                    role="tabpanel"
                    aria-labelledby="photo-generator-tab"
                  >
                    <div className="inner">
                      <div className="row">
                        <div className="col-xl-6 col-md-6 col-12">
                          <div className="section-title">
                            <h2 className="title">24/7 Expert Support</h2>
                            <p>
                              Count on our trusted support team, available
                              around the clock to resolve any issues with your
                              RDP. Whether it's a minor hiccup or a major
                              technical challenge, we’re always here to provide
                              fast, reliable assistance so you can keep working
                              without interruptions.
                            </p>
                            <div className="features-section">
                              <ul className="list-style--1">
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Always Available
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Quick Assistance
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Professional Help
                                </li>
                                <li>
                                  <i className="fa-regular fa-circle-check"></i>
                                  Round-the-Clock Support
                                </li>
                              </ul>
                            </div>
                            <div className="read-more">
                              <Link
                                className="btn-default color-blacked"
                                href="/private_rdp"
                              >
                                Start Exploring Now{" "}
                                <i className="fa-sharp fa-solid fa-arrow-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-md-6 col-12 mt_md--30 mt_sm--30">
                          <div className="export-img">
                            <div className="inner-without-padding">
                              <div className="export-img img-bg-shape">
                                <img
                                  src={`${assets}/images/added/expert.jpg`}
                                  alt="Chat example"
                                />
                                <div className="image-shape"></div>
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
        </div>
      </div>

      {/* <!-- Start Service__Style--one Area  --> */}
      <div className="rainbow-service-area rainbow-section-gap rainbow-section-gapBottom-big">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-left">
                <h4 className="subtitle">
                  <span className="theme-gradient">Assisting individuals</span>
                </h4>
                <h2 className="title mb--60">Our Features</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="service-wrapper rainbow-service-slider-actvation slick-grid-15 rainbow-slick-dot rainbow-gradient-arrows">
                <FeatureSlider />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Start Advanced Tab area --> */}
      <div className="rainbow-advance-tab-area aiwave-bg-gradient rainbow-section-gap-big">
        <div className="container">
          <div className="html-tabs" data-tabs="true">
            <div className="row row--30">
              <div className="col-lg-12">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active advance-tab-content-1 right-top"
                    id="home-3"
                    role="tabpanel"
                    aria-labelledby="home-tab-3"
                  >
                    <div className="rainbow-splite-style">
                      <div className="split-wrapper">
                        <div className="row g-0 radius-10 align-items-center justify-content-between">
                          <div className="col-xl-5 col-sm-5 col-12">
                            <div className="thumbnail">
                              <img
                                className="radius logo-light"
                                src={`${assets}/images/added/dashboard.png`}
                                alt="split Images"
                              />
                              <img
                                className="radius logo-dark"
                                src={`${assets}/images/added/dashboard-light.png`}
                                alt="split Images"
                              />
                            </div>
                          </div>
                          <div className="col-xl-7 col-sm-6 col-12">
                            <div className="split-inner">
                              <div className="subtitle">
                                <span className="theme-gradient">
                                  Get Started!
                                </span>
                              </div>
                              <h2
                                className="title sal-animate"
                                data-sal="slide-up"
                                data-sal-duration="400"
                                data-sal-delay="200"
                              >
                                Here's What You Get
                              </h2>
                              <p
                                className="description sal-animate"
                                data-sal="slide-up"
                                data-sal-duration="400"
                                data-sal-delay="300"
                              >
                                When you purchase any RDP plan, you gain access
                                to a suite of tools and resources designed to
                                help you work more efficiently.
                              </p>
                              <div
                                className="view-more-button mt--35 sal-animate"
                                data-sal="slide-up"
                                data-sal-duration="400"
                                data-sal-delay="400"
                              >
                                <Link
                                  className="btn-default color-blacked"
                                  href="/rdp-plan"
                                >
                                  Try It Now{" "}
                                  <i className="fa-sharp fa-light fa-arrow-right ml--5"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mt--60">
                <div className="advance-tab-button advance-tab-button-1 right-top">
                  <ul className="nav nav-tabs tab-button-list">
                    <li className="col-lg-3 nav-item" role="presentation">
                      <Link href="/rdp-plan" className="nav-link tab-button ">
                        <div className="tab">
                          <div className="count-text">
                            <span className="theme-gradient">01</span>
                          </div>
                          <h4 className="title">Windows RDP </h4>
                          <p className="description sal-animate">
                            Looking for RDP? You’re in the right place! We
                            provide customized Windows RDP solutions tailored to
                            your needs, regardless of the scale.{" "}
                          </p>
                        </div>
                      </Link>
                    </li>

                    <li className="col-lg-3 nav-item" role="presentation">
                      <Link
                        href="/dedicated-plan"
                        className="nav-link tab-button"
                      >
                        <div className="tab">
                          <div className="count-text">
                            <span className="theme-gradient">02</span>
                          </div>
                          <h4 className="title">Dedicated Servers</h4>
                          <p className="description sal-animate">
                            Experience top-notch performance with our SSD
                            storage, high-memory variants, and the latest
                            processors, ensuring your servers deliver the best
                            results.{" "}
                          </p>
                        </div>
                      </Link>
                    </li>

                    <li className="col-lg-3 nav-item" role="presentation">
                      <Link href="/cloud-vps-plan" className="nav-link tab-button">
                        <div className="tab">
                          <div className="count-text">
                            <span className="theme-gradient">03</span>
                          </div>
                          <h4 className="title">Cloud VPS</h4>
                          <p className="description sal-animate">
                            Our Cloud VPS solutions are perfect for websites,
                            production environments, or pre-production setups,
                            offering flexibility and reliability.{" "}
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="col-lg-3 nav-item" role="presentation">
                      <Link href="/contact" className="nav-link tab-button">
                        <div className="tab">
                          <div className="count-text">
                            <span className="theme-gradient">04</span>
                          </div>
                          <h4 className="title">24 X 7 Support</h4>
                          <p className="description sal-animate">
                            Enjoy uninterrupted service with our round-the-clock
                            support, ensuring zero downtime or issues for your
                            servers.{" "}
                          </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-shape">
          <img src={`${assets}/images/bg/split-bg-shape.png`} alt="Bg Shape" />
        </div>
      </div>

      {/* <!-- Start Service__Style--one Area  --> */}
      <div className="rainbow-service-area rainbow-section-gap rainbow-section-gapBottom-big">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-left">
                <h4 className="subtitle">
                  <span className="theme-gradient">Tailored Services</span>
                </h4>
                <h2 className="title mb--60">Explore Our Categories</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="service-wrapper rainbow-service-slider-actvation rainbow-slick-dot rainbow-gradient-arrows">
                <Categories />
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
                  <h4 className="title sal-animate">
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

      {/* <!-- Pricing Part --> */}
      <div className="aiwave-pricing-area wrapper rainbow-section-gap-big">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h4 className="subtitle">
                  <span className="theme-gradient">Pricing</span>
                </h4>
                <h2 className="title w-600 mb--40">
                  Pricing plans for everyone
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
              <div className="row">
                <div className="col-lg-12">
                  <nav className="aiwave-tab">
                    <div
                      className="tab-btn-grp nav nav-tabs text-center justify-content-center"
                      id="nav-tab"
                      role="tablist"
                    >
                      <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="false"
                      >
                        Popular Cloud VPS Plans
                      </button>
                      <button
                        className="nav-link with-badge "
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="true"
                      >
                        Popular Dedicated Server Plans
                      </button>
                      <button
                        className="nav-link with-badge "
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-plan"
                        type="button"
                        role="tab"
                        aria-controls="nav-plan"
                        aria-selected="true"
                      >
                        Popular RDP Plans
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
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
                  {/* <h4 className="title w-600 mb--40 text-center">Explore to our smart Cloud VPS plans</h4> */}
                  <div className="row row--15 mt_dec--40">
                    {loading
                      ? Array.from({ length: 8 }).map((_, index) => (
                          <BlogSkeleton key={index} />
                        ))
                      : cloudvps.map((vps, index) => (
                          <div
                            key={index}
                            className="col-xl-4 col-lg-4 col-md-6 col-12 mt--40"
                          >
                            <div className={`rainbow-pricing style-aiwave`}>
                              <div className="pricing-table-inner">
                                <div className="pricing-top">
                                  <div className="pricing-header">
                                    <h4 className="title color-var-one">
                                      {vps.name}
                                    </h4>
                                    <div className="pricing">
                                      <span className="price-text">
                                        {currency.prefix}
                                        {vps.offer_price}
                                      </span>
                                      <span className="text d-flex">
                                        <span
                                          style={{
                                            textDecoration: "line-through",
                                          }}
                                        >
                                          {currency.prefix}
                                          {vps.price}
                                        </span>
                                        /Per Month
                                      </span>
                                    </div>
                                  </div>
                                  <div className="pricing-footer">
                                    <Link
                                      className="btn-default btn-border"
                                      href={vps.plan_url}
                                    >
                                      Buy Now
                                    </Link>
                                  </div>
                                  {vps.promocode ? (
                                    <div className="coupon-card">
                                      <div className="coupon-row">
                                        {/* Display the coupon code dynamically */}
                                        <span id="cpnCode">
                                          {vps.promocode}
                                        </span>

                                        {/* The Copy button */}
                                        <span
                                          id="cpnBtn"
                                          onClick={() =>
                                            handleCopy(vps.promocode, index)
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
                                          {vps.users} user
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.processor}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.cpu}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.traffic}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.os}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.ram}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.bandwidth}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          IP Address {vps.ip}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.drives}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.uptime} uptime
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.description}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.location}
                                        </li>
                                      </ul>
                                      <div className="rbt-show-more-btn">
                                        Show More
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="feature-badge"
                                style={{
                                  background: "#00ac69",
                                  color: " #fff",
                                }}
                              >
                                {vps.tag.charAt(0).toUpperCase() +
                                  vps.tag.slice(1).toLowerCase()}
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div className="row row--15 mt_dec--40">
                    {dedicated.map((dedicate, index) => (
                      <div
                        key={index}
                        className="col-xl-4 col-lg-4 col-md-6 col-12 mt--40"
                      >
                        <div className="rainbow-pricing style-aiwave">
                          <div className="pricing-table-inner">
                            <div className="pricing-top">
                              <div className="pricing-header">
                                <h4 className="title color-var-one">
                                  {dedicate.name}
                                </h4>
                                <div className="pricing">
                                  <span className="price-text">
                                    {currency.prefix}
                                    {dedicate.offer_price}
                                  </span>
                                  <span className="text d-flex">
                                    <span
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      {currency.prefix}
                                      {dedicate.price}
                                    </span>
                                    /Per Month
                                  </span>
                                </div>
                              </div>
                              <div className="pricing-footer">
                                <Link
                                  className="btn-default btn-border"
                                  href={dedicate.plan_url}
                                >
                                  Buy Now
                                </Link>
                              </div>
                              {dedicate.promocode ? (
                                <div className="coupon-card">
                                  <div className="coupon-row">
                                    {/* Display the coupon code dynamically */}
                                    <span id="cpnCode">
                                      {dedicate.promocode}
                                    </span>

                                    {/* The Copy button */}
                                    <span
                                      id="cpnBtn"
                                      onClick={() =>
                                        handleCopy(dedicate.promocode, index)
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
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.users} user
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.processor}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      Logical Cores: {dedicate.cpu}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.traffic}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.os}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.ram}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      IP Address{dedicate.ip}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.drives}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.uptime}uptime
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.description}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.location}
                                    </li>
                                    {/* <li><i className="fa-regular fa-circle-check"></i></li> */}
                                  </ul>
                                  <div className="rbt-show-more-btn">
                                    Show More
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="feature-badge"
                            style={{ background: "#00ac69", color: "#fff" }}
                          >
                            {dedicate.tag.charAt(0).toUpperCase() +
                              dedicate.tag.slice(1).toLowerCase()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="nav-plan"
                  role="tabpanel"
                  aria-labelledby="nav-plan-tab"
                >
                  <div className="row row--15 mt_dec--40">
                    {winrdp.map((rdp, index) => (
                      <div
                        key={index}
                        className="col-xl-4 col-lg-4 col-md-6 col-12 mt--40"
                      >
                        <div className="rainbow-pricing style-aiwave">
                          <div className="pricing-table-inner">
                            <div className="pricing-top">
                              <div className="pricing-header">
                                <h4 className="title color-var-one">
                                  {rdp.name}
                                </h4>
                                <div className="pricing">
                                  <span className="price-text">
                                    {currency.prefix}
                                    {rdp.offer_price}
                                  </span>
                                  <span className="text d-flex">
                                    <span
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      {currency.prefix}
                                      {rdp.price}
                                    </span>
                                    /Per Month
                                  </span>
                                </div>
                              </div>
                              <div className="pricing-footer">
                                <Link
                                  className="btn-default btn-border"
                                  href={rdp.plan_url}
                                >
                                  Buy Now
                                </Link>
                              </div>
                              {rdp.promocode ? (
                                <div className="coupon-card">
                                  <div className="coupon-row">
                                    {/* Display the coupon code dynamically */}
                                    <span id="cpnCode">{rdp.promocode}</span>

                                    {/* The Copy button */}
                                    <span
                                      id="cpnBtn"
                                      onClick={() =>
                                        handleCopy(rdp.promocode, index)
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
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.user} user
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.processor}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.cpu}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.free}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.os}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.ram}RAM
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      Bandwidth {rdp.bandwidth}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      IP Address {rdp.ip}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.storeage}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.uptime} uptime
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.user}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.description}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.location}
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
              <div className="row">
                <div className="col-lg-12">
                  <nav className="aiwave-tab">
                    <div
                      className="tab-btn-grp nav nav-tabs text-center justify-content-center"
                      id="nav-tab"
                      role="tablist"
                    >
                      <button
                        className="nav-link active"
                        id="nav-home1-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home1"
                        type="button"
                        role="tab"
                        aria-controls="nav-home1"
                        aria-selected="false"
                      >
                        Popular Cloud VPS Plans
                      </button>
                      <button
                        className="nav-link with-badge "
                        id="nav-profile1-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile1"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile1"
                        aria-selected="true"
                      >
                        Popular Dedicated Server Plans
                      </button>
                      <button
                        className="nav-link with-badge "
                        id="nav-profile1-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-plan1"
                        type="button"
                        role="tab"
                        aria-controls="nav-plan1"
                        aria-selected="true"
                      >
                        Popular RDP Plans
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
              <div
                className="tab-content p-0 bg-transparent border-0 border bg-light"
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
                    {loading
                      ? Array.from({ length: 8 }).map((_, index) => (
                          <BlogSkeleton key={index} />
                        ))
                      : cloudvps.map((vps, index) => (
                          <div
                            key={index}
                            className="col-xl-4 col-lg-4 col-md-6 col-12 mt--40"
                          >
                            <div className={`rainbow-pricing style-aiwave`}>
                              <div className="pricing-table-inner">
                                <div className="pricing-top">
                                  <div className="pricing-header">
                                    <h4 className="title color-var-one">
                                      {vps.name}
                                    </h4>
                                    <div className="pricing">
                                      <span className="price-text">
                                        {currency.prefix}
                                        {vps.price_annually || "wait"}{" "}
                                      </span>
                                      <span className="text d-flex">
                                        <span
                                          style={{
                                            textDecoration: "line-through",
                                          }}
                                        >
                                          {currency.prefix}
                                          {vps.price * 12 || "wait"}
                                        </span>
                                        /Per Year
                                      </span>
                                    </div>
                                  </div>
                                  <div className="pricing-footer">
                                    <Link
                                      className="btn-default btn-border"
                                      href={vps.plan_url}
                                    >
                                      Buy Now
                                    </Link>
                                  </div>
                                  {vps.promocode_annually ? (
                                    <div className="coupon-card">
                                      <div className="coupon-row">
                                        {/* Display the coupon code dynamically */}
                                        <span id="cpnCode">
                                          {vps.promocode_annually}
                                        </span>

                                        {/* The Copy button */}
                                        <span
                                          id="cpnBtn"
                                          onClick={() =>
                                            handleCopy(
                                              vps.promocode_annually,
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
                                          {vps.users} user
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.processor}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.cpu}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.traffic}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.os}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.ram}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.bandwidth}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          IP Address {vps.ip}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.drives}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.uptime} uptime
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.description}
                                        </li>
                                        <li>
                                          <i className="fa-regular fa-circle-check"></i>{" "}
                                          {vps.location}
                                        </li>
                                      </ul>
                                      <div className="rbt-show-more-btn">
                                        Show More
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="feature-badge"
                                style={{
                                  background: "#00ac69",
                                  color: " #fff",
                                }}
                              >
                                {vps.tag.charAt(0).toUpperCase() +
                                  vps.tag.slice(1).toLowerCase()}
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="nav-profile1"
                  role="tabpanel"
                  aria-labelledby="nav-profile1-tab"
                >
                  <div className="row row--15 mt_dec--40">
                    {dedicated.map((dedicate, index) => (
                      <div
                        key={index}
                        className="col-xl-4 col-lg-4 col-md-6 col-12 mt--40"
                      >
                        <div className="rainbow-pricing style-aiwave">
                          <div className="pricing-table-inner">
                            <div className="pricing-top">
                              <div className="pricing-header">
                                <h4 className="title color-var-one">
                                  {dedicate.name}
                                </h4>
                                <div className="pricing">
                                  <span className="price-text">
                                    {currency.prefix}
                                    {dedicate.price_annually || "wait"}
                                  </span>
                                  <span className="text d-flex">
                                    <span
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      {currency.prefix}
                                      {parseFloat(dedicate.price) * 12 ||
                                        "wait"}
                                    </span>
                                    /Per Year
                                  </span>
                                </div>
                              </div>
                              <div className="pricing-footer">
                                <Link
                                  className="btn-default btn-border"
                                  href={dedicate.plan_url}
                                >
                                  Buy Now
                                </Link>
                              </div>
                              {dedicate.promocode_annually ? (
                                <div className="coupon-card">
                                  <div className="coupon-row">
                                    {/* Display the coupon code dynamically */}
                                    <span id="cpnCode">
                                      {dedicate.promocode_annually}
                                    </span>

                                    {/* The Copy button */}
                                    <span
                                      id="cpnBtn"
                                      onClick={() =>
                                        handleCopy(
                                          dedicate.promocode_annually,
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
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.users} user
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.processor}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      Logical Cores: {dedicate.cpu}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.traffic}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.os}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.ram}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      IP Address{dedicate.ip}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.drives}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.uptime}uptime
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.description}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {dedicate.location}
                                    </li>
                                    {/* <li><i className="fa-regular fa-circle-check"></i></li> */}
                                  </ul>
                                  <div className="rbt-show-more-btn">
                                    Show More
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="feature-badge"
                            style={{ background: "#00ac69", color: "#fff" }}
                          >
                            {dedicate.tag.charAt(0).toUpperCase() +
                              dedicate.tag.slice(1).toLowerCase()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="nav-plan1"
                  role="tabpanel"
                  aria-labelledby="nav-plan1-tab"
                >
                  <div className="row row--15 mt_dec--40">
                    {winrdp.map((rdp, index) => (
                      <div
                        key={index}
                        className="col-xl-4 col-lg-4 col-md-6 col-12 mt--40"
                      >
                        <div className="rainbow-pricing style-aiwave">
                          <div className="pricing-table-inner">
                            <div className="pricing-top">
                              <div className="pricing-header">
                                <h4 className="title color-var-one">
                                  {rdp.name}
                                </h4>
                                <div className="pricing">
                                  <span className="price-text">
                                    {currency.prefix}
                                    {rdp?.price_annually || "wait"}
                                  </span>
                                  <span className="text d-flex">
                                    <span
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      {currency.prefix}
                                      {parseFloat(rdp.price) * 12 || "wait"}
                                    </span>
                                    /Per Year
                                  </span>
                                </div>
                              </div>
                              <div className="pricing-footer">
                                <Link
                                  className="btn-default btn-border"
                                  href={rdp.plan_url}
                                >
                                  Buy Now
                                </Link>
                              </div>
                              {rdp.promocode_annually ? (
                                <div className="coupon-card">
                                  <div className="coupon-row">
                                    {/* Display the coupon code dynamically */}
                                    <span id="cpnCode">
                                      {rdp.promocode_annually}
                                    </span>

                                    {/* The Copy button */}
                                    <span
                                      id="cpnBtn"
                                      onClick={() =>
                                        handleCopy(
                                          rdp.promocode_annually,
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
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.user} user
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.processor}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.cpu}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.free}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.os}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.ram}RAM
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      Bandwidth {rdp.bandwidth}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      IP Address {rdp.ip}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.storeage}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.uptime} uptime
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.user}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.description}
                                    </li>
                                    <li>
                                      <i className="fa-regular fa-circle-check"></i>
                                      {rdp.location}
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

      {/* testimonial */}
      <div className="rainbow-testimonial-area rainbow-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-left">
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
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <BlogSkeleton key={index} />
                ))
              ) : (
                <Testimonial />
              )}
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
              <div className="section-title text-left">
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
                {loading ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <BlogSkeleton key={index} />
                  ))
                ) : (
                  <BlogSlider />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End blog Area  --> */}
      {/* </div> */}
      <Location />

      <Footer />
    </Fragment>
  );
};

export default HomePage;
