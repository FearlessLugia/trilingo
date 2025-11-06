import AsyncStorage from '@react-native-async-storage/async-storage'
import { RecordEntry } from '../types'

const HISTORY_STORAGE_KEY = '@Trilingo_history'

export async function loadHistory(): Promise<RecordEntry[]> {
  try {
    const history = await AsyncStorage.getItem(HISTORY_STORAGE_KEY)
    return history ? JSON.parse(history) : []
  } catch {
    return []
  }
}

export async function saveHistory(history: RecordEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
  } catch {
    // Ignore storage errors, no need to implement anything here
  }
}
