import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StateCityContext = createContext();

export default function StateCityProvider({ children }) {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get("https://meddata-backend.onrender.com/states");
        setStates(response.data);
      } catch (error) {
        console.error("Failed to fetch states:", error);
        setStates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  return (
    <StateCityContext.Provider value={{ states, loading }}>
      {children}
    </StateCityContext.Provider>
  );
}