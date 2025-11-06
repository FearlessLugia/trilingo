import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { Synset } from '../../types'
import { RootState } from '../../store/store'

interface SynsetStackState {
  synsetStack: string[];
  entities: Record<string, Synset>
}

const initialState: SynsetStackState = {
  synsetStack: [],
  entities: {}
}

const synsetStackSlice = createSlice({
  name: 'synsetStack',
  initialState,
  reducers: {
    pushSynset: (state, action: PayloadAction<Synset>) => {
      state.entities[action.payload.id] = action.payload
    },
    
    popSynset: (state, action: PayloadAction<Synset>) => {
      const { id } = action.payload
      
      if (state.synsetStack[state.synsetStack.length - 1] === id) {
        state.synsetStack.pop()
      } else {
        const idx = state.synsetStack.indexOf(id)
        if (idx !== -1) state.synsetStack.splice(idx, 1)
      }
      
      delete state.entities[id]
    },
    
    resetSynsetStack: (state) => {
      state.synsetStack = []
      state.entities = {}
    }
  }
})

export const { pushSynset, popSynset, resetSynsetStack } = synsetStackSlice.actions

export const selectSynsetStack = (state: RootState) =>
  state.synsetStack.synsetStack

export default synsetStackSlice.reducer
