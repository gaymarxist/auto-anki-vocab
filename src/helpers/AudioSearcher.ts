import { isLanguageSupported, LanguageNotSupportedError, Languages } from "./languages";
import * as linguee from '../../linguee'

export class AudioSearcher {
  static async search(query: string, language: Language): Promise<string[]> {
    if (!isLanguageSupported(language)) {
      throw new LanguageNotSupportedError
    }

    const result = await fetch(`/search-linguee?q=${query}&lang=${language.lingueeCode}`)
    console.log(result)

    return [query]
  }
}
