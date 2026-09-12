import { useState } from 'react'
import Modal from './Modal'
import { monthLabel } from '../utils/date'
export default function BudgetModal({ budget, month, onClose, onSave }) { const [value, setValue] = useState(budget || ''); return <Modal title="Atur budget" onClose={onClose}><form onSubmit={(event) => { event.preventDefault(); onSave(value) }}><p className="modal-copy">Budget berlaku untuk <b>{monthLabel(month)}</b>.</p><label>Budget bulanan<input autoFocus type="number" min="0" placeholder="Contoh: 5000000" value={value} onChange={(event) => setValue(event.target.value)}/></label><div className="form-actions"><button type="button" className="cancel" onClick={onClose}>Batal</button><button className="submit">Simpan budget</button></div></form></Modal> }
