import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { monthLabel } from '../utils/date'
export default function PeriodSelector({ month, onChange }) { return <div className="period"><button onClick={() => onChange(-1)}><ChevronLeft size={18}/></button><span><CalendarDays size={16}/>{monthLabel(month)}</span><button onClick={() => onChange(1)}><ChevronRight size={18}/></button></div> }
