'use client';
import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import axios from 'axios';

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const assets = '/assets';

function Location() {
    const [locations, setLocations] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Set isClient to true after component mounts
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/location`)
            .then((response) => {
                setLocations(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Dedicated data:", error);
            });
    }, []);

    const options = {
        loop: true,
        autoplay: true,
        animationData: require('../../rocket.json'), // Ensure this path is correct
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Fragment>
            {/* <!-- location  --> */}
            <div className="rainbow-testimonial-area mt-5">
                <div className="video-background rainbow-section-gap">
                    <video autoPlay loop muted playsInline className="video">
                        <source src={`${assets}/images/bg-video/map.mp4`} type="video/mp4" />
                    </video>

                    <div className="overlay container">
                        <div className="section-title text-left sal-animate" data-sal="slide-up" data-sal-duration="400" data-sal-delay="150">
                            <h4 className="subtitle">
                                <span className="text-white">Service Locations</span>
                            </h4>
                            <h2 className="title text-white">
                                Explore Our Global Service Locations
                                {isClient && ( // Render Lottie only on the client side
                                    <Lottie
                                        options={options}
                                        height={'auto'}
                                        width={233}
                                        style={{
                                            margin: "0",
                                            position: "absolute",
                                            top: "0",
                                            right: "0",
                                            transform: "rotate(45deg)"
                                        }}
                                    />
                                )}
                            </h2>
                        </div>
                        <div className="dc-list">
                            {locations.map((location, index) => (
                                <Link key={index} href={`${location.url}`}>{location.name}</Link>
                            ))}
                        </div>
                        <div className="map-new">
                            <img src={`${assets}/images/added/World_map_with_points.svg`} alt='img' />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Location;