"use client";
import React, { Fragment, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSlider from "@/pages/slider/BlogSlider";
import Testimonial from "@/pages/slider/testimonial";
import axios from "axios";
import Promo from "@/pages/slider/Promo";
import Location from "@/pages/sales-page/Location";
import Link from "next/link";
import Head from "next/head";

const assets = "/assets";

function KnowledgeBase() {
    const [faqs, setFaqs] = useState([]);
    const [faqs_category, setFaqs_category] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/faqs`
                );
                setFaqs(response.data[0]);
                setFaqs_category(response.data[1]);
            } catch (error) {
                console.error("Error fetching FAQ data:", error);
            } finally {
                setLoading(false); // Ensure loading is set to false after fetching
            }
        };

        fetchFaqs();
    }, []);

    const [activeTab, setActiveTab] = useState("questions");
    const [answerModalQuestion, setAnswerModalQuestion] = useState(null);
    const [answerText, setAnswerText] = useState("");

    const [questions, setQuestions] = useState([
        { id: 1, text: "Can we chat privately here right now?", passed: false, downvoted: false },
        { id: 2, text: "What's the best time to chat?", passed: false, downvoted: false },
        {
            id: 3,
            text: "I created a YouTube channel 4 years ago and I forgot every information in it. How can I recover my Gmail name?",
            passed: false,
            downvoted: false
        },
    ]);

    const toggleDownvote = (id) => {
        setQuestions((prev) =>
            prev.map((q) => 
            q.id === id ? { ...q, downvoted: !q.downvoted } : q
            )
        );
    };


    const handlePass = (id) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, passed: true } : q))
        );
    };

    const handleUndoPass = (id) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, passed: false } : q))
        );
    };

    const openAnswerModal = (q) => {
        setAnswerModalQuestion(q);
        setAnswerText("");
    };

    const closeAnswerModal = () => {
        setAnswerModalQuestion(null);
        setAnswerText("");
    };

    const handlePostAnswer = () => {
        // you can send API / save draft here
        closeAnswerModal();
    };

    // const [activeCategory, setActiveCategory] = useState(null);

    // const [activeFAQ, setActiveFAQ] = useState({});

    // const toggleFAQ = (categoryId, faqId) => {
    //   setActiveFAQ((prevState) => ({
    //     ...prevState,
    //     [categoryId]: prevState[categoryId] === faqId ? null : faqId,
    //   }));
    // };

    // const toggleCategory = (categoryId) => {
    //   setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
    // };

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
                                    <h1 className="title h3">Knowledge Base</h1>
                                    <ul className="page-list my-4">
                                        <li className="rainbow-breadcrumb-item">
                                            <Link href="/">Home</Link>
                                        </li>
                                        <li className="rainbow-breadcrumb-item">
                                            <Link href="/">Support</Link>
                                        </li>
                                        <li className="rainbow-breadcrumb-item active">
                                            Knowledge base
                                        </li>
                                    </ul>
                                    <p className="description b1">
                                        Here are answers to some commonly asked questions
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- End Breadcarumb area  -->
                <!-- Start Pricing Style-2  --> */}
                <div className="rainbow-pricing-area rainbow-section-gap">
                    <div className="container-fluid">

                        <div className="rainbow-testimonial-area ">
                            <div className="container">

                                {/* === MAIN LAYOUT === */}
                                <div className="row mt--40">
                                    {/* LEFT TABS */}
                                    <div className="col-lg-3 col-md-4 mb_sm--30">
                                        <h5 className="h5-tab">Questions</h5>
                                        <div className="kb-sidebar">
                                            {[
                                                { key: "questions", label: "Questions for you" },
                                                { key: "requests", label: "Answer requests" },
                                                { key: "drafts", label: "Drafts" },
                                            ].map((item) => (
                                                <button
                                                    key={item.key}
                                                    type="button"
                                                    onClick={() => setActiveTab(item.key)}
                                                    className={`kb-tab-btn ${activeTab === item.key ? "active" : ""
                                                        }`}
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* RIGHT CONTENT */}
                                    <div className="col-lg-9 col-md-8">
                                        {/* Tab 1 – Questions for you */}
                                        {activeTab === "questions" && (
                                            <div className="kb-panel">
                                                <h4 className="kb-panel-title mb--20"><img src={`${assets}/images/added/question.png`} width={40} alt="" /> Questions for you</h4>

                                                {questions.map((q) => (
                                                    <div key={q.id} className="kb-question-card">
                                                        {!q.passed ? (
                                                            <>
                                                                <p className="kb-question-text">{q.text}</p>

                                                                <div className="kb-actions">
                                                                    <div className="kb-actions">
                                                                        <button type="button" className="kb-btn-primary" onClick={() => openAnswerModal(q)}>
                                                                            <i className="fa fa-comment-alt-edit"></i>  Answer
                                                                        </button>
                                                                        <button type="button" className="kb-btn-outline">Follow</button>
                                                                        <button type="button" className="kb-btn-outline" onClick={() => handlePass(q.id)}>
                                                                            Pass
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            className={`kb-btn-outline kb-btn-downvote ${q.downvoted ? "downvoted" : ""}`}
                                                                            onClick={() => toggleDownvote(q.id)}
                                                                            style={{ borderColor: q.downvoted ? "#eb5a68" : "#444" }}
                                                                        >
                                                                            <i
                                                                                className={q.downvoted ? "fa fa-thumbs-up" : "fa-regular fa-thumbs-up"}
                                                                                style={{ color: q.downvoted ? "#eb5a68" : "inherit" }}   // <— icon only!
                                                                            />
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="kb-question-passed">
                                                                <span>Question passed.</span>
                                                                <button
                                                                    type="button"
                                                                    className="kb-undo-btn"
                                                                    onClick={() => handleUndoPass(q.id)}
                                                                >
                                                                    Undo
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Tab 2 – Answer requests */}
                                        {activeTab === "requests" && (
                                            <div className="kb-panel kb-panel-centered">
                                                <img src={`${assets}/images/added/interface-design.png`} alt="" />
                                                <h4 className="">Answer Requests</h4>
                                                <p className="text-center">Ask for answers from other users by clicking Request Answer on a question. Requests you receive will show up here.</p>
                                                <button type="button" className="kb-btn-primary" onClick={() => setActiveTab("questions")}>
                                                    See top questions
                                                </button>
                                            </div>
                                        )}

                                        {/* Tab 3 – Drafts */}
                                        {activeTab === "drafts" && (
                                            <div className="kb-panel kb-panel-centered">
                                                <img src={`${assets}/images/added/interface-design.png`} alt="" />
                                                <h4 className="">No answer drafts</h4>
                                                <p className="text-center">Start writing answers by finding questions to answer in Questions for You.</p>
                                                <button type="button" className="kb-btn-primary" onClick={() => setActiveTab("questions")}>
                                                    See questions for you
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* === ANSWER MODAL === */}
                            {answerModalQuestion && (
                                <div className="kb-modal-backdrop">
                                    <div className="kb-modal">
                                        <div className="kb-modal-header">
                                            <h4>How are you doing? Can we chat on Zangi, Telegram, or Signal?</h4>
                                            {/* you can replace above with answerModalQuestion.text if you want dynamic */}
                                        </div>
                                        <div className="kb-modal-body">
                                            <textarea
                                                className="kb-textarea"
                                                placeholder="Write your answer"
                                                value={answerText}
                                                onChange={(e) => setAnswerText(e.target.value)}
                                            />
                                        </div>
                                        <div className="kb-modal-footer">
                                            <button
                                                type="button"
                                                className="kb-btn-outline"
                                                onClick={closeAnswerModal}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="kb-btn-primary"
                                                onClick={handlePostAnswer}
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* <!-- Start Features Area --> */}
                        {/* <div className="rainbow-testimonial-area rainbow-section-gap">
                            <div className="container">
                                <div className="row custom-wrapper">
                                    <div className="col-lg-12">
                                        <div
                                            className="section-title text-center sal-animate"
                                            data-sal-duration="400"
                                            data-sal-delay="150"
                                        >
                                            <h4 className="subtitle">
                                                <span className="theme-gradient"></span>
                                            </h4>
                                            <h2 className="title w-600 mb--20">
                                                Custom Code section{" "}
                                            </h2>
                                            <p>
                                                add your custom code.{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* <!-- Start Features Area --> */}
                        <div className="rainbow-testimonial-area rainbow-section-gap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div
                                            className="section-title text-center sal-animate"
                                            data-sal-duration="400"
                                            data-sal-delay="150"
                                        >
                                            <h4 className="subtitle">
                                                <span className="theme-gradient"></span>
                                            </h4>
                                            <h2 className="title w-600 mb--20">
                                                Our Hosting Solutions{" "}
                                            </h2>
                                            <p>
                                                Explore our tailored solutions with Windows RDP, Cloud
                                                VPS, and Dedicated servers to find <br /> the perfect
                                                fit for your application deployment needs. <br /> Get
                                                the performance, reliability, and ease you deserve with
                                                our expertly crafted plans{" "}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt--60">
                                        <div className="advance-tab-button advance-tab-button-1 right-top">
                                            <ul className="nav nav-tabs tab-button-list">
                                                <li className="col-lg-3 nav-item" role="presentation">
                                                    <Link
                                                        href="/rdp-plan"
                                                        className="nav-link tab-button "
                                                    >
                                                        <div className="tab">
                                                            <h2 className="title">240 + </h2>
                                                            <p className="description sal-animate">
                                                                Windows RDP Plans
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>

                                                <li className="col-lg-3 nav-item" role="presentation">
                                                    <Link
                                                        href="/cloud-vps"
                                                        className="nav-link tab-button"
                                                    >
                                                        <div className="tab">
                                                            <h2 className="title">110 +</h2>
                                                            <p className="description sal-animate">
                                                                Cloud VPS Plans
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>

                                                <li className="col-lg-3 nav-item" role="presentation">
                                                    <Link
                                                        href="/dedicated-server"
                                                        className="nav-link tab-button"
                                                    >
                                                        <div className="tab">
                                                            <h2 className="title">59 +</h2>
                                                            <p className="description sal-animate">
                                                                Dedicated Server Plans
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="col-lg-3 nav-item" role="presentation">
                                                    <Link
                                                        href="/private_rdp"
                                                        className="nav-link tab-button"
                                                    >
                                                        <div className="tab">
                                                            <h2 className="title">114 +</h2>
                                                            <p className="description sal-animate">
                                                                Private RDP Plans
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className="view-more-button text-center mt--35 sal-animate" data-sal="slide-up" data-sal-duration="400" data-sal-delay="400">
                                        <Link className="btn-default color-blacked" href="/contact">View Plans <i className="fa-sharp fa-light fa-arrow-right ml--5"></i></Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* <!-- Start CTA Style-one Area  --> */}
                        <div className="rainbow-rn-cta mt-5">
                            <div className="container">
                                <div className="row row--0 align-items-center content-wrapper">
                                    <div className="col-lg-8">
                                        <div className="inner">
                                            <div className="content text-left">
                                                <h4
                                                    className="title sal-animate"
                                                    data-sal="slide-up"
                                                    data-sal-duration="400"
                                                    data-sal-delay="200"
                                                >
                                                    Become a Reseller Today{" "}
                                                </h4>
                                                <p
                                                    className="sal-animate"
                                                    data-sal="slide-up"
                                                    data-sal-duration="400"
                                                    data-sal-delay="300"
                                                >
                                                    Partner with us and transform the way you do business.
                                                    As a reseller, you’ll gain access to top-tier
                                                    products, tailored support, and a platform to maximize
                                                    your success.{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="right-content">
                                            <div
                                                className="call-to-btn text-start text-lg-end sal-animate"
                                                data-sal="slide-up"
                                                data-sal-duration="400"
                                                data-sal-delay="400"
                                            >
                                                <div className="team-image">
                                                    <img
                                                        src={`${assets}/images/cta-img/team-01.png`}
                                                        alt="Group"
                                                    />
                                                </div>
                                                <Link className="btn-default" href="/reseller-program">
                                                    Grow with DigiRDP{" "}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* testimonial */}
                        <div className="rainbow-testimonial-area rainbow-section-gap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div
                                            className="section-title text-left sal-animate"
                                            data-sal="slide-up"
                                            data-sal-duration="400"
                                            data-sal-delay="150"
                                        >
                                            <h4 className="subtitle">
                                                <span className="theme-gradient">Customer Reviews</span>
                                            </h4>
                                            <h2 className="title mb--60">What our users are saying</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <Testimonial />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Testimonial Area  --> */}

                        {/* <!-- Start blog Area  --> */}
                        <div className="rainbow-testimonial-area rainbow-section-gap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div
                                            className="section-title text-center sal-animate"
                                            data-sal="slide-up"
                                            data-sal-duration="400"
                                            data-sal-delay="150"
                                        >
                                            <h4 className="subtitle">
                                                <span className="theme-gradient">Blogs</span>
                                            </h4>
                                            <h2 className="title mb--60">Explore Our Insights</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="service-wrapper rainbow-service-slider-actvation slick-grid-15 rainbow-slick-dot rainbow-gradient-arrows">
                                            <BlogSlider />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div
                                className="view-more-button text-center mt--45 sal-animate"
                                data-sal="slide-up"
                                data-sal-duration="400"
                                data-sal-delay="400"
                            >
                                <Link className="btn-default color-blacked" href="/blog">
                                    View Blogs{" "}
                                    <i className="fa-sharp fa-light fa-arrow-right ml--5"></i>
                                </Link>
                            </div>
                        </div>
                        {/* <!-- End blog Area  --> */}
                    </div>
                </div>
                {/* <!-- End Pricing Style-2  --> */}
            </div>
            {/* <!-- Start Pricing Area  --> */}

            <Location />

            <Footer />
        </Fragment>
    );
}

export default KnowledgeBase;
