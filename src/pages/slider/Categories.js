import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link'
import axios from "axios";
// const assets = '/assets';

const Categories = () => {

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

    const [windows, setwindows] = useState([]);
    const [cloud, setcloud] = useState([]);
    const [dedicted, dedicated] = useState([]);
    const [privates, setprivate] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/all_data`)
            .then((response) => {
                setwindows(response.data[0])
                setcloud(response.data[2])
                dedicated(response.data[1])
                setprivate(response.data[3])
            })
            .catch((error) => {
                console.error("Error fetching slider data:", error);
            });
    }, [])




    return (
        <Fragment>

            <Slider {...sliderSettings}>
                {windows.map((rdp, index) => (
                    <div className="slide-single-layout" key={index}>
                        <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                            <Link href={`/rdp-plan/${rdp.url_text}`}>
                                <div className="inner inner-new">
                                    <div className="content text-center">
                                        <div className="bottom-content">
                                            {rdp.logo ?
                                                <div className="meta-info-section">
                                                    <div className="desc-img">
                                                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${rdp.logo}`} alt="brand" />
                                                    </div>
                                                </div>
                                                : " "}
                                        </div>
                                        <h5 className="pt-3">{rdp.name}</h5>
                                        <p className="m-0">{rdp.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
                {dedicted.map((dedic, index) => (
                    <div className="slide-single-layout" key={index}>
                        <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                            <Link href={`/dedicated-plan/${dedic.url_text}`}>
                                <div className="inner inner-new">
                                    <div className="content text-center">
                                        <div className="bottom-content">
                                            {dedic.logo ?
                                                <div className="meta-info-section">
                                                    <div className="desc-img">
                                                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${dedic.logo}`} alt="brand" style={{ borderRadius: '50px', width: '40px', height: '40px', }} />
                                                    </div>
                                                </div>
                                                : " "}
                                        </div>
                                        <h5 className="pt-3">{dedic.name}</h5>
                                        <p className="m-0">{dedic.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
                {cloud.map((vps, index) => (
                    <div className="slide-single-layout" key={index}>
                        <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                            <Link href={`/cloud-vps-plan/${vps.url_text}`}>
                                <div className="inner inner-new">
                                    <div className="content text-center">
                                        <div className="bottom-content">
                                            {vps.logo ?
                                                <div className="meta-info-section">
                                                    <div className="desc-img">
                                                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${vps.logo}`} alt="brand" />
                                                    </div>
                                                </div>
                                                : " "}
                                        </div>
                                        <h5 className="pt-3">{vps.name}</h5>
                                        <p className="m-0">{vps.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
                {privates.map((pvt, index) => (
                    <div className="slide-single-layout" key={index}>
                        <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                            <Link href={`/private-rdp/${pvt.url_text}`}>
                                <div className="inner inner-new">
                                    <div className="content text-center">
                                        <div className="bottom-content">
                                            {pvt.logo ?
                                                <div className="meta-info-section">
                                                    <div className="desc-img">
                                                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${pvt.logo}`} alt="brand" />
                                                    </div>
                                                </div>
                                                : " "}
                                        </div>
                                        <h5 className="pt-3">{pvt.name}</h5>
                                        <p className="m-0">{pvt.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}


            </Slider>
            {/* <!-- End Testimonial Area  --> */}

        </Fragment>
    );
}

export default Categories;
