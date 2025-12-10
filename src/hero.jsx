import React, { useState, useEffect, useContext } from "react";
import { StateCityContext } from "./statecity";
import { useNavigate } from "react-router-dom";


import Doctor from "./assests/doctors.png";
import DoctorCard from "./assests/card_service.png";
import Labs from "./assests/labs.png";
import HsptlIcon from "./assests/hsptl.png";
import MedStore from "./assests/medstore.png";
import amb from "./assests/ambul.png";
import hoff from "./assests/100_off.png";
import toff from "./assests/30_off.png";
import Dentistry from "./assests/Dentistry.png";
import pc from "./assests/pc.png";
import cardi from "./assests/cardi.png";
import mri from "./assests/mri.png";
import blood from "./assests/blood.png";
import pisco from "./assests/pisco.png";
import labo from "./assests/labo.png";
import xray from "./assests/xray.png";
import dtr1 from "./assests/dtr1.png";
import dtr2 from "./assests/dtr2.png";
import dtr3 from "./assests/dtr3.png";
import caring from "./assests/caring.png";
import detox from "./assests/detox.png";
import doctor2 from "./assests/doctor2.png";



const SearchForm = ({ states, onSearch }) => {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    if (!selectedState) return;
    fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error fetching cities:", err));
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedState || !selectedCity) {
      alert("Please select both State and City.");
      return;
    }
    onSearch(selectedState, selectedCity);
  };

  return (
    <div className="search-card">
      <form className="search-top-row" onSubmit={handleSubmit}>
     
        <div className="input-container" id="state">
          <p className="dropdown-label">{selectedState || "Select State"}</p>
          <ul className="suggestion-list">
            {states.map((st, i) => (
              <li
                key={i}
                className="suggestion-item"
                onClick={() => {
                  setSelectedState(st);
                  setSelectedCity("");
                  setCities([]);
                }}
              >
                {st}
              </li>
            ))}
          </ul>
        </div>

       
        <div className="input-container" id="city">
          <p className="dropdown-label">{selectedCity || "Select City"}</p>
          {selectedState && (
            <ul className="suggestion-list">
              {cities.map((c, i) => {
                const cityName = c.city || c.name || c; 
                return (
                  <li
                    key={i}
                    className="suggestion-item"
                    onClick={() => setSelectedCity(cityName)}
                  >
                    {cityName}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        
        <button className="search-btn" type="submit" id="searchBtn">
          Search
        </button>
      </form>

      <p className="looking-text">You may be looking for</p>
      <div className="categories">
        {[DoctorCard, Labs, HsptlIcon, MedStore, amb].map((img, i) => (
          <div key={i} className="category-card">
            <img src={img} className="cat-icon" alt="category" />
          </div>
        ))}
      </div>
    </div>
  );
};

const OffersSection = () => {
  const images = [hoff, toff, hoff, toff, hoff, hoff, toff];
  const [startIndex, setStartIndex] = useState(0);
  const visibleImages = images.slice(startIndex, startIndex + 3);

  return (
    <div className="offers-section">
      <div className="offer-images">
        {visibleImages.map((img, i) => (
          <img key={i} src={img} className="offer-img" alt="offer" />
        ))}
      </div>
      <div className="dots">
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            onClick={() => setStartIndex(i * 3)}
            className={startIndex === i * 3 ? "dot active" : "dot"}
          />
        ))}
      </div>
    </div>
  );
};

const SpecialisationSection = () => (
  <div className="specialisation-section">
    <p className="section-title">Find by Specialisation</p>
    <div className="special-grid">
      {[Dentistry, pc, cardi, mri, blood, pisco, labo, xray].map((img, i) => (
        <img key={i} src={img} className="special-img" alt="specialisation" />
      ))}
    </div>
    <button className="view-all-btn">View All</button>
  </div>
);

const SpecialistsSection = () => (
  <div className="specialists-section">
    <p className="section-title">Our Medical Specialist</p>
    <div className="docs-row">
      {[dtr1, dtr2, dtr3].map((img, i) => (
        <button key={i} className="doc-btn">
          <img src={img} alt="doctor" className="doc-img" />
        </button>
      ))}
    </div>
  </div>
);

const BlogSection = () => (
  <div className="blog-section">
    <p className="blog-sub">Blog & News</p>
    <p className="blog-title">Read Our Latest News</p>
    <div className="blog-cards">
      {[1, 2, 3].map((_, i) => (
        <div className="blog-card" key={i}>
          <img src={detox} className="blog-img" alt="blog" loading="lazy" />
          <p className="blog-meta">Medical | March 31, 2022</p>
          <p className="blog-text">
            6 Tips To Protect Your Mental Health When You're Sick
          </p>
          <div className="blog-author">
            <img src={doctor2} className="author-img" alt="author" />
            <p>Rebecca Lee</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);



function Hero() {
  const navigate = useNavigate();
  const { states } = useContext(StateCityContext);

  const handleSearch = (state, city) => {
    navigate(`/hospitals?state=${state}&city=${city}`);
  };

  return (
    <div className="hero-main">
      <div className="hero-content">
        <div>
          <p className="hero-title">
            Skip the travel! Find Online <br />
            <span className="medical-text">Medical</span>{" "}
            <span className="center-text">Centers</span>
          </p>
          <p className="hero-sub">
            Connect instantly with a specialist 24x7 or video visit a doctor.
          </p>
          <button className="find-btn">Find Doctors</button>
        </div>
        <img src={Doctor} alt="Doctor" className="doctor-img" />
      </div>

      <SearchForm states={states} onSearch={handleSearch} />
      <OffersSection />
      <SpecialisationSection />
      <SpecialistsSection />

      <div className="caring-banner">
        <img src={caring} className="caring-img" alt="Caring doctors" />
      </div>

      <BlogSection />
    </div>
  );
}

export default Hero;