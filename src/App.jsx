import { useState } from 'react'
import AppLayout from './components/AppLayout'
import AppAlert from './components/AppAlert'
import BudgetModal from './components/BudgetModal'
import ExpenseModal from './components/ExpenseModal'
import { useCamoni } from './hooks/useCamoni'
import DashboardPage from './pages/DashboardPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import TransactionsPage from './pages/TransactionsPage'

export default function App() {
  const camoni = useCamoni()
  const [page, setPage] = useState('Beranda')
  const [modal, setModal] = useState(null)
  const [editing, setEditing] = useState(null)
  const [alert, setAlert] = useState(null)
  const [filters, setFilters] = useState({ name: '', category: '', search: '' })
  const closeModal = () => { setModal(null); setEditing(null) }
  const openExpense = (expense = null) => { setEditing(expense); setModal('expense') }
  const showAlert = (result) => { if (result?.message) setAlert(result) }
  const saveExpense = (values) => { showAlert(camoni.actions.saveExpense(values, editing?.id)); closeModal() }
  const importData = async (file) => {
    if (!file) return
    try {
      const accepted = window.confirm('Import akan mengganti seluruh data Camoni yang tersimpan di browser ini. Lanjutkan?')
      if (accepted) await camoni.actions.importData(file)
    } catch { window.alert('File tidak bisa diimpor. Pilih file backup Camoni berformat JSON yang valid.') }
  }
  const common = { data: camoni.data, month: camoni.month, total: camoni.total, budget: camoni.budget, monthlyExpenses: camoni.monthlyExpenses, categoryData: camoni.categoryData, onMonthChange: camoni.actions.changeMonth }
  const deleteExpense = (id) => showAlert(camoni.actions.deleteExpense(id))
  const addPreset = (key, value) => { const result = camoni.actions.addPreset(key, value); showAlert(result); return result }
  const removePreset = (key, id) => showAlert(camoni.actions.removePreset(key, id))
  return <AppLayout page={page} setPage={setPage} onAdd={() => openExpense()}>
    {page === 'Beranda' && <DashboardPage {...common} onBudget={() => setModal('budget')} onTransactions={() => setPage('Transaksi')}/>}
    {page === 'Transaksi' && <TransactionsPage data={camoni.data} month={camoni.month} setMonth={camoni.setMonth} filters={filters} setFilters={setFilters} onEdit={openExpense} onDelete={deleteExpense}/>}
    {page === 'Laporan' && <ReportsPage {...common} people={camoni.data.people}/>}
    {page === 'Pengaturan' && <SettingsPage data={camoni.data} month={camoni.month} onBudget={() => setModal('budget')} onExport={camoni.actions.exportData} onImport={importData} onAddPreset={addPreset} onRemovePreset={removePreset}/>} 
    <AppAlert alert={alert} onClose={() => setAlert(null)}/>
    {modal === 'expense' && <ExpenseModal data={camoni.data} initial={editing} onClose={closeModal} onSave={saveExpense}/>} 
    {modal === 'budget' && <BudgetModal budget={camoni.budget} month={camoni.month} onClose={closeModal} onSave={(value) => { camoni.actions.setBudget(value); closeModal() }}/>} 
  </AppLayout>
}
