import { configureStore } from '@reduxjs/toolkit'
import historyReducer from '@/features/history/historySlice'
import savedReducer from '@/features/saved/savedSlice'
import synsetStackReducer from '@/features/synsetStack/synsetStackSlice'

export const store = configureStore({
  reducer: {
    history: historyReducer,
    saved: savedReducer,
    synsetStack: synsetStackReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch