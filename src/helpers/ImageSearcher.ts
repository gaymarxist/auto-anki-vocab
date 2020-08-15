import { isLanguageSupported, LanguageNotSupportedError } from "./languages";

export class ImageSearcher {
  static async search(query: string, language: Language): Promise<string[]> {
    if (!isLanguageSupported(language)) {
      throw new LanguageNotSupportedError()
    }
    const { googleRegionCode, googleLanguageCode } = language

    // cr: results from a specific region
    // lr: search results in language
    // gbv=1: disable javascript
    // tbm=isch: image search
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://www.google.com/search?cr=${googleRegionCode}&lr=${googleLanguageCode}&gbv=1&tbm=isch&q=${encodeURIComponent(query)}`).then(res => res.text())

    const parser = new DOMParser()
    const doc = parser.parseFromString(res, "text/html");
    const imageElements = Array.from(doc.querySelectorAll('body > div > table > tbody > tr img'))
    return imageElements.map(el => el.getAttribute('src'))
  }
}
