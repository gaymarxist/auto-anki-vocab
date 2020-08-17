import { Component, h, Prop, State, Method } from '@stencil/core'
import { css } from 'linaria'

@Component({ tag: 'audio-picker' })
export class AudioPicker {
  @Prop() lingueeResults: LingueeResult[] = []
  @State() playingUrl: string = null
  @State() selectedAudioUrl: string

  @Method()
  async getSelectedAudioUrl() {
    return this.selectedAudioUrl
  }

  handleClick(url: string) {
    this.playingUrl = url
    this.selectedAudioUrl = url
  }

  render() {
    return (
      <div class={container}>
        {this.lingueeResults.map(lingueeResult => (
          <div>
            {lingueeResult.audioUrls.map(url => (
              <ion-card onClick={() => this.handleClick(url)} class={this.selectedAudioUrl === url ? `selected ${card}` : card}>
                <ion-icon name={this.playingUrl === url ? 'pause' : 'play'}></ion-icon>
                <span>{lingueeResult.text}</span>
              </ion-card>
            ))}
          </div>
        ))}
        <audio autoplay src={this.playingUrl} onEnded={() => this.playingUrl = null}></audio>
      </div>
    )
  }
}

const container = css`
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  place-items: center;
`
const card = css`
  display: flex;
  place-content: center;
  place-items: center;
  padding: 12px;
  margin: 8px;
  cursor: pointer;
  & > * {
    margin: 0px 3px;
  }
  &:hover {
    box-shadow: 0px 0px 0px 2px var(--ion-color-medium-shade);
  }
  &.selected {
    box-shadow: 0px 0px 0px 2px var(--ion-color-success);
  }
`
