/* eslint-disable consistent-return */

import { getDisplayedWeekStart, getItem, setItem } from '../common/storage.js'
import { renderWeek } from '../calendar/calendar.js'
import { renderHeader } from '../calendar/header.js'
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js'

const navElem = document.querySelector('.navigation')
const displayedMonthElem = document.querySelector(
    '.navigation__displayed-month'
)

function renderCurrentMonth() {
    const date = getDisplayedWeekStart()
    displayedMonthElem.innerHTML = getDisplayedMonth(date)
}

const onChangeWeek = (event) => {
    const switchArrow = event.target.closest('button')

    if (switchArrow === null) {
        return
    }

    const mondayCurrentWeek = getDisplayedWeekStart()
    const day = new Date(mondayCurrentWeek).getDate()
    const week = 7

    const changedMonth =
        // eslint-disable-next-line no-nested-ternary
        switchArrow.dataset.direction === 'next'
            ? new Date(mondayCurrentWeek).setDate(day + week)
            : switchArrow.dataset.direction === 'prev'
            ? new Date(mondayCurrentWeek).setDate(day - week)
            : getStartOfWeek(new Date())

    setItem('displayedWeekStart', new Date(changedMonth))
    renderHeader()
    renderCurrentMonth()
    renderWeek()
}

export const initNavigation = () => {
    renderCurrentMonth()
    navElem.addEventListener('click', onChangeWeek)
}
