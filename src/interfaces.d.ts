interface Language {
  nameInLanguage: string
  nameInEnglish: string
  googleRegionCode: string
  googleLanguageCode: string
  lingueeCode: string
}

interface LingueeResult {
  text: string
  partOfSpeech: string
  gender: string
  audioUrls: string[]
}
