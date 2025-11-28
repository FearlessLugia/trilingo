import { createAsyncThunk } from '@reduxjs/toolkit'
import { loadSaved, saveSaved } from '@/storage/savedStorage'
import { RootState } from '@/store/store'
import { RecordEntry } from '@/types'
import { addSaved, clearSaved, deleteSaved } from '@/features/saved/savedSlice'

export const loadSavedAsync = createAsyncThunk(
  'saved/loadSaved',
  async (_, { getState }) => {
    const state = getState() as RootState
    const userId = state.user.userId
    return await loadSaved(userId)
  }
)

export const addSavedAsync = createAsyncThunk(
  'saved/refreshSaved',
  async (entry: Omit<RecordEntry, 'timestamp'>, { getState, dispatch }) => {
    dispatch(addSaved(entry))
    
    const state = getState() as RootState
    const userId = state.user.userId
    const saved = state.saved.saved
    await saveSaved(userId, saved)
    return saved
  }
)

export const deleteSavedAsync = createAsyncThunk(
  'saved/deleteSaved',
  async (entry: Omit<RecordEntry, 'timestamp'>, { getState, dispatch }) => {
    dispatch(deleteSaved(entry))
    
    const state = getState() as RootState
    const userId = state.user.userId
    const saved = state.saved.saved
    await saveSaved(userId, saved)
    return saved
  }
)
export const clearSavedAsync = createAsyncThunk(
  'saved/clearSaved',
  async (_, { getState, dispatch }) => {
    dispatch(clearSaved())
    const state = getState() as RootState
    const userId = state.user.userId
    await saveSaved(userId, [])
  }
)