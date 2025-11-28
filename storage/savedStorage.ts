import AsyncStorage from '@react-native-async-storage/async-storage'
import { RecordEntry } from '@/types'

const SAVED_STORAGE_KEY = '@Trilingo_saved'

const getKey = (userId: string) =>
  `${SAVED_STORAGE_KEY}:${userId}`

export async function loadSaved(userId: string): Promise<RecordEntry[]> {
  try {
    const saved = await AsyncStorage.getItem(getKey(userId))
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export async function saveSaved(userId: string, saved: RecordEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(getKey(userId), JSON.stringify(saved))
  } catch {
    // Ignore storage errors, no need to implement anything here
  }
}
