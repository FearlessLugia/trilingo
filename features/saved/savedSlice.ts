import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RecordEntry } from '@/types'
import { RootState } from '@/store/store'
import { createSelector } from '@reduxjs/toolkit'
import { loadHistoryAsync } from '@/features/history/historyThunks'
import { loadSavedAsync } from '@/features/saved/savedThunks'

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
    },
    
    deleteSaved: (state, action: PayloadAction<Omit<RecordEntry, 'timestamp'>>) => {
      const { headword, pivot } = action.payload
      state.saved = state.saved.filter(s =>
        s.headword !== headword || s.pivot !== pivot)
    },
    
    clearSaved: (state) => {
      state.saved = []
    }
  },
  
  extraReducers: (builder) => {
    builder.addCase(loadSavedAsync.fulfilled, (state, action) => {
      state.saved = action.payload
      state.loaded = true
    })
  }
})

export const { addSaved, deleteSaved, clearSaved } = savedSlice.actions

const selectSavedState = (state: RootState) => state.saved.saved

export const selectSaved = createSelector(
  [selectSavedState],
  (saved) => {
    return [...saved].sort((a, b) => b.timestamp - a.timestamp)
  }
)
export default savedSlice.reducer
