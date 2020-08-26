type LanguageNames = 'German' | 'English' | 'PortugueseBrazil' | 'PortugueseEurope'

export const Languages: { [K in LanguageNames]: Language } = {
  German: {
    nameInLanguage: 'Deutsch',
    nameInEnglish: 'German',
    googleRegionCode: 'countryDE',
    googleLanguageCode: 'lang_de',
    lingueeCode: 'DE',
    lingueeUrlPrefix: 'DE'
  },
  English: {
    nameInLanguage: 'American English',
    nameInEnglish: 'American English',
    googleRegionCode: 'countryUS',
    googleLanguageCode: 'lang_en',
    lingueeCode: 'EN',
    lingueeUrlPrefix: 'EN_US'
  },
  PortugueseBrazil: {
    nameInLanguage: 'Português brasileiro', // TODO: is this right?
    nameInEnglish: 'Brazilian Portuguese',
    googleRegionCode: 'countryBR',
    googleLanguageCode: 'lang_pt',
    lingueeCode: 'PT',
    lingueeUrlPrefix: 'PT_BR'
  },
  PortugueseEurope: {
    nameInLanguage: 'Português europeu', // TODO: is this right?
    nameInEnglish: 'European Portuguese',
    googleRegionCode: 'countryPT',
    googleLanguageCode: 'lang_pt',
    lingueeCode: 'PT',
    lingueeUrlPrefix: 'PT_PT'
  }
}

export function isLanguageSupported(language: Language): boolean {
  return language.googleLanguageCode === Languages.German.googleLanguageCode
}

export class LanguageNotSupportedError extends Error {
  message = "That language is not supported" // TODO: add steps to request language
}
