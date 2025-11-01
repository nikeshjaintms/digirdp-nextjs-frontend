"use client";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
const assets = "/assets";

const Promo = (Page) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Copy");
  const [sliders, setSliders] = useState([]);

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

  return (
    <Fragment>
      {/* <!-- Start Blog Area  --> */}
      <div className="rainbow-blog-area ">
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
              {sliders
                .filter((slider) => slider.page_id === Page)
                .map((slider) => (
                  <div className="slide col-lg-3 col-md-6 col-sm-12">
                    <div className="img-container">
                      <img
                        src={`${assets}/images/added/cop-2.png`}
                        alt=""
                        className="burger-image"
                      />
                      <div className="burger-info">
                        <div className="burger-title" title="">
                          {" "}
                          Save 20% on All DigiRDP Services!
                        </div>
                        <div className="burger-description" offer_code="">
                          #SAVE20
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
              {/* <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-2.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20</div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-1.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20</div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-2.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20</div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-1.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-2.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-1.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-2.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-1.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-2.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-1.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-2.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-1.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-2.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-1.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-2.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-1.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20
                                        </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="slide col-lg-3 col-md-6 col-sm-12">
                                <div className="img-container">
                                    <img src={`${assets}/images/added/cop-2.png`} alt="" className="burger-image" />
                                    <div className="burger-info">
                                        <div className="burger-title"> Save 20% on All DigiRDP Services!</div>
                                        <div className="burger-description">#SAVE20 </div>
                                        <button className="add-to-cart" onClick={handleCopyCoupon}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Promo;
