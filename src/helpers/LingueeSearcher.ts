import { Languages } from "./languages";

export class LingueeSearcher {
  static LINGUEE_PREFIX = 'https://linguee.com/mp3/'

  static async search(query: string, language: Language): Promise<LingueeResult[]> {
    const response = await fetch(`https://linguee-api.herokuapp.com/api?q=${encodeURIComponent(query)}&src=${language.lingueeCode}&dst=${Languages.English.lingueeCode}`).then(res => res.json())

    if (!response.exact_matches) {
      return []
    }

    // filter out words from other languages
    let matches = response.exact_matches.filter(match => match.lemma_id.startsWith(language.lingueeCode))

    // things that are not exact matches show up in linguee's "exact_matches", so let's filter them out
    const actualExactMatches = matches.filter(match => match.text.toLowerCase() === query.toLowerCase())
    // only filter out the non-exact matches if there are any actual exact matches
    if (actualExactMatches.length > 0) {
      matches = actualExactMatches
    }

    const results: LingueeResult[] = matches.map(match => ({
      text: match.text,
      partOfSpeech: match.word_type.pos,
      gender: match.word_type.gender,
      audioUrls: [...new Set(match.audio_links.filter(audio => audio.url_part.startsWith(language.lingueeUrlPrefix)).map(audio => this.LINGUEE_PREFIX + audio.url_part))]
    } as LingueeResult))

    // remove duplicates
    const resultSet = new Set<string>()
    const dedupedResults: LingueeResult[] = []
    for (const result of results) {
      const stringResult = JSON.stringify(result)
      if (!resultSet.has(stringResult)) {
        resultSet.add(stringResult)
        dedupedResults.push(result)
      }
    }

    return dedupedResults
  }
}
