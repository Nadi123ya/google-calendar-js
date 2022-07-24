const popupElem = document.querySelector('.popup')
const popupContentElem = document.querySelector('.popup__content')

// в попап нужно передавать координаты, в которых показать попап
export function openPopup(x, y) {
    popupElem.classList.remove('hidden')
    popupElem.style.top = `${y}px`
    popupElem.style.left = `${x}px`
}

export function closePopup() {
    popupElem.classList.add('hidden')
}

function onClickInsidePopup(event) {
    event.stopPropagation()
}

popupContentElem.addEventListener('click', onClickInsidePopup)
popupElem.addEventListener('click', closePopup)
