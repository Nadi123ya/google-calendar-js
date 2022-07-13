import { renderTimescale } from "./calendar/timescale.js";
import { renderWeek } from "./calendar/calendar.js";
import { renderHeader } from "./calendar/header.js";
import { initNavigation } from "./header/navigation.js";
import { setItem } from "./common/storage.js";
import { getStartOfWeek } from "./common/time.utils.js";
import { initEventForm } from "./events/createEvent.js";
// import { clock } from "./calendar/calendar.js";

document.addEventListener("DOMContentLoaded", () => {
  // инициализация всех элементов
  renderTimescale();
  setItem("displayedWeekStart", getStartOfWeek(new Date()));
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
  // clock();
});
