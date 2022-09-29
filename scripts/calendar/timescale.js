import { createNumbersArray } from '../common/createNumbersArray.js'

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
