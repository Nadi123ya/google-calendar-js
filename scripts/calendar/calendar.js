// import { getItem } from "../common/storage.js";
import { generateWeekRange } from '../common/time.utils.js'
import { renderEvents } from '../events/events.js'
import { createNumbersArray } from '../common/createNumbersArray.js'
import { getDisplayedWeekStart } from '../common/storage.js'

// функция должна сгенерировать и вернуть разметку дня в виде строки ++
// разметка состоит из 24 часовых временных слотов (.calendar__time-slot) ++
// 1. add divs from 1-24 using createNumbersArray
// input: empty
// output html tag div

const generateDay = () => {
    const addTimeSlot = createNumbersArray(0, 24)
        .map(
            (dataTime) =>
                `<div class="calendar__time-slot" data-time=${dataTime}></div>`
        )
        .join('')
    return addTimeSlot
}

// 1. find element with (.calendar__week).
// 2. add elements using  generateWeekRange(startOfWeek)
// const startOfWeek = getDisplayedWeekStart() - storing the date of Monday
// of current week;
// const addDate = generateWeekRange(startOfWeek) - return the array with 7 days
// starting from current Monday(startOfWeek)
// 3. add data attributes to new divs with the number of a day ".getDate()"
// 4. inside of that el add generateDay() - time-slots

// input:empty;
// output: html tag;

// функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week) ++
// разметка недели состоит из 7 дней (.calendar__day) отображаемой недели ++
// массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage ++
// каждый день должен содержать в дата атрибуте порядковый номер дня в месяце ++

// после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents

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
