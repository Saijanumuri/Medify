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


  const dayTabs = Array.from({ length: 7 }).map((_, index) => {
    const d = new Date();
    d.setDate(d.getDate() + index);
    return {
      label:
        index === 0
          ? "Today"
          : index === 1
          ? "Tomorrow"
          : d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      morning: ["09:30 AM", "10:00 AM"],
      afternoon: ["12:00 PM", "01:30 PM"],
      evening: ["06:00 PM", "07:00 PM"],
    };
  });

  const currentDay = dayTabs[activeDayIndex];

  
  const handleBooking = (center, time) => {
    const booking = {
      hospital: center["Hospital Name"],
      address: center.Address,
      city: center.City,
      state: center.State,
      date: currentDay.date,
      time,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    navigate("/my-bookings");
  };


  if (!state || !city) {
    return (
      <div style={{ margin: "40px" }}>
        <h1>Please select a state and city from the home page.</h1>
      </div>
    );
  }

  return (
    <div style={{ margin: "40px" }}>
      
      <h1>
        {centers.length} medical centers available in {city.toLowerCase()}
      </h1>

     
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <img src={tick} alt="tick" />
        <p>
          Book appointments with minimum wait-time &amp; verified doctor details
        </p>
      </div>

      
      {centers.map((center, index) => (
        <div key={index} className="card">
          
          <div className="card-header">
            <div style={{ display: "flex", gap: "15px" }}>
              <div className="hsptl-wrapper">
                <img src={hsptlmini} className="hsptl-img" alt="hospital" />
              </div>

              <div>
                <h3 className="card-title">
                  {center["Hospital Name"]}
                </h3>
                <p className="grey-text">
                  {center.City}, {center.State}
                </p>
              </div>
            </div>

            <button
              className="book-btn"
              onClick={() =>
                setExpandedCenter(
                  expandedCenter === index ? null : index
                )
              }
            >
              Book FREE Center Visit
            </button>
          </div>

          
          {expandedCenter === index && (
            <div className="slot-container">
              <p className="slot-label">Today</p>

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
  );
}
