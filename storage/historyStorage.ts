import AsyncStorage from '@react-native-async-storage/async-storage'
import { HistoryEntry } from '../types'

const HISTORY_STORAGE_KEY = '@Trilingo_history'

export async function loadHistory(): Promise<HistoryEntry[]> {
  // TODO: Implement loading history from AsyncStorage
  // - Wrap in try/catch: return [] on any error (e.g., invalid JSON)
  // - Use AsyncStorage.getItem() to fetch data
  // - If data is null/undefined, return empty array []
  // - If not, parse JSON
  try {
    const history = await AsyncStorage.getItem(HISTORY_STORAGE_KEY)
    return history ? JSON.parse(history) : []
  } catch {
    return []
  }
}

export async function saveHistory(history: HistoryEntry[]): Promise<void> {
  // TODO: Implement saving history to AsyncStorage
  try {
    // Hint: Use AsyncStorage.setItem()
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
  } catch {
    // Ignore storage errors, no need to implement anything here
  }
}
