import { createAsyncThunk } from '@reduxjs/toolkit'
import { loadHistory, saveHistory } from '@/storage/historyStorage'
import { RootState } from '@/store/store'
import { RecordEntry } from '@/types'
import { clearHistory, deleteHistory, refreshHistory } from '@/features/history/historySlice'

export const loadHistoryAsync = createAsyncThunk(
  'history/loadHistory',
  async () => {
    return await loadHistory()
  }
)

export const refreshHistoryAsync = createAsyncThunk(
  'history/refreshHistory',
  async (entry: Omit<RecordEntry, 'timestamp'>, { getState, dispatch }) => {
    dispatch(refreshHistory(entry))
    
    const history = (getState() as RootState).history.history
    await saveHistory(history)
    return history
  }
)

export const deleteHistoryAsync = createAsyncThunk(
  'history/deleteHistory',
  async (entry: RecordEntry, { getState, dispatch }) => {
    dispatch(deleteHistory(entry))
    
    const history = (getState() as RootState).history.history
    await saveHistory(history)
    return history
  }
)
export const clearHistoryAsync = createAsyncThunk(
  'history/clearHistory',
  async (_, { dispatch }) => {
    dispatch(clearHistory())
    await saveHistory([])
  }
)