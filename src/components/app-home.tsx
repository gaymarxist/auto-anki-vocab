import { Component, h, State } from '@stencil/core';
import { css } from 'linaria'
import { LanguageNotSupportedError, Languages } from '../helpers/languages';
import { ImageSearcher } from '../helpers/ImageSearcher';
import { LingueeSearcher } from '../helpers/LingueeSearcher';
import '@material/mwc-snackbar'
import '@material/mwc-circular-progress'
import { Snackbar } from '@material/mwc-snackbar';
import { Card } from '../global/app';

@Component({ tag: 'app-home' })
export class AppHome {
  wordInput: HTMLInputElement
  @State() imageResults: string[] = []
  @State() lingueeResults: LingueeResult[] = []
  @State() loading = false
  @State() generatingDeck = false
  imagePicker: HTMLImagePickerElement
  audioPicker: HTMLAudioPickerElement
  languageSelect: HTMLLanguageSelectElement
  snackbar: Snackbar

  cards: Card[] = []

  async search() {
    this.loading = true
    try {
      const input = this.wordInput.value.toString()
      const language = await this.getLanguage()
      await Promise.all([this.searchImages(input, language), this.searchLinguee(input, language)])
    } catch (e) {
      if (e instanceof LanguageNotSupportedError) {
        this.showSnackbar(e.message)
      }
    }
    this.loading = false
  }

  showSnackbar(message: string) {
    this.snackbar.labelText = message
    this.snackbar.show()
  }

  async searchImages(input: string, language: Language) {
    this.imageResults = await ImageSearcher.search(input, language)
  }

  async searchLinguee(input: string, language: Language) {
    this.lingueeResults = await LingueeSearcher.search(input, language)
  }

  handleKeyDown(e: KeyboardEvent) {
    // enter
    if (e.keyCode === 13) {
      this.search()
    }
  }

  async getLanguage() {
    return Languages[await this.languageSelect.getValue()]
  }

  async addCard() {
    const imageUrls = await this.imagePicker.getSelectedImageUrls()
    const audioUrl = await this.audioPicker.getSelectedAudioUrl()
    if (imageUrls.length === 0 || !audioUrl) {
      this.showSnackbar('You have to select an audio and at least one image')
    } else {
      this.cards.push({
        text: this.wordInput.value.toString(),
        audioUrl,
        imageUrls
      })
      this.wordInput.value = ''
      this.imageResults = []
      this.lingueeResults = []
    }
  }

  async generateDeck() {
    if (this.cards.length === 0) {
      this.showSnackbar('You have to add at least one card first')
      return
    }
    this.generatingDeck = true
    const res = await fetch('/api/generate-deck', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cards: this.cards })
    })
    if (res.status === 200) {
      const blob = await res.blob()
      // const blob = new Blob([buffer], { type: 'application/octet-stream' })
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a') as HTMLAnchorElement
      a.style.display = 'none'
      a.href = objectUrl
      a.download = 'New-Vocab.apkg'
      a.click()
    } else {
      const error = await res.text()
      this.showSnackbar(error)
    }
    this.generatingDeck = false
  }

  componentDidLoad() {
    fetch('http://localhost:8765', {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        version: 6,
        action: 'deckNames'
      })
    }).then(res => res.text())
      .then(res => console.log(res))
  }

  render() {
    return [
      <div class={container}>
        <language-select onKeyDown={e => this.handleKeyDown(e)} ref={el => this.languageSelect = el}>
          {Object.entries(Languages).map(([key, language]) => (
            <option value={key}>{language.nameInEnglish}</option>
          ))}
        </language-select>
        <label hidden class={centerText}>word to learn</label>
        <input autofocus placeholder="Search for a word..." onKeyDown={e => this.handleKeyDown(e)} class={wordInputStyle} ref={el => this.wordInput = el}></input>
        <div class={buttonContainer}>
          <button class={button} onClick={() => this.search()}>
            <span>Search</span>
          </button>
        </div>
        {this.loading && <mwc-circular-progress indeterminate></mwc-circular-progress>}
        {this.lingueeResults.length > 0 && <audio-picker ref={el => this.audioPicker = el} lingueeResults={this.lingueeResults}></audio-picker>}
        {this.imageResults.length > 0 && <image-picker ref={el => this.imagePicker = el} urls={this.imageResults}></image-picker>}
      </div>,
      <mwc-snackbar ref={el => this.snackbar = el}></mwc-snackbar>,
      <div class={footer}>
        <button onClick={() => this.addCard()} class={addCardButton}>add card</button>
        <button onClick={() => this.generateDeck()} disabled={this.cards.length === 0} class={generateDeckButton}>generate deck</button>
        {this.cards.map(card => (
          <div class={smallCardContainer}>
            <img src={card.imageUrls[0]} />
            <div class={cardText}>{card.text}</div>
          </div>
        ))}
      </div>
    ];
  }
}

const smallCardContainer = css`
  display: flex;
  flex-direction: column;
  & img {
    height: 40px;
  }
  margin: 0 2px;
`
const cardText = css`
  text-align: center;
`
const addCardButton = css`
  position: absolute;
  bottom: 100%;
`
const generateDeckButton = css`
  position: absolute;
  bottom: 100%;
  right: 0px;
`
const wordInputStyle = css`
  font-size: 20px;
  border: none;
  outline: transparent;
  margin: 20px 20px 0 20px;
  text-align: center;
`
const centerText = css`
  text-align: center;
`
const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const button = css`
  height: min-content;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  outline: transparent;
  border-radius: 8px;
  background-color: var(--accent-color);
  color: var(--accent-text-color);
  cursor: pointer;
  transition: box-shadow 150ms ease-in-out;
  &:hover {
    box-shadow: var(--button-box-shadow);
  }
`
const buttonContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`
const footer = css`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 60px;
  border-top: 1px solid var(--text-color);
  display: flex;
`
