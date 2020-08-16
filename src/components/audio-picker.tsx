import { Component, h, Prop } from '@stencil/core'
// import { css } from 'linaria'

@Component({ tag: 'audio-picker' })
export class AudioPicker {
  @Prop() lingueeResults: LingueeResult[] = []

  render() {
    return (
      <div>
        {this.lingueeResults.map(lingueeResult => (
          <div>
            <span>{lingueeResult.text}</span>
            {lingueeResult.audioUrls.map(url => (
              <audio controls src={url}></audio>
            ))}
          </div>
        ))}
      </div>
    )
  }
}
