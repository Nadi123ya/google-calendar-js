const popupElem = document.querySelector('.popup')
const popupContentElem = document.querySelector('.popup__content')

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
