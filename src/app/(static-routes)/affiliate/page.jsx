import React, { Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Location from "@/pages/sales-page/Location";
import Link from "next/link";
import Head from "next/head";
// import $ from 'jquery';
// import Testimonial from "../slider/testimonial";
// import BlogSlider from "../slider/BlogSlider";
// import WhyUs from "../slider/WhyUs";
// const assets = '/assets';
export const metadata = {
    title: "Partner with Us and Earn Recurring Revenue!",
    description: `Step into the world of endless earning potential with
                    DigiRDP’s Affiliate Program. By referring customers to our
                    premium RDP and VPS services, you don’t just earn once—you
                    earn every time your customer renews their subscription.
                    With the opportunity to build a steady income stream, you’ll
                    also gain access to exclusive marketing tools and dedicated
                    support to help you succeed.`,
};
const Affiliate = () => {
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
                                    <div class="badge">🎉 LIMITED TIME: $50 SIGNUP BONUS</div>
                                    <h1 className="title h3">Partner with Us and Earn Recurring Revenue!</h1>
                                    <p className="description b1">Turn referrals into ongoing earnings! Earn up to 50% recurring commission for life with DigiRDP's Affiliate Program. No technical work required — just refer, share, and reap the rewards!</p>
                                    <a href="https://manage.digirdp.com/affiliates.php" class="cta-button">Start Earning Today</a>
                                    <a href="#benefits" class="cta-button cta-secondary">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- End Breadcarumb area  -->



                <!-- Start Pricing Style-2  --> */}

                <section className="section section-white rainbow-service-area rainbow-section-gap" id="benefits">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title w-600 mb--20">Why Become a DigiRDP Affiliate?</h2>
                                    <p>Promote secure, high-performance cloud solutions to a global audience and watch your commissions grow</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="benefits-grid">
                            <div className="benefit-card">
                                <div className="benefit-icon">💰</div>
                                <h3>Lifetime Recurring Commissions</h3>
                                <p>Earn commissions for as long as your referred clients stay active. One referral can generate passive income for years!</p>
                            </div>
                            
                            <div className="benefit-card">
                                <div className="benefit-icon">📈</div>
                                <h3>Up to 50% Commission</h3>
                                <p>Start at 15% and scale up to 50% based on your monthly performance. The more you refer, the more you earn.</p>
                            </div>
                            
                            <div className="benefit-card">
                                <div className="benefit-icon">🎁</div>
                                <h3>$50 Welcome Bonus</h3>
                                <p>Get an instant $50 bonus in your DigiRDP wallet after signup and approval. Use it to test services or withdraw!</p>
                            </div>
                            
                            <div className="benefit-card">
                                <div className="benefit-icon">📊</div>
                                <h3>Real-Time Dashboard</h3>
                                <p>Track clicks, conversions, and earnings in real-time. Access marketing materials and request payouts instantly.</p>
                            </div>
                            
                            <div className="benefit-card">
                                <div className="benefit-icon">🌍</div>
                                <h3>Global Infrastructure</h3>
                                <p>Promote services backed by data centers in 8+ countries ensuring low latency and high reliability.</p>
                            </div>
                            
                            <div className="benefit-card">
                                <div className="benefit-icon">🤝</div>
                                <h3>No Support Required</h3>
                                <p>We handle all customer support and technical issues. You just focus on promoting and earning.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section section-purple rainbow-service-area rainbow-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title w-600 mb--20">Performance-Based Commission Tiers</h2>
                                    <p>The more you refer, the more you earn — scale up to 50% recurring commission!</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="tier-cards">
                            <div className="tier-card">
                                <div className="tier-name">BRONZE</div>
                                <div className="tier-commission">15%</div>
                                <div className="tier-requirement">1-10 sign-ups/month</div>
                                <p>Perfect for beginners starting their affiliate journey</p>
                            </div>
                            
                            <div className="tier-card">
                                <div className="tier-name">SILVER</div>
                                <div className="tier-commission">25%</div>
                                <div className="tier-requirement">11-20 sign-ups/month</div>
                                <p>For affiliates growing their network</p>
                            </div>
                            
                            <div className="tier-card featured">
                                <div className="tier-name">GOLD</div>
                                <div className="tier-commission">35%</div>
                                <div className="tier-requirement">21-30 sign-ups/month</div>
                                <p>Professional affiliates with established audiences</p>
                            </div>
                            
                            <div className="tier-card">
                                <div className="tier-name">PLATINUM</div>
                                <div className="tier-commission">50%</div>
                                <div className="tier-requirement">31+ sign-ups/month</div>
                                <p>Elite partners earning maximum commissions</p>
                            </div>
                        </div>
                        
                        <p style={{ textAlign: "center", marginTop : "40px", color: "#666" }} >
                            * 1 sign-up = 1 paid service purchase
                        </p>
                    </div>
                </section>

                <section className="section section-white rainbow-service-area rainbow-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title w-600 mb--20">3 Simple Steps to Start Earning</h2>
                                    <p>No technical setup needed — anyone can join and start earning today!</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="steps-container">
                            <div className="step-item">
                                <div className="step-number">1</div>
                                <h3>Sign Up & Get Approved</h3>
                                <p>Visit our affiliate portal and register for free. Get instant approval and receive your $50 welcome bonus.</p>
                            </div>
                            
                            <div className="step-item">
                                <div className="step-number">2</div>
                                <h3>Start Promoting</h3>
                                <p>Share your unique referral link on websites, blogs, or social media to reach your audience.</p>
                            </div>
                            
                            <div className="step-item">
                                <div className="step-number">3</div>
                                <h3>Earn & Grow</h3>
                                <p>Get paid monthly for every active referral. Track everything in your real-time dashboard.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section section-purple rainbow-service-area rainbow-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title w-600 mb--20">DigiRDP's Global Data Center Presence</h2>
                                    <p>We power services from top-tier data centers across the globe, ensuring low latency and high availability</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="location-grid">
                            <div className="location-badge">🇺🇸 United States</div>
                            <div className="location-badge">🇸🇬 Singapore</div>
                            <div className="location-badge">🇮🇳 India</div>
                            <div className="location-badge">🇫🇷 France</div>
                            <div className="location-badge">🇨🇦 Canada</div>
                            <div className="location-badge">🇩🇪 Germany</div>
                            <div className="location-badge">🇳🇱 Netherlands</div>
                            <div className="location-badge">🇬🇧 United Kingdom</div>
                        </div>
                    </div>
                </section>

                <section className="section section-white rainbow-service-area rainbow-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title w-600 mb--20">Track Everything in One Place</h2>
                                    <p>Gain access to your own affiliate dashboard with powerful tracking tools</p>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="dashboard-preview">
                            <div className="dashboard-features">
                                <div className="dashboard-feature">
                                    <div className="dashboard-feature-icon">📊</div>
                                    <h4>Click & Referral Tracking</h4>
                                </div>
                                <div className="dashboard-feature">
                                    <div className="dashboard-feature-icon">💵</div>
                                    <h4>Commission Reports</h4>
                                </div>
                                <div className="dashboard-feature">
                                    <div className="dashboard-feature-icon">🎨</div>
                                    <h4>Marketing Banners & Assets</h4>
                                </div>
                                <div className="dashboard-feature">
                                    <div className="dashboard-feature-icon">💳</div>
                                    <h4>Payout Request System</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="footer-cta">
                    <div className="blob-1"></div>
                    <div className="blob-2"></div>
                    <div className="container">
                        <h2 style={{ fontSize: "2.8em", marginBottom: "20px", color: "white",fontWeight: "600 " }} >Let's Grow Together</h2>
                        <p  style={{ fontSize: "1.2em", marginBottom: "40px", opacity : "0.95", color: "white" }} >
                            Start earning with DigiRDP today — it's free to join!
                        </p>
                        <a href="https://manage.digirdp.com/affiliates.php" className="cta-button">Join Now & Get $50 Bonus</a>
                        <p style={{ marginTop: "30px", opacity: "0.9", color:"white" }} >
                            Have questions? We're just one message away!<br />
                            📧 support@digirdp.com
                        </p>
                    </div>
                </section>


                        
                {/* <div className="rainbow-pricing-area rainbow-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title w-600 mb--20">
                                        Turn Referrals into Ongoing Earnings!{" "}
                                    </h2>
                                    <p>Step into limitless earning potential with DigiRDP’s Affiliate Program. When you refer
                                        customers to our premium RDP and VPS services, you don’t just earn once—you earn with
                                        every renewal. Build a reliable income stream while gaining access to exclusive marketing
                                        tools and dedicated support to ensure your success.

                                    </p>
                                    <p>Promote secure, high-performance cloud solutions to a global audience, and watch your
                                        commissions grow with each successful referral. Don’t just recommend a service—start your
                                        journey toward passive income. Join DigiRDP’s Affiliate Program today!{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rainbow-advance-tab-area aiwave-bg-gradient rainbow-section-gap-big">
                    <div className="container">
                        <div className="html-tabs" data-tabs="true">
                            <div className="row row--30 align-items-center">
                                <div className="col-lg-12">
                                    <div className="section-title text-center">
                                        <h2 className="title w-600 mb--20">
                                            Sign Up, Share, and Start Earning!{" "}
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <h4>Sign Up : </h4>
                                        <p>
                                            Register for free and become an official DigiRDP affiliate
                                            in just a few clicks.{" "}
                                        </p>
                                        <h4>Promote :</h4>
                                        <p>
                                            Share your unique referral link on websites, blogs, or
                                            social media to reach a wide audience.{" "}
                                        </p>
                                        <h4>Earn :</h4>
                                        <p>
                                            Get paid every time a customer you refer makes a
                                            purchase—it's that simple!{" "}
                                        </p>
                                        <h5>Have questions or need help getting started?</h5>
                                        <p>
                                            We’re here for you! Contact us anytime at{" "}
                                            <Link href="https://manage.digirdp.com/affiliates.php">
                                                https://manage.digirdp.com/affiliates
                                            </Link>{" "}
                                            and we’ll guide you every step of the way.{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            {/* <!-- Start Pricing Area  --> */}

            <Location />
            <Footer />
        </Fragment>
    );
};

export default Affiliate;
