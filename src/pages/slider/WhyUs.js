import React, { Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
const assets = '/assets';

const WhyUs = () => {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Default for larger screens
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        responsive: [
            {
                breakpoint: 768, // Mobile view breakpoint
                settings: {
                    slidesToShow: 1, // Show 1 slide on mobile
                    slidesToScroll: 1, // Scroll 1 slide at a time
                },
            },
        ],
    };




    return (
        <Fragment>

            <Slider {...sliderSettings}>
                <div className="slide-single-layout">
                    <div className="rainbow-card undefined">
                        <div className="inner">
                            <div className="thumbnail">
                                <Link className="image" href="/"><img src={`${assets}/images/added/why-1.jpg`}  alt="Blog" />
                                </Link>
                            </div>
                            <div className="content">
                                <h4 className="title"><Link href="/">Dedicated IP</Link></h4>
                                <p className="description">Digirdp Dedicated IPV4 comes with Fresh and clean IP address.</p>
                                {/* <Link className="btn-read-more border-transparent" href="/"><span>Read More <i className="fa-sharp fa-regular fa-arrow-right"></i></span></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-card undefined">
                        <div className="inner">
                            <div className="thumbnail">
                                <Link className="image" href="/"><img src={`${assets}/images/added/why-2.jpg`} alt="Blog" />
                                </Link>
                            </div>
                            <div className="content">
                                <h4 className="title"><Link href="/">Unlimited Bandwidth</Link></h4>
                                <p className="description">You are offered Unmetered bandwidth on our DigiRDP All Admin RDP/Private RDP plans, never ever falling short.</p>
                                {/* <Link className="btn-read-more border-transparent" href="/"><span>Read More <i className="fa-sharp fa-regular fa-arrow-right"></i></span></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-card undefined">
                        <div className="inner">
                            <div className="thumbnail">
                                <Link className="image" href="/"><img src={`${assets}/images/added/why-3.jpg`}  alt="Blog" />
                                </Link>
                            </div>
                            <div className="content">
                                <h4 className="title"><Link href="/">Admin Access</Link></h4>
                                <p className="description">Yes, this service comes with OS-level Administrator/Root Access. You can install and configure all kinds of software you need on Windows RDP.</p>
                                {/* <Link className="btn-read-more border-transparent" href="/"><span>Read More <i className="fa-sharp fa-regular fa-arrow-right"></i></span></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-card undefined">
                        <div className="inner">
                            <div className="thumbnail">
                                <Link className="image" href="/"><img src={`${assets}/images/added/why-4.jpg`} alt="Blog" />
                                </Link>
                            </div>
                            <div className="content">
                                <h4 className="title"><Link href="/">99.9% Uptime</Link></h4>
                                <p className="description">We are providing RDP with almost 99.9% uptime. We guarantee you for 99.9% of server uptime.</p>
                                {/* <Link className="btn-read-more border-transparent" href="/"><span>Read More <i className="fa-sharp fa-regular fa-arrow-right"></i></span></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-card undefined">
                        <div className="inner">
                            <div className="thumbnail">
                                <Link className="image" href="/"><img src={`${assets}/images/added/why-5.jpg`} alt="Blog" /></Link>
                            </div>
                            <div className="content">
                                <h4 className="title"><Link href="/">100% Security</Link></h4>
                                <p className="description">Your server will be secured against constant threats with our custom security rules, and real-time 24/7 security monitoring.</p>
                                {/* <Link className="btn-read-more border-transparent" href="/"><span>Read More <i className="fa-sharp fa-regular fa-arrow-right"></i></span></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-card undefined">
                        <div className="inner">
                            <div className="thumbnail">
                                <Link className="image" href="/"><img src={`${assets}/images/added/why-6.jpg`} alt="Blog" />
                                </Link>
                            </div>
                            <div className="content">
                                <h4 className="title"><Link href="/">Fast Activation</Link></h4>
                                <p className="description">Generally all the RDP details sent INSTANT to upto 6 hours after payment confirmation. In some cases, if manual verification or custom configuration it may take upto 12 hours to 24 hours Max.</p>
                                {/* <Link className="btn-read-more border-transparent" href="/"><span>Read More <i className="fa-sharp fa-regular fa-arrow-right"></i></span></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-card undefined">
                        <div className="inner">
                            <div className="thumbnail">
                                <Link className="image" href="/"><img src={`${assets}/images/added/why-7.jpg`}  alt="Blog" />
                                </Link>
                            </div>
                            <div className="content">
                                <h4 className="title"><Link href="/">Incredible Performance</Link></h4>
                                <p className="description">Our Windows RDP services are based on enterprise-grade hardware to enhance the operating system's speed and performance.</p>
                                {/* <Link className="btn-read-more border-transparent" href="/"><span>Read More <i className="fa-sharp fa-regular fa-arrow-right"></i></span></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-single-layout">
                    <div className="rainbow-card undefined">
                        <div className="inner">
                            <div className="thumbnail">
                                <Link className="image" href="/"><img src={`${assets}/images/added/why-8.jpg`} alt="Blog" /></Link>
                            </div>
                            <div className="content">
                                <h4 className="title"><Link href="/">Online Support</Link></h4>
                                <p className="description">Our dedicated in-house support team is available 24/7 to answer all technical difficulties you may encounter with any of our products.</p>
                                {/* <Link className="btn-read-more border-transparent" href="/"><span>Read More <i className="fa-sharp fa-regular fa-arrow-right"></i></span></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
            {/* <!-- End Testimonial Area  --> */}
        </Fragment>
    );
}

export default WhyUs;
