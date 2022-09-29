const modalElem = document.querySelector('.modal')
const modalUpdateElem = document.querySelector('.modal__update')

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
