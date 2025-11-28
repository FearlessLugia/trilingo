import AsyncStorage from '@react-native-async-storage/async-storage'
import { RecordEntry } from '@/types'

const HISTORY_STORAGE_KEY = '@Trilingo_history'

const getKey = (userId: string) =>
  `${HISTORY_STORAGE_KEY}:${userId}`

export async function loadHistory(userId: string): Promise<RecordEntry[]> {
  try {
    const history = await AsyncStorage.getItem(getKey(userId))
    return history ? JSON.parse(history) : []
  } catch {
    return []
  }
}

export async function saveHistory(userId: string, history: RecordEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(getKey(userId), JSON.stringify(history))
  } catch {
    // Ignore storage errors, no need to implement anything here
  }
}
