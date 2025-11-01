"use client";

import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
const assets = "/assets";

function GlassPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/location`)
      .then((response) => {
        setLocations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Dedicated data:", error);
      });
  }, []);

  return (
    <Fragment>
      {/* <!-- Start Pricing Area  --> */}
      <div className="main-content main-content-new">
        <div
          className="rainbow-testimonial-area"
          style={{ position: "relative", zIndex: "0" }}
        >
          <div className="video-background video-background-new">
            <video autoPlay loop muted playsInline className="video">
              <source
                src={`${assets}/images/bg-video/glass.mp4`}
                type="video/mp4"
              />
            </video>

            <div className="container">
              <div className="rbt-main-content rbt-main-content-new mb--0">
                <div className="rbt-daynamic-page-content center-width">
                  <div className="rbt-dashboard-content">
                    <div className="banner-area">
                      <div className="settings-area">
                        <h3 className="title text-center">Looking Glass</h3>
                      </div>
                    </div>
                    <div className="content-page pb--50">
                      <div className="chat-box-list">
                        <div className="single-settings-box profile-details-box overflow-hidden  overlay-new">
                          <div className="dc-list dc-list-new">
                            {loading ? 
                             <Link href={`Loading...`}>
                             Loading...
                           </Link>
                            : 
                            (locations.map((location, index) => (
                              <Link href={`${location.url}`} key={index}>
                                {location.name}
                              </Link>)
                            ))}
                          </div>
                        </div>
                        <Link
                          className="btn-new"
                          href="/"
                          style={{
                            color: "#000000",
                            fontWeight: "500",
                            Border: "1px solid #eee",
                            background: "#c2d4ff",
                          }}
                        >
                          <span>
                            Go Back{" "}
                            <i className="fa-sharp fa-regular fa-arrow-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Start Pricing Area  --> */}
      <div className="copyright-area copyright-style-one">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="copyright-right text-center text-lg-end">
                <p className="copyright-text">
                  Copyright © 2019-2024{" "}
                  <Link href="/" className="btn-read-more">
                    <span>DigiRDP </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default GlassPage;
