import { generateWeekRange } from '../common/time.utils.js'
import { renderEvents } from '../events/events.js'
import { createNumbersArray } from '../common/createNumbersArray.js'
import { getDisplayedWeekStart } from '../common/storage.js'

const generateDay = () => {
    const addTimeSlot = createNumbersArray(0, 24)
        .map(
            (dataTime) =>
                `<div class="calendar__time-slot" data-time=${dataTime}></div>`
        )
        .join('')
    return addTimeSlot
}

const hour = 60
const clockHeight = () => new Date().getHours() * hour + new Date().getMinutes()

export const clock = () => {
    const currentDate = new Date()
    const currentDayElem = document.querySelector(
        `.calendar__day[data-day="${currentDate.getDate()}"]`
    )
    const presentTime = document.createElement('div')
    presentTime.classList.add('clockline')
    presentTime.style.marginTop = `${clockHeight()}px`
    presentTime.style.height = '1px'
    presentTime.style.width = '100px'
    presentTime.style.backgroundColor = 'red'
    presentTime.style.position = 'absolute'

    currentDayElem.append(presentTime)
}

export const renderWeek = () => {
    const findWeek = document.querySelector('.calendar__week')
    const startOfWeek = getDisplayedWeekStart()
    const dayTimeScale = generateDay()
    const addDay = generateWeekRange(startOfWeek)
        .map(
            (day) =>
                `<div class="calendar__day" data-day="${day.getDate()}">${dayTimeScale}</div>`
        )
        .join('')
    findWeek.innerHTML = addDay
    renderEvents()
    clock()
}
