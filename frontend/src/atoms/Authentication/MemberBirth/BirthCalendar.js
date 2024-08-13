import React, {useState} from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import $ from '@emotion/is-prop-valid';

const BirthCalendar = ({clickDate, value}) => {
    const [nowDate, setNowDate] = useState("생년월일");
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleCalendar = () => {
        setIsOpen(!isOpen);
    }

    const handleDateChange = (selectedDate) => {
        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        clickDate(formattedDate);
        setIsOpen(false);
        setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일"));
    };

    return (
        <BirthCalendarContainer>
            <BirthDropdownButton onClick={handleToggleCalendar}>{value ? value : nowDate}</BirthDropdownButton>
            <BirthCalendarWrapper $isOpen={isOpen}>
                <StyledCalendar 
                    onChange={handleDateChange} 
                    value={value}
                    formatDay={(locale, date) => moment(date).format("DD")}
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
    color: gray;
`;

const BirthCalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: 0;
  width: 80%;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const StyledCalendar = styled(Calendar)`
    margin-bottom: 40px;

  .react-calendar__tile {
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

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


  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #dcb78f;
    }
  }
`;