import { renderEvents } from './events.js'
import { getDateTime } from '../common/time.utils.js'
import { closeModal } from '../common/modal.js'

const closeEventFormBtn = document.querySelector('.create-event__close-btn')
const eventFormElem = document.querySelector('.event-form')

export const events = []

function clearEventForm() {
    eventFormElem.reset()
}

function onCloseEventForm() {
    clearEventForm()
    closeModal()
}

closeEventFormBtn.addEventListener('click', onCloseEventForm)

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
    onCloseEventForm()
    renderEvents()
}

export function initEventForm() {
    eventFormElem.addEventListener('submit', onCreateEvent)
    closeEventFormBtn.addEventListener('click', onCloseEventForm)
}
initEventForm()
