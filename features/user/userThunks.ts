import { createAsyncThunk } from '@reduxjs/toolkit'
import { loadPreference, savePreference } from '@/storage/preferenceStorage'
import { supabase } from '@/utils/supabase'
import { updatePreference } from '@/features/user/userSlice'
import { Preference } from '@/types'
import { RootState } from '@/store/store'

export const loadUserAsync = createAsyncThunk(
  'user/loadUser',
  async () => {
    const { data } = await supabase.auth.getSession()
    const user = data.session?.user
    
    return {
      userId: user?.id ?? null,
      email: user?.email ?? null,
      username: user?.user_metadata?.username ?? null
    }
  }
)

export const loadPreferenceAsync = createAsyncThunk(
  'user/loadPreference',
  async (_, { getState }) => {
    const userId = (getState() as RootState).user.userId
    
    return await loadPreference(userId!)
  }
)

export const updatePreferenceAsync = createAsyncThunk(
  'user/savePreference',
  async (entry: Preference, { getState, dispatch }) => {
    dispatch(updatePreference(entry))
    
    const user = (getState() as RootState).user
    const userId = user.userId
    const preference = user.preference
    
    await savePreference(userId!, preference)
    return entry
  }
)