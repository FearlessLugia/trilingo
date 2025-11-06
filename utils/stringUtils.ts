export const underscoreToSpace = (text: string): string =>
  text.replace(/_/g, ' ')

export const spaceToUnderscore = (text: string): string =>
  text.replace(/ /g, '_')
