import React, { Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Location from "@/pages/sales-page/Location";
import Link from "next/link";
const assets = "/assets";

export const metadata = {
  title: 'Partner with Us: Become a Reseller Today!',
  description: `Join today and start your journey as a DigiRDP reseller—it's
                    completely free and packed with benefits`,
}

const Reseller = () => {
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
                  <h1 className="title h3">Partner with Us: Become a Reseller Today!</h1>
                  <p className="description b1">Sign up today and start your journey as a DigiRDP reseller—completely free with incredible
                    benefits!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  -->
                <!-- Start Pricing Style-2  --> */}
        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h2 className="title w-600 mb--20">Join Our Reseller Program</h2>
                  <p>Expand your business effortlessly with our hassle-free, dedicated server reseller program.
                    Offer high-performance dedicated servers at unbeatable prices, along with exclusive
                    discounts—all with no hidden fees, minimum commitments, or upfront costs.
                    {" "}
                  </p>
                  <p>
                    Our reseller program is designed to help you unlock new growth opportunities, boost your
                    revenue, and expand your client base. Take your business to the next level by delivering
                    premium solutions your customers will love.{" "}
                  </p>
                  <Link className="btn-default" href="/affiliate">
                    Join Now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Pricing Style-2  --> */}

        {/* <!-- Start Advanced Tab area --> */}
        <div className="rainbow-advance-tab-area aiwave-bg-gradient rainbow-section-gap-big">
          <div className="container">
            <div className="html-tabs" data-tabs="true">
              <div className="row row--30">
                <div className="col-lg-12">
                  <div className="section-title text-center">
                    <h2 className="title w-600 mb--20">
                      Why Join the Reseller Program?
                    </h2>
                  </div>
                </div>
                <div className="col-lg-12 mt--60">
                  <div className="advance-tab-button advance-tab-button-1 right-top">
                    <ul className="nav nav-tabs tab-button-list">
                      <li className="col-lg-3 nav-item" role="presentation">
                        <div className="tab tab-new">
                          <div className="count-text mb-5">
                            <span className="theme-gradient">
                              <img
                                src={`${assets}/images/added/r-one.svg`}
                                alt="Bg Shape"
                              />
                            </span>
                          </div>
                          <h4 className="title">Exclusive Discounts </h4>
                          <p className="description sal-animate mb-0">
                            Gain access to industry-leading pricing on dedicated
                            servers, maximizing your profit.
                          </p>
                        </div>
                      </li>

                      <li className="col-lg-3 nav-item" role="presentation">
                        <div className="tab tab-new">
                          <div className="count-text mb-5">
                            <span className="theme-gradient">
                              <img
                                src={`${assets}/images/added/r-two.svg`}
                                alt="Bg Shape"
                              />
                            </span>
                          </div>
                          <h4 className="title">Zero Commitments</h4>
                          <p className="description sal-animate mb-0">
                            No upfront costs or minimum requirements—start
                            reselling without any barriers.
                          </p>
                        </div>
                      </li>

                      <li className="col-lg-3 nav-item" role="presentation">
                        <div className="tab tab-new">
                          <div className="count-text mb-5">
                            <span className="theme-gradient">
                              <img
                                src={`${assets}/images/added/r-three.svg`}
                                alt="Bg Shape"
                              />
                            </span>
                          </div>
                          <h4 className="title">Solutions</h4>
                          <p className="description sal-animate mb-0">
                            Rebrand our premium services to match your business
                            and build trust with customers.
                          </p>
                        </div>
                      </li>
                      <li className="col-lg-3 nav-item" role="presentation">
                        <div className="tab tab-new">
                          <div className="count-text mb-5">
                            <span className="theme-gradient">
                              <img
                                src={`${assets}/images/added/r-four.svg`}
                                alt="Bg Shape"
                              />
                            </span>
                          </div>
                          <h4 className="title">24/7 Support</h4>
                          <p className="description sal-animate mb-0">
                            We are available 24x7 without creating any issues or
                            downtime for your servers.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-shape">
            <img
              src={`${assets}/images/bg/split-bg-shape.png`}
              alt="Bg Shape"
            />
          </div>
        </div>
      </div>
      {/* <!-- Start Pricing Area  --> */}

      <Location />
      <Footer />
    </Fragment>
  );
};

export default Reseller;
