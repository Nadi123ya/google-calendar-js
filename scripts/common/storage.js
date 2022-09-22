const storage = {
    // используется для удаления события
    eventIdToDelete: null,
    // хранит дату понедельника той отображаемой недели
    displayedWeekStart: null,
    // хранит массив всех событий
    events: [],
    // это все данные, которые вам нужно хранить для работы приложения
    // eventIdToUpdate: null,
}

export const setItem = (key, value) => {
    localStorage.clear()
    localStorage.setItem(key, JSON.stringify(value))
}
export const getItem = (key) => JSON.parse(localStorage.getItem(key))

export const getDisplayedWeekStart = () => {
    return new Date(JSON.parse(localStorage.getItem('displayedWeekStart')))
}

// export const setItem = (key, value) => {
//     return Object.assign(storage, { [key]: value })
// ф-ция должна устанавливать значения в объект storage
// }

// export const getItem = (key) => storage[key]
// // ф-ция должна возвращать по ключу значения из объекта storage

// export const getDisplayedWeekStart = () => getItem('displayedWeekStart')


// пример объекта события
const eventExample = {
    id: 0.7520027086457333, // id понадобится для работы с событиями
    title: 'Title',
    description: 'Some description',
    start: new Date('2020-03-17T01:10:00.000Z'),
    end: new Date('2020-03-17T04:30:00.000Z'),
}
