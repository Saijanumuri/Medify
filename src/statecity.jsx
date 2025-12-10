import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StateCityContext = createContext();

export default function StateCityProvider({ children }) {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((res) => {
        setStates(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching states:", err);
        setStates([]);
        setLoading(false);
      });
  }, []);

  return (
    <StateCityContext.Provider value={{ states, loading }}>
      {children}
    </StateCityContext.Provider>
  );
}