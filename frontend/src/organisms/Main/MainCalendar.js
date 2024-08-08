import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MainCalendar.css";
import { useState } from "react";

function MainCalendar({ attendance }) {
  const [attendDay, setAttendDay] = useState(attendance);
  const [value, onChange] = useState(new Date());

  const stamp = ({ date, view }) => {
    const result = attendDay.filter(
      (attends) => new Date(attends).toDateString() === date.toDateString()
    );
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month"
        minDate={new Date("2024-01-01")}
        maxDate={new Date("2024-12-31")}
        next2Label={null}
        prev2Label={null}
        tileContent={stamp}
        showNeighboringMonth={false}
      />
    </div>
  );
}

export default MainCalendar;
