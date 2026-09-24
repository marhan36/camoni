const pad = (value) => String(value).padStart(2, '0')

export const currentDate = () => {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export const currentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}`
}

export const monthLabel = (month) => {
  const [year, m] = month.split('-')
  return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date(Number(year), Number(m) - 1, 1))
}

export const shortDate = (date) => {
  const [year, m, day] = date.split('-')
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(new Date(Number(year), Number(m) - 1, Number(day)))
}

export function moveMonth(month, amount) {
  const [yearStr, monthStr] = month.split('-')
  const date = new Date(Number(yearStr), Number(monthStr) - 1 + amount, 1)
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1)
  return `${y}-${m}`
}
