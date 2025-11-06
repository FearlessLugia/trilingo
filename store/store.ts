import { configureStore } from '@reduxjs/toolkit'
import historyReducer from '../features/history/historySlice'
import savedReducer from '../features/saved/savedSlice'

export const store = configureStore({
  reducer: {
    history: historyReducer,
    saved: savedReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch