// src/hsptl.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import tick from "./assests/tick.png";
import hsptlmini from "./assests/hsptlmini.png";

export default function Hsptl() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);

  const state = queryParams.get("state");
  const city = queryParams.get("city");

  const [centers, setCenters] = useState([]);
  const [expandedCenter, setExpandedCenter] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // fetch only when BOTH state and city are present
  useEffect(() => {
    if (!state || !city) {
      setCenters([]);
      return;
    }

    axios
      .get(
        `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
      )
      .then((res) => setCenters(res.data))
      .catch(() => setCenters([]));
  }, [state, city]);

  // ---------- calendar within a week ----------
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const labelFormat = (dateObj, index) => {
    if (index === 0) return "Today";
    if (index === 1) return "Tomorrow";
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const dayTabs = Array.from({ length: 7 }).map((_, index) => {
    const d = new Date();
    d.setDate(d.getDate() + index);
    return {
      dateObj: d,
      date: formatDate(d),
      slots: 12,
      morning: ["09:30 AM", "10:00 AM", "11:30 AM"],
      afternoon: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM"],
      evening: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"],
    };
  });

  const currentDay = dayTabs[activeDayIndex];

  const handlePrev = () => {
    setActiveDayIndex((prev) => (prev > 0 ? prev - 1 : dayTabs.length - 1));
  };

  const handleNext = () => {
    setActiveDayIndex((prev) =>
      prev < dayTabs.length - 1 ? prev + 1 : 0
    );
  };

  // when user clicks a slot → create booking + save in localStorage
  const handleBooking = (center, time) => {
    const booking = {
      hospital: center["Hospital Name"],
      address: center.Address,
      city: center.City,
      state: center.State,
      zip: center["ZIP Code"],
      rating: center["Hospital overall rating"],
      date: currentDay.date,
      time,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    navigate("/my-bookings");
  };

  if (!state || !city) {
    return (
      <div style={{ marginLeft: "40px", marginTop: "40px" }}>
        <h1>Please select a state and city from the home page.</h1>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: "40px", marginTop: "20px", marginBottom: "40px" }}>
      {/* required heading format */}
      <h1>
        {centers.length} medical centers available in {city.toLowerCase()}
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={tick} alt="tick" />
        <p style={{ margin: 0 }}>
          Book appointments with minimum wait-time &amp; verified doctor details
        </p>
      </div>

      <div
        style={{
          width: "900px",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {centers.map((center, index) => (
          <div key={index} className="card">
            {/* top of card */}
            <div className="card-header">
              <div style={{ display: "flex", gap: "15px" }}>
                <div className="hsptl-wrapper">
                  <img src={hsptlmini} className="hsptl-img" alt="" />
                </div>

                <div>
                  {/* Hospital Name in <h3> */}
                  <h3 className="card-title">{center["Hospital Name"]}</h3>
                  <p className="grey-text">
                    {center.City}, {center.State}
                  </p>
                  <p className="grey-text">
                    Smilessence Center for Advanced Dentistry + 1 more
                  </p>

                  <p className="price-row">
                    <span className="free-text">FREE</span>&nbsp;
                    <span className="old-price">₹500</span>
                    &nbsp; Consultation fee at clinic
                  </p>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <p className="available-text">Available Today</p>
                {/* exact button text */}
                <button
                  className="book-btn"
                  onClick={() =>
                    setExpandedCenter(expandedCenter === index ? null : index)
                  }
                >
                  Book FREE Center Visit
                </button>
              </div>
            </div>

            {/* expanded appointment section */}
            {expandedCenter === index && (
              <div className="slot-container">
                <div className="tabs-row">
                  <button className="arrow-btn" onClick={handlePrev}>
                    &lt;
                  </button>

                  <div className="day-tabs">
                    {dayTabs.map((tab, i) => (
                      <p
                        key={i}
                        onClick={() => setActiveDayIndex(i)}
                        className={`day-tab ${
                          activeDayIndex === i ? "active-day" : ""
                        }`}
                      >
                        {labelFormat(tab.dateObj, i)}
                        <span className="slot-count">
                          {tab.slots} Slots Available
                        </span>
                      </p>
                    ))}
                  </div>

                  <button className="arrow-btn" onClick={handleNext}>
                    &gt;
                  </button>
                </div>

                <div className="active-line" />

                {/* Morning / Afternoon / Evening headings are <p> */}
                <div className="slot-group">
                  <p className="slot-label">Morning</p>
                  {currentDay.morning.map((t) => (
                    <button
                      key={t}
                      className="slot-btn"
                      onClick={() => handleBooking(center, t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="slot-group">
                  <p className="slot-label">Afternoon</p>
                  {currentDay.afternoon.map((t) => (
                    <button
                      key={t}
                      className="slot-btn"
                      onClick={() => handleBooking(center, t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="slot-group">
                  <p className="slot-label">Evening</p>
                  {currentDay.evening.map((t) => (
                    <button
                      key={t}
                      className="slot-btn"
                      onClick={() => handleBooking(center, t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
