// import { getItem, setItem } from '../common/storage.js'
import { renderEvents } from './events.js'
import { getDateTime } from '../common/time.utils.js'
import { closeModal } from '../common/modal.js'

const closeEventFormBtn = document.querySelector('.create-event__close-btn')
const eventFormElem = document.querySelector('.event-form')

export const events = []
console.log(events)

function clearEventForm() {
    eventFormElem.reset()
}

function onCloseEventForm() {
    clearEventForm()
    closeModal()
    // здесь нужно закрыть модальное окно ++;
    // и очистить форму ++
}

closeEventFormBtn.addEventListener('click', onCloseEventForm)

// задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
// создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
// при подтверждении формы нужно считать данные с формы
// с формы вы получите поля date, startTime, endTime, title, description

// на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
// date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события

// полученное событие добавляем в массив событий, что хранится в storage
// закрываем форму
// и запускаем перерисовку событий с помощью renderEvents
// export const events = []

function onCreateEvent(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(eventFormElem))
    const newEvent = {
        title: formData.title || '(No title)',
        description: formData.description,
        start: getDateTime(formData.date, formData.startTime),
        end: getDateTime(formData.date, formData.endTime),
        id: Math.random(),
    }
    const crossingEvent = events.find(
        (event) =>
            (newEvent.start <= event.start && newEvent.end >= event.start) ||
            (newEvent.start >= event.start && newEvent.start <= event.end)
    )
    if (events.includes(crossingEvent)) {
        alert('You have an event at this time already!')
        return
    }
    if (new Date(newEvent.start).getTime() > new Date(newEvent.end).getTime()) {
        alert('The ending of the event cannot be greater than the beginning')
        return
    }
    const maxEventTime = 6
    if (
        new Date(newEvent.end).getHours() -
            new Date(newEvent.start).getHours() >
        maxEventTime
    ) {
        alert('The event duration cannot exceed 6 hours')
        return
    }

    events.push(newEvent)
    console.log(events)
    onCloseEventForm()
    renderEvents()
}

export function initEventForm() {
    // подпишитесь на сабмит формы и на закрытие формы
    eventFormElem.addEventListener('submit', onCreateEvent)
    closeEventFormBtn.addEventListener('click', onCloseEventForm)
}
initEventForm()
