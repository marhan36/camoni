import { useEffect } from 'react'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
export default function AppAlert({ alert, onClose }) { useEffect(() => { if (!alert) return undefined; const timer = setTimeout(onClose, 4500); return () => clearTimeout(timer) }, [alert, onClose]); if (!alert) return null; return <div className={alert.ok ? 'app-alert' : 'app-alert error'} role="status">{alert.ok ? <CheckCircle2 size={19}/> : <AlertCircle size={19}/>}<span>{alert.message}</span><button aria-label="Tutup pemberitahuan" onClick={onClose}><X size={16}/></button></div> }
