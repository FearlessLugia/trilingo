import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { saveHistory } from '@/storage/historyStorage'
import { RecordEntry } from '@/types'
import { RootState } from '@/store/store'

interface HistoryState {
  history: RecordEntry[];
  loaded: boolean;
}

const initialState: HistoryState = {
  history: [],
  loaded: false
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    refreshHistory: (state, action: PayloadAction<Omit<RecordEntry, 'timestamp'>>) => {
      const timestamp = Date.now()
      const { headword, pivot } = action.payload
      
      const index = state.history.findIndex(h =>
        h.headword === headword && h.pivot === pivot)
      
      if (index === -1) {
        const newHistory: RecordEntry = { timestamp, ...action.payload }
        state.history.push(newHistory)
      } else {
        state.history[index].timestamp = timestamp
      }
      
      saveHistory(state.history)
    },
    
    deleteHistory: (state, action: PayloadAction<RecordEntry>) => {
      state.history = state.history.filter(h =>
        h.headword !== action.payload.headword || h.pivot !== action.payload.pivot)
      saveHistory(state.history)
    },
    
    clearHistory: (state) => {
      state.history = []
      saveHistory(state.history)
    },
    
    setHistory: (state, action: PayloadAction<RecordEntry[]>) => {
      state.history = action.payload
      state.loaded = true
    }
  }
})

export const { refreshHistory, deleteHistory, clearHistory, setHistory } = historySlice.actions

export const selectHistory = (state: RootState) =>
  state.history.history.slice().sort((a, b) => b.timestamp - a.timestamp)

export default historySlice.reducer
