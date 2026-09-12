import { currentDate } from '../utils/date'
export const createExpense = (values, id) => ({ id: id || crypto.randomUUID(), personId: values.personId, categoryId: values.categoryId, nominal: Number(values.nominal), tanggal: values.tanggal, catatan: values.catatan || '' })
export const createEmptyExpense = (data) => ({ personId: data.people[0]?.id || '', categoryId: data.categories[0]?.id || '', nominal: '', tanggal: currentDate(), catatan: '' })
