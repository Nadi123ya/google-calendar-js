import { getDisplayedWeekStart, getItem, setItem } from "../common/storage.js";
import shmoment from "../common/shmoment.js";
import { openPopup, closePopup } from "../common/popup.js";
import { openModal } from "../common/modal.js";

const weekElem = document.querySelector(".calendar__week");
const deleteEventBtn = document.querySelector(".delete-event-btn");
const event = document.querySelector(".event");

function handleEventClick(event) {
  const isEvent = event.target.classList.contains(".event");
  if (!isEvent) {
    return;
  }
  openPopup(event.style.top, event.style.height);
  const eventId = isEvent.getAttribute("data-event-id");
  setItem("eventIdToDelete", `${eventId}`);
}

// если произошел клик по событию, то нужно паказать попап с кнопкой удаления
// установите eventIdToDelete с id события в storage

function removeEventsFromCalendar() {
  return document.querySelectorAll(".event").forEach((event) => event.remove());
  // ф-ция для удаления всех событий с календаря
}

// ф-ция создает DOM элемент события
// событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
// нужно добавить id события в дата атрибут
// здесь для создания DOM элемента события используйте document.createElement

const createEventElement = (event) => {
  const { start, end, title, id, description } = event;

  const durationInMin = (end - start) / 1000 / 60;

  const eventElem = document.createElement("div");
  eventElem.dataset.eventId = id;
  eventElem.style.top = `${start.getMinutes()}px`;
  eventElem.style.height = `${durationInMin}px`;
  eventElem.classList.add("event");

  const eventTitle = document.createElement("div");
  eventTitle.classList.add("event__title");
  eventTitle.textContent = title;

  const eventTime = document.createElement("div");
  eventTime.textContent = `${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`;
  eventTime.classList.add("event__time");

  const eventDescription = document.createElement("div");
  eventDescription.classList.add("event__description");
  eventDescription.textContent = description;

  eventElem.append(eventTitle, eventTime, eventDescription);

  return eventElem;
};

// достаем из storage все события и дату понедельника отображаемой недели
// фильтруем события, оставляем только те, что входят в текущую неделю
// создаем для них DOM элементы с помощью createEventElement
// для каждого события находим на странице временную ячейку (.calendar__time-slot)
// и вставляем туда событие
// каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
// не забудьте удалить с календаря старые события перед добавлением новых

export const renderEvents = () => {
  // не забудьте удалить с календаря старые события перед добавлением новых

  removeEventsFromCalendar();

  document.querySelectorAll(".event").forEach((event) => event.remove());

  // достаем из storage все события и дату понедельника отображаемой недели
  const events = getItem("events") || [];
  const startDateTime = getDisplayedWeekStart();
  const endDateTime = shmoment(startDateTime).add("days", 7).result();

  // фильтруем события, оставляем только те, что входят в текущую неделю
  events
    .filter((event) => {
      return event.start >= startDateTime && event.end < endDateTime;
    })
    .forEach((event) => {
      const { start } = event;
      const eventElem = createEventElement(event);
      const slotElem = document.querySelector(
        `.calendar__day[data-day="${start.getDate()}"] .calendar__time-slot[data-time="${start.getHours()}"]`
      );

      slotElem.append(eventElem);
    });
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  const events = getItem("events");
  const eventIdToDelete = +getItem("eventIdToDelete");
  // удаляем из массива нужное событие и записываем в storage новый массив
  const filterEvents = events.filter((el) => el.id !== eventIdToDelete);
  setItem("events", filterEvents);
  // закрыть попап
  closePopup();
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
  renderEvents();
}

deleteEventBtn.addEventListener("click", onDeleteEvent);

