export type Translation = {
  lemma: string
  pos: string
}

export type Translations = {
  EN: Translation[]
  FR: Translation[]
  ES: Translation[]
}

export type Sense = {
  id: string
  glossEN: string
  translations: Translations
}

export enum Language {
  EN = 'en',
  FR = 'fr',
  ES = 'es',
}