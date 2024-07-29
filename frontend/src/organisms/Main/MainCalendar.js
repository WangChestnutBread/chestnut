import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MainCalendar.css";
import { useState } from "react";


function MainCalendar() {
    const [value, onChange] = useState(new Date());

    return (
      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
    );
}

export default MainCalendar;