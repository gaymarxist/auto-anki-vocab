import { Component, h, Prop, State, Method, Watch } from '@stencil/core'
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

  @Watch('lingueeResults')
  resetSelection() {
    this.selectedAudioUrl = undefined
  }

  handleClick(url: string) {
    if (this.selectedAudioUrl === url) {
      this.selectedAudioUrl = undefined
    } else {
      this.playingUrl = url
      this.selectedAudioUrl = url
    }
  }

  render() {
    return (
      <div class={container}>
        {this.lingueeResults.map(lingueeResult => (
          <div>
            {lingueeResult.audioUrls.map(url => (
              <div onClick={() => this.handleClick(url)} class={this.selectedAudioUrl === url ? `selected ${card}` : card}>
                <box-icon name={this.playingUrl === url ? 'pause' : 'play'}></box-icon>
                <span>{lingueeResult.text}</span>
              </div>
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
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 0px 2px var(--low-contrast-color);
  }
  &.selected {
    box-shadow: 0px 0px 0px 2px lightseagreen;
  }
`
