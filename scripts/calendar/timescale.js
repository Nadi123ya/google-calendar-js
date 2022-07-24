import { createNumbersArray } from '../common/createNumbersArray.js'

// 1. Find element .calendar__time-scale;
// 2. add divs with .time-slot
// 2.1 use the function createNumbersArray for generating 24 divs - 24 hours;
// 3 add in divs with .time-slot spans with .time-slot__time

// ф-ция должна генерировать разметку для боковой шкалы времени (24 часа) ++
// полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale ++

// input: empty;
// output: undefined;

export const renderTimescale = () => {
    const findTimeScale = document.querySelector('.calendar__time-scale')
    const timeEl = createNumbersArray(0, 24)
        .map(
            (time) =>
                `<div 
    class="time-slot"><span
    class="time-slot__time">${
        time >= 0 && time <= 9 ? `0${time}:00` : `${time}:00`
    }</span>
    </div>`
        )
        .join('')
    findTimeScale.innerHTML = timeEl
}
renderTimescale()
