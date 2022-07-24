// import { getItem, setItem } from '../common/storage.js'
// import { openUpdateModal, closeUpdateModal } from '../common/modal.js'
// import { openPopup, closePopup } from '../common/popup.js'
// import { renderEvents } from '../events/events.js'
// import { getDateTime } from '../common/time.utils.js'
// // import { closeUpdateModal } from '../common/modal.js'

// const formater = new Intl.DateTimeFormat('en-GB', {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: false,
// })
// const getTime = (date) => formater.format(date)

// function getDateEvent(selectedDate) {
//     const date = new Date(selectedDate)
//     let day = date.getDate()
//     let month = date.getMonth() + 1
//     const year = date.getFullYear()
//     const timeDigits = 10

//     if (month < timeDigits) {
//         month = '0' + month
//     }
//     if (day < timeDigits) {
//         day = '0' + day
//     }
//     return year + '-' + month + '-' + day
// }

// const updateEventBtn = document.querySelector('.update__event-btn')

// export const updateEvent = (event) => {
//     openUpdateModal(event.pageX, event.pageY)
//     closePopup()
//     const events = getItem('events') || []

//     const eventIdToDelete = getItem('eventIdToDelete')

//     const [filteredEvent] = events.filter(
//         ({ id }) => id !== String(eventIdToDelete)
//     )

//     document.querySelector('.event-form-update__field[type="text"]').value =
//         filteredEvent.title
//     document.querySelector('.event-form-update__field[type="date"]').value =
//         getDateEvent(new Date(filteredEvent.start))
//     document.querySelector(
//         '.event-form-update__field[name="startTime"]'
//     ).value = getTime(filteredEvent.start)
//     document.querySelector('.event-form-update__field[name="endTime"]').value =
//         getTime(filteredEvent.end)
//     document.querySelector(
//         '.event-form-update__field[name="description"]'
//     ).value = filteredEvent.description
// }

// updateEventBtn.addEventListener('click', updateEvent)

// const submitButtonUpdate = document.querySelector(
//     '.event-form__submit-btn-update'
// )

// const eventFormElemUpdate = document.querySelector('.event-form-update')

// function clearEventUpdateForm() {
//     eventFormElemUpdate.reset()
// }

// const closeEventBtnUpdate = document.querySelector('.update-close__btn')
// closeEventBtnUpdate.addEventListener('click', closeUpdateModal)

// function onCloseEventUpdateForm() {
//     clearEventUpdateForm()
//     closeUpdateModal()
//     // здесь нужно закрыть модальное окно ++;
//     // и очистить форму ++
// }
// export const addUpdatedEvent = (event) => {
//     event.preventDefault()
//     const events = getItem('events') || []
//     const eventIdToDelete = getItem('eventIdToDelete')
//     const [filteredEvent] = events.filter(
//         ({ id }) => id !== String(eventIdToDelete)
//     )
//     const formData = Object.fromEntries(new FormData(eventFormElemUpdate))
//     const changedEvent = {
//         title: formData.title || '(No title)',
//         description: formData.description,
//         start: getDateTime(formData.date, formData.startTime),
//         end: getDateTime(formData.date, formData.endTime),
//         id: filteredEvent.id,
//     }
//     const [previousEvent] = events.filter(
//         ({ id }) => id !== String(changedEvent)
//     )

//     const eventsWithoutprevious = events.filter(
//         ({ id }) => id === String(previousEvent)
//     )

//     eventsWithoutprevious.push(changedEvent)

//     setItem('events', eventsWithoutprevious)

//     onCloseEventUpdateForm()
//     renderEvents()
// }
// submitButtonUpdate.addEventListener('click', addUpdatedEvent)
