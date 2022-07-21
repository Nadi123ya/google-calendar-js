import { getDisplayedWeekStart, getItem, setItem } from "../common/storage.js";
import shmoment from "../common/shmoment.js";
import { openPopup, closePopup } from "../common/popup.js";
import { closeModal, openModal } from "../common/modal.js";

const weekElem = document.querySelector(".calendar__week");
const deleteEventBtn = document.querySelector(".delete__event-btn");
const closeEventBtn = document.querySelector(".close__event-btn");
closeEventBtn.addEventListener("click", closePopup);

const formater = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const getTime = (date) => formater.format(date);

const popupDescriptionElem = document.querySelector(".popup__description");
const updateEventBtn = document.querySelector(".update__event-btn");

function getDateEvent(selectedDate) {
  const date = new Date(selectedDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  const timeDigits = 10;

  if (month < timeDigits) {
    month = "0" + month;
  }
  if (day < timeDigits) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

export const updateEvent = () => {
  openModal();

  const events = getItem("events") || [];
  console.log(events);
  const eventIdToDelete = getItem("eventIdToDelete");
  console.log(eventIdToDelete);
  const [filteredEvent] = events.filter(
    ({ id }) => id !== String(eventIdToDelete)
  );
  console.log(filteredEvent);

  document.querySelector('.event-form__field[type="text"]').value =
    filteredEvent.title;
  document.querySelector('.event-form__field[type="date"]').value =
    getDateEvent(new Date(filteredEvent.start));

  document.querySelector('.event-form__field[name="startTime"]').value =
    getTime(filteredEvent.start);
  document.querySelector('.event-form__field[name="endTime"]').value = getTime(
    filteredEvent.end
  );
  document.querySelector('.event-form__field[name="description"]').value =
    filteredEvent.description;
  setItem("eventIdToUpdate", eventIdToDelete);
};
updateEventBtn.addEventListener("click", updateEvent);

function handleEventClick(event) {
  const isEvent = event.target.classList.contains("event");
  console.log(isEvent);

  if (!isEvent) {
    const dateInput = document.querySelector(`input[name='date']`);
    const startTimeInput = document.querySelector(`input[name='startTime']`);
    const endTimeInput = document.querySelector(`input[name='endTime']`);
    const displayedWeek = getDisplayedWeekStart();
    const choosedDay = event.target
      .closest(".calendar__day")
      .getAttribute(`data-day`);

    dateInput.value = new Date(
      `${displayedWeek.getFullYear()}-${
        displayedWeek.getMonth() + 1
      }-${choosedDay}`
    ).toLocaleDateString("en-CA");

    let hour = event.target.dataset.time;
    if (+hour < 10) {
      hour = "0" + event.target.dataset.time;
      startTimeInput.value = hour + ":00";
      endTimeInput.value =
        hour === "09" ? +hour + 1 + ":00" : "0" + (+hour + 1) + ":00";
      openModal();
      return;
    }
    startTimeInput.value = hour + ":00";
    endTimeInput.value = +hour + 1 + ":00";
    openModal();
    return;
  }

  openPopup(event.pageX, event.pageY);
  const eventId = event.target.dataset.eventId;
  setItem("eventIdToDelete", `${eventId}`);
  const events = getItem("events") || [];
  const [filteredEvent] = events.filter(({ id }) => id !== String(eventId));
  popupDescriptionElem.innerHTML = `
    <p class="popup__title">${filteredEvent.title}</p>
    <p class="popup__event">${getTime(filteredEvent.start)} - ${getTime(
    filteredEvent.end
  )}</p>
    <p class="popup__text">${filteredEvent.description}</p>
    `;
  setItem("eventIdToUpdate", eventIdToDelete);
}
weekElem.addEventListener("click", handleEventClick);

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
  eventTime.textContent = `${getTime(start)} - ${getTime(end)}`;
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
  console.log(events);
  const eventIdToDelete = Number(getItem("eventIdToDelete"));
  // удаляем из массива нужное событие и записываем в storage новый массив
  const eventToCheck = events.filter((el) => el.id === eventIdToDelete);
  console.log(eventToCheck);
  const startTimeCheck = new Date(eventToCheck[0].start).getTime();
  const currentTime = new Date().getTime();
  const fifteenMin = 1000 * 60 * 15;

  if (
    startTimeCheck > currentTime &&
    startTimeCheck - currentTime <= fifteenMin
  ) {
    alert("You can not delete the event that is starting in less then 15 min!");
    return;
  }
  const filterEvents = events.filter((el) => el.id !== eventIdToDelete);
  console.log(filterEvents);
  setItem("events", filterEvents);
  console.log(events);
  // закрыть попап
  closePopup();
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
  renderEvents();
}

deleteEventBtn.addEventListener("click", onDeleteEvent);
