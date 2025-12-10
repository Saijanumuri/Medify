import { useNavigate } from "react-router-dom";
import navimg from "./assests/Group 7.png";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="top-banner">
        The health and well-being of our patients and their health care team
        will always be our priority, so we follow the best practices.
      </div>

      <nav className="navbar">
        <div className="nav-left">
          <img
            src={navimg}
            alt="Medify Logo"
            className="nav-logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>

        <div className="nav-left nav-menu">
          <a href="#">Find Doctors</a>
          <a href="#">Hospitals</a>
          <a href="#">Medicines</a>
          <a href="#">Surgeries</a>
          <a href="#">Software for Provider</a>
          <a href="#">Facilities</a>

          <button
            className="booking-btn"
            onClick={() => navigate("/my-bookings")}
          >
            My Bookings
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
