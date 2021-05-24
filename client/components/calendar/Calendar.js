import React, { useState, useEffect } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default function Calendar() {
  const dateObj = new Date();
  const [date, setDate] = useState({ date: dateObj });
  date.date.setDate(1);
  const month = date.date.getMonth();
  const firstDayIndex = date.date.getDay();
  const prevLastDay = new Date(
    date.date.getFullYear(),
    date.date.getMonth(),
    0
  ).getDate();
  const lastDay = new Date(
    date.date.getFullYear(),
    date.date.getMonth() + 1,
    0
  ).getDate();
  const lastDayIndex = new Date(
    date.date.getFullYear(),
    date.date.getMonth() + 1,
    0
  ).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  const setMonth = (month) => {
    const newDate = new Date(
      date.date.getFullYear(),
      month,
      date.date.getDate()
    );
    setDate({ date: newDate });
  };

  return (
    <div className="calendar">
      <div className="month">
        <i
          className="fa fa-angle-left prev"
          onClick={() => {
            setMonth(date.date.getMonth() - 1);
          }}
        ></i>
        <div className="date">
          <h1>{`${months[month]} ${date.date.getFullYear()}`}</h1>
          <p>{new Date().toDateString()}</p>
        </div>
        <i
          className="fa fa-angle-right next"
          onClick={() => {
            setMonth(date.date.getMonth() + 1);
          }}
        ></i>
      </div>
      <div className="weekdays">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="days">
        {[...Array(firstDayIndex).keys()]
          .slice(0)
          .reverse()
          .map((day) => {
            return (
              <div key={day} className="prev-date">
                {prevLastDay - day}
              </div>
            );
          })}
        {[...Array(lastDay).keys()].map((day) => {
          return (
            <div
              key={day}
              className={`${
                day + 1 === new Date().getDate() &&
                date.date.getMonth() === new Date().getMonth() &&
                date.date.getFullYear() === new Date().getFullYear() &&
                "today"
              }`}
            >
              {day + 1}
            </div>
          );
        })}
        {[...Array(nextDays).keys()].map((day) => {
          return (
            <div key={day} className="next-date">
              {day + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
