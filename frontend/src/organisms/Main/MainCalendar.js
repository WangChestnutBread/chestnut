import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MainCalendar.css";
import { useEffect, useRef, useState } from "react";
import { enUS } from "date-fns/locale";
import { event } from "jquery";
import baseApi from "../../api/fetchAPI";
import { Button, Overlay, Popover } from "react-bootstrap";

function MainCalendar({ attendance }) {
  const [attendDay, setAttendDay] = useState(attendance);
  const [value, onChange] = useState(new Date());
  const [studyLog, setStudyLog] = useState(null); // 학습 로그 데이터
  const [target, setTarget] = useState(null); // 클릭한 날짜
  const [showPopover, setShowPopover] = useState(false); // 팝오버 상태 관리
  const popoverRef = useRef(null); // 팝오버 위치 관련

  // 스탬프 찍기
  const stamp = ({ date, view }) => {
    const result = attendDay.map((attends, i) => {
      if (new Date(attends).toDateString() === date.toDateString()) {
        return (
          <img
            key={`attendStamp-${new Date(attends)}-${i}`}
            src="/image/Stamp.png"
            className="Stamp"
          />
        );
      } else {
        return null;
      }
    });
    return <>{result}</>;
  };

  // 일요일 빨간색으로 표시
  const highlightSunday = ({ date, view }) => {
    if (date.getDay() === 0) {
      return "sunday";
    }
    return null;
  };

  const showStudyLog = (value, event) => {
    setShowPopover(false);
    baseApi({
      method: "get",
      url: "/log/word-list",
      params: {
        year: value.getFullYear(),
        month: value.getMonth() + 1,
        day: value.getDate(),
      },
    })
      .then((response) => {
        // console.log(response.data.data);
        setStudyLog(response.data.data);
        setTarget(event.target);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOnClose = () => {
    setShowPopover(false);
  };

  useEffect(() => {
    if (studyLog) {
      console.log("켜졌다:", studyLog);
      setShowPopover(true);
    }
  }, [studyLog]);

  return (
    <div className="container">
      {/* 캘린더 */}
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
        onClickDay={showStudyLog}
      />

      {/* 팝오버 */}
      <Overlay show={showPopover} target={target} placement="right" padding={20} >
        <Popover className="CalendarPopover" ref={popoverRef} >
          <Popover.Header className="CalendarPopoverHeader">
            <button className="CalendarPopoverButton" onClick={handleOnClose}>
              오늘의 학습 기록 &times;
            </button>
          </Popover.Header>
          <Popover.Body >
            {studyLog ? (
              <div>{studyLog.length}건</div>
            ) : (
              <div>학습 기록이 없습니다.</div>
            )}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default MainCalendar;
