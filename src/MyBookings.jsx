import React from "react";
import hsptlmini from "./assests/hsptlmini.png";

export default function MyBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="no-bookings-text">No bookings found.</p>
      ) : (
        bookings.map((item, index) => (
          <div key={index} className="myb-card">
            <div className="myb-left">
              <div className="myb-icon-wrapper">
                <img src={hsptlmini} alt="hospital" className="myb-icon-img" />
              </div>

              <div>
                <h3 className="myb-title">
                  {item.hospital || item["Hospital Name"]}
                </h3>
                <p className="myb-grey">
                  {item.address ? `${item.address}, ` : ""}
                  {(item.city || item.City) && (item.state || item.State)
                    ? `${item.city || item.City}, ${item.state || item.State}`
                    : ""}
                </p>
              </div>
            </div>

            <div className="myb-right">
              <span className="myb-time-pill">
                {item.time || item.bookingTime}
              </span>
              <span className="myb-date-pill">
                {item.date || item.bookingDate}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
