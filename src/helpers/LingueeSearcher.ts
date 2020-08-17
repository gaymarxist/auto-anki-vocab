import { isLanguageSupported, LanguageNotSupportedError, Languages } from "./languages";

export class LingueeSearcher {
  static LINGUEE_PREFIX = 'https://linguee.com/mp3/'

  static async search(query: string, language: Language): Promise<LingueeResult[]> {
    if (!isLanguageSupported(language)) {
      throw new LanguageNotSupportedError
    }

    const result = await fetch(`https://linguee-api.herokuapp.com/api?q=${encodeURIComponent(query)}&src=${language.lingueeCode}&dst=${Languages.English.lingueeCode}`).then(res => res.json())

    if (!result.exact_matches) {
      return []
    }

    // filter out words from other languages
    let matches = result.exact_matches.filter(match => match.lemma_id.startsWith(language.lingueeCode))

    // things that are not exact matches show up in linguee's "exact_matches", so let's filter them out
    const actualExactMatches = matches.filter(match => match.text.toLowerCase() === query.toLowerCase())
    // only filter out the non-exact matches if there are any actual exact matches
    if (actualExactMatches.length > 0) {
      matches = actualExactMatches
    }

    return matches.map(match => ({
      text: match.text,
      partOfSpeech: match.word_type.pos,
      gender: match.word_type.gender,
      audioUrls: [...new Set(match.audio_links.map(audio => this.LINGUEE_PREFIX + audio.url_part))]
    } as LingueeResult))
  }
}
