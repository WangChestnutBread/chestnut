import React, { useEffect, useRef } from "react";
import "./Birth.css";
function Birth(props) {
  const birthMontEl = useRef(null);

  useEffect(() => {
    const Month =birthMontEl.current;
    let isMonthOptionExisted =false;

    const handleFocus = () => {
      if(!isMonthOptionExisted){
        for(let j= 1; j<13;j++){
            const monthOption =document.createElement('option');
            monthOption.setAttribute('value', j);
            monthOption.innerText=j;
            Month.appendChild(monthOption);
        }
      }
    };

    if (Month) {
      Month.addEventListener('focus', handleFocus);
    }

    return () => {
      if (Month) {
        Month.removeEventListener('focus', handleFocus);
      }
    };
  }, []);

  return (
    <div className="info" id="info__birth">
      <select className="box year" id="birth-month" ref={birthMontEl}>
        <option disabled selected className="Font">{props.month}</option>
      </select>
      <span className="Font"> 월</span>
    </div>
  );
}

export default Birth;