import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import { loadPreferenceAsync, loadUserAsync } from '@/features/user/userThunks'
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
    updatePreference(state, action: PayloadAction<Partial<Preference>>) {
      state.preference = { ...state.preference, ...action.payload }
    }
  },
  
  extraReducers: (builder) => {
    builder.addCase(loadUserAsync.fulfilled, (state, action) => {
      const { userId, email, username } = action.payload
      state.userId = userId
      state.email = email
      state.username = username
      state.loaded = true
    })
    
    builder.addCase(loadPreferenceAsync.fulfilled, (state, action) => {
      state.preference = { ...state.preference, ...action.payload }
    })
  }
})

export const { updatePreference } = userSlice.actions

const selectUserState = (state: RootState) => state.user

// export const selectUser = createSelector(
//   [selectUserState],
//   (user) => {
//     return [...user].sort((a, b) => b.timestamp - a.timestamp)
//   }
// )

export default userSlice.reducer
