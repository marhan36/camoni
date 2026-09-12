import { ArrowDownLeft, Edit3, Trash2 } from 'lucide-react'
import { currency } from '../utils/formatters'
import { shortDate } from '../utils/date'
import EmptyState from './EmptyState'
import { findPresetName } from '../models/camoniData'
export default function TransactionRows({ data, expenses, onEdit, onDelete }) { return <div className="transactions-list">{expenses.length ? expenses.map((expense) => { const person = findPresetName(data.people, expense.personId); const category = findPresetName(data.categories, expense.categoryId); return <div className="tx" key={expense.id}><div className="tx-icon"><ArrowDownLeft size={18}/></div><div className="tx-info"><b>{expense.catatan || category}</b><span>{person} · {category}</span></div><div className="tx-right"><b>{currency(expense.nominal)}</b><span>{shortDate(expense.tanggal)}</span></div>{onEdit && <div className="tx-actions"><button onClick={() => onEdit(expense)}><Edit3 size={16}/></button><button className="danger" onClick={() => onDelete(expense.id)}><Trash2 size={16}/></button></div>}</div> }) : <EmptyState text="Belum ada transaksi"/>}</div> }
