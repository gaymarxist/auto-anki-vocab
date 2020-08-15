type LanguageNames = 'German' | 'English'

export const Languages: { [K in LanguageNames]: Language } = {
  German: {
    name: 'Deutsch',
    googleRegionCode: 'countryDE',
    googleLanguageCode: 'lang_de',
    lingueeCode: 'ger'
  },
  English: {
    name: 'English',
    googleRegionCode: 'countryUS',
    googleLanguageCode: 'lang_en',
    lingueeCode: 'eng'
  }
}

export function isLanguageSupported(language: Language): boolean {
  return language.googleLanguageCode === Languages.German.googleLanguageCode
}

export class LanguageNotSupportedError extends Error {
  message = "That language is not supported" // TODO: add steps to request language
}
