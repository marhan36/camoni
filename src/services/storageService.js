import { STORAGE_KEY } from '../constants/app'
import { createDemoData, migrateCamoniData } from '../models/camoniData'
export function loadCamoniData() { try { return migrateCamoniData(JSON.parse(localStorage.getItem(STORAGE_KEY))) || createDemoData() } catch { return createDemoData() } }
export const saveCamoniData = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
