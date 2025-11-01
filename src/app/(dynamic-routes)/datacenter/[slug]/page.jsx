"use client";
import React, { Fragment, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Location from "@/pages/sales-page/Location";
import Head from "next/head";
const assets = "/assets";
import {
  convertCurrency,
  getClientLocation,
} from "@/utils/currencyUtils";
import useStaticSEO from "@/hooks/useStaticSEO";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/CurrencyProvider";

async function getDatacenterDetails(url_text) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/data-center/${url_text}`
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const DedicatedCenter = () => {
  const params = useParams();
  const url_text = params.slug;
  const [datacenter, setDatacenter] = useState(null);
  const { currency } = useCurrency(); // Ensure currency is available
  const [convertedPrices, setConvertedPrices] = useState({
    dedicatedServer: 24.99,
    colocation: 99.0,
  });
  const ipinfoToken = process.env.NEXT_PUBLIC_IP_INFO_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      if (!url_text || !currency?.code) return;

      try {
        const details = await getDatacenterDetails(url_text);
        setDatacenter(details);

        const convertedDedicatedServer = await convertCurrency(
          details?.server_price || 24.99,
          "USD",
          currency.code
        );
        const convertedColocation = await convertCurrency(
          details?.colocation_price || 99.0,
          "USD",
          currency.code
        );

        setConvertedPrices({
          dedicatedServer: convertedDedicatedServer,
          colocation: convertedColocation,
        });
      } catch (error) {
        console.error("Error fetching details or currency conversion:", error);
      }
    };

    fetchData();
  }, [url_text, currency]);

  useStaticSEO({
    title: datacenter ? datacenter.city : "Secure Datacenter Services",
    description: datacenter
      ? datacenter.description
      : "Explore our state-of-the-art datacenters offering secure and high-speed connectivity.",
  });


console.log(datacenter)
  return (
    <Fragment>
      <Header />
      <div className="main-content">
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h3 className="title h3">
                    Secure {datacenter?.city} Datacenter Services
                  </h3>
                  <p className="description b1">
                    Explore our data center locations and find the perfect fit
                    for your business today!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center pb--60">
                  <h2 className="title mb--0">{datacenter?.city} Datacenter</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <p>{datacenter?.description || "Loading details..."}</p>
                <h5>Services available at this location:</h5>
                <Link href={datacenter?.server_url  || '#' } className="dedicated-box">
                  <img src={`${assets}/images/added/d-one.svg`} alt="Brand" />
                  <p>
                    Dedicated Servers <br />
                    <span>
                      Starting at {currency?.prefix || "$"}{" "}
                      {Number(convertedPrices?.dedicatedServer || 0).toFixed(2)}
                    </span>
                  </p>
                </Link>
                <Link href={datacenter?.colocation_url || "#"} className="dedicated-box">
                  <img src={`${assets}/images/added/d-two.svg`} alt="Brand" />
                  <p>
                    Cloud VPS and RDP Services <br />
                    <span>
                       starting at {currency?.prefix || "$"}{" "}
                      {Number(convertedPrices?.colocation || 0).toFixed(2)}
                    </span>
                  </p>
                </Link>
                <div className="dedicated-box">
                  <img
                    src={`${assets}/images/added/d-three.svg`}
                    alt="Brand"
                  />
                  <p className="mb-0">
                  Searching for custom offering? <br />
                    <span>Contact Us for Custom Solutions</span>
                  </p>
                </div>
              </div>
              <div className="col-lg-5">
                <div>
                  {datacenter?.maps ? (
                    <div dangerouslySetInnerHTML={{ __html: datacenter.maps }} />
                  ) : (
                    <p>Loading map...</p>
                  )}
                </div>

                <div className="dedicated-box-new">
                  <div>
                    <p>
                      Test IP <br /> <span>{datacenter?.test_ip || "N/A"}</span>
                    </p>
                  </div>
                  <div>
                    <Link className="btn-new" href={datacenter?.test_ip || ""}>
                      <span>
                        Test Network <i className="fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Location />
      <Footer />
    </Fragment>
  );
};

export default DedicatedCenter;
