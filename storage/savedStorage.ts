import AsyncStorage from '@react-native-async-storage/async-storage'
import { RecordEntry } from '@/types'

const SAVED_STORAGE_KEY = '@Trilingo_saved'

export async function loadSaved(): Promise<RecordEntry[]> {
  try {
    const saved = await AsyncStorage.getItem(SAVED_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export async function saveSaved(saved: RecordEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved))
  } catch {
    // Ignore storage errors, no need to implement anything here
  }
}
