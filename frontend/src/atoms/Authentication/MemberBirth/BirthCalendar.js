import React, {useState} from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

const BirthCalendar = ({clickDate, value}) => {
    const [nowDate, setNowDate] = useState("생년월일");
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState('decade');

    const handleToggleCalendar = () => {
        setIsOpen(!isOpen);
        setView('decade');
    }

    const handleDateChange = (selectedDate) => {
        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        clickDate(formattedDate);
        setIsOpen(false);
        setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일"));
    };

    const handleViewChange = (newView) => {
      setView(newView);
    }

    return (
        <BirthCalendarContainer>
            <BirthDropdownButton onClick={handleToggleCalendar} $hasValue={value || nowDate !== "생년월일"}>
              {value ? value : nowDate}
            </BirthDropdownButton>
            <BirthCalendarWrapper $isOpen={isOpen}>
                <StyledCalendar 
                    onChange={handleDateChange} 
                    value={value}
                    formatDay={(locale, date) => moment(date).format("DD")}
                    calendarType='gregory'
                    minDate={new Date(1900,0,1)}
                    maxDate={new Date(2024,0,1)}
                    view={view}
                    onViewChange={handleViewChange}
                    onClickYear={() => setView('year')}
                ></StyledCalendar>
            </BirthCalendarWrapper>
        </BirthCalendarContainer>
    );
};

export default BirthCalendar;

const BirthCalendarContainer = styled.div`
  position: relative;
`;

const BirthDropdownButton = styled.button`
  width: 582px;
  height: 50px;
  border: white;
  border-radius: 5px;
  padding: 0px 12px;
  color: var(--festie-gray-800, #3a3a3a);
  font-family: SUIT Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  text-align: start;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1rem;
    font-family: 'Jua';
    font-weight: 400;
    word-wrap: break-word;
    color: ${props => props.$hasValue ? 'var(--festie-gray-800, #3a3a3a)' : 'gray'};
`;

const BirthCalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: 0;
  width: 50%;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const StyledCalendar = styled(Calendar)`
    margin-bottom: 40px;
    border-radius: 10px;
    
  .react-calendar__month-view__days__day--weekend:nth-child(7n+1) {
    color: #f98080;
  }

  .react-calendar__month-view__days__day--weekend:nth-child(7n) {
    color: #80bef9;
  }

  .react-calendar__tile {
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    line-width: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;

    &:hover {
      background-color: #dcb78f !important;
    }
  }

  .react-calendar__month-view__days__day {
    pointer-events: auto !important;
  }

  .react-calendar__tile--now {
    background-color: white !important;
  }

  .react-calendar__navigation {
    line-height: 40px;
    align-items: center;
    border-radius: 10px 10px 0 0
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;

    &:hover {
      background-color: #dcb78f;
    }
  }

  .react-calendar__month-view__weekdays {
    font-size: 1rem;
    line-height: 18px;
    line-width: 18px;
    align-items: center;
  }
`;