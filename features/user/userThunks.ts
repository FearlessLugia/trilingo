import { createAsyncThunk } from '@reduxjs/toolkit'
import { loadPreference, savePreference } from '@/storage/preferenceStorage'
import { supabase } from '@/utils/supabase'
import { setPreference, setUser, updatePreference } from '@/features/user/userSlice'
import { Preference } from '@/types'
import { RootState } from '@/store/store'

export const loadUserAsync = createAsyncThunk(
  'user/loadUser',
  async (_, { dispatch }) => {
    const { data } = await supabase.auth.getSession()
    const user = data.session?.user
    
    const userState = {
      userId: user?.id ?? null,
      email: user?.email ?? null,
      username: user?.email?.split('@')[0] ?? 'User'
    }
    
    dispatch(setUser(userState))
    
    await dispatch(loadPreferenceAsync())
  }
)

export const resetUserAsync = createAsyncThunk(
  'user/resetUser',
  async (_, { dispatch }) => {
    dispatch(
      setUser({
        userId: null,
        email: null,
        username: null
      })
    )
    
    dispatch(updatePreference({
      reminderEnabled: false,
      reminderHour: null,
      reminderMinute: null
    }))
  }
)

export const loadPreferenceAsync = createAsyncThunk(
  'user/loadPreference',
  async (_, { getState, dispatch }) => {
    const userId = (getState() as RootState).user.userId
    const data = await loadPreference(userId)
    
    if (data) {
      dispatch(setPreference(data))
    }
  }
)

export const updatePreferenceAsync = createAsyncThunk(
  'user/savePreference',
  async (entry: Partial<Preference>, { getState, dispatch }) => {
    dispatch(updatePreference(entry))
    
    const user = (getState() as RootState).user
    const userId = user.userId
    const preference = user.preference
    
    await savePreference(userId, preference)
    return entry
  }
)