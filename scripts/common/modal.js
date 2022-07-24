const modalElem = document.querySelector('.modal')
const modalUpdateElem = document.querySelector('.modal__update')

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана

export function openModal() {
    modalElem.classList.remove('hidden')
}
export function closeModal() {
    modalElem.classList.add('hidden')
}

export function openUpdateModal(x, y) {
    modalUpdateElem.classList.remove('hidden')
    modalUpdateElem.style.top = `${y}px`
    modalUpdateElem.style.left = `${x}px`
    modalUpdateElem.style.position = 'absolute'
}

export function closeUpdateModal() {
    modalUpdateElem.classList.add('hidden')
}
