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

  async search() {
    this.loading = true
    try {
      await Promise.all([this.searchImages(), this.searchLinguee()])
    } catch (e) {
      if (e instanceof LanguageNotSupportedError) {
        toastController.create({
          message: e.message,
          duration: 3000,
        }).then(toast => toast.present())
      }
    }
    this.loading = false
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
          {this.lingueeResults.length > 0 && <audio-picker lingueeResults={this.lingueeResults}></audio-picker>}
          {this.imageResults.length > 0 && <image-picker ref={el => this.imagePicker = el} urls={this.imageResults}></image-picker>}
        </div>
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
