"use client";
import React, { Fragment, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonial from "@/pages/slider/testimonial";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "sal.js/dist/sal.css";
import Promo from "@/pages/slider/Promo";
import Location from "@/pages/sales-page/Location";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const assets = "/assets";

const Career = () => {
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

    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [isExpanded3, setIsExpanded3] = useState(false);
    const [isExpanded4, setIsExpanded4] = useState(false);
    const [isExpanded5, setIsExpanded5] = useState(false);

    return (
        <Fragment>
            <Header />
            {/* main top */}

            {/* <!-- Start Pricing Area  --> */}
            <div className="main-content">
                {/* <!-- Start Breadcarumb area  --> */}
                <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-inner text-center">
                                    <h1 className="title h3">Careers at DigiRDP</h1>
                                    <p className="description b1">
                                        Step into a world of innovation and growth. At DigiRDP,
                                        we’re looking for passionate individuals to <br /> join our
                                        team and help revolutionize the cloud and VPS industry.
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
                                                <span className="theme-gradient">
                                                    Careers at DigiRDP
                                                </span>
                                            </h4>
                                            <h2 className="title mb--0">
                                                Empower Your Career with DigiRDP
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="row row--30 align-items-center">
                                    <div className="col-lg-6">
                                        <p>
                                        Join DigiRDP and be part of a forward-thinking team dedicated to transforming the cloud and VPS industry. If you're passionate about innovation and technology, this is your chance to grow with us and make an impact.
                                        </p>
                                        <h5>Why Work with Us?</h5>
                                        <ol>
                                            <li className="ol-li">Innovative and Collaborative Culture</li>
                                            <p>At DigiRDP, we encourage creativity and collaboration. Our work environment supports new ideas and innovation, allowing you to take initiative and contribute to impactful solutions in the cloud and VPS space.</p>

                                            <li className="ol-li">Career Growth and Development</li>
                                            <p>We are committed to your personal and professional development. With access to training programs, certifications, and mentorship opportunities, you’ll continuously evolve in your field. Plus, we offer a dedicated **Learning and Development budget** to support your growth.</p>

                                            <li className="ol-li">Global Opportunities</li>
                                            <p>As part of our global team, you’ll work on exciting projects that have a worldwide impact, engaging with clients and stakeholders across various regions.</p>
                                        </ol>
                                        
                                    </div>
                                    <div className="col-lg-6">
                                        <div>
                                            <img
                                                src={`${assets}/images/added/career.svg`}
                                                alt="Brand"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <h5>Exclusive Perks</h5>
                                        <p>We believe in rewarding hard work and promoting a healthy work-life balance. Enjoy company trips, team-building activities, and regular social events. Our Learning and Development budget allows you to invest in courses, workshops, or conferences that help you stay ahead in your field.</p>
                                        <p>Ready to take your career to new heights? Join DigiRDP and be part of our exciting journey today!</p>
                                        <h5>Rewards & Benefits</h5>
                                        <p>At DigiRDP, we prioritize the well-being and long-term security of our employees. Along with comprehensive health insurance, including medical, dental, and vision coverage, we also provide Employee State Insurance (ESI) and Provident Fund (PF) benefits to support your financial future. In addition, we offer a Gratuity program, ensuring that you are rewarded for your dedicated service over time. Our benefits package is designed to give you peace of mind, allowing you to focus on your career growth and personal development while securing your health and future.</p>
                                    </div>
                                </div>
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
                                                truest 800,000+ HIGHLY PRODUCTIVE Company
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mt--10">
                                        <div className="brand-slider-container">
                                            <ul className="brand-list brand-style-2 slider-brand">
                                                <li className="slide-single-layout">
                                                    <a href="/">
                                                        <img
                                                            src={`${assets}/images/added/1d.png`}
                                                            alt="Brand"
                                                        />
                                                    </a>
                                                </li>
                                                <li className="slide-single-layout">
                                                    <a href="/">
                                                        <img
                                                            src={`${assets}/images/added/2d.svg`}
                                                            alt="Brand"
                                                        />
                                                    </a>
                                                </li>
                                                <li className="slide-single-layout">
                                                    <a href="/">
                                                        <img
                                                            src={`${assets}/images/added/3d.png`}
                                                            alt="Brand"
                                                        />
                                                    </a>
                                                </li>
                                                <li className="slide-single-layout">
                                                    <a href="/">
                                                        <img
                                                            src={`${assets}/images/added/4d.webp`}
                                                            alt="Brand"
                                                        />
                                                    </a>
                                                </li>
                                                <li className="slide-single-layout">
                                                    <a href="/">
                                                        <img
                                                            src={`${assets}/images/added/5d.png`}
                                                            alt="Brand"
                                                        />
                                                    </a>
                                                </li>
                                                <li className="slide-single-layout">
                                                    <a href="/">
                                                        <img
                                                            src={`${assets}/images/added/6d.png`}
                                                            alt="Brand"
                                                        />
                                                    </a>
                                                </li>
                                                <li className="slide-single-layout">
                                                    <a href="/">
                                                        <img
                                                            src={`${assets}/images/added/7d.svg`}
                                                            alt="Brand"
                                                        />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Start Features Area --> */}
                        <div className="rainbow-testimonial-area rainbow-section-gap">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12">
                                        <div
                                            className="section-title text-center"
                                            data-sal-duration="400"
                                            data-sal-delay="150"
                                        >
                                            <h4 className="subtitle">
                                                <span className="theme-gradient"></span>
                                            </h4>
                                            <h2 className="title w-600 mb--20">Open Positions</h2>
                                            <p>
                                                There are several plans which includes Windows RDP,
                                                Cloud VPS and Dedicated <br /> servers which will make
                                                the deployement of your application more easier
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 mt--60">
                                        <ul class="job-list">
                                            <li class="job-preview">
                                                <div className="div-career">
                                                    <div class="content float-left">
                                                        <h5>Full-Time, Day shift : 9:30 AM - 6:30 PM</h5>
                                                        <h4 class="job-title">
                                                           Linux System Administrator {" "}
                                                            <p> Posted by DigiRDP, LLC</p>
                                                        </h4>
                                                    </div>
                                                    <div className="header-btn">
                                                        <a
                                                            className="rainbow-gradient-btn"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                            href="https://www.linkedin.com/company/digirdp-llc/jobs/"
                                                        >
                                                            <span>Apply</span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="job-description">
                                                    <h5
                                                        className="company"
                                                        onClick={() => setIsExpanded1(!isExpanded1)}
                                                        style={{
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        Job Description
                                                        <span style={{ marginLeft: "8px" }}>
                                                            {isExpanded1 ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            )}
                                                        </span>
                                                    </h5>
                                                    {isExpanded1 && (
                                                        <p>
                                                            We are seeking a Linux Administrator Manager for a full-time remote role. 
                                                            The ideal candidate will oversee Linux system administration tasks, manage technical operations, resolve complex technical issues, and lead patch management processes. 
                                                            This role requires excellent leadership, technical expertise, and the ability to thrive in a fast-paced environment. 
                                                        </p>
                                                    )}
                                                </div>
                                            </li>
                                            <li class="job-preview">
                                                <div className="div-career">
                                                    <div class="content float-left">
                                                        <h5>Full-Time, Day shift : 9:30 AM - 6:30 PM</h5>
                                                        <h4 class="job-title">
                                                            Customer Support Executive{" "}
                                                            <p> Posted by DigiRDP, LLC</p>
                                                        </h4>
                                                    </div>
                                                    <div className="header-btn">
                                                        <a
                                                            className="rainbow-gradient-btn"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            href="https://www.linkedin.com/company/digirdp-llc/jobs/"
                                                        >
                                                            <span>Apply</span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="job-description">
                                                    <h5
                                                        className="company"
                                                        onClick={() => setIsExpanded2(!isExpanded2)}
                                                        style={{
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        Job Description
                                                        <span style={{ marginLeft: "8px" }}>
                                                            {isExpanded2 ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            )}
                                                        </span>
                                                    </h5>
                                                    {isExpanded2 && (
                                                        <p>
                                                            DigiRDP is looking for a Customer Support Executive with experience in the web hosting industry to join our dynamic support team. 
                                                            The ideal candidate should be proficient in handling customer queries, troubleshooting hosting-related issues, and providing excellent support via live chat and ticketing systems. 
                                                        </p>
                                                    )}
                                                </div>
                                            </li>
                                            <li class="job-preview">
                                                <div className="div-career">
                                                    <div class="content float-left">
                                                        <h5>Full-Time, Day shift : 9:30 AM - 6:30 PM</h5>
                                                        <h4 class="job-title">
                                                            Frontend Developer{" "}
                                                            <p> Posted by DigiRDP, LLC</p>
                                                        </h4>
                                                    </div>
                                                    <div className="header-btn">
                                                        <a
                                                            className="rainbow-gradient-btn"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            href="https://www.linkedin.com/company/digirdp-llc/jobs/"
                                                        >
                                                            <span>Apply</span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="job-description">
                                                    <h5
                                                        className="company"
                                                        onClick={() => setIsExpanded3(!isExpanded3)}
                                                        style={{
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        Job Description
                                                        <span style={{ marginLeft: "8px" }}>
                                                            {isExpanded3 ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            )}
                                                        </span>
                                                    </h5>
                                                    {isExpanded3 && (
                                                        <p>
                                                            As a Frontend Developer at DigiRDP, you will be responsible for creating dynamic, responsive, and high-performance web applications using Next.js. 
                                                            You’ll work closely with our design and backend teams to craft seamless and scalable web experiences.
                                                        </p>
                                                    )}
                                                </div>
                                            </li>
                                            <li class="job-preview">
                                                <div className="div-career">
                                                    <div class="content float-left">
                                                        <h5>Full-Time, Day shift : 9:30 AM - 6:30 PM</h5>
                                                        <h4 class="job-title">
                                                            YouTube/Insta Video/Reel Creator{" "}
                                                            <p> Posted by DigiRDP, LLC</p>
                                                        </h4>
                                                    </div>
                                                    <div className="header-btn">
                                                        <a
                                                            className="rainbow-gradient-btn"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            href="https://www.linkedin.com/company/digirdp-llc/jobs/"
                                                        >
                                                            <span>Apply</span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="job-description">
                                                    <h5
                                                        className="company"
                                                        onClick={() => setIsExpanded4(!isExpanded4)}
                                                        style={{
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        Job Description
                                                        <span style={{ marginLeft: "8px" }}>
                                                            {isExpanded4 ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            )}
                                                        </span>
                                                    </h5>
                                                    {isExpanded4 && (
                                                        <p>
                                                            Must have experience in video editing, storytelling, and content creation. 
                                                            Knowledge of trending topics and video formats is a plus.
                                                        </p>
                                                    )}
                                                </div>
                                            </li>
                                            <li class="job-preview">
                                                <div className="div-career">
                                                    <div class="content float-left">
                                                        <h5>Full-Time, Day shift : 9:30 AM - 6:30 PM</h5>
                                                        <h4 class="job-title">
                                                            Technical Article Writer{" "}
                                                            <p> Posted by DigiRDP, LLC</p>
                                                        </h4>
                                                    </div>
                                                    <div className="header-btn">
                                                        <a
                                                            className="rainbow-gradient-btn"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            href="https://www.linkedin.com/company/digirdp-llc/jobs/"
                                                        >
                                                            <span>Apply</span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="job-description">
                                                    <h5
                                                        className="company"
                                                        onClick={() => setIsExpanded5(!isExpanded5)}
                                                        style={{
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        Job Description
                                                        <span style={{ marginLeft: "8px" }}>
                                                            {isExpanded5 ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            )}
                                                        </span>
                                                    </h5>
                                                    {isExpanded5 && (
                                                        <p>
                                                            Must have a strong understanding of Linux, troubleshooting, and system administration. 
                                                            Experience in SEO writing is an added advantage. 
                                                        </p>
                                                    )}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <div className="view-more-button text-center mt--35 sal-animate" data-sal="slide-up" data-sal-duration="400" data-sal-delay="400">
                                        <a className="btn-default color-blacked" href="/contact">View Plans <i className="fa-sharp fa-light fa-arrow-right ml--5"></i></a>
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
                    </div>
                </div>
            </div>
            {/* <!-- Start Pricing Area  --> */}

            <Location />

            <Footer />
        </Fragment>
    );
};

export default Career;
