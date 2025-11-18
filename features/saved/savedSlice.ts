import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { saveSaved } from '@/storage/savedStorage'
import { RecordEntry } from '@/types'
import { RootState } from '@/store/store'
import { createSelector } from '@reduxjs/toolkit'

interface SavedState {
  saved: RecordEntry[];
  loaded: boolean;
}

const initialState: SavedState = {
  saved: [],
  loaded: false
}

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    addSaved: (state, action: PayloadAction<Omit<RecordEntry, 'timestamp'>>) => {
      const timestamp = Date.now()
      const newSaved: RecordEntry = { timestamp, ...action.payload }
      state.saved.push(newSaved)
      saveSaved(state.saved)
    },
    
    deleteSaved: (state, action: PayloadAction<Omit<RecordEntry, 'timestamp'>>) => {
      state.saved = state.saved.filter(s =>
        s.headword !== action.payload.headword || s.pivot !== action.payload.pivot)
      saveSaved(state.saved)
    },
    
    clearSaved: (state) => {
      state.saved = []
      saveSaved(state.saved)
    },
    
    setSaved: (state, action: PayloadAction<RecordEntry[]>) => {
      state.saved = action.payload
      state.loaded = true
    }
  }
})

export const { addSaved, deleteSaved, clearSaved, setSaved } = savedSlice.actions

const selectSavedState = (state: RootState) => state.saved.saved

export const selectSaved = createSelector(
  [selectSavedState],
  (saved) => {
    return [...saved].sort((a, b) => b.timestamp - a.timestamp)
  }
)
export default savedSlice.reducer
