'use client';
import React, { Fragment, useState, useEffect } from "react";
import Link from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
const assets = '/assets';

const BlogSlider = () => {
    const sliderSettings = {
        dots: false,
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


    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        // Fetch slider data from Laravel API
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/DBblog`)
            .then((response) => {
                setBlogs(response.data[1]);
            })
            .catch((error) => {
                console.error("Error fetching slider data:", error);
            });
    }, []);





    return (
        <Fragment>

            <Slider {...sliderSettings}>
                {blogs
                    .filter(blog => blog.home === 1)
                    .map((blog, index) => (
                        <div className="slide-single-layout" key={index}>
                            <div className="rainbow-card undefined">
                                <div className="inner">
                                    <div className="thumbnail">
                                        <Link className="image" href={`/blog/${blog.slug}`}><img src={`${blog.feature_image}` ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${blog.feature_image}` : `${assets}/images/added/blog-3.jpg`} alt="Blog" />
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <ul className="rainbow-meta-list">
                                            <li><i className="fa-sharp fa-regular fa-calendar-days icon-left"></i>{new Date(blog.created_at).toLocaleDateString()}</li>
                                            <li className="separator"></li>
                                            <li className="catagory-meta"><a href="#">{blog.user_name}</a></li>
                                        </ul>
                                        <h4 className="title"><Link href={`/blog/${blog.slug}`}>{blog.title}</Link></h4>
                                        {/* <p className="description"><div dangerouslySetInnerHTML={{__html:blog.description.substring(0,50)}} /> </p> */}
                                        <Link className="btn-read-more border-transparent" href={`/blog/${blog.slug}`}><span>Read More <i className="fa-sharp fa-regular fa-arrow-right"></i></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>))}
            </Slider>
            {/* <!-- End Testimonial Area  --> */}
        </Fragment>
    );
}

export default BlogSlider;
