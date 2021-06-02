import React, { useEffect, useReducer } from "react";
import PaletteModal from "./PaletteModal";
import ViewButtons from "./ViewButtons";

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
    case "showModal":
      return {
        ...state,
        showModal: action.value
      };
    case "feelingSelected":
      return {
        ...state,
        showModal: false,
        selectedFeeling: action.value,
        dayToColor: {
          ...state.dayToColor,
          [state.selectedDay]: state.feelingToColor[action.value]
        }
      };
    case "setCalendarDay":
      return {
        ...state,
        selectedDay: action.value
      };
    case "setPalette":
      return {
        ...state,
        feelingToColor: {
          ...state.feelingToColor,
          [action.key]: action.value
        }
      };
    default:
      throw new Error("Invalid case");
  }
};

const initialState = {
  date: new Date(),
  showModal: false,
  selectedFeeling: null,
  feelingToColor: {},
  selectedDay: null,
  dayToColor: {}
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

const setCalendarDaySelected = (day) => {
  return { type: "setCalendarDay", value: day };
};

const toggleModal = (showModal) => {
  return { type: "showModal", value: showModal };
};

export default function Calendar({ userId }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.dayToColor[state.selectedDay]) {
      return;
    }
    console.log(state.dayToColor[state.selectedDay]);
  }, [state.dayToColor[state.selectedDay]]);

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
      <PaletteModal
        userId={userId}
        feelingToColor={state.feelingToColor}
        dispatch={dispatch}
        showModal={state.showModal}
        handleCloseModal={() => dispatch(toggleModal(false))}
      />
      <ViewButtons />
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
      <div className="table-responsive-md calendar-dates">
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
                  data-value={`${state.date.getFullYear()}-${
                    state.date.getMonth() + 1
                  }-${day + 1}`}
                  style={{
                    backgroundColor:
                      state.dayToColor[
                        `${state.date.getFullYear()}${
                          state.date.getMonth() + 1
                        }${day + 1}`
                      ]
                  }}
                  className={`${
                    day + 1 === new Date().getDate() &&
                    state.date.getMonth() === new Date().getMonth() &&
                    state.date.getFullYear() === new Date().getFullYear() &&
                    "today"
                  }`}
                  onClick={(e) => {
                    dispatch(setCalendarDaySelected(e.target.dataset.value));
                    dispatch(toggleModal(true));
                  }}
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
