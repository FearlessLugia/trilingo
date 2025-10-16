export type Translations = {
  EN: string[]
  FR: string[]
  ES: string[]
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