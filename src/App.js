// src/App.js
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Hero from "./hero";
import StateCityProvider from "./statecity";
import Footer from "./fotter";     // keep your footer implementation
import Hsptl from "./hsptl";
import MyBookings from "./MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <StateCityProvider>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/hospitals" element={<Hsptl />} />
          <Route path="/my-bookings" element={<MyBookings />} /> {/* Must be EXACTLY this */}
        </Routes>
      </StateCityProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
