import { getDisplayedWeekStart } from '../common/storage.js'
import shmoment from '../common/shmoment.js'
import { openPopup, closePopup } from '../common/popup.js'
import { openModal } from '../common/modal.js'
import { openUpdateModal } from '../common/modal.js'
import { closeUpdateModal } from '../common/modal.js'
import { getDateTime } from '../common/time.utils.js'
import { events } from '../events/createEvent.js'
import { renderWeek } from '../calendar/calendar.js'

const weekElem = document.querySelector('.calendar__week')
const deleteEventBtn = document.querySelector('.delete__event-btn')
const closeEventBtn = document.querySelector('.close__event-btn')
const closeEventBtnUpdate = document.querySelector('.update-close__btn')
const popupDescriptionElem = document.querySelector('.popup__description')
const updateEventBtn = document.querySelector('.update__event-btn')
const eventFormElemUpdate = document.querySelector('.event-form-update')
const submitButtonUpdate = document.querySelector(
    '.event-form__submit-btn-update'
)

const formater = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
})
const getTime = (date) => formater.format(date)

function getDateEvent(selectedDate) {
    const date = new Date(selectedDate)
    let day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()
    const timeDigits = 10

    if (month < timeDigits) {
        month = '0' + month
    }
    if (day < timeDigits) {
        day = '0' + day
    }
    return year + '-' + month + '-' + day
}

function removeEventsFromCalendar() {
    return document
        .querySelectorAll('.event')
        .forEach((event) => event.remove())
}

const createEventElement = (event) => {
    const { start, end, title, id, description } = event
    const startEl = new Date(start)
    const endEl = new Date(end)

    const durationInMin = (startEl.getTime() - endEl.getTime()) / 1000 / 60

    const eventElem = document.createElement('div')
    eventElem.dataset.eventId = id
    eventElem.style.top = `${startEl.getMinutes()}px`
    eventElem.style.height = `${durationInMin}px`
    eventElem.classList.add('event')

    const eventTitle = document.createElement('div')
    eventTitle.classList.add('event__title')
    eventTitle.textContent = title

    const eventTime = document.createElement('div')
    eventTime.textContent = `${getTime(startEl)} - ${getTime(endEl)}`
    eventTime.classList.add('event__time')

    const eventDescription = document.createElement('div')
    eventDescription.classList.add('event__description')
    eventDescription.textContent = description

    eventElem.append(eventTitle, eventTime, eventDescription)

    return eventElem
}

export const renderEvents = () => {
    // не забудьте удалить с календаря старые события перед добавлением новых
    removeEventsFromCalendar()
    const startDateTime = getDisplayedWeekStart()
    const endDateTime = shmoment(startDateTime).add('days', 7).result()
    // фильтруем события, оставляем только те, что входят в текущую неделю
    events
        .filter((event) => {
            if (
                new Date(event.start).getTime() >= startDateTime.getTime() &&
                new Date(event.end).getTime() < endDateTime.getTime() === true
            )
                return event
        })
        .forEach((event) => {
            const { start } = event
            const startEl = new Date(start)
            const eventElem = createEventElement(event)
            const slotElem = document.querySelector(
                `.calendar__day[data-day="${startEl.getDate()}"] .calendar__time-slot[data-time="${startEl.getHours()}"]`
            )
            slotElem.append(eventElem)
        })
}

function handleEventClick(event) {
    const isEvent = event.target.closest('.event')
    if (!isEvent) {
        const dateInput = document.querySelector(`input[name='date']`)
        const startTimeInput = document.querySelector(`input[name='startTime']`)
        const endTimeInput = document.querySelector(`input[name='endTime']`)
        const displayedWeek = getDisplayedWeekStart()
        const choosedDay = event.target
            .closest('.calendar__day')
            .getAttribute(`data-day`)

        dateInput.value = new Date(
            `${displayedWeek.getFullYear()}-${
                displayedWeek.getMonth() + 1
            }-${choosedDay}`
        ).toLocaleDateString('en-CA')

        let hour = event.target.dataset.time
        if (+hour < 10) {
            hour = '0' + event.target.dataset.time
            startTimeInput.value = hour + ':00'
            endTimeInput.value =
                hour === '09' ? +hour + 1 + ':00' : '0' + (+hour + 1) + ':00'
            openModal()
            return
        }
        startTimeInput.value = hour + ':00'
        endTimeInput.value = +hour + 1 + ':00'
        openModal()
        return
    }

    openPopup(event.pageX, event.pageY)

    const eventId = isEvent.getAttribute('data-event-id')
    const [filteredEvent] = events.filter(({ id }) => id === Number(eventId))
    popupDescriptionElem.innerHTML = `
    <div class="popup__id" data-event-id=${filteredEvent.id}>
    <p class="popup__title">${filteredEvent.title}</p>
    <p class="popup__event">${getTime(filteredEvent.start)} - ${getTime(
        filteredEvent.end
    )}</p>
    <p class="popup__text">${filteredEvent.description}</p>
    <div>`
}

