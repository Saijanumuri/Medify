import React, { useState, useEffect } from "react";
import hsptlmini from "./assests/hsptlmini.png";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="no-bookings-text">No bookings found.</p>
      ) : (
        bookings.map((item, index) => {
      
          const hospitalName = item.hospital || item["Hospital Name"];
          const city = item.city || item.City;
          const state = item.state || item.State;
          const time = item.time || item.bookingTime;
          const date = item.date || item.bookingDate;

          return (
            <div key={index} className="myb-card">
              <div className="myb-left">
                <div className="myb-icon-wrapper">
                  <img src={hsptlmini} alt="hospital" className="myb-icon-img" />
                </div>
                <div>
                  <h3 className="myb-title">{hospitalName}</h3>
                  <p className="myb-grey">
                    {city && state ? `${city}, ${state}` : ""}
                  </p>
                </div>
              </div>

              <div className="myb-right">
                {time && <span className="myb-time-pill">{time}</span>}
                {date && <span className="myb-date-pill">{date}</span>}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}