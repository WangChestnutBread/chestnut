import React, { useEffect, useRef } from "react";
import "./Birth.css";
function Birth() {
  const birthDayEl = useRef(null);

  useEffect(() => {
    const Day = birthDayEl.current;
    let isDayOptionExisted=false;

    const handleFocus = () => {
      if(!isDayOptionExisted){
        for(let k=1;k<32;k++){
            const dayOption = document.createElement('option');
            dayOption.setAttribute('value', k);
            dayOption.innerText=k;
            Day.appendChild(dayOption);
        }
      }
    };

    if (Day) {
      Day.addEventListener('focus', handleFocus);
    }

    return () => {
      if (Day) {
        Day.removeEventListener('focus', handleFocus);
      }
    };
  }, []);

  return (
    <div className="info" id="info__birth">
      <select className="box year" id="birth-day" ref={birthDayEl}>
        <option disabled selected>일</option>
      </select>
      <span className="Font"> 월</span>
    </div>
  );
}

export default Birth;