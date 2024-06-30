import React, { useState, useEffect } from "react";

const fetchCountry = async () => {
  const response = await fetch("http://localhost:3001/filter/sectordata");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const SectorFilter = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountry();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching sector:", error);
      }
    };

    getCountries();
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    // Add any additional actions to be performed on country click here
    console.log(`Selected country: ${country}`);
  };

  return (
    <div>
      <h2>Select a sector</h2>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            <button onClick={() => handleCountryClick(country._id)}>
              {country._id}
            </button>
          </li>
        ))}
      </ul>
      {selectedCountry && <p>Selected sector: {selectedCountry}</p>}
    </div>
  );
};

export default SectorFilter;
