import { getDisplayedWeekStart } from '../common/storage.js'
import { generateWeekRange } from '../common/time.utils.js'
import { openModal } from '../common/modal.js'

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const createBtn = document.querySelector('.create-event-btn')

// на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели ++
// на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце) ++
// полученную разметку вставить на страницу с помощью innerHTML в .calendar__header ++

// в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка ??

// 1. Find element with the class "calendar__header";
// 2. In this element add divs with the class "calendar__day-label" using the function generateWeekRange
// 2.1 generateWeekRange should use getDisplayedWeekStart in order to start the calculation from the current Monday.
// 3. add into div with the class "calendar__day-label" two spans with day-label__day-name" (inside - day of the week)
// and "day-label__day-number" (inside - number of the day);

// input: empty;
// output: html tag;

const getCurrentDay = (day, className) => {
    return new Date(new Date().toDateString()).getTime() === day.getTime()
        ? `${className} ${className}_active`
        : className
}
// return new Date(new Date().toDateString()).getTime() === day.getTime()

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

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик

const createEvent = (event) => {
    openModal()
}

createBtn.addEventListener('click', createEvent)
