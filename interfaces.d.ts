interface Language {
  nameInLanguage: string
  nameInEnglish: string
  googleRegionCode: string
  googleLanguageCode: string
  lingueeCode: string,
  lingueeUrlPrefix: string
}

interface LingueeResult {
  text: string
  partOfSpeech: string
  gender: string
  audioUrls: string[]
}
