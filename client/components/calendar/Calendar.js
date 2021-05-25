import React, { useState, useReducer } from "react";

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

const reducer = (state, action) => {
  switch (action.type) {
    case "setDate":
      return {
        ...state,
        date: action.value
      };
    case "setToday":
      return {
        ...state,
        date: action.value
      };
    default:
      throw new Error("Invalid case");
  }
};

const initialState = {
  date: new Date()
};

const setMonth = (state, month) => {
  const newDate = new Date(
    state.date.getFullYear(),
    month,
    state.date.getDate()
  );
  return { type: "setDate", value: newDate };
};

const setToday = () => {
  const newDate = new Date();
  return { type: "setToday", value: newDate };
};

export default function Calendar() {
  const [state, dispatch] = useReducer(reducer, initialState);
  state.date.setDate(1);
  const month = state.date.getMonth();
  const firstDayIndex = state.date.getDay();
  const prevLastDay = new Date(
    state.date.getFullYear(),
    state.date.getMonth(),
    0
  ).getDate();
  const lastDay = new Date(
    state.date.getFullYear(),
    state.date.getMonth() + 1,
    0
  ).getDate();
  const lastDayIndex = new Date(
    state.date.getFullYear(),
    state.date.getMonth() + 1,
    0
  ).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  return (
    <>
      <div className="month">
        <i
          className="fa fa-angle-left prev"
          onClick={() => {
            dispatch(setMonth(state, state.date.getMonth() - 1));
          }}
        ></i>
        <div className="date" onClick={() => dispatch(setToday())}>
          <h1>{`${months[month]} ${state.date.getFullYear()}`}</h1>
          <p>{new Date().toDateString()}</p>
        </div>
        <i
          className="fa fa-angle-right next"
          onClick={() => {
            dispatch(setMonth(state, state.date.getMonth() + 1));
          }}
        ></i>
      </div>
      <div className="table-responsive-md">
        <table className="table">
          <tr className="weekdays">
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>

          <tr className="days">
            {[...Array(firstDayIndex).keys()]
              .slice(0)
              .reverse()
              .map((day) => {
                return (
                  <td key={day} className="prev-date">
                    {prevLastDay - day}
                  </td>
                );
              })}
            {[...Array(lastDay).keys()].map((day) => {
              return (
                <td
                  key={day}
                  className={`${
                    day + 1 === new Date().getDate() &&
                    state.date.getMonth() === new Date().getMonth() &&
                    state.date.getFullYear() === new Date().getFullYear() &&
                    "today"
                  }`}
                >
                  {day + 1}
                </td>
              );
            })}
            {[...Array(nextDays).keys()].map((day) => {
              return (
                <td key={day} className="next-date">
                  {day + 1}
                </td>
              );
            })}
          </tr>
        </table>
      </div>
    </>
  );
}
