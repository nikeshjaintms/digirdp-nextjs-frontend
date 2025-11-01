'use client'
import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
const assets = '/assets';

const FeatureSlider = () => {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Default for larger screens (desktop)
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        customPaging: (i) => {
            if (i < 3) { // Only show dots for the first three slides
                return <button>{i + 1}</button>;
            }
            // Instead of returning null, ensure you handle other cases properly
            return <span style={{ display: 'none' }} />;
        },
        responsive: [
            {
                breakpoint: 1200, // For large screens (desktop)
                settings: {
                    slidesToShow: 3,  // Show 3 slides
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992, // For tablets
                settings: {
                    slidesToShow: 2,  // Show 2 slides
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // For mobile view
                settings: {
                    slidesToShow: 1,  // Show 1 slide on mobile
                    slidesToScroll: 1,
                },
            },
        ],
    };
    

    const [features, setfeatures] = useState([]);

    useEffect(() => {
        // Fetch slider data from Laravel API
        axios
          .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/DBfeaturesCard`)
          .then((response) => {
            setfeatures(response.data);
          })
          .catch((error) => {
            console.error("Error fetching slider data:", error);
          });
      }, []);


    return (
        <Fragment>

            <Slider {...sliderSettings}>
            {features.map((feature,index) => (
                <div className="slide-single-layout" key={index}>
                    <div className="rainbow-box-card card-style-default aiwave-service-default has-bg-shaped">
                        <div className="inner">
                            {feature.card_image ? 
                            <div className="icon">
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${feature.card_image}`} alt="Servece Icon" style={{ borderRadius: '50px', width: '40px', height: '40px', }} />
                            </div>
                            :""}
                            <div className="description centered-shape">
                                <h5 className="title">{feature.card_title}</h5>
                                <div className="desc">{feature.card_content}</div>
                                {/* <Link className="read-more-btn" href="/">Explore More <span><i
                                    className="fa-sharp fa-solid fa-arrow-right"></i></span></Link> */}
                            </div>
                        </div>
                        <div className="bg-shaped">
                            <img src={`${assets}/images/service/bg.png`} alt="service" className="bg shape-dark" />
                            <img src={`${assets}/images/service/bg-hover.png`} alt="service" className="bg-hover shape-dark" />
                            <img src={`${assets}/images/light/service/bg.png`} alt="service" className="bg shape-light" />
                            <img src={`${assets}/images/light/service/bg-hover.png`} alt="service" className="bg-hover shape-light" />
                        </div>
                    </div>
                </div>
                 ))}
                {/* <div className="slide-single-layout" >
                    <div className="rainbow-box-card card-style-default aiwave-service-default has-bg-shaped" >
                        <div className="inner">
                            <div className="icon">
                                <img src={`assets/images/added/service-icon-02.svg`} alt="Servece Icon" />
                            </div>
                            <div className="description centered-shape">
                                <h5 className="title">One Click Setup</h5>
                                <p className="desc">No need to dig into a bunch of documentation. Simply install
                                    OS like Windows, Linux! and more. in just a single click by our strong
                                    dedicated control panel.</p>
                                <Link className="read-more-btn" href="/">Explore More <span><i
                                    className="fa-sharp fa-solid fa-arrow-right"></i></span></Link>
                            </div>
                        </div>
                        <div className="bg-shaped">
                            <img src="assets/images/service/bg.png" alt="" className="bg shape-dark" />
                            <img src="assets/images/service/bg-hover.png" alt=""
                                className="bg-hover shape-dark" />
                            <img src="assets/images/light/service/bg.png" alt="" className="bg shape-light" />
                            <img src="assets/images/light/service/bg-hover.png" alt=""
                                className="bg-hover shape-light" />
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-box-card card-style-default aiwave-service-default has-bg-shaped">
                        <div className="inner">
                            <div className="icon">
                                <img src={`assets/images/added/service-icon-03.svg`} alt="Servece Icon" />
                            </div>
                            <div className="description centered-shape">
                                <h5 className="title">99.99% Uptime Guarantee</h5>
                                <p className="desc">With multiple data center locations, redundant cooling,
                                    emergency generators, and constant monitoring, we are able to offer our
                                    99.99% Uptime Guarantee.</p>
                                <Link className="read-more-btn" href="/">Explore More <span><i
                                    className="fa-sharp fa-solid fa-arrow-right"></i></span></Link>
                            </div>
                        </div>
                        <div className="bg-shaped">
                            <img src="assets/images/service/bg.png" alt="" className="bg shape-dark" />
                            <img src="assets/images/service/bg-hover.png" alt=""
                                className="bg-hover shape-dark" />
                            <img src="assets/images/light/service/bg.png" alt="" className="bg shape-light" />
                            <img src="assets/images/light/service/bg-hover.png" alt=""
                                className="bg-hover shape-light" />
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-box-card card-style-default aiwave-service-default has-bg-shaped">
                        <div className="inner">
                            <div className="icon">
                                <img src={`assets/images/added/service-icon-04.svg`} alt="Servece Icon" />
                            </div>
                            <div className="description centered-shape">
                                <h5 className="title">Images</h5>
                                <p className="desc">Windows, Ubuntu, Debian, Fedora, and more – you have a wide
                                    variety of operating systems to choose from, and of course, we provide
                                    the most-current release.</p>
                                <Link className="read-more-btn" href="/">Explore More <span><i
                                    className="fa-sharp fa-solid fa-arrow-right"></i></span></Link>
                            </div>
                        </div>
                        <div className="bg-shaped">
                            <img src="assets/images/service/bg.png" alt="" className="bg shape-dark" />
                            <img src="assets/images/service/bg-hover.png" alt=""
                                className="bg-hover shape-dark" />
                            <img src="assets/images/light/service/bg.png" alt="" className="bg shape-light" />
                            <img src="assets/images/light/service/bg-hover.png" alt=""
                                className="bg-hover shape-light" />
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-box-card card-style-default aiwave-service-default has-bg-shaped">
                        <div className="inner">
                            <div className="icon">
                                <img src={`assets/images/added/service-icon-05.svg`} alt="Servece Icon" />
                            </div>
                            <div className="description centered-shape">
                                <h5 className="title">Affordable Prices.</h5>
                                <p className="desc">DigiRDP specializes in providing virtual desktops to
                                    individuals and businesses looking to improve their work efficiency. Our
                                    service is fast and reliable. We provide a 99.99% uptime guarantee in
                                    addition to having affordable prices, allowing anyone to take advantage
                                    of our service no matter the size of their budget.</p>
                                <Link className="read-more-btn" href="/">Explore More <span><i
                                    className="fa-sharp fa-solid fa-arrow-right"></i></span></Link>
                            </div>
                        </div>
                        <div className="bg-shaped">
                            <img src="assets/images/service/bg.png" alt="" className="bg shape-dark" />
                            <img src="assets/images/service/bg-hover.png" alt=""
                                className="bg-hover shape-dark" />
                            <img src="assets/images/light/service/bg.png" alt="" className="bg shape-light" />
                            <img src="assets/images/light/service/bg-hover.png" alt=""
                                className="bg-hover shape-light" />
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-box-card card-style-default aiwave-service-default has-bg-shaped">
                        <div className="inner">
                            <div className="icon">
                                <img src={`assets/images/added/service-icon-06.svg`} alt="Servece Icon" />
                            </div>
                            <div className="description centered-shape">
                                <h5 className="title">Powerful AMD EPYC and Intel Xeon Processor</h5>
                                <p className="desc">We offer the latest hardware and software to help you get
                                    things done fast. With a powerful AMD EPYC or Intel Xeon Processor, NVMe
                                    disk, and Windows OS included for free. You'll have all the tools to
                                    succeed.</p>
                                <Link className="read-more-btn" href="/">Explore More <span><i
                                    className="fa-sharp fa-solid fa-arrow-right"></i></span></Link>
                            </div>
                        </div>
                        <div className="bg-shaped">
                            <img src="assets/images/service/bg.png" alt="" className="bg shape-dark" />
                            <img src="assets/images/service/bg-hover.png" alt=""
                                className="bg-hover shape-dark" />
                            <img src="assets/images/light/service/bg.png" alt="" className="bg shape-light" />
                            <img src="assets/images/light/service/bg-hover.png" alt=""
                                className="bg-hover shape-light" />
                        </div>
                    </div>
                </div> */}


            </Slider>
            {/* <!-- End Testimonial Area  --> */}
        </Fragment>
    );
}

export default FeatureSlider;
