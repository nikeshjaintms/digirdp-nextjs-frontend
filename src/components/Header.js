"use client";
import React, { Fragment, useEffect, useState, useRef } from "react";
import $ from "jquery";
import ThemeSwitcher from "../pages/ThemeSwitcher";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useCurrency } from "@/context/CurrencyProvider";
const Header = () => {
    const location = usePathname();
    const assets = "/assets";
    const [v_p_s, set_Vps] = useState([]);
    const [rdps, set_Rdps] = useState([]);  
    const [rdp_menu, set_Rdp_Menu] = useState([]);
    const [rdp_location, set_Rdp_location] = useState([]);
    const [dedicated, set_Dedicated] = useState([]);
    const [config, set_config] = useState([]);
    const [topBanner, set_topBanner] = useState([]);
    const [logo, set_logo] = useState([]);
    const { setAnotherCurrency } = useCurrency();
    const [currencies, setCurrencies] = useState([]);const [hostingMenu, setHostingMenu] = useState([]);
    const [hostings, setHostings] = useState([]);
    const [activeHostingTab, setActiveHostingTab] = useState("");
    const [isHostingMenuOpen, setIsHostingMenuOpen] = useState(false);

    //console.log({ currency });
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/top_banners`)
            .then((response) => {
                set_topBanner(response.data[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error top banner data:", error);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/logo`)
            .then((response) => {
                set_logo(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error logo data:", error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/configurations`)
            .then((response) => {
                set_config(response.data);
            })
            .catch((error) => {
                console.error("Error fetching RDP data:", error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/windows_rdps`)
            .then((response) => {
                set_Rdp_Menu(response.data[0]);
                set_Rdps(response.data[1]);
                if (response.data[0].length > 0) {
                    setActiveTab(response.data[0][0].menu_item_name); // Set the first tab as active initially
                }
            })
            .catch((error) => {
                console.error("Error fetching RDP data:", error);
            });
    }, []);

    const rdpPerColumn = rdps.length / 2;
    const chunkedrdp = rdps.length > 0 ? chunk(rdps, rdpPerColumn) : [];

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cloud_vps`)
            .then((response) => {
                set_Vps(response.data);
            })
            .catch((error) => {
                console.error("Error fetching VPS data:", error);
            });
    }, []);

    const vpsPerColumn = v_p_s.length / 2;
    const chunkedVps = v_p_s.length > 0 ? chunk(v_p_s, vpsPerColumn) : [];

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dedicated_server`)
            .then((response) => {
                set_Dedicated(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Dedicated data:", error);
            });
    }, []);

    const dedicatedPerColumn = dedicated.length / 2;
    const chunkeddedicated =
        dedicated.length > 0 ? chunk(dedicated, dedicatedPerColumn) : [];

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/r_d_p_by_locations`)
            .then((response) => {
                set_Rdp_location(response.data);
            })
            .catch((error) => {
                console.error("Error fetching VPS data:", error);
            });
    }, []);

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

    const rdp_locationPerColumn = rdp_location.length / 2;
    const chunkedRdp_location =
        rdp_location.length > 0 ? chunk(rdp_location, rdp_locationPerColumn) : [];

    function chunk(arr, size) {
        return Array.from(Array(Math.ceil(arr.length / size)), (_, i) =>
            arr.slice(i * size, i * size + size)
        );
    }

    useEffect(() => {
        const menuCurrentLink = () => {
            const currentPage = location.split("/");
            const current = currentPage[currentPage.length - 1];

            const highlightCurrentLink = (selector) => {
                $(selector).each(function () {
                    const $this = $(this);
                    if ($this.attr("href") === current) {
                        $this.addClass("active");
                        $this.parents(".has-menu-child-item").addClass("menu-item-open");
                    }
                });
            };

            highlightCurrentLink(".dashboard-mainmenu li a");
            highlightCurrentLink(".mainmenu li a");
            highlightCurrentLink(".user-nav li a");
        };

        const popupMobileMenu = () => {
            // Open mobile menu
            $(".hamberger-button").on("click", () => {
                $(".popup-mobile-menu").addClass("active");
            });

            // Close mobile menu
            $(".close-menu").on("click", () => {
                $(".popup-mobile-menu").removeClass("active");
                closeAllDropdowns(); // Close all dropdowns when the menu is closed
            });

            // Toggle dropdown functionality for mobile menu
            $(
                ".popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a"
            ).on("click", function (e) {
                e.preventDefault(); // Prevent default anchor behavior

                const $submenu = $(this).siblings(".submenu, .rainbow-megamenu"); // Target submenu
                const isOpen = $submenu.hasClass("active");

                // Close all other dropdowns
                $(".popup-mobile-menu .submenu, .popup-mobile-menu .rainbow-megamenu")
                    .not($submenu)
                    .removeClass("active")
                    .slideUp(300);

                $(
                    ".popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a"
                )
                    .not(this)
                    .removeClass("open");

                // Toggle current dropdown
                if (!isOpen) {
                    $submenu.addClass("active").slideDown(300); // Animate dropdown open
                    $(this).addClass("open"); // Add "open" class to the link
                } else {
                    $submenu.removeClass("active").slideUp(300); // Animate dropdown close
                    $(this).removeClass("open"); // Remove "open" class
                }
            });

            // Helper function to close all dropdowns
            const closeAllDropdowns = () => {
                $(
                    ".popup-mobile-menu .mainmenu .submenu, .popup-mobile-menu .mainmenu .rainbow-megamenu"
                )
                    .removeClass("active")
                    .slideUp(300); // Close all dropdowns
                $(
                    ".popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a"
                ).removeClass("open"); // Remove "open" class from all links
            };
        };

        const popupleftdashboard = () => {
            const updateSidebar = () => {
                if ($(window).width() >= 1600) {
                    $(".popup-dashboardleft-btn").removeClass("collapsed");
                    $(".popup-dashboardleft-section").removeClass("collapsed");
                } else {
                    $(".popup-dashboardleft-btn").addClass("collapsed");
                    $(".popup-dashboardleft-section").addClass("collapsed");
                }
            };

            $(
                ".popup-dashboardleft-btn, .popup-dashboardleft-section, .rbt-main-content, .rbt-static-bar"
            ).hide();

            updateSidebar();

            $(
                ".popup-dashboardleft-btn, .popup-dashboardleft-section, .rbt-main-content, .rbt-static-bar"
            ).show();

            $(window).on("resize", updateSidebar);

            $(".popup-dashboardleft-btn").on("click", () => {
                $(".popup-dashboardleft-btn").toggleClass("collapsed");
                $(".popup-dashboardleft-section").toggleClass("collapsed");
            });
        };

        const popuprightdashboard = () => {
            const updateSidebar = () => {
                if ($(window).width() >= 1600) {
                    $(".popup-dashboardright-btn").removeClass("collapsed");
                    $(".popup-dashboardright-section").removeClass("collapsed");
                } else {
                    $(".popup-dashboardright-btn").addClass("collapsed");
                    $(".popup-dashboardright-section").addClass("collapsed");
                }
            };

            $(
                ".popup-right-btn, .popup-right-section, .rbt-main-content, .rbt-static-bar"
            ).hide();

            updateSidebar();

            $(
                ".popup-right-btn, .popup-right-section, .rbt-main-content, .rbt-static-bar"
            ).show();

            $(window).on("resize", updateSidebar);

            $(".popup-dashboardright-btn").on("click", () => {
                $(".popup-dashboardright-btn").toggleClass("collapsed");
                $(".popup-dashboardright-section").toggleClass("collapsed");
            });
        };

        // Initialize all functions
        menuCurrentLink();
        popupMobileMenu();
        // popupDislikeSection();
        popupleftdashboard();
        popuprightdashboard();

        // Cleanup function
        return () => {
            $(".hamberger-button, .close-menu, .popup-mobile-menu").off();
            $(".popup-dashboardleft-btn, .popup-dashboardright-btn").off();
            $(window).off("resize");
        };
    }, [location.pathname]);

    // Smooth scroll for links
    useEffect(() => {
        $(document).on("click", ".smoth-animation", function (event) {
            event.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: $($.attr(this, "href")).offset().top - 50,
                },
                300
            );
        });
    }, []);

    // Popup Dislike Section
    useEffect(() => {
        $(".dislike-section-btn").on("click", function () {
            $(".popup-dislike-section").addClass("active");
        });

        $(".close-button").on("click", function () {
            $(".popup-dislike-section").removeClass("active");
        });
    }, []);

    useEffect(() => {
        // Sticky header function
        const headerSticky = () => {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 250) {
                    $(".header-sticky").addClass("sticky");
                } else {
                    $(".header-sticky").removeClass("sticky");
                }
            });
        };

        // Call the sticky header function when component mounts
        headerSticky();

        // Clean up the scroll event on component unmount
        return () => {
            $(window).off("scroll");
        };
    }, []);

    // useEffect to run the jQuery script after the component is mounted
    useEffect(() => {
        // jQuery plugin for 'Show More / Show Less' functionality
        const showMoreBtn = () => {
            $.fn.hasShowMore = function () {
                return this.each(function () {
                    $(this).toggleClass("active");
                    $(this).text("Show Less");
                    $(this).parent(".has-show-more").toggleClass("active");

                    if ($(this).parent(".has-show-more").hasClass("active")) {
                        $(this).text("Show Less");
                    } else {
                        $(this).text("Show More");
                    }
                });
            };

            // Bind the click event to the 'Show More / Show Less' button
            $(document).on("click", ".rbt-show-more-btn", function () {
                $(this).hasShowMore();
            });
        };

        // Call the function when the component is mounted
        showMoreBtn();

        // Clean up jQuery events when the component unmounts
        return () => {
            $(document).off("click", ".rbt-show-more-btn");
        };
    }, []); // Empty dependency array ensures it runs once when component mounts

    const [activeTab, setActiveTab] = useState([]); // Default active tab
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mega menu visibility
    const dropdownRef = useRef(null);

    // Function to handle tab clicks
    const handleTabClick = (menuItemName) => {
        setActiveTab(menuItemName);
    };

    // Handle hover to open the menu
    const handleMouseEnter = () => {
        setIsMenuOpen(true);
    };

    // Handle mouse leave to close the menu
    const handleMouseLeave = () => {
        setIsMenuOpen(false);
    };

    // Close the menu if the user clicks outside
    // const handleClickOutside = (e) => {
    //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
    //         setIsMenuOpen(false);
    //     }
    // };

    // Add event listener for clicks outside the menu
    // React.useEffect(() => {
    //     document.addEventListener("click", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);

    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust this delay as needed

        return () => clearTimeout(timer); // Cleanup on component unmount
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer); // cleanup timer when component unmounts
    }, []);

    // close icon
    const [isHeaderTopActive, setIsHeaderTopActive] = useState(true);
    const [isDislikePopupActive, setIsDislikePopupActive] = useState(false);

    // Handlers
    const handleHeaderClose = () => {
        setIsHeaderTopActive(false);
    };

    const handleDislikeClick = () => {
        setIsDislikePopupActive(true);
    };

    const handleDislikeClose = () => {
        setIsDislikePopupActive(false);
    };

    //we set seo replaced by helmet (reactjs)
    useEffect(() => {
        // Set meta keywords dynamically
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute(
                "content",
                config?.keywords || "default, keywords"
            );
        } else {
            const metaTag = document.createElement("meta");
            metaTag.name = "keywords";
            metaTag.content = config?.keywords || "default, keywords";
            document.head.appendChild(metaTag);
        }
    }, [config]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.post(
                    "https://manage.digirdp.com/includes/api.php",
                    new URLSearchParams({
                        action: "GetCurrencies",
                        identifier: process.env.NEXT_PUBLIC_WHMCS_API_IDENTIFIER,
                        secret: process.env.NEXT_PUBLIC_WHMCS_API_SECRET,
                        accesskey: process.env.NEXT_PUBLIC_WHMCS_API_ACCESS_KEY,
                        responsetype: "json",
                    })
                );
                if (response.data.result === "success") {
                    setCurrencies(response.data.currencies.currency);
                } else {
                    console.error("WHMCS API Error:", response.data.message);
                }
            } catch (error) {
                console.error("API Request Failed:", error);
            }
        };

        fetchCurrencies();
    }, []);

    return (
        <>
            <Fragment>
                <Head>
                    {/* Google Analytics Script */}
                    {config.code_box_header && (
                        <script
                            dangerouslySetInnerHTML={{ __html: config.code_box_header }}
                        />
                    )}
                    {/* Meta description or keywords */}
                    <meta name="keywords" content={config.keywords} />
                </Head>

                {/* <!-- Imroz Preloader --> */}

                {/* <!-- Start Header Top Area  --> */}

                {loading ? (
                    <div className="header-top-news bg-image1">
                        <div className="wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="inner">
                                            <div className="content">
                                                {/* <span className="rainbow-badge">{topBanner.tag}</span> */}
                                                <span className="news-text">loading...</span>
                                            </div>
                                            <div className="right-button">
                                                <Link
                                                    className="btn-read-more"
                                                    href={topBanner?.url || ""}
                                                >
                                                    <span>
                                                        Purchase Now{" "}
                                                        <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-close">
                                <button
                                    className="close-button bgsection-activation"
                                    onClick={handleHeaderClose}
                                >
                                    <i className="fa-sharp fa-regular fa-x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    topBanner &&
                    isHeaderTopActive && (
                        <div className="header-top-news bg-image1">
                            <div className="wrapper">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="inner">
                                                <div className="content">
                                                    <span className="rainbow-badge">{topBanner.tag}</span>
                                                    <span className="news-text">{topBanner.content}</span>
                                                </div>
                                                <div className="right-button">
                                                    <Link
                                                        className="btn-read-more"
                                                        href={topBanner?.url || ""}
                                                    >
                                                        <span>
                                                            Purchase Now{" "}
                                                            <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="icon-close">
                                    <button
                                        className="close-button bgsection-activation"
                                        onClick={handleHeaderClose}
                                    >
                                        <i className="fa-sharp fa-regular fa-x"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}

                {/* <!-- End Header Top Area  --> */}

                <ThemeSwitcher />

                {/* <!-- Start Header Area  --> */}
                <header className="rainbow-header header-default header-transparent header-sticky">
                    <div className="container position-relative">
                        <div className="header-top">
                            <div className="">
                                <div className="logo">
                                    <Link href="/">
                                        {loading ? null : (
                                            <>
                                                <img
                                                    className="logo-light"
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${logo.logo_name}`}
                                                    alt="ChatBot Logo"
                                                />
                                                <img
                                                    className="logo-dark"
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${logo.light_logo}`}
                                                    alt="ChatBot Logo"
                                                />
                                            </>
                                        )}
                                    </Link>
                                </div>
                            </div>

                            <div className="d-none d-lg-block">
                                <nav className="mainmenu-nav d-none d-lg-flex ">
                                    <ul className="mainmenu">
                                        <li>
                                            <Link href="/">Home</Link>
                                        </li>
                                        <li
                                            className="with-megamenu has-menu-child-item"
                                            ref={dropdownRef}
                                            onMouseEnter={() => setIsMenuOpen(true)} // Open menu on hover
                                            onMouseLeave={() => setIsMenuOpen(false)} // Close menu on hover leave
                                        >
                                            <Link href="#" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                                Windows RDP
                                            </Link>
                                            {isMenuOpen && (
                                                <div className="rainbow-megamenu rainbow-megamenu-new">
                                                    <div className="wrapper wrapper-new">
                                                        <div className="mega-menu-content">
                                                            <div className="tabsNew">
                                                                {/* Render tabs dynamically */}
                                                                {rdp_menu.map((menu, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className={`tabNew ${activeTab === menu.menu_item_name
                                                                            ? "active"
                                                                            : ""
                                                                            }`}
                                                                        onClick={() =>
                                                                            handleTabClick(menu.menu_item_name)
                                                                        }
                                                                    >
                                                                        {menu.menu_item_name}
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Tab Content */}
                                                            <div className="tab-content-new">
                                                                {rdp_menu.map((menu, index) => (
                                                                    <div
                                                                        key={index}
                                                                        id={menu.menu_item_name}
                                                                        className={`tab-pane-new ${activeTab === menu.menu_item_name
                                                                            ? "active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <div className="row">
                                                                            {rdps
                                                                                .filter(
                                                                                    (rdp) =>
                                                                                        rdp.menu_item_category_id ===
                                                                                        menu.menu_item_id
                                                                                )
                                                                                .filter(
                                                                                    (rdp) => rdp.show_in_header === 1
                                                                                )
                                                                                .map((rdp, index) => (
                                                                                    <div key={index} className="col-lg-4">
                                                                                        <ul className="mega-menu-item">
                                                                                            <li>
                                                                                                <Link
                                                                                                    href={`/rdp-plan/${rdp.url_text}`}
                                                                                                >
                                                                                                    <span>{rdp.name}</span>
                                                                                                </Link>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                        <li
                                            className={`with-megamenu has-menu-child-item ${isMenuOpen ? "active" : ""
                                                }`}
                                            onMouseEnter={() => setIsMenuOpen(true)}
                                            onMouseLeave={() => setIsMenuOpen(false)}
                                            onClick={toggleMenu}
                                        >
                                            <Link href="#">Dedicated Server </Link>
                                            <div className="rainbow-megamenu">
                                                <div className="wrapper">
                                                    <div className="row row--0">
                                                        {dedicated.length > 0 && (
                                                            <>
                                                                {chunkeddedicated.map((column, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="col-lg-6 single-mega-item"
                                                                    >
                                                                        <ul className="mega-menu-item">
                                                                            {column
                                                                                .filter(
                                                                                    (dedicate) =>
                                                                                        dedicate.show_in_header === 1
                                                                                )
                                                                                .map((dedicate, index) => (
                                                                                    <li key={index}>
                                                                                        <Link
                                                                                            href={`/dedicated-plan/${dedicate.url_text}`}
                                                                                        >
                                                                                            {dedicate.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li
                                            className={`with-megamenu has-menu-child-item ${isMenuOpen ? "active" : ""
                                                }`}
                                            onMouseEnter={() => setIsMenuOpen(true)}
                                            onMouseLeave={() => setIsMenuOpen(false)}
                                            onClick={toggleMenu}
                                        >
                                            <Link href="#">Cloud VPS</Link>
                                            <div className="rainbow-megamenu">
                                                <div className="wrapper">
                                                    <div className="row row--0">
                                                        {v_p_s.length > 0 && (
                                                            <>
                                                                {chunkedVps.map((column, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="col-lg-6 single-mega-item"
                                                                    >
                                                                        <ul className="mega-menu-item">
                                                                            {column
                                                                                .filter(
                                                                                    (vps) => vps.show_in_header === 1
                                                                                )
                                                                                .map((vps, index) => (
                                                                                    <li key={index}>
                                                                                        <Link
                                                                                            href={`/cloud-vps-plan/${vps.url_text}`}
                                                                                        >
                                                                                            {vps.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li
                                            className="with-megamenu has-menu-child-item"
                                            ref={dropdownRef}
                                            onMouseEnter={() => setIsHostingMenuOpen(true)}
                                            onMouseLeave={() => setIsHostingMenuOpen(false)}
                                        >
                                            <Link href="#" onClick={() => setIsHostingMenuOpen(!isHostingMenuOpen)}>
                                                Hosting
                                            </Link>
                                            {isHostingMenuOpen && (
                                                <div className="rainbow-megamenu rainbow-megamenu-new">
                                                    <div className="wrapper wrapper-new">
                                                        <div className="mega-menu-content">
                                                            <div className="tabsNew">
                                                                {hostingMenu.map((menu, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className={`tabNew ${activeHostingTab === menu.menu_item_name ? "active" : ""}`}
                                                                        onClick={() => setActiveHostingTab(menu.menu_item_name)}
                                                                    >
                                                                        {menu.menu_item_name}
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="tab-content-new">
                                                                {hostingMenu.map((menu, index) => (
                                                                    <div
                                                                        key={index}
                                                                        id={menu.menu_item_name}
                                                                        className={`tab-pane-new ${activeHostingTab === menu.menu_item_name ? "active" : ""}`}
                                                                    >
                                                                        <div className="row">
                                                                            {hostings
                                                                                .filter((hosting) => hosting.menu_item_category_id === menu.menu_item_id)
                                                                                .filter((hosting) => hosting.show_in_header === 1)
                                                                                .map((hosting, index) => (
                                                                                    <div key={index} className="col-lg-4">
                                                                                        <ul className="mega-menu-item">
                                                                                            <li>
                                                                                                <Link href={`/hosting/${hosting.url_text}`}>
                                                                                                    <span>{hosting.name}</span>
                                                                                                </Link>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                       { /*<li
                                            className={`with-megamenu has-menu-child-item ${isMenuOpen ? "active" : ""
                                                }`}
                                            onMouseEnter={() => setIsMenuOpen(true)}
                                            onMouseLeave={() => setIsMenuOpen(false)}
                                            onClick={toggleMenu}
                                        >
                                            <Link href="#">Private RDP</Link>
                                            <div className="rainbow-megamenu">
                                                <div className="wrapper">
                                                    <div className="row row--0">
                                                        {rdp_location.length > 0 && (
                                                            <>
                                                                {chunkedRdp_location.map((column, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="col-lg-6 single-mega-item"
                                                                    >
                                                                        <ul className="mega-menu-item">
                                                                            {column
                                                                                .filter(
                                                                                    (rdp) => rdp.show_in_header === 1
                                                                                )
                                                                                .map((rdp, index) => (
                                                                                    <li key={index}>
                                                                                        <Link
                                                                                            href={`/private-rdp/${rdp.url_text}`}
                                                                                        >
                                                                                            {rdp.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </li> */}
                                        <li className="has-dropdown has-menu-child-item position-relative">
                                            <Link href="#">Support </Link>
                                            <ul className="submenu">
                                                <li>
                                                    <Link href={`/contact`}>
                                                        <span>Contact</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/datacenter`}>
                                                        <span>Datacenter</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/knowledgebase`}>
                                                        <span>Knowledgebase</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/faqs`}>
                                                        <span>FAQs</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href="https://manage.digirdp.com/submitticket.php"
                                                    >
                                                        <span>Support Ticket </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/blog`}>
                                                        <span>Blog</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/looking-glass" rel="noreferrer">
                                                        <span>Looking Glass</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="https://status.digirdp.com/"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <span>Service Stats</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="has-dropdown has-menu-child-item position-relative">
                                            <Link href="#">Partner </Link>
                                            <ul className="submenu">
                                                <li>
                                                    <Link href={`/affiliate`}>
                                                        <span>Affiliate</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/reseller-program`}>
                                                        <span>Reseller</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/offer`}>
                                                        <span>Offers</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        {/* {Array.isArray(currencies) && currencies.length > 0 && (
                                            <li className="has-dropdown has-menu-child-item position-relative">
                                                <Link href="#">Currency</Link>
                                                <ul
                                                    className="submenu"
                                                    style={{
                                                        maxHeight: "200px", // Set your desired maximum height
                                                        overflowY: "auto",
                                                        scrollbarWidth: "thin", // For modern browsers
                                                        scrollbarColor: "#888 transparent", // For modern browsers
                                                    }}
                                                >
                                                    {currencies.map((ele) => (
                                                        <li
                                                            key={ele.id}
                                                            className="px-3 py-2 cursor-pointer"
                                                            onClick={() => {
                                                                setAnotherCurrency({ ...ele });
                                                            }}
                                                        >
                                                            <span>
                                                                {ele.prefix}
                                                                {ele.suffix}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        )} */}
                                    </ul>
                                </nav>
                            </div>

                            <div className="position-static">
                                <div className="header-right">
                                    {/* <div className="header-btn">
                                        <Link
                                            className="rainbow-gradient-btn"
                                            target="_blank"
                                            href="/"
                                        >
                                            <span>Client Area</span>
                                        </Link>
                                    </div> */}
                                    <div className="header-btn">
                                        <Link className="btn-top  @@btnclassName" href="https://manage.digirdp.com/login.php">
                                            Client Area <i className="fa fa-arrow-right icon"></i>
                                        </Link>
                                    </div>
                                    {/* <!-- Start Mobile-Menu-Bar --> */}
                                    <div className="mobile-menu-bar ml--5 d-flex justify-content-end d-lg-none">
                                        <div className="hamberger">
                                            <button className="hamberger-button">
                                                <i className="fa-sharp fa-regular fa-bars"></i>
                                            </button>
                                        </div>
                                    </div>
                                    {/* <!-- Start Mobile-Menu-Bar --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* <!-- End Header Area  --> */}
                <div className="popup-mobile-menu">
                    <div className="inner-popup">
                        <div className="header-top">
                            <div className="logo">
                                <Link href="/">
                                    {loading ? null : (
                                        <>
                                            <img
                                                className="logo-light"
                                                src={`${assets}/images/logo/logo.png`}
                                                alt="ChatBot Logo"
                                            />
                                        </>
                                    )}
                                </Link>
                            </div>
                            <div className="close-menu">
                                <button className="close-button">
                                    <i className="fa-sharp fa-regular fa-x"></i>
                                </button>
                            </div>
                        </div>

                        <div className="content">
                            <nav className="mainmenu-nav">
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                </ul>
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li className="has-submenu">
                                        <Link
                                            className="collapse-btn collapsed"
                                            data-bs-toggle="collapse"
                                            href="#collapseExampleMenuOne"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseExampleMenuOne"
                                        >
                                            <span>Windows RDP</span>
                                        </Link>
                                        {rdp_menu.map((menu, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="collapse"
                                                    id="collapseExampleMenuOne"
                                                >
                                                    <ul className="submenu rbt-default-sidebar-list">
                                                        <li>
                                                            <h3 className="rbt-short-title">
                                                                {menu.menu_item_name}
                                                            </h3>
                                                        </li>
                                                        {rdps
                                                            .filter(
                                                                (rdp) =>
                                                                    rdp.menu_item_category_id ===
                                                                    menu.menu_item_id
                                                            )
                                                            .filter((rdp) => rdp.show_in_header === 1)
                                                            .map((rdp, index) => (
                                                                <li key={index}>
                                                                    <Link href={`/rdp-plan/${rdp.url_text}`}>
                                                                        {rdp.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </li>
                                </ul>
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li className="has-submenu">
                                        <Link
                                            className="collapse-btn collapsed"
                                            data-bs-toggle="collapse"
                                            href="#collapseExampleMenuTwo"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseExampleMenuTwo"
                                        >
                                            <span>Dedicated Server</span>
                                        </Link>
                                        <div className="collapse" id="collapseExampleMenuTwo">
                                            <ul className="submenu rbt-default-sidebar-list">
                                                {dedicated
                                                    .filter((dedicate) => dedicate.show_in_header === 1)
                                                    .map((dedicate, index) => (
                                                        <li key={index}>
                                                            <Link
                                                                href={`/dedicated-plan/${dedicate.url_text}`}
                                                            >
                                                                {dedicate.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li className="has-submenu">
                                        <Link
                                            className="collapse-btn collapsed"
                                            data-bs-toggle="collapse"
                                            href="#collapseExampleMenuThree"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseExampleMenuThree"
                                        >
                                            <span>Cloud VPS</span>
                                        </Link>
                                        <div className="collapse" id="collapseExampleMenuThree">
                                            <ul className="submenu rbt-default-sidebar-list">
                                                {v_p_s
                                                    .filter((vps) => vps.show_in_header === 1)
                                                    .map((vps, index) => (
                                                        <li key={index}>
                                                            <Link href={`/cloud-vps-plan/${vps.url_text}`}>
                                                                {vps.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                {/* <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li className="has-submenu">
                                        <Link
                                            className="collapse-btn collapsed"
                                            data-bs-toggle="collapse"
                                            href="#collapseExampleMenuFour"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseExampleMenuFour"
                                        >
                                            <span>Private RDP</span>
                                        </Link>
                                        <div className="collapse" id="collapseExampleMenuFour">
                                            <ul className="submenu rbt-default-sidebar-list">
                                                {rdp_location
                                                    .filter((rdp_loc) => rdp_loc.show_in_header === 1)
                                                    .map((rdp_loc, index) => (
                                                        <li key={index}>
                                                            <Link href={`/private-rdp/${rdp_loc.url_text}`}>
                                                                {rdp_loc.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </li>
                                </ul> */}
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li className="has-submenu">
                                        <Link
                                            className="collapse-btn collapsed"
                                            data-bs-toggle="collapse"
                                            href="#collapseExampleMenuFour"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseExampleMenuFour"
                                        >
                                            <span>Hosting</span>
                                        </Link>
                                        {hostingMenu.map((menu, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="collapse"
                                                    id="collapseExampleMenuFour"
                                                >
                                                    <ul className="submenu rbt-default-sidebar-list">
                                                        <li>
                                                            <h3 className="rbt-short-title">
                                                                {menu.menu_item_name}
                                                            </h3>
                                                        </li>
                                                        {hostings
                                                            .filter(
                                                                (hosting) =>
                                                                    hosting.menu_item_category_id ===
                                                                    menu.menu_item_id
                                                            )
                                                            .filter((hosting) => hosting.show_in_header === 1)
                                                            .map((hosting, index) => (
                                                                <li key={index}>
                                                                    <Link href={`/hosting/${hosting.url_text}`}>
                                                                        {hosting.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </li>
                                </ul>
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li className="has-submenu">
                                        <Link
                                            className="collapse-btn collapsed"
                                            data-bs-toggle="collapse"
                                            href="#collapseExampleMenuSix"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseExampleMenuSix"
                                        >
                                            <span>Support</span>
                                        </Link>
                                        <div className="collapse" id="collapseExampleMenuSix">
                                            <ul className="submenu rbt-default-sidebar-list">
                                                <li>
                                                    <Link href={`/contact`}>
                                                        <span>Contact</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/datacenter`}>
                                                        <span>Datacenter</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/knowledgebase`}>
                                                        <span>Knowledgebase</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href="https://manage.digirdp.com/submitticket.php"
                                                    >
                                                        <span>Support Ticket </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/blog`}>
                                                        <span>Blog</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/looking-glass" rel="noreferrer">
                                                        <span>Looking Glass</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="https://status.digirdp.com/"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <span>Service Stats</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li className="has-submenu">
                                        <Link
                                            className="collapse-btn collapsed"
                                            data-bs-toggle="collapse"
                                            href="#collapseExampleMenuFive"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseExampleMenuFive"
                                        >
                                            <span>Partner</span>
                                        </Link>
                                        <div className="collapse" id="collapseExampleMenuFive">
                                            <ul className="submenu rbt-default-sidebar-list">
                                                <li>
                                                    <Link href={`/affiliate`}>
                                                        <span>Affiliate</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/reseller-program`}>
                                                        <span>Reseller</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/offer`}>
                                                        <span>Offers</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                {/* <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li className="has-submenu">
                                        <Link
                                            className="collapse-btn collapsed"
                                            data-bs-toggle="collapse"
                                            href="#collapseExampleMenuSeven"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseExampleMenuSeven"
                                        >
                                            <span>Currency</span>
                                        </Link>
                                        {Array.isArray(currencies) && currencies.length > 0 && (
                                            <div className="collapse" id="collapseExampleMenuSeven">
                                                <ul className="submenu rbt-default-sidebar-list">
                                                    {currencies.map((ele) => (
                                                        <li
                                                            key={ele.id}
                                                            className="px-3 py-2 cursor-pointer close-menu close-button"
                                                            onClick={() => {
                                                                setAnotherCurrency({ ...ele });
                                                            }}
                                                        >
                                                            <span>
                                                                {ele.prefix}
                                                                {ele.suffix}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                </ul> */}
                                <div className="rbt-sm-separator"></div>
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li>
                                        <Link href="/about">
                                            <i className="fa-regular fa-circle-question"></i>
                                            <span>About Us</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <i className="fa-sharp fa-regular fa-bell"></i>
                                            <span>Contact Us</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/legal">
                                            <i className="fa-sharp fa-regular fa-briefcase"></i>
                                            <span>Terms & Policy</span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {/* <!-- Start Header Btn  --> */}
                        <div className="header-btn d-block d-md-none">
                            <Link
                                className="btn-default @@btnclassName"
                                target="_blank"
                                href="https://manage.digirdp.com/login.php"
                            >
                                Client Area
                            </Link>
                        </div>
                        {/* <!-- End Header Btn  --> */}
                    </div>
                </div>
            </Fragment>
        </>
    );
};

export default Header;
