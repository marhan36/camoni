export const currentDate = () => new Date().toISOString().slice(0, 10)
export const currentMonth = () => currentDate().slice(0, 7)
export const monthLabel = (month) => new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date(`${month}-01T00:00:00`))
export const shortDate = (date) => new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(new Date(`${date}T00:00:00`))
export function moveMonth(month, amount) { const date = new Date(`${month}-01T00:00:00`); date.setMonth(date.getMonth() + amount); return date.toISOString().slice(0, 7) }
