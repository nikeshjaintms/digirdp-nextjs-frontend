'use client'
import React, { Fragment, useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import Link from 'next/link';
const assets = '/assets';

function Footer() {
    const [v_p_s, set_Vps] = useState([]);

    const [rdps, set_Rdps] = useState([]);
    const [rdp_location, set_Rdp_location] = useState([]);
    const [dedicated, set_Dedicated] = useState([]);
    const [config, set_config] = useState([]);
    const [logo, set_logo] = useState([]);
    const [loading, setLoading] = useState([]);
    const [hostingMenu, setHostingMenu] = useState([]);
    const [hostings, setHostings] = useState([]);
    const [activeHostingTab, setActiveHostingTab] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/logo`)
            .then((response) => {
                set_logo(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error logo data:", error);
            });
    }, [])

    useEffect(() => {

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/configurations`)
            .then((response) => {
                set_config(response.data)
            })
            .catch((error) => {
                console.error("Error fetching RDP data:", error);
            });
    }, [])

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/windows_rdps`)
            .then((response) => {
                set_Rdps(response.data[1]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching RDP data:", error);
            });
    }, [])

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cloud_vps`)
            .then((response) => {
                set_Vps(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching VPS data:", error);
            });
    }, [])

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dedicated_server`)
            .then((response) => {
                set_Dedicated(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching Dedicated data:", error);
            });
    }, [])

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/r_d_p_by_locations`)
            .then((response) => {
                set_Rdp_location(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching VPS data:", error);
            });
    }, [])

    useEffect(() => {
            axios
                .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/web-hosting`)
                .then((response) => {
                    setHostingMenu(response.data[0]);
                    setHostings(response.data[1]);
                    if (response.data[0].length > 0) {
                        setActiveHostingTab(response.data[0][0].menu_item_name);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching Hosting data:", error);
                });
        }, []);


    useEffect(() => {
        // backToTopInit functionality
        const backToTopInit = () => {
            const scrollTop = $('.rainbow-back-top');

            // Show or hide the back-to-top button based on scroll position
            $(window).scroll(function () {
                const topPos = $(this).scrollTop();
                if (topPos > 150) {
                    $(scrollTop).css('opacity', '1');
                } else {
                    $(scrollTop).css('opacity', '0');
                }
            });

            // Smooth scroll to the top when the button is clicked
            $(scrollTop).on('click', function () {
                $('html, body').animate(
                    {
                        scrollTop: 0,
                    },
                    300 // Adjust duration for smooth scrolling
                );
                return false;
            });
        };

        // Initialize back-to-top functionality
        backToTopInit();
    }, []); // Run only once on component mount

    useEffect(() => {
        const initProgressIndicator = () => {
            // Select the SVG path element
            const path = document.querySelector('.rbt-progress-parent path');
            const pathLength = path.getTotalLength();

            // Set up initial styles for the path
            path.style.transition = path.style.WebkitTransition = 'none';
            path.style.strokeDasharray = `${pathLength} ${pathLength}`;
            path.style.strokeDashoffset = pathLength;
            path.getBoundingClientRect(); // Trigger layout
            path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

            // Function to update the stroke-dashoffset on scroll
            const updateProgress = () => {
                const scrollTop = $(window).scrollTop();
                const docHeight = $(document).height();
                const winHeight = $(window).height();
                const scrollPercent = scrollTop / (docHeight - winHeight);
                path.style.strokeDashoffset = pathLength * (1 - scrollPercent);
            };

            // Initial call to set up the progress
            updateProgress();
            $(window).on('scroll', updateProgress);

            // Toggle back-to-top button visibility on scroll
            $(window).on('scroll', () => {
                if ($(window).scrollTop() > 50) {
                    $('.rbt-progress-parent').addClass('rbt-backto-top-active');
                } else {
                    $('.rbt-progress-parent').removeClass('rbt-backto-top-active');
                }
            });

            // Scroll to top on button click
            $('.rbt-progress-parent').on('click', (event) => {
                event.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 550);
            });
        };

        // Initialize the progress indicator
        initProgressIndicator();
    }, []); // Empty dependency array ensures the effect runs only once



    return (
        <div>
            {/* <!-- Start Footer Area  --> */}
            <footer className="rainbow-footer footer-style-default footer-style-3 position-relative">
                <div className="footer-top">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="logo">
                                        <Link href="/">
                                        {loading ? null : 
                                        (<>
                                            <img className="logo-dark" src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${logo.light_logo}`} alt="ChatBot Logo" />
                                            <img className="logo-light" src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${logo.logo_name}`} alt="ChatBot Logo" />
                                        </>)}
                                        </Link>
                                    </div>
                                    <p className="b1 desc-text">Your Ultimate Destination for Hosting Solutions</p>
                                    <div className="rainbow-footer-widget">
                                        <div className="widget-menu-bottom">
                                            <h4 className="title mb-0">Follow Us!</h4>
                                            <div className="inner mt-0">
                                                <ul className="footer-link link-hover d-flex">
                                                    <li className="li-icon"><Link href={`${config.insta}`} target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></Link></li>
                                                    <li className="li-icon"><Link href={`${config.fb}`} target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook" ></i></Link></li>
                                                    <li className="li-icon"><Link href={`${config.github}`} target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></Link></li>
                                                    <li className="li-icon"><Link href={`${config.twitter}`} target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="widget-menu-bottom">
                                        <h4 className="title">Windows RDP</h4>
                                        <div className="inner has-show-more">
                                            <ul className="footer-link link-hover list-style--1 has-show-more-inner-content">
                                                {rdps
                                                    .filter((rdp) => rdp.show_in_header === 1)
                                                    .map((rdp, index) => (
                                                        <li key={index}><Link href={`/rdp-plan/${rdp.url_text}`}>{rdp.name}</Link></li>
                                                    ))}
                                              
                                            </ul>
                                            <div className="rbt-show-more-btn">Show More</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="widget-menu-top">
                                        <h4 className="title">Dedicated Server</h4>
                                        <div className="inner has-show-more">
                                            <ul className="footer-link link-hover list-style--1 has-show-more-inner-content">
                                                {dedicated
                                                    .filter((dedicate) => dedicate.show_in_header === 1)
                                                    .map((dedicate, index) => (
                                                        <li key={index}><Link href={`/dedicated-plan/${dedicate.url_text}`}>{dedicate.name}</Link></li>
                                                    ))}
                                            </ul>
                                            <div className="rbt-show-more-btn">Show More</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="widget-menu-top">
                                        <h4 className="title">Cloud VPS</h4>
                                        <div className="inner has-show-more">
                                            <ul className="footer-link link-hover list-style--1 has-show-more-inner-content">
                                                {v_p_s
                                                    .filter((vps) => vps.show_in_header === 1)
                                                    .map((vps, index) => (
                                                        <li key={index}><Link href={`/cloud-vps-plan/${vps.url_text}`}>{vps.name}</Link></li>
                                                    ))}
                                            </ul>
                                            <div className="rbt-show-more-btn">Show More</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="widget-menu-bottom">
                                        <h4 className="title">Hosting</h4>
                                        <div className="inner has-show-more">
                                            <ul className="footer-link link-hover list-style--1 has-show-more-inner-content">
                                            {hostings
                                                .filter((hosting) => hosting.show_in_header === 1)
                                                .map((hosting, index) => (
                                                <li key={index}><Link href={`/hosting/${hosting.url_text}`}>{hosting.name}</Link></li>
                                                ))}
                                            </ul>
                                            <div className="rbt-show-more-btn">Show More</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="widget-menu-top">
                                        <h4 className="title">Private RDP</h4>
                                        <div className="inner has-show-more">
                                            <ul className="footer-link link-hover list-style--1 has-show-more-inner-content">
                                                {rdp_location
                                                    .filter((rdp_loc) => rdp_loc.show_in_header === 1)
                                                    .map((rdp_loc, index) => (
                                                        <li key={index}><Link href={`/private-rdp/${rdp_loc.url_text}`}>{rdp_loc.name}</Link></li>

                                                    ))}
                                               
                                            </ul>
                                            <div className="rbt-show-more-btn">Show More</div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- End Footer Area  -->
            <!-- Start Copy Right Area  --> */}
            <div className="copyright-area copyright-style-one">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="copyright-left">
                                <ul className="ft-menu link-hover">
                                    <li>
                                        <Link href="/legal">Legal</Link>
                                    </li>
                                    <li>
                                        <Link href="/about">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/career">Career</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" rel="noreferrer" href="https://manage.digirdp.com/index.php?m=abusemanagerpro">Report Abuse</Link>
                                    </li>
                                    <li className='d-xxl-none d-xl-block d-lg-block d-block'>
                                        <p className="copyright-text">Copyright © 2019-{new Date().getFullYear()} <Link href="/" className="btn-read-more"><span> DigiRDP </span></Link></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4 col-sm-12 col-12 d-xxl-block d-xl-none d-lg-none d-none">
                            <div className="copyright-right text-center text-lg-end">
                                <p className="copyright-text">Copyright © 2019-{new Date().getFullYear()} <Link href="/" className="btn-read-more"><span>DigiRDP </span></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Copy Right Area  --> */}
            <div className="rbt-progress-parent rainbow-back-top" style={{ opacity: 0 }}>
                <svg className="rbt-back-circle svg-inner" width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                </svg>
            </div>
        </div>
    )
}

export default Footer
