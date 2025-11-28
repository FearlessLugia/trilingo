import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import historyReducer from '@/features/history/historySlice'
import savedReducer from '@/features/saved/savedSlice'
import synsetStackReducer from '@/features/synsetStack/synsetStackSlice'
import userReducer from '@/features/user/userSlice'

export const store = configureStore({
  reducer: {
    history: historyReducer,
    saved: savedReducer,
    synsetStack: synsetStackReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch