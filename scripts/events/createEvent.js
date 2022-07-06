import { getItem, setItem } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

const eventFormElem = document.querySelector(".event-form");
const closeEventFormBtn = document.querySelector(".create-event__close-btn");

const titleInput = document.querySelector(`input[name='title']`);
const dateInput = document.querySelector(`input[name='date']`);
const startTimeInput = document.querySelector(`input[name='startTime']`);
const endTimeInput = document.querySelector(`input[name='endTime']`);
const descriptionInput = document.querySelector(`textarea[name='description']`);

function clearEventForm() {
  // ф-ция должна очистить поля формы от значений
  dateInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
}

function onCloseEventForm() {
  closeModal();
  // здесь нужно закрыть модальное окно ++;
  // и очистить форму
}
closeEventFormBtn.addEventListener("click", onCloseEventForm);
// задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
// создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
// при подтверждении формы нужно считать данные с формы
// с формы вы получите поля date, startTime, endTime, title, description
// на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
// date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
// полученное событие добавляем в массив событий, что хранится в storage
// закрываем форму
// и запускаем перерисовку событий с помощью renderEvents
function onCreateEvent() {
  const getEvents = getItem("events");
  const newEvent = {
    id: Math.random(),
    title: `${titleInput.value}`,
    description: `${descriptionInput.value}`,
    start: new Date(`${dateInput.value}` + ` ${startTimeInput.value}`),
    end: new Date(`${dateInput.value}` + ` ${endTimeInput.value}`),
  };
  getEvents.push(newEvent);
  setItem("events", getEvents);
  // renderEvents();
}

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы
}
