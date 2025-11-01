'use client';
import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Link from "next/link";
const assets = '/assets';


const Testimonial = () => {


    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Default for desktop
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
                breakpoint: 1200, // For large screens (desktop)
                settings: {
                    slidesToShow: 2,  // Show 3 slides
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
                breakpoint: 768, // For small devices (mobile)
                settings: {
                    slidesToShow: 1,  // Show 1 slide
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const [tests, setTests] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/DBtestimonials`)
            .then((response) => {
                setTests(response.data)
            })
            .catch((error) => {
                console.error("Error fetching slider data:", error);
            });
    }, [])



    return (
        <Fragment>

            <Slider {...sliderSettings}>
                {tests.map((test, index) => (
                    <div className="slide-single-layout" key={index}>
                        <div className="rainbow-box-card card-style-default testimonial-style-defalt has-bg-shaped">
                            <div className="inner">
                                <div className="rating">
                                    <Link href="#rating">
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </Link>
                                    <Link href="#rating">
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </Link>
                                    <Link href="#rating">
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </Link>
                                    <Link href="#rating">
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </Link>
                                    <Link href="#rating">
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </Link>
                                </div>
                                <div className="content">
                                    <span className="description"><div dangerouslySetInnerHTML={{ __html: test.testimonials }} /></span>
                                    <div className="bottom-content">
                                        <div className="meta-info-section">
                                            <span className="title-text">{test.name}</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-shape">
                                <img src={`${assets}/images/service/bg-testimonial.png`} alt="img" className="bg shape-dark" />
                                <img src={`${assets}/images/service/bg-testimonial-hover.png`} alt="img" className="bg-hover shape-dark" />
                                <img src={`${assets}/images/light/service/bg-testimonial.png`} alt="img" className="bg shape-light" />
                                <img src={`${assets}/images/light/service/bg-testimonial-hover.png`} alt="img" className="bg-hover shape-light" />
                            </div>
                        </div>
                    </div>
                ))}

                {/* <div className="slide-single-layout">
                    <div className="rainbow-box-card card-style-default testimonial-style-defalt has-bg-shaped">
                        <div className="inner">
                            <div className="rating">
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                            </div>
                            <div className="content">
                                <p className="description">Their Service is at Top Notch . And the best thing about them which i liked the most is the renewal of rdp's they offer you a 24*7 service.</p>
                                <div className="bottom-content">
                                    <div className="meta-info-section">
                                        <p className="title-text">Their Service is at Top Notch</p>
                                        <p className="desc">Software Engineer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-shape">
                            <img src="assets/images/service/bg-testimonial.png" alt="" className="bg shape-dark" />
                            <img src="assets/images/service/bg-testimonial-hover.png" alt="" className="bg-hover shape-dark" />
                            <img src="assets/images/light/service/bg-testimonial.png" alt="" className="bg shape-light" />
                            <img src="assets/images/light/service/bg-testimonial-hover.png" alt="" className="bg-hover shape-light" />
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-box-card card-style-default testimonial-style-defalt has-bg-shaped">
                        <div className="inner">
                            <div className="rating">
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                            </div>
                            <div className="content">
                                <p className="description">Their Service is at Top Notch . And the best thing about them which i liked the most is the renewal of rdp's they offer you a 24*7 service.</p>
                                <div className="bottom-content">
                                    <div className="meta-info-section">
                                        <p className="title-text">Their Service is at Top Notch</p>
                                        <p className="desc">Software Engineer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-shape">
                            <img src="assets/images/service/bg-testimonial.png" alt="" className="bg shape-dark" />
                            <img src="assets/images/service/bg-testimonial-hover.png" alt="" className="bg-hover shape-dark" />
                            <img src="assets/images/light/service/bg-testimonial.png" alt="" className="bg shape-light" />
                            <img src="assets/images/light/service/bg-testimonial-hover.png" alt="" className="bg-hover shape-light" />
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div
                        className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                        <div className="inner">
                            <div className="rating">
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                                <Link href="#rating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </Link>
                            </div>
                            <div className="content">
                                <p className="description">Their Service is at Top Notch . And the best thing about them which i liked the most is the renewal of rdp's they offer you a 24*7 service.</p>
                                <div className="bottom-content">
                                    <div className="meta-info-section">
                                        <p className="title-text">Their Service is at Top Notch</p>
                                        <p className="desc">Software Engineer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-shape">
                            <img src="assets/images/service/bg-testimonial.png" alt="" className="bg shape-dark" />
                            <img src="assets/images/service/bg-testimonial-hover.png" alt="" className="bg-hover shape-dark" />
                            <img src="assets/images/light/service/bg-testimonial.png" alt="" className="bg shape-light" />
                            <img src="assets/images/light/service/bg-testimonial-hover.png" alt="" className="bg-hover shape-light" />
                        </div>
                    </div>
                </div>  */}


            </Slider>
            {/* <!-- End Testimonial Area  --> */}
        </Fragment>
    );
}

export default Testimonial;
