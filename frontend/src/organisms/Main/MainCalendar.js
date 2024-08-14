import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MainCalendar.css";
import { useState } from "react";
import { enUS } from 'date-fns/locale';

function MainCalendar({ attendance }) {
  const [attendDay, setAttendDay] = useState(attendance);
  const [value, onChange] = useState(new Date());

  // 스탬프 찍기
  const stamp = ({ date, view }) => {
    const result = attendDay.map((attends) => {
      if (new Date(attends).toDateString() === date.toDateString()) {
        return(
          <img key={`attend-${new Date(attends)}`} src="/image/Stamp.png" className="Stamp"/>
        )
      } else {
        return(null)
      }
    }
    )
    return (
      <>{result}</>
    )  
  };

  const highlightSunday = ({ date, view }) => {
    if (date.getDay() === 0) {
      return 'sunday';
    }
    return null;
  };



  return (
    <div>
      <Calendar
        onChange={onChange}
        locale={enUS}
        value={value}
        calendarType="gregory"
        minDetail="month"
        minDate={new Date(`${new Date().getFullYear()}-01-01`)}
        maxDate={new Date(`${new Date().getFullYear()}-12-31`)}
        next2Label={null}
        prev2Label={null}
        tileContent={stamp}
        tileClassName={highlightSunday}
        showNeighboringMonth={false}
      />
    </div>
  );
}

export default MainCalendar;
