import { getDisplayedWeekStart } from '../common/storage.js'
import { generateWeekRange } from '../common/time.utils.js'
import { openModal } from '../common/modal.js'

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const createBtn = document.querySelector('.create-event-btn')

const getCurrentDay = (day, className) => {
    return new Date(new Date().toDateString()).getTime() === day.getTime()
        ? `${className} ${className}_active`
        : className
}

export const renderHeader = () => {
    const findCalendarHeader = document.querySelector('.calendar__header')
    const startOfWeek = getDisplayedWeekStart()
    const addDate = generateWeekRange(startOfWeek)
        .map(
            (dayLabel) => `<div 
  class="calendar__day-label day-label">
  <span class="${getCurrentDay(dayLabel, 'day-label__day-name')}">${
                daysOfWeek[dayLabel.getDay()]
            }</span>
  <span class="${getCurrentDay(
      dayLabel,
      'day-label__day-number'
  )}">${dayLabel.getDate()}</span>
  </div>`
        )
        .join('')
    findCalendarHeader.innerHTML = addDate
}
renderHeader()

const createEvent = (event) => {
    openModal()
}

createBtn.addEventListener('click', createEvent)
