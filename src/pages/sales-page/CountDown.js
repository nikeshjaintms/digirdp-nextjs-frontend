'use client'
import React, { Fragment, useState, useEffect } from "react";

const CountDown = ({ StartDate, EndDate }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countDownTimer = () => {
      const now = new Date();
      const startDate = new Date(StartDate);
      const endDate = new Date(EndDate);

      if (now >= startDate && now <= endDate) {
        const timeDifference = endDate - now;

        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutesLeft = Math.floor((timeDifference / (1000 * 60)) % 60);
        const secondsLeft = Math.floor((timeDifference / 1000) % 60);

        setDays(daysLeft);
        setHours(hoursLeft);
        setMinutes(minutesLeft);
        setSeconds(secondsLeft);
      } else {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    const timer = setInterval(countDownTimer, 1000);

    countDownTimer(); // Run immediately

    return () => clearInterval(timer); // Cleanup on unmount
  }, [StartDate, EndDate]); // Include dependencies

  return (
    <Fragment>
      <div className="rainbow-cta-area rainbow-section-gap rainbow-section-gapBottom-big">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="aiwave-cta">
                <div className="inner-new">
                  <div id="counter">
                    <h2 className="box" id="days">{days}<br /> <span className="small">days</span></h2>
                    <h2 className="box" id="hours">{hours}<br /> <span className="small">hours</span></h2>
                    <h2 className="box" id="minutes">{minutes}<br /> <span className="small">mins</span></h2>
                    <h2 className="box" id="seconds">{seconds}<br /> <span className="small">secs</span></h2>
                  </div>

                  <div className="bg-shape-one" style={{ position: "absolute", zIndex: "-1" }}>
                    <img src="assets/images/cta-img/bg-shape.png" alt="Bg shape" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CountDown;
