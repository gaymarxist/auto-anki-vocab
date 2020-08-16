type LanguageNames = 'German' | 'English'

export const Languages: { [K in LanguageNames]: Language } = {
  German: {
    nameInLanguage: 'Deutsch',
    nameInEnglish: 'German',
    googleRegionCode: 'countryDE',
    googleLanguageCode: 'lang_de',
    lingueeCode: 'de'
  },
  English: {
    nameInLanguage: 'English',
    nameInEnglish: 'English',
    googleRegionCode: 'countryUS',
    googleLanguageCode: 'lang_en',
    lingueeCode: 'en'
  }
}

export function isLanguageSupported(language: Language): boolean {
  return language.googleLanguageCode === Languages.German.googleLanguageCode
}

export class LanguageNotSupportedError extends Error {
  message = "That language is not supported" // TODO: add steps to request language
}
