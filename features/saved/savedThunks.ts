import { createAsyncThunk } from '@reduxjs/toolkit'
import { loadSaved, saveSaved } from '@/storage/savedStorage'
import { RootState } from '@/store/store'
import { RecordEntry } from '@/types'
import { addSaved, clearSaved, deleteSaved } from '@/features/saved/savedSlice'

export const loadSavedAsync = createAsyncThunk(
  'saved/loadSaved',
  async () => {
    return await loadSaved()
  }
)

export const addSavedAsync = createAsyncThunk(
  'saved/refreshSaved',
  async (entry: Omit<RecordEntry, 'timestamp'>, { getState, dispatch }) => {
    dispatch(addSaved(entry))
    
    const saved = (getState() as RootState).saved.saved
    await saveSaved(saved)
    return saved
  }
)

export const deleteSavedAsync = createAsyncThunk(
  'saved/deleteSaved',
  async (entry: Omit<RecordEntry, 'timestamp'>, { getState, dispatch }) => {
    dispatch(deleteSaved(entry))
    
    const saved = (getState() as RootState).saved.saved
    await saveSaved(saved)
    return saved
  }
)
export const clearSavedAsync = createAsyncThunk(
  'saved/clearSaved',
  async (_, { dispatch }) => {
    dispatch(clearSaved())
    await saveSaved([])
  }
)