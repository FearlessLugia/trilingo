import { createAsyncThunk } from '@reduxjs/toolkit'
import { loadHistory, saveHistory } from '@/storage/historyStorage'
import { RootState } from '@/store/store'
import { RecordEntry } from '@/types'
import { refreshHistory, deleteHistory, clearHistory, setHistory } from '@/features/history/historySlice'

export const loadHistoryAsync = createAsyncThunk(
  'history/loadHistory',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState
    const userId = state.user.userId
    const data = await loadHistory(userId)
    
    dispatch(setHistory(data))
  }
)

export const refreshHistoryAsync = createAsyncThunk(
  'history/refreshHistory',
  async (entry: Omit<RecordEntry, 'timestamp'>, { getState, dispatch }) => {
    dispatch(refreshHistory(entry))
    
    const state = getState() as RootState
    const userId = state.user.userId
    const history = state.history.history
    await saveHistory(userId, history)
    return history
  }
)

export const deleteHistoryAsync = createAsyncThunk(
  'history/deleteHistory',
  async (entry: RecordEntry, { getState, dispatch }) => {
    dispatch(deleteHistory(entry))
    
    const state = getState() as RootState
    const userId = state.user.userId
    const history = state.history.history
    await saveHistory(userId, history)
    return history
  }
)
export const clearHistoryAsync = createAsyncThunk(
  'history/clearHistory',
  async (_, { getState, dispatch }) => {
    dispatch(clearHistory())
    const state = getState() as RootState
    const userId = state.user.userId
    await saveHistory(userId, [])
  }
)