function onDeleteEvent(event) {
    const isDeleteBtn = event.target.closest('.delete__event-btn')
    if (!isDeleteBtn) {
        return
    }
    const popupDesc = document.querySelector('.popup__description')
    const popupId = popupDesc.querySelector('.popup__id')
    const eventId = popupId.getAttribute('data-event-id')
    const [eventToCheck] = events.filter((el) => {
        if ((el.id === Number(eventId)) === true);
        return el
    })
    const startTimeCheck = new Date(eventToCheck.start).getTime()
    const currentTime = new Date().getTime()
    const fifteenMin = 1000 * 60 * 15

    if (
        startTimeCheck > currentTime &&
        startTimeCheck - currentTime <= fifteenMin
    ) {
        alert(
            'You cannot delete the event that is starting in less then 15 min!'
        )
        return
    }

    const evIndex = events.findIndex((el) => {
        if ((el.id === Number(eventId)) === true) return el
    })
    events.splice(evIndex, 1)

    closePopup()
    renderWeek()
}

function clearEventUpdateForm() {
    eventFormElemUpdate.reset()
}

function onCloseEventUpdateForm() {
    clearEventUpdateForm()
    closeUpdateModal()
}

const addUpdatedEvent = (event) => {
    event.preventDefault()
    const isSubmitUpdateBtn = event.target.closest(
        '.event-form__submit-btn-update'
    )
    if (!isSubmitUpdateBtn) {
        return
    }
    const popupDesc = document.querySelector('.popup__description')
    const popupId = popupDesc.querySelector('.popup__id')
    const eventId = popupId.getAttribute('data-event-id')

    const [filteredEvent] = events.filter(({ id }) => {
        return id === Number(eventId)
    })
    const formData = Object.fromEntries(new FormData(eventFormElemUpdate))
    const changedEvent = {
        title: formData.title || '(No title)',
        description: formData.description,
        start: getDateTime(formData.date, formData.startTime),
        end: getDateTime(formData.date, formData.endTime),
        id: filteredEvent.id,
    }
    const previousEvent = events.find((el) => el.id === changedEvent.id)
    const updatedObj = {
        ...previousEvent,
        ...changedEvent,
    }

    const evIndex = events.findIndex((el) => {
        if ((el.id === Number(eventId)) === true) return el
    })
    events.splice(evIndex, 1, updatedObj)

    onCloseEventUpdateForm()
    renderWeek()
}

const updateEvent = (event) => {
    openUpdateModal(event.pageX, event.pageY)
    closePopup()
    const isUpdateBtn = event.target.closest('.update__event-btn')
    if (!isUpdateBtn) {
        return
    }
    const popupDesc = document.querySelector('.popup__description')
    const popupId = popupDesc.querySelector('.popup__id')
    const eventId = popupId.getAttribute('data-event-id')
    const [filteredEvent] = events.filter(({ id }) => {
        return id === Number(eventId)
    })

    document.querySelector('.event-form-update__field[type="text"]').value =
        filteredEvent.title
    document.querySelector('.event-form-update__field[type="date"]').value =
        getDateEvent(new Date(filteredEvent.start))
    document.querySelector(
        '.event-form-update__field[name="startTime"]'
    ).value = getTime(filteredEvent.start)
    document.querySelector('.event-form-update__field[name="endTime"]').value =
        getTime(filteredEvent.end)
    document.querySelector(
        '.event-form-update__field[name="description"]'
    ).value = filteredEvent.description
}

weekElem.addEventListener('click', handleEventClick)

closeEventBtn.addEventListener('click', closePopup)

closeEventBtnUpdate.addEventListener('click', closeUpdateModal)

deleteEventBtn.addEventListener('click', onDeleteEvent)

updateEventBtn.addEventListener('click', updateEvent)

submitButtonUpdate.addEventListener('click', addUpdatedEvent)
