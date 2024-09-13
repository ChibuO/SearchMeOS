import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  format, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, addDays, isSameMonth,
  isSameDay, addMonths, subMonths,
} from 'date-fns';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import events from '../Resources/calendarData.json';
import './Calendar.css';

const parseDate = (dateText) => {
  const [parsedMonth, parsedDay, parsedYear] = dateText.split(/\W/);
  return new Date(parsedYear, parsedMonth - 1, parsedDay);
}

export const CalendarApp = forwardRef((props, ref) => {
  const currentDate = new Date();
  const [anchorDate, setAnchorDate] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const monthStart = startOfMonth(anchorDate);
  const monthEnd = endOfMonth(anchorDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const changeMonth = (direction) => {
    if (direction === 0) {
      setAnchorDate(subMonths(anchorDate, 1));
    } else if (direction === 1) {
      setAnchorDate(addMonths(anchorDate, 1));
    } else if (direction === 2) {
      setAnchorDate(currentDate);
    }
  }

  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        // setAnchorDate(currentDate);
        // setSelectedDate(currentDate);
        /*
        The 'currentDate' object construction makes the dependencies of 
        useImperativeHandle Hook (at line 51) change on every render. To fix 
        this, wrap the initialization of 'currentDate' in its own useMemo() Hook
        */
        setAnchorDate(new Date());
        setSelectedDate(new Date());
      }
    };
  }, []);

  return (
    <div className='calendar-container'>
      <div className="calendar-header">
        <div id='calendar-directions-div'>
          <MdKeyboardDoubleArrowLeft className='calendar-btns' id='calendar-backward' onClick={() => changeMonth(0)} />
          <p className='calendar-btns' id='calendar-today-btn' onClick={() => changeMonth(2)}>today</p>
          <MdKeyboardDoubleArrowRight className='calendar-btns' id='calendar-forward' onClick={() => changeMonth(1)} />
        </div>
        <h3>{format(anchorDate, 'MMMM yyyy')}</h3>
      </div>
      <div className="calendar">
        <Calendar
          currentDate={currentDate}
          anchorDate={anchorDate}
          days={days}
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate} />
        <div className='calendar-todo-container'>
          <div className='calendar-todo-inner'>
            <h3 id='calendar-selected-date'>{format(selectedDate, 'MMM d, yyyy')}</h3>
            <div className='calendar-todo-list'>
              {events && events.filter((ev) => isSameDay(parseDate(ev.date), selectedDate)).map((event, index) => (
                <div key={index} className='calendar-todo-item'>
                  <h5>{event.time}</h5>
                  <p>{event.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const Calendar = ({ currentDate, anchorDate, days, events, selectedDate, setSelectedDate }) => {
  const dayNames = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];

  return (
    <div className='calendar-cal-div'>
      <div className='calendar-day-names'>
        {dayNames.map((dayName) => (
          <div key={dayName} className='calendar-day-name'>
            {dayName}
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {days.map((day, index) => (
          <Day key={index} day={day} currentDate={currentDate} anchorDate={anchorDate} events={events} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        ))}
      </div>
    </div>
  );
}

const Day = ({ day, currentDate, anchorDate, events, selectedDate, setSelectedDate }) => {
  const isCurrentMonth = isSameMonth(day, anchorDate);
  const isToday = isSameDay(day, currentDate);
  const isSelected = isSameDay(day, selectedDate);
  const hasEvent = events.filter((ev) => isSameDay(parseDate(ev.date), day)).length > 0;

  return (
    <div
      onClick={() => setSelectedDate(day)}
      className={`calendar-day-box ${isToday ? 'calendar-today' : ''} ${isSelected && !isToday ? 'calendar-day-box-selected ' : ''}`}>
      <div className={`calendar-day ${!isCurrentMonth ? 'calendar-disabled' : ''} ${hasEvent ? 'calendar-event' : ''}`}>
        <p>{format(day, 'd')}</p>
      </div>
    </div>
  );
};
