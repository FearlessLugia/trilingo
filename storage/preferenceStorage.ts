import AsyncStorage from '@react-native-async-storage/async-storage'
import { Preference } from '@/types'

const PREFERENCE_STORAGE_KEY = '@Trilingo_preference'

const getKey = (userId: string) =>
  `${PREFERENCE_STORAGE_KEY}:${userId}`

export async function loadPreference(userId: string): Promise<Preference | null> {
  try {
    const preference = await AsyncStorage.getItem(getKey(userId))
    return preference ? JSON.parse(preference) : null
  } catch {
    return null
  }
}

export async function savePreference(userId: string, preference: Preference): Promise<void> {
  try {
    await AsyncStorage.setItem(getKey(userId), JSON.stringify(preference))
  } catch {
    // Ignore storage errors, no need to implement anything here
  }
}
