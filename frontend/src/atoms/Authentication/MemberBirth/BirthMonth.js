import React, { useState, useEffect } from "react";
import "./Birth.css";

function BirthMonth({ onChange }) {
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedMonth(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="info" id="info__birth">
      <select 
        className="year" 
        id="birth-month" 
        value={selectedMonth} 
        onChange={handleChange}
      >
        <option value="" disabled>월</option>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <span className="Font"> 월</span>
    </div>
  );
}

export default BirthMonth;