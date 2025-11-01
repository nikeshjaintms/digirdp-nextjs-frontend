import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const assets = '/assets';

const Error = () => {
    return (
        <Fragment>
            <Header />
            <div className="slider-area slider-style-1 variation-default slider-bg-image  slider-bg-shape" >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="inner text-center mt--140">
                                <img src={`${assets}/images/added/error.svg`} alt="" width={'70%'} />
                                <a className="btn-default @@btnclassName pb-4" href="/">Go Back</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-shape">
                    <img className="bg-shape-one" src={`${assets}/images/bg/bg-shape-four.png`} alt="Bg Shape" />
                    <img className="bg-shape-two" src={`${assets}/images/bg/bg-shape-five.png`} alt="Bg Shape" />
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default Error;
