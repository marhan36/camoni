import { currentDate } from '../utils/date'

export const normalizeName = (value) => value.trim().toLocaleLowerCase('id-ID')
export const createPreset = (name) => ({ id: crypto.randomUUID(), name: name.trim(), isActive: true })
export const isPreset = (value) => typeof value?.id === 'string' && typeof value?.name === 'string'
export const isActivePreset = (preset) => preset.isActive !== false
export const findPresetName = (items, id) => items.find((item) => item.id === id)?.name || 'Preset dihapus'

export function createDemoData() {
  const date = currentDate()
  const people = ['Joko', 'Prabs'].map(createPreset)
  const categories = ['Makan & Minum', 'Transportasi', 'Belanja', 'Tagihan', 'Hiburan'].map(createPreset)
  return { people, categories, budgets: { [date.slice(0, 7)]: 5000000 }, expenses: [
    { id: '1', personId: people[0].id, categoryId: categories[0].id, nominal: 48000, tanggal: date, catatan: 'Makan siang' },
    { id: '2', personId: people[1].id, categoryId: categories[1].id, nominal: 35000, tanggal: date, catatan: 'Ojek online' },
    { id: '3', personId: people[0].id, categoryId: categories[2].id, nominal: 125000, tanggal: `${date.slice(0, 8)}01`, catatan: 'Kebutuhan rumah' },
    { id: '4', personId: people[1].id, categoryId: categories[0].id, nominal: 75000, tanggal: `${date.slice(0, 8)}03`, catatan: 'Kopi & sarapan' },
  ] }
}

export function migrateCamoniData(value) {
  if (!value || !Array.isArray(value.people) || !Array.isArray(value.categories) || !Array.isArray(value.expenses)) return null
  const people = value.people.map((item) => typeof item === 'string' ? createPreset(item) : { ...item, isActive: item.isActive !== false })
  const categories = value.categories.map((item) => typeof item === 'string' ? createPreset(item) : { ...item, isActive: item.isActive !== false })
  return { ...value, people, categories, expenses: value.expenses.map((expense) => ({
    id: expense.id || crypto.randomUUID(), personId: expense.personId || people.find((person) => person.name === expense.nama)?.id || '', categoryId: expense.categoryId || categories.find((category) => category.name === expense.kategori)?.id || '', nominal: Number(expense.nominal), tanggal: expense.tanggal, catatan: expense.catatan || '',
  })) }
}

export const isCamoniData = (value) => Array.isArray(value?.people) && value.people.every(isPreset) && Array.isArray(value?.categories) && value.categories.every(isPreset) && Array.isArray(value?.expenses) && typeof value?.budgets === 'object'
