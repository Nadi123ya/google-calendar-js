/* eslint-disable consistent-return */

import { getDisplayedWeekStart, getItem, setItem } from "../common/storage.js";
import { renderWeek } from "../calendar/calendar.js";
import { renderHeader } from "../calendar/header.js";
import { getStartOfWeek, getDisplayedMonth } from "../common/time.utils.js";

const navElem = document.querySelector(".navigation");
const displayedMonthElem = document.querySelector(
  ".navigation__displayed-month"
);

// отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
// вставить в .navigation__displayed-month

function renderCurrentMonth() {
  const date = getDisplayedWeekStart();
  displayedMonthElem.innerHTML = getDisplayedMonth(date);
}


// при переключении недели обновите displayedWeekStart в storage ++
// и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth) ++


const onChangeWeek = (event) => {
  const changeWeek = event.target.getAttribute("data-direction");
  const week = 7;
  const day = getDisplayedWeekStart().getDate();
  const month = getDisplayedWeekStart().getMonth();
  const year = getDisplayedWeekStart().getFullYear();

  const renewCalendar = () => {
    renderHeader();
    renderWeek();
    renderCurrentMonth();
  };

  if (changeWeek === null) return;
  if (changeWeek === "prev") {
    setItem("displayedWeekStart", new Date(year, month, day - week));
    renewCalendar();
  }
  if (changeWeek === "next") {
    setItem("displayedWeekStart", new Date(year, month, day + week));
    renewCalendar();
  }
  if (changeWeek === "today") {
    setItem("displayedWeekStart", new Date());
    renewCalendar();
  }
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener("click", onChangeWeek);
};
