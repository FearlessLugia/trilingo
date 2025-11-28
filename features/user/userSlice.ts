import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import { Preference } from '@/types'

interface UserState {
  userId: string | null
  email: string | null
  username: string | null
  preference: Preference
  loaded: boolean
}

const initialState: UserState = {
  userId: null,
  email: null,
  username: null,
  preference: {
    reminderEnabled: false,
    reminderHour: null,
    reminderMinute: null
  },
  loaded: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      if (action.payload !== null) {
        const { userId, email } = action.payload
        state.userId = userId ?? null
        state.email = email ?? null
        state.username = email?.split('@')[0] ?? 'User'
      }
      state.loaded = true
    },
    
    updatePreference(state, action: PayloadAction<Partial<Preference>>) {
      state.preference = { ...state.preference, ...action.payload }
    },
    
    setPreference: (state, action: PayloadAction<Preference>) => {
      state.preference = action.payload
    }
  }
})

export const { setUser, updatePreference, setPreference } = userSlice.actions

export const selectUserState = (state: RootState) => state.user

export default userSlice.reducer
