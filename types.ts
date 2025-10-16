export type Lemmas = {
  eng: string[]
  fra: string[]
  spa: string[]
}

export type Synset = {
  id: string
  gloss: { eng: string }
  lemmas: Lemmas
}

// export enum Language {
//   EN = 'en',
//   FR = 'fr',
//   ES = 'es',
// }