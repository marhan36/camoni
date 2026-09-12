import { isCamoniData, migrateCamoniData } from '../models/camoniData'
const backupTimestamp = () => {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
}
export function downloadBackup(data) { const backup = { format: 'camoni-backup', version: 1, exportedAt: new Date().toISOString(), data }; const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })); const link = document.createElement('a'); link.href = url; link.download = `camoni-backup-${backupTimestamp()}.json`; link.click(); URL.revokeObjectURL(url) }
export function parseBackup(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = ({ target }) => { try { const parsed = JSON.parse(target.result); const data = migrateCamoniData(parsed?.format === 'camoni-backup' ? parsed.data : parsed); if (!isCamoniData(data)) throw new Error(); resolve(data) } catch { reject(new Error('File backup tidak valid')) } }; reader.onerror = () => reject(new Error('File backup tidak dapat dibaca')); reader.readAsText(file) }) }
