import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MainCalendar.css";
import { useState } from "react";

function MainCalendar() {
  const [value, onChange] = useState(new Date());
  function stamp({ date, view }) {
    let attendDay = [new Date("2024-07-29"), new Date()];
    for (let attend of attendDay) {
      if (attend.toDateString() === date.toDateString()) {
        return <img src="/image/Stamp.png" width="70%" />;
      }
    }
  }

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month"
        minDate={new Date('2024-01-01')}
        maxDate={new Date('2024-12-31')}
        next2Label={null}
        prev2Label={null}
        tileContent={stamp}
        showNeighboringMonth={false}
      />
    </div>
  );
}

export default MainCalendar;
