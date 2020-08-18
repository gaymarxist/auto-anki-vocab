import { Component, h, State } from '@stencil/core';
import { ImageSearcher } from '../helpers/ImageSearcher';
import { toastController } from '@ionic/core';
import { css } from 'linaria'
import { LanguageNotSupportedError, Languages } from '../helpers/languages';
import { LingueeSearcher } from '../helpers/LingueeSearcher';

@Component({ tag: 'app-home' })
export class AppHome {
  wordInput: HTMLIonInputElement
  @State() imageResults: string[] = []
  @State() lingueeResults: LingueeResult[] = []
  @State() loading = false
  imagePicker: HTMLImagePickerElement
  audioPicker: HTMLAudioPickerElement

  cards: Card[] = []

  async search() {
    this.loading = true
    try {
      await Promise.all([this.searchImages(), this.searchLinguee()])
    } catch (e) {
      if (e instanceof LanguageNotSupportedError) {
        this.toast(e.message)
      }
    }
    this.loading = false
  }

  toast(message: string) {
    toastController.create({
      message: message,
      duration: 3000,
    }).then(toast => toast.present())
  }

  async searchImages() {
    this.imageResults = await ImageSearcher.search(this.wordInput.value.toString(), Languages.German)
  }

  async searchLinguee() {
    this.lingueeResults = await LingueeSearcher.search(this.wordInput.value.toString(), Languages.German)
  }

  handleKeyDown(e: KeyboardEvent) {
    // enter
    if (e.keyCode === 13) {
      this.search()
    }
  }

  async createCard() {
    const imageUrls = await this.imagePicker.getSelectedImageUrls()
    const audioUrl = await this.audioPicker.getSelectedAudioUrl()
    if (imageUrls.length === 0 || !audioUrl) {
      this.toast('You have to select an audio and at least one image')
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

  generateDeck() {
    console.log(this.cards)
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>Anki Vocab</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <div class={container}>
          <ion-item>
            <ion-label position="stacked" class={centerText}>word to learn</ion-label>
            <ion-input onKeyDown={e => this.handleKeyDown(e)} enterkeyhint="search" class={centerText} ref={el => this.wordInput = el}></ion-input>
          </ion-item>
          <ion-button class={button} onClick={() => this.search()}>
            <span>Search</span>
            {this.loading && <ion-spinner></ion-spinner>}
          </ion-button>
          {this.lingueeResults.length > 0 && <audio-picker ref={el => this.audioPicker = el} lingueeResults={this.lingueeResults}></audio-picker>}
          {this.imageResults.length > 0 && <image-picker ref={el => this.imagePicker = el} urls={this.imageResults}></image-picker>}
        </div>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button>
              <ion-icon name="checkmark"></ion-icon>
            </ion-fab-button>
            <ion-fab-list side="top">
            <ion-fab-button onClick={() => this.createCard()} class={newCard}>Create card</ion-fab-button>
            <ion-fab-button onClick={() => this.generateDeck()} class={generateDeck}>Generate deck</ion-fab-button>
          </ion-fab-list>
        </ion-fab>
        <div class={footer}>Created cards: {this.cards.length}</div>
      </ion-content>
    ];
  }
}

const centerText = css`
  text-align: center
`
const container = css`
  display: grid;
  place-items: center;
  & > * {
    margin: 15px;
  }
`
const button = css`
  & > * {
    margin: 0 5px;
  }
`
const generateDeck = css`
  width: 130px;
  position: absolute;
  right: 0px;
  top: -45px;
  --border-radius: 100px;
`
const newCard = css`
  width: 105px;
  position: absolute;
  right: 0px;
  --border-radius: 100px;
`
const footer = css`
  position: fixed;
  bottom: 25px;
  left: 20px;
`
