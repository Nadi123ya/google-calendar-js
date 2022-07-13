import { getItem, setItem } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

const weekElem = document.querySelector(".calendar__week");
const eventFormElem = document.querySelector(".event-form");
const closeEventFormBtn = document.querySelector(".create-event__close-btn");

const submitBtn = document.querySelector(".event-form__submit-btn");
const titleInput = document.querySelector(`input[name='title']`);
const dateInput = document.querySelector(`input[name='date']`);
const startTimeInput = document.querySelector(`input[name='startTime']`);
const endTimeInput = document.querySelector(`input[name='endTime']`);
const descriptionInput = document.querySelector(`textarea[name='description']`);

function clearEventForm() {
  // ф-ция должна очистить поля формы от значений
  // dateInput.value = "";
  // titleInput.value = "";
  // descriptionInput.value = "";
  // startTimeInput.value = "";
  // endTimeInput.value = "";
  eventFormElem.remove();
}

function onCloseEventForm() {
  clearEventForm();
  closeModal();
  // здесь нужно закрыть модальное окно ++;
  // и очистить форму ++
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

function onCreateEvent(event) {
  event.preventDefault();
  const events = getItem("events") || [];
  const formData = Object.fromEntries(new FormData(eventFormElem));
  const newEvent = {
    title: formData.title || "(No title)",
    description: formData.description,
    start: getDateTime(formData.date, formData.startTime),
    end: getDateTime(formData.date, formData.endTime),
    id: Math.random(),
  };
  // const newEventId = {
  //   id: Math.random(),
  //   ...newEvent,
  // };
  events.push(newEvent);
  setItem("events", events);
  clearEventForm();
  onCloseEventForm();
  renderEvents();
}

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы
  closeEventFormBtn.addEventListener("click", onCloseEventForm);
  submitBtn.addEventListener("click", onCreateEvent);
}
initEventForm();
