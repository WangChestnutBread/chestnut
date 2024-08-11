import React, { useEffect, useRef } from "react";
import "./Birth.css";
function Birth(props) {
  const birthYearEl = useRef(null);

  useEffect(() => {
    const element = birthYearEl.current;
    let isYearOptionExisted = false;

    const handleFocus = () => {
      if (!isYearOptionExisted) {
        isYearOptionExisted = true;
        for (let i = 1940; i <= 2024; i++) {
          const yearOption = document.createElement('option');
          yearOption.setAttribute('value', i);
          yearOption.innerText = i;
          element.appendChild(yearOption);
        }
      }
    };

    if (element) {
      element.addEventListener('focus', handleFocus);
    }

    return () => {
      if (element) {
        element.removeEventListener('focus', handleFocus);
      }
    };
  }, []);

  return (
    <div className="info" id="info__birth">
      <select className="year" id="birth-year" ref={birthYearEl}>
        <option disabled selected className="Font">{props.year}</option>
      </select>
      <span className="Font"> 년</span>
    </div>
  );
}

export default Birth;