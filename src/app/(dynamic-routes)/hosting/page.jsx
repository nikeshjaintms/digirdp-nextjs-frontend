import React, { Fragment } from "react";
import Header from "../../../components/Header";
import Footer from "../../..//components/Footer";
import Testimonial from "../../../pages/slider/testimonial";
import BlogSlider from "../../../pages/slider/BlogSlider";
import Location from "../../../pages/sales-page/Location";
import Link from "next/link";
const assets = "/assets";

// Fetch blog data on the server
async function getHostingPlanData() {
  try {
    // If you want to use Static Generation (SSG) instead of SSR, you can replace cache: 'no-store' with next: { revalidate: 3600 } to revalidate the data every hour.
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/web-hosting`,
      {
        // cache: 'no-store', // Ensure fresh data on every request (SSR)
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hosting plan data");
    }

    const data = await response.json();
    return data[1]; // Return the 2nd object
  } catch (error) {
    console.error("Error fetching hosting plan data:", error);
    return null;
  }
}

export default async function Hosting() {
  const hostings = await getHostingPlanData(); // Fetch rdp data on the server

  if (!hostings) {
    return <div>hosting plan not found.</div>; // Handle case where rdps data is not available
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
                                    <h1 className="title h3">Category</h1>
                                    <p className="description b1">
                                        Explore our range of categories and choose the perfect hosting plan
                                        tailored to your needs.
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
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-title text-center">
                                            <h2 className="title w-600 mb--20">Everything You Need to Succeed Online</h2>
                                            <p>
                                                Powerful features designed to make web hosting effortless and efficient{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-wrapper ">
                                    <div className="has-show-more-inner-content">
                                        <div className="row row--15">
                                        {hostings.map((hosting, index) => (
                                            <div
                                            key={index}
                                            className="col-lg-4 col-md-6 col-12 mt--30 sal-animate"
                                            data-sal="slide-up"
                                            data-sal-duration="700"
                                            >
                                            <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                <Link href={`/hosting/${hosting.url_text}`}>
                                                <div className="inner inner-new">
                                                    <div className="content">
                                                    <div className="bottom-content">
                                                        <div className="meta-info-section">
                                                        <div className="desc-img">
                                                            <img
                                                            src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${hosting.logo}`}
                                                            alt={hosting.name}
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                            }}
                                                            />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <h5 className="pt-3">{hosting.name}</h5>
                                                    <p className="m-0">{hosting.description}</p>
                                                    </div>
                                                </div>
                                                </Link>
                                            </div>
                                            </div>
                                        ))}
                                        </div>
                                        {/* <div className="row row--15">

                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">⚡</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Lightning Fast Performance</h5>
                                                                <p className="m-0">SSD storage, CDN integration, and optimized servers ensure your websites load in milliseconds. Experience up to 10x faster loading speeds with our cutting-edge infrastructure.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">🛡️</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Advanced Security</h5>
                                                                <p className="m-0">Multi-layered security with SSL certificates, DDoS protection, malware scanning, and automated backups to keep your data safe from all threats.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">🤖</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">AI-Powered Automation</h5>
                                                                <p className="m-0">Intelligent WordPress management with auto-updates, AI content generation, and smart optimization. Let AI handle the technical work while you focus on your business.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">📊</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Real-time Analytics</h5>
                                                                <p className="m-0">Monitor your website performance, traffic, and server resources with comprehensive analytics and detailed reporting tools powered by advanced insights.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">🚀</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">One-Click Staging</h5>
                                                                <p className="m-0">Test changes safely with integrated staging environments. Deploy updates with confidence using our seamless workflow tools and version control.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">💬</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">24/7 Expert Support</h5>
                                                                <p className="m-0">Get help when you need it from our team of hosting experts. Available via live chat, email, and phone around the clock with real human support.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="wrapper rainbow-section-gap">
                            <div className="container">
                                <div className="row mb-4">
                                    <div className="col-lg-12">
                                        <div className="section-title text-center slide-up" data-sal-duration="400" data-sal-delay="150">
                                            <h2 className="title w-600 mb--20">Choose Your Perfect Plan</h2>
                                            <p className="description b1">
                                                Flexible hosting solutions that grow with your business
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row row--15 mt-5">
                                    <div className=" p-0 bg-transparent border-0 bg-light">
                                        <div className="row row--15 mt_dec--40">
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30" >
                                                <div className="rainbow-pricing style-aiwave ">
                                                    <div className="pricing-table-inner">
                                                        <div className="pricing-top">
                                                            <div className="pricing-header">
                                                                <h4 className="title color-var-one">
                                                                    Starter
                                                                </h4>
                                                                <div className="pricing">
                                                                    <span className="price-text">
                                                                        $12.99
                                                                    </span>
                                                                    <span className="text d-flex">
                                                                        /Per Month
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="pricing-footer">
                                                                <Link className="btn-default" href="/">
                                                                    Get Started
                                                                </Link>
                                                            </div>
                                                            <div className="pricing-body">
                                                                <div className="features-section has-show-more">
                                                                    <h6>Features</h6>
                                                                    <ul className="list-style--1 has-show-more-inner-content">
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            1 WordPress Site
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            10GB SSD Storage
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            100GB Bandwidth
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            cPanel Access
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            Free SSL Certificate
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            Email Support
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
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30" >
                                                <div className="rainbow-pricing style-aiwave active">
                                                    <div className="pricing-table-inner">
                                                        <div className="pricing-top">
                                                            <div className="pricing-header">
                                                                <h4 className="title color-var-one">
                                                                    AI WordPress Pro
                                                                </h4>
                                                                <div className="pricing">
                                                                    <span className="price-text">
                                                                        $29.99
                                                                    </span>
                                                                    <span className="text d-flex">
                                                                        /Per Month
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="pricing-footer">
                                                                <Link className="btn-default" href="/">
                                                                    Choose AI Pro
                                                                </Link>
                                                            </div>
                                                            <div className="pricing-body">
                                                                <div className="features-section has-show-more">
                                                                    <h6>Features</h6>
                                                                    <ul className="list-style--1 has-show-more-inner-content">
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            5 WordPress Sites
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            50GB SSD Storage
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            500GB Bandwidth
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            AI WordPress Panel + cPanel
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            Super Quick Onboarding
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            AI-Powered Site Builder
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            Priority Support
                                                                        </li>
                                                                    </ul>
                                                                    <div className="rbt-show-more-btn">
                                                                        Show More
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="feature-badge">Most Popular</div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30" >
                                                <div className="rainbow-pricing style-aiwave ">
                                                    <div className="pricing-table-inner">
                                                        <div className="pricing-top">
                                                            <div className="pricing-header">
                                                                <h4 className="title color-var-one">
                                                                    Enterprise
                                                                </h4>
                                                                <div className="pricing">
                                                                    <span className="price-text">
                                                                        $59.99
                                                                    </span>
                                                                    <span className="text d-flex">
                                                                        /Per Month
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="pricing-footer">
                                                                <Link className="btn-default" href="/">
                                                                    Contact Sales
                                                                </Link>
                                                            </div>
                                                            <div className="pricing-body">
                                                                <div className="features-section has-show-more">
                                                                    <h6>Features</h6>
                                                                    <ul className="list-style--1 has-show-more-inner-content">
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            Unlimited WordPress Sites
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            200GB SSD Storage
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            Unlimited Bandwidth
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            All Control Panels
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            Advanced AI Features
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            White-label Options
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa-regular fa-circle-check"></i>{" "}
                                                                            24/7 Phone Support
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

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

                                                                        <video
                                                                            className="radius w-100"
                                                                            src={`${assets}/images/bg-video/vid-wordpress.mp4`}
                                                                            autoPlay
                                                                            muted
                                                                            loop
                                                                            playsInline
                                                                            poster={`${assets}/images/placeholder.jpg`} // optional poster image
                                                                        >
                                                                            Your browser does not support the video tag.
                                                                        </video>

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
                                                                            See AI WordPress in Action
                                                                        </h2>
                                                                        <p
                                                                            className="description sal-animate"
                                                                            data-sal="slide-up"
                                                                            data-sal-duration="400"
                                                                            data-sal-delay="300"
                                                                        >
                                                                            Watch how our one-click AI site setup revolutionizes WordPress hosting.
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
                                                                    <span className="theme-gradient">⚡</span>
                                                                </div>
                                                                <h4 className="title">Instant Setup </h4>
                                                                <p className="description sal-animate">
                                                                    AI creates professional WordPress sites in under 60 seconds.{" "}
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
                                                                <div className="count-text">
                                                                    <span className="theme-gradient">🎨</span>
                                                                </div>
                                                                <h4 className="title">Smart Design</h4>
                                                                <p className="description sal-animate">
                                                                    AI selects perfect themes and layouts based on your business.{" "}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </li>

                                                    <li className="col-lg-3 nav-item" role="presentation">
                                                        <Link href="/cloud-vps" className="nav-link tab-button">
                                                            <div className="tab">
                                                                <div className="count-text">
                                                                    <span className="theme-gradient">📝</span>
                                                                </div>
                                                                <h4 className="title">Content Generation</h4>
                                                                <p className="description sal-animate">
                                                                    AI writes compelling content tailored to your industry.{" "}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li className="col-lg-3 nav-item" role="presentation">
                                                        <Link href="/contact" className="nav-link tab-button">
                                                            <div className="tab">
                                                                <div className="count-text">
                                                                    <span className="theme-gradient">🚀</span>
                                                                </div>
                                                                <h4 className="title">Ready to Launch</h4>
                                                                <p className="description sal-animate">
                                                                    Sites are production-ready with all essential features configured{" "}
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

                        <div className="rainbow-testimonial-area rainbow-section-gap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-title text-center">
                                            <h2 className="title w-600 mb--20">Built on Modern Technology Stack</h2>
                                            <p>
                                                Industry-leading technologies powering your hosting experience.{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-wrapper ">
                                    <div className="has-show-more-inner-content">
                                        <div className="row row--15">

                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#F38020"></rect>
                                                                                <path d="M30 15L20 25L30 35L40 25L30 15Z" fill="white"></path>
                                                                                <rect x="25" y="40" width="10" height="8" rx="2" fill="white"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Cloudflare CDN</h5>
                                                                <p className="m-0">Global content delivery network with 330+ edge locations, DDoS protection, and Web Application Firewall for blazing-fast worldwide performance.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#336791"></rect>
                                                                                <circle cx="30" cy="20" r="8" fill="white"></circle>
                                                                                <rect x="15" y="30" width="30" height="15" rx="3" fill="white"></rect>
                                                                                <rect x="20" y="35" width="5" height="2" fill="#336791"></rect>
                                                                                <rect x="20" y="38" width="8" height="2" fill="#336791"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">PostgreSQL Database</h5>
                                                                <p className="m-0">Advanced open-source relational database with superior performance for complex queries, JSON support, and enterprise-grade features.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#005571"></rect>
                                                                                <circle cx="20" cy="25" r="4" fill="#FED10A"></circle>
                                                                                <circle cx="35" cy="25" r="4" fill="#FED10A"></circle>
                                                                                <circle cx="27" cy="35" r="6" fill="#FED10A"></circle>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Elasticsearch</h5>
                                                                <p className="m-0">Distributed search and analytics engine providing real-time indexing, full-text search capabilities, and powerful data visualization.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#E6522C"></rect>
                                                                                <circle cx="30" cy="25" r="8" fill="white"></circle>
                                                                                <rect x="26" y="35" width="8" height="12" rx="2" fill="white"></rect>
                                                                                <circle cx="30" cy="20" r="3" fill="#E6522C"></circle>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Prometheus Monitoring</h5>
                                                                <p className="m-0">Open-source monitoring system with time-series database, powerful query language, and seamless integration with modern infrastructure.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#181717"></rect>
                                                                                <path d="M30 12C20 12 12 20 12 30C12 38 17 45 24 47C25 47 25 46 25 45V42C21 43 20 40 20 40C19 38 18 37 18 37C16 36 18 36 18 36C20 36 21 38 21 38C23 41 26 40 25 39C25 38 26 37 26 36C22 36 18 34 18 28C18 26 19 25 20 24C20 23 19 21 20 19C20 19 22 18 25 20C26 20 28 20 30 20C32 20 34 20 35 20C38 18 40 19 40 19C41 21 40 23 40 24C41 25 42 26 42 28C42 34 38 36 34 36C35 37 35 38 35 39V45C35 46 35 47 36 47C43 45 48 38 48 30C48 20 40 12 30 12Z" fill="white"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">GitHub Actions CI/CD</h5>
                                                                <p className="m-0">Automated workflow platform for continuous integration and deployment with extensive marketplace integrations and developer-friendly setup.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#1F4E79"></rect>
                                                                                <rect x="15" y="20" width="30" height="20" rx="4" fill="white"></rect>
                                                                                <rect x="20" y="25" width="5" height="3" fill="#1F4E79"></rect>
                                                                                <rect x="30" y="25" width="5" height="3" fill="#1F4E79"></rect>
                                                                                <rect x="25" y="32" width="10" height="3" fill="#1F4E79"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">HAProxy Load Balancer</h5>
                                                                <p className="m-0">High-performance TCP/HTTP load balancer providing reliable traffic distribution, health checking, and advanced routing capabilities.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#003A70"></rect>
                                                                                <rect x="15" y="20" width="30" height="25" rx="3" fill="white"></rect>
                                                                                <rect x="25" y="15" width="10" height="10" rx="5" fill="none" stroke="white" stroke-width="3"></rect>
                                                                                <circle cx="30" cy="32" r="3" fill="#003A70"></circle>
                                                                                <rect x="28" y="36" width="4" height="6" fill="#003A70"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Let's Encrypt SSL</h5>
                                                                <p className="m-0">Free automated SSL certificate authority providing secure HTTPS encryption with automatic renewal and domain validation.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#00B336"></rect>
                                                                                <rect x="15" y="20" width="30" height="20" rx="2" fill="white"></rect>
                                                                                <circle cx="22" cy="25" r="2" fill="#00B336"></circle>
                                                                                <circle cx="30" cy="25" r="2" fill="#00B336"></circle>
                                                                                <circle cx="38" cy="25" r="2" fill="#00B336"></circle>
                                                                                <rect x="20" y="32" width="20" height="4" rx="2" fill="#00B336"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Veeam Backup</h5>
                                                                <p className="m-0">Enterprise backup and disaster recovery solution with instant VM recovery, cloud integration, and comprehensive data protection.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#47A248"></rect>
                                                                                <path d="M30 15C30 15 25 20 25 30C25 40 30 45 30 45C30 45 35 40 35 30C35 20 30 15 30 15Z" fill="white"></path>
                                                                                <rect x="28" y="22" width="4" height="16" fill="#47A248"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">MongoDB Database</h5>
                                                                <p className="m-0">Document-oriented NoSQL database offering flexible schema design, horizontal scaling, and native cloud integration for modern apps.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#231F20"></rect>
                                                                                <circle cx="20" cy="25" r="4" fill="white"></circle>
                                                                                <circle cx="40" cy="25" r="4" fill="white"></circle>
                                                                                <circle cx="30" cy="35" r="4" fill="white"></circle>
                                                                                <path d="M20 25L30 35M40 25L30 35M20 25L40 25" stroke="white" stroke-width="2"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Apache Kafka</h5>
                                                                <p className="m-0">Distributed event streaming platform enabling real-time data pipelines, microservices communication, and high-throughput messaging.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#C72E49"></rect>
                                                                                <rect x="15" y="20" width="30" height="20" rx="4" fill="white"></rect>
                                                                                <rect x="20" y="25" width="4" height="4" fill="#C72E49"></rect>
                                                                                <rect x="26" y="25" width="4" height="4" fill="#C72E49"></rect>
                                                                                <rect x="32" y="25" width="4" height="4" fill="#C72E49"></rect>
                                                                                <rect x="20" y="31" width="4" height="4" fill="#C72E49"></rect>
                                                                                <rect x="32" y="31" width="4" height="4" fill="#C72E49"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">MinIO Object Storage</h5>
                                                                <p className="m-0">High-performance S3-compatible object storage with Kubernetes-native deployment, multi-cloud support, and enterprise security.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#623CE4"></rect>
                                                                                <polygon points="20,20 30,15 30,35 20,40" fill="white"></polygon>
                                                                                <polygon points="32,15 42,20 42,40 32,35" fill="white"></polygon>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Terraform Infrastructure</h5>
                                                                <p className="m-0">Infrastructure as Code tool enabling automated provisioning, version control, and management of cloud resources across platforms.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#F46800"></rect>
                                                                                <rect x="15" y="20" width="30" height="25" rx="4" fill="white"></rect>
                                                                                <rect x="20" y="25" width="20" height="3" rx="1" fill="#F46800"></rect>
                                                                                <rect x="20" y="30" width="15" height="2" rx="1" fill="#F46800"></rect>
                                                                                <rect x="20" y="34" width="18" height="2" rx="1" fill="#F46800"></rect>
                                                                                <rect x="20" y="38" width="12" height="2" rx="1" fill="#F46800"></rect>
                                                                                <circle cx="35" cy="32" r="3" fill="#F46800"></circle>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Grafana Monitoring</h5>
                                                                <p className="m-0">Open-source analytics and interactive visualization platform with beautiful dashboards for monitoring metrics from multiple data sources.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#0F1419"></rect>
                                                                                <rect x="15" y="18" width="30" height="24" rx="3" fill="white"></rect>
                                                                                <rect x="18" y="22" width="6" height="6" fill="#0F1419"></rect>
                                                                                <rect x="26" y="22" width="6" height="6" fill="#0F1419"></rect>
                                                                                <rect x="34" y="22" width="8" height="6" fill="#0F1419"></rect>
                                                                                <rect x="18" y="30" width="12" height="4" fill="#0F1419"></rect>
                                                                                <rect x="32" y="30" width="10" height="4" fill="#0F1419"></rect>
                                                                                <rect x="18" y="36" width="8" height="4" fill="#0F1419"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Docker Containers</h5>
                                                                <p className="m-0">Containerization platform enabling consistent application deployment across environments with isolated, scalable microservices architecture.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#326CE5"></rect>
                                                                                <polygon points="30,12 18,18 18,42 30,48 42,42 42,18" fill="white"></polygon>
                                                                                <polygon points="30,18 24,21 24,39 30,42 36,39 36,21" fill="#326CE5"></polygon>
                                                                                <circle cx="30" cy="30" r="4" fill="white"></circle>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Kubernetes Orchestration</h5>
                                                                <p className="m-0">Container orchestration platform automating deployment, scaling, and management of containerized applications across clusters.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#FF2D92"></rect>
                                                                                <circle cx="30" cy="20" r="6" fill="white"></circle>
                                                                                <rect x="15" y="28" width="30" height="20" rx="4" fill="white"></rect>
                                                                                <rect x="20" y="33" width="20" height="2" fill="#FF2D92"></rect>
                                                                                <rect x="20" y="37" width="15" height="2" fill="#FF2D92"></rect>
                                                                                <rect x="20" y="41" width="18" height="2" fill="#FF2D92"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Ansible Automation</h5>
                                                                <p className="m-0">IT automation platform for configuration management, application deployment, and orchestration with simple YAML playbooks.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#FF6C37"></rect>
                                                                                <circle cx="30" cy="18" r="6" fill="white"></circle>
                                                                                <rect x="20" y="26" width="20" height="3" fill="white"></rect>
                                                                                <rect x="18" y="31" width="24" height="3" fill="white"></rect>
                                                                                <rect x="22" y="36" width="16" height="3" fill="white"></rect>
                                                                                <rect x="25" y="41" width="10" height="3" fill="white"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Jenkins CI/CD</h5>
                                                                <p className="m-0">Open-source automation server enabling continuous integration and deployment with extensive plugin ecosystem and pipeline support.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#E50914"></rect>
                                                                                <rect x="15" y="15" width="30" height="30" rx="4" fill="white"></rect>
                                                                                <rect x="20" y="20" width="8" height="8" fill="#E50914"></rect>
                                                                                <rect x="30" y="20" width="8" height="8" fill="#E50914"></rect>
                                                                                <rect x="20" y="30" width="8" height="8" fill="#E50914"></rect>
                                                                                <rect x="30" y="30" width="8" height="8" fill="#E50914"></rect>
                                                                                <rect x="25" y="25" width="8" height="8" fill="white"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Redis Cache</h5>
                                                                <p className="m-0">In-memory data structure store used as database, cache, and message broker with high performance and advanced data types.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#4285F4"></rect>
                                                                                <circle cx="25" cy="25" r="8" fill="white"></circle>
                                                                                <circle cx="35" cy="35" r="6" fill="white"></circle>
                                                                                <path d="M25 25L35 35" stroke="#4285F4" stroke-width="3"></path>
                                                                                <circle cx="30" cy="18" r="3" fill="#4285F4"></circle>
                                                                                <circle cx="42" cy="30" r="3" fill="#4285F4"></circle>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Load Balancing</h5>
                                                                <p className="m-0">Advanced traffic distribution across multiple servers ensuring high availability, optimal performance, and automatic failover capabilities.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#00C7B7"></rect>
                                                                                <rect x="15" y="20" width="30" height="20" rx="3" fill="white"></rect>
                                                                                <rect x="20" y="25" width="5" height="10" fill="#00C7B7"></rect>
                                                                                <rect x="27" y="30" width="5" height="5" fill="#00C7B7"></rect>
                                                                                <rect x="34" y="27" width="5" height="8" fill="#00C7B7"></rect>
                                                                                <circle cx="22" cy="17" r="2" fill="#00C7B7"></circle>
                                                                                <circle cx="30" cy="15" r="2" fill="#00C7B7"></circle>
                                                                                <circle cx="38" cy="17" r="2" fill="#00C7B7"></circle>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Real-time Monitoring</h5>
                                                                <p className="m-0">Comprehensive system monitoring with real-time alerts, performance metrics, and automated incident response for proactive management.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#2496ED"></rect>
                                                                                <rect x="15" y="25" width="30" height="15" rx="3" fill="white"></rect>
                                                                                <rect x="20" y="15" width="20" height="8" rx="2" fill="white"></rect>
                                                                                <rect x="22" y="30" width="4" height="2" fill="#2496ED"></rect>
                                                                                <rect x="28" y="30" width="4" height="2" fill="#2496ED"></rect>
                                                                                <rect x="34" y="30" width="4" height="2" fill="#2496ED"></rect>
                                                                                <rect x="25" y="34" width="10" height="2" fill="#2496ED"></rect>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Microservices Architecture</h5>
                                                                <p className="m-0">Scalable application architecture with independent services enabling rapid development, deployment, and technology diversity.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#FF9500"></rect>
                                                                                <circle cx="30" cy="25" r="8" fill="white"></circle>
                                                                                <rect x="22" y="35" width="16" height="3" rx="1" fill="white"></rect>
                                                                                <rect x="25" y="40" width="10" height="2" rx="1" fill="white"></rect>
                                                                                <path d="M30 17L33 22L30 25L27 22Z" fill="#FF9500"></path>
                                                                                <circle cx="20" cy="20" r="2" fill="#FF9500"></circle>
                                                                                <circle cx="40" cy="20" r="2" fill="#FF9500"></circle>
                                                                                <circle cx="20" cy="40" r="2" fill="#FF9500"></circle>
                                                                                <circle cx="40" cy="40" r="2" fill="#FF9500"></circle>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Auto-Scaling</h5>
                                                                <p className="m-0">Dynamic resource allocation that automatically adjusts server capacity based on traffic demands for optimal performance and cost efficiency.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div class="tech-icon">
                                                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                                                <rect width="60" height="60" rx="12" fill="#764ABC"></rect>
                                                                                <rect x="15" y="18" width="30" height="24" rx="4" fill="white"></rect>
                                                                                <rect x="20" y="23" width="8" height="6" fill="#764ABC"></rect>
                                                                                <rect x="30" y="23" width="8" height="6" fill="#764ABC"></rect>
                                                                                <rect x="20" y="31" width="18" height="3" fill="#764ABC"></rect>
                                                                                <rect x="20" y="36" width="12" height="3" fill="#764ABC"></rect>
                                                                                <circle cx="35" cy="37" r="2" fill="#764ABC"></circle>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">API Gateway</h5>
                                                                <p className="m-0">Centralized entry point for all API requests with authentication, rate limiting, monitoring, and request/response transformation.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>     
                    

                        <div className="rainbow-service-area rainbow-section-gap">
                            <div className="container">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-title text-center">
                                            <h2 className="title w-600 mb--20">Advanced Control Panels</h2>
                                            <p>
                                                Choose from industry-leading control panels designed for different needs and expertise levels{" "}
                                            </p>
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
                                                                src={`${assets}/images/added/ai-wp.svg`}
                                                                alt="Vedio Generator Icon"
                                                            />
                                                            AI WordPress
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
                                                                src={`${assets}/images/added/cpanel.svg`}
                                                                alt="Vedio Generator Icon"
                                                            />
                                                            cPanel
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
                                                                src={`${assets}/images/added/plesk.svg`}
                                                                alt="Vedio Generator Icon"
                                                            />
                                                            Plesk
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
                                                                src={`${assets}/images/added/direct.svg`}
                                                                alt="Vedio Generator Icon"
                                                            />
                                                            DirectAdmin
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
                                                                    <h2 className="title d-flex align-items-center justify-content-between">
                                                                        🤖 AI WordPress  <div class="panel-badge">Powered by PanelAlpha</div>
                                                                    </h2>
                                                                    <p>
                                                                        The ultimate WordPress automation platform with AI-powered features and modern interface. Revolutionize your WordPress hosting experience with intelligent automation, seamless management, and cutting-edge AI capabilities.
                                                                    </p>
                                                                    <div className="features-section">
                                                                        <ul className="list-style--1">
                                                                            <li>
                                                                                <span>🚀 Super Quick Onboarding with Extendify AI integration</span>{" "}
                                                                            </li>
                                                                            <li>
                                                                                <span>🤖 AI-powered WordPress builder with "try now, pay later" model</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>
                                                                                    ⚡ Complete automation for WordPress provisioning and management
                                                                                </span>{" "}
                                                                            </li>
                                                                            <li>
                                                                                <span>
                                                                                    🎭 One-click staging environments for safe testing
                                                                                </span>{" "}
                                                                            </li>
                                                                            <li>
                                                                                <span>
                                                                                    ☁️ Cloudflare DNS integration for speed and security
                                                                                </span>{" "}
                                                                            </li>
                                                                            <li>
                                                                                <span>
                                                                                    🎨 Custom themes & plugins marketplace with revenue sharing
                                                                                </span>{" "}
                                                                            </li>
                                                                            <li>
                                                                                <span>
                                                                                    💳 Seamless WHMCS integration for billing automation
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
                                                                                src={`${assets}/images/added/ai-wp.png`}
                                                                                alt="Chat example"
                                                                            />
                                                                            <img
                                                                                className="logo-dark"
                                                                                src={`${assets}/images/added/ai-wp.png`}
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
                                                                    <h2 className="title d-flex align-items-center justify-content-between">⚙️ cPanel <div class="panel-badge">Industry Standard</div></h2>
                                                                    <p>
                                                                        The world's most popular web hosting control panel with comprehensive website management tools. Trusted by millions of users worldwide for its reliability, extensive features, and intuitive interface on Linux servers.{" "}
                                                                    </p>
                                                                    <p>
                                                                        Experience seamless, protected remote working like
                                                                        never before!
                                                                    </p>
                                                                    <div className="features-section">
                                                                        <ul className="list-style--1">
                                                                            <li>
                                                                                <span>📁 Advanced file manager with drag-and-drop functionality</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>📧 Complete email management with unlimited accounts</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>🗄️ MySQL database tools with phpMyAdmin integration</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>🌐 Subdomain & addon domain management</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>💾 Comprehensive backup & restore functionality</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>🔐 Advanced security & access control management</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>📊 Detailed web statistics & analytics with AWStats</span>
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
                                                                <div className="export-img d-flex justify-content-center">
                                                                    <div className="inner-without-padding">
                                                                        <div className="export-img img-bg-shape ">
                                                                            <img
                                                                                src={`${assets}/images/added/cpanel-ss.png`}
                                                                                alt="Chat example"
                                                                            />
                                                                            {/* <div className="image-shape"></div> */}
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
                                                                    <h2 className="title d-flex align-items-center justify-content-between">Plesk <div class="panel-badge">Windows & Linux</div></h2>
                                                                    <p>
                                                                        Professional hosting control panel supporting both Windows and Linux environments. Perfect for businesses requiring Microsoft technologies, .NET applications, and enterprise-grade features.{" "}
                                                                    </p>
                                                                    <div className="features-section">
                                                                        <ul className="list-style--1">
                                                                            <li>
                                                                                <span>Full Windows Server support with IIS web server</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>🐧 Linux support with Apache/NGINX web servers</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>💻 Complete .NET Framework and ASP.NET support</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>🗄️ Microsoft SQL Server and MySQL database support</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>📧 Advanced email server with Exchange support</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>🔐 Enterprise security with Web Application Firewall</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>📱 Mobile-responsive management interface</span>
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
                                                                                src={`${assets}/images/added/plesk-ss.png`}
                                                                                alt="Chat example"
                                                                            />
                                                                            <img
                                                                                className="shape-light"
                                                                                src={`${assets}/images/added/plesk-ss.png`}
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
                                                                    <h2 className="title d-flex align-items-center justify-content-between">🔧 DirectAdmin <div class="panel-badge">Lightweight & Fast</div></h2>
                                                                    <p>
                                                                        Lightweight, efficient control panel designed for speed and simplicity. Perfect for developers and hosting providers who need a fast, resource-efficient solution with powerful features.
                                                                    </p>
                                                                    <div className="features-section">
                                                                        <ul className="list-style--1">
                                                                            <li>
                                                                                <span>🚀 Ultra-lightweight design with minimal resource usage</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>⚡ Lightning-fast page load times and response</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>📁 Powerful file manager with bulk operations</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>📧 Complete email management with webmail integration</span>
                                                                            </li>
                                                                            <li><span>🗄️ MySQL database management with phpMyAdmin</span></li>
                                                                            <li><span>🔐 Advanced security features and IP management</span></li>
                                                                            <li><span>📊 Detailed statistics and bandwidth monitoring</span></li>
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
                                                                                src={`${assets}/images/added/admin-ss.png`}
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

                        <div className="wrapper rainbow-section-gap aiwave-bg-gradient">
                            <div className="container">
                                <div className="row mb-4">
                                    <div className="col-lg-12">
                                        <div
                                            className="section-title text-center sal-animate"
                                            data-sal="slide-up"
                                            data-sal-duration="400"
                                            data-sal-delay="150"
                                        >

                                            <h2 className="title w-600 mb--20">
                                                Control Panel Comparison{" "}
                                            </h2>
                                            <p>
                                                Choose the perfect control panel for your specific needs and requirements{" "}
                                            </p>
                                        </div>


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
                                                    <div className="row row--15">

                                                        <div className="col-lg-12">
                                                            <div className="rainbow-compare-table style-1 table-style mt-5">
                                                                <div className="table-responsive-wrapper" style={{ borderRadius: "10px" }}>
                                                                    <table className="table-responsive">
                                                                        <thead>
                                                                            <tr style={{ background: "linear-gradient(to right, var(--color-primary-gradient-start), var(--color-primary-gradient-end)) !important" }}>
                                                                                <th className="" style={{ background: "none !important" }}>
                                                                                    <div className="d-flex align-items-center justify-content-center">
                                                                                        {/* <img
                                                            src={`${assets}/images/added/one.png`}
                                                            alt="cpu"
                                                          /> */}
                                                                                        <span className="ms-2">Feature</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="" style={{ background: "none !important" }}>
                                                                                    <div className="d-flex align-items-center justify-content-center">
                                                                                        {/* <img
                                                            src={`${assets}/images/added/storage.png`}
                                                            alt="cpu"
                                                          /> */}
                                                                                        <span className="ms-2">
                                                                                            AI WordPress
                                                                                        </span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="" style={{ background: "none !important" }}>
                                                                                    <div className="d-flex align-items-center justify-content-center">
                                                                                        {/* <img
                                                            src={`${assets}/images/added/memory.png`}
                                                            alt="cpu"
                                                          /> */}
                                                                                        <span className="ms-2">
                                                                                            cPanel
                                                                                        </span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="" style={{ background: "none !important" }}>
                                                                                    <div className="d-flex align-items-center justify-content-center">
                                                                                        {/* <img
                                                            src={`${assets}/images/added/transfer.png`}
                                                            alt="cpu"
                                                          /> */}
                                                                                        <span className="ms-2">
                                                                                            Plesk
                                                                                        </span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="" style={{ background: "none !important" }}>
                                                                                    <div className="d-flex align-items-center justify-content-center">
                                                                                        {/* <img
                                                            src={`${assets}/images/added/location.png`}
                                                            alt="cpu"
                                                          /> */}
                                                                                        <span className="ms-2">
                                                                                            DirectAdmin
                                                                                        </span>
                                                                                    </div>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr >
                                                                                <td className="feature-name"><b>Operating System</b></td>
                                                                                <td>Linux (Ubuntu/CentOS)</td>
                                                                                <td>Linux (CentOS/CloudLinux)	</td>
                                                                                <td>Windows & Linux</td>
                                                                                <td>Linux (FreeBSD/CentOS)</td>
                                                                            </tr>
                                                                            <tr >
                                                                                <td className="feature-name"><b>Best For</b></td>
                                                                                <td>WordPress Sites & Agencies</td>
                                                                                <td>General Web Hosting</td>
                                                                                <td>Enterprise & .NET Apps</td>
                                                                                <td>Performance & Efficiency</td>
                                                                            </tr>
                                                                            <tr >
                                                                                <td className="feature-name"><b>WordPress Tools</b></td>
                                                                                <td><span>✅ AI Builder</span><br /> <span>✅ Auto Updates</span> <br /> <span>✅ Staging</span></td>
                                                                                <td>✅ Manual Installation <br />✅ Basic Management</td>
                                                                                <td>✅ WordPress Toolkit <br />✅ Staging & Cloning</td>
                                                                                <td>✅ Manual Installation <br />✅ Basic Management</td>
                                                                            </tr>
                                                                            <tr >
                                                                                <td className="feature-name"><b>Resource Usage</b></td>
                                                                                <td><span class="status moderate">🟡 Moderate</span></td>
                                                                                <td><span class="status moderate">🟡 Moderate</span></td>
                                                                                <td><span class="status high">🔴 High</span></td>
                                                                                <td><span class="status low">🟢 Very Low</span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rainbow-testimonial-area rainbow-section-gap">
                                                        <div className="container">
                                                            <div className="testimonial-wrapper ">
                                                                <div className="has-show-more-inner-content">
                                                                    <div className="row row--15">

                                                                        <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                                            <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                                                <a href="/">
                                                                                    <div className="inner inner-new">
                                                                                        <div className="content">
                                                                                            <div className="bottom-content">
                                                                                                <div className="meta-info-section">
                                                                                                    <div className="desc-img mb-4"><img src={`${assets}/images/added/ai-wp.svg`} alt="" /></div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <h5 className="pt-3">Choose AI WordPress If :</h5>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You're building WordPress sites for clients </p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You want AI-powered automation</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You need rapid site deployment</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You value modern interfaces</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                                            <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                                                <a href="/">
                                                                                    <div className="inner inner-new">
                                                                                        <div className="content">
                                                                                            <div className="bottom-content">
                                                                                                <div className="meta-info-section">
                                                                                                    <div className="desc-img mb-4"><img src={`${assets}/images/added/cpanel.svg`} alt="" /></div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <h5 className="pt-3">Choose cPanel If :</h5>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You need traditional hosting control</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You're hosting various applications</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You want the most familiar interface</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You need maximum flexibility</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                                            <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                                                <a href="/">
                                                                                    <div className="inner inner-new">
                                                                                        <div className="content">
                                                                                            <div className="bottom-content">
                                                                                                <div className="meta-info-section">
                                                                                                    <div className="desc-img mb-4"><img src={`${assets}/images/added/plesk.svg`} alt="" /></div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <h5 className="pt-3">Choose Plesk If :</h5>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You need Windows Server hosting</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You're developing .NET applications</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You require Microsoft technologies</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You need enterprise features</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                                            <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                                                <a href="/">
                                                                                    <div className="inner inner-new">
                                                                                        <div className="content">
                                                                                            <div className="bottom-content">
                                                                                                <div className="meta-info-section">
                                                                                                    <div className="desc-img mb-4"><img src={`${assets}/images/added/direct.svg`} alt="" /></div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <h5 className="pt-3">Choose DirectAdmin If :</h5>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You need maximum performance</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You want minimal resource usage</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You prefer clean, simple interfaces</p>
                                                                                            <p className="m-0"><i className="fa fa-check me-3" style={{ color: "#059669" }}></i>You're cost-conscious about licensing</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
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
                        </div>

                        <div className="rainbow-testimonial-area rainbow-section-gap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-title text-center">
                                            <h2 className="title w-600 mb--20">Global Infrastructure & Guarantees</h2>
                                            <p>
                                                Enterprise-grade infrastructure with worldwide coverage and industry-leading guarantees{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-wrapper ">
                                    <div className="has-show-more-inner-content">
                                        <div className="row row--15">

                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">🌍</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">15+ Global Datacenters</h5>
                                                                <p className="m-0">Strategic locations worldwide for optimal performance and reduced latency</p>
                                                                <div class="datacenter-list">
                                                                    <span class="datacenter">🇺🇸 USA</span>
                                                                    <span class="datacenter">🇬🇧 UK</span>
                                                                    <span class="datacenter">🇳🇱 Netherlands</span>
                                                                    <span class="datacenter">🇫🇷 France</span>
                                                                    <span class="datacenter">🇩🇪 Germany</span>
                                                                    <span class="datacenter">🇮🇹 Italy</span>
                                                                    <span class="datacenter">🇮🇳 India</span>
                                                                    <span class="datacenter">🇸🇬 Singapore</span>
                                                                    <span class="datacenter">🇯🇵 Japan</span>
                                                                    <span class="datacenter">🇦🇺 Australia</span>
                                                                    <span class="datacenter">🇨🇦 Canada</span>
                                                                    <span class="datacenter">🇧🇷 Brazil</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">📈</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">99.9% Uptime SLA</h5>
                                                                <p className="m-0">Industry-leading uptime guarantee with automatic credits for any downtime</p>
                                                                <div class="sla-stats mt-4">
                                                                    <div class="stat">
                                                                        <strong>99.9%+</strong><br />
                                                                        <span>Uptime Guarantee</span>
                                                                    </div>
                                                                    <div class="stat">
                                                                        <strong>24/7</strong><br />
                                                                        <span>Monitoring</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">🛡️</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">100 Gbps DDoS Protection</h5>
                                                                <p className="m-0">Enterprise-grade DDoS protection safeguarding your websites from attacks</p>
                                                                <p className="m-0 mt-3">✅ 100 Gbps mitigation capacity <br />
                                                                    ✅ Real-time threat detection<br />
                                                                    ✅ Automatic attack response
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">💰</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">30-Day Money Back</h5>
                                                                <p className="m-0">Risk-free hosting with full money-back guarantee on all hosting plans</p>
                                                                <div class="sla-stats mt-4">
                                                                    <div class="stat">
                                                                        <strong>30 Days</strong><br />
                                                                        <span>Full Refund Period</span>
                                                                    </div>
                                                                    <div class="stat">
                                                                        <strong>No Questions</strong><br />
                                                                        <span>Asked Policy</span>
                                                                    </div>
                                                                    <div class="stat">
                                                                        <strong>Legal Terms</strong><br />
                                                                        <span>Full Documentation</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* /* <!-- Start Features Area --> */}
                        <div className="rainbow-testimonial-area ">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 mt--60">
                                        <div className="advance-tab-button advance-tab-button-1 right-top">
                                            <ul className="nav nav-tabs tab-button-list justify-content-between">
                                                <li className="col-lg-2 nav-item" role="presentation">
                                                    <div className="tab">
                                                        <h2 className="title">15+ </h2>
                                                        <p className="description sal-animate">
                                                            Global Locations
                                                        </p>
                                                    </div>
                                                </li>

                                                <li className="col-lg-2 nav-item" role="presentation">
                                                    <div className="tab">
                                                        <h2 className="title">99.9%</h2>
                                                        <p className="description sal-animate">
                                                            Uptime SLA
                                                        </p>
                                                    </div>
                                                </li>

                                                <li className="col-lg-2 nav-item" role="presentation">
                                                    <div className="tab">
                                                        <h2 className="title">100</h2>
                                                        <p className="description sal-animate">
                                                            Gbps DDoS Protection
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="col-lg-2 nav-item" role="presentation">
                                                    <div className="tab">
                                                        <h2 className="title">24/7</h2>
                                                        <p className="description sal-animate">
                                                            Expert Support
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="col-lg-2 nav-item" role="presentation">
                                                    <div className="tab">
                                                        <h2 className="title">30</h2>
                                                        <p className="description sal-animate">
                                                            Day Money Back
                                                        </p>
                                                    </div>
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

                        <div className="rainbow-testimonial-area rainbow-section-gap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-title text-center">
                                            <h2 className="title w-600 mb--20">Support That Actually Helps</h2>
                                            <p>
                                                Get the help you need, when you need it, from real hosting experts{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-wrapper ">
                                    <div className="has-show-more-inner-content">
                                        <div className="row row--15">

                                            <div className="col-lg-3 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">💬</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Live Chat Support</h5>
                                                                <p className="m-0">Instant help from our technical experts available 24/7. Get real-time assistance for any hosting questions or issues with average response time under 30 seconds.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">📧</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Priority Email Support</h5>
                                                                <p className="m-0">Detailed technical assistance with quick response times. Our expert team provides comprehensive solutions to your queries within 2 hours guaranteed.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">📚</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Knowledge Base</h5>
                                                                <p className="m-0">Comprehensive guides, tutorials, and documentation for all skill levels. Self-service resources with video tutorials and step-by-step instructions available 24/7.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <a href="/">
                                                        <div className="inner inner-new">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <div className="meta-info-section">
                                                                        <div className="desc-img hosting-icon">🚚</div>
                                                                    </div>
                                                                </div>
                                                                <h5 className="pt-3">Free Migration Service</h5>
                                                                <p className="m-0">Professional migration from your current hosting provider at no extra cost. We handle the technical transfer seamlessly with zero downtime guarantee.</p>
                                                            </div>
                                                        </div>
                                                    </a>
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
                                    <div className="bg-shape">
                                        <img
                                            src={`${assets}/images/cta-img/bg-shape-01.png`}
                                            alt="BG Shape"
                                        />
                                    </div>
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
                                                <span className="theme-gradient">Testimonials</span>
                                            </h4>
                                            <h2 className="title mb--60">
                                                The opinions of the community
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
}

