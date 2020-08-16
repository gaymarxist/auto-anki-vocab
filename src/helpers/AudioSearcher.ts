import { isLanguageSupported, LanguageNotSupportedError, Languages } from "./languages";

export class AudioSearcher {
  static LINGUEE_PREFIX = 'https://linguee.com/mp3/'

  static async search(query: string, language: Language): Promise<LingueeResult[]> {
    console.log('searching audio')
    if (!isLanguageSupported(language)) {
      throw new LanguageNotSupportedError
    }

    // const result = await fetch(`/search-linguee?q=${query}&lang=${language.lingueeCode}`)
    const result = await fetch(`https://linguee-api.herokuapp.com/api?q=${encodeURIComponent(query)}&src=${language.lingueeCode}&dst=${Languages.English.lingueeCode}`).then(res => res.json())

    if (!result.exact_matches) {
      return []
    }

    // NOTE: things that are not exact matches show up in linguee's "exact_matches"
    const actualExactMatches = result.exact_matches.filter(match => match.text.toLowerCase() === query.toLowerCase())
    // only filter out the non-exact matches if there are any actual exact matches
    if (actualExactMatches.length > 0) {
      result.exact_matches = actualExactMatches
    }

    return result.exact_matches.map(match => ({
      text: match.text,
      partOfSpeech: match.word_type.pos,
      gender: match.word_type.gender,
      audioUrls: match.audio_links.filter(audio => audio.lang === language.nameInEnglish).map(audio => this.LINGUEE_PREFIX + audio.url_part)
    } as LingueeResult))
  }
}
