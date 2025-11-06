export type Pivot = 'eng' | 'fra' | 'spa'

export type SynsetsRequest = {
  query: string
  pivot: Pivot
  keep_empty?: boolean
}

export type Lemmas = {
  eng: string[]
  fra: string[]
  spa: string[]
}

export type Synset = {
  id: string
  gloss: {
    eng: string
  }
  lemmas: Lemmas
  examples?: {
    eng: string[]
  }
}

export type SynsetsResponse = {
  headword: string
  pivot: Pivot
  synsets: Synset[]
}

export type HistoryEntry = {
  headword: string
  pivot: Pivot
  timestamp: number
}