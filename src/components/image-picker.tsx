import { Component, h, Prop, State, Method } from '@stencil/core'
import { css } from 'linaria'

@Component({ tag: 'image-picker' })
export class ImagePicker {
  @Prop() urls: string[] = []
  @State() selectedImages: Set<number> = new Set()

  @Method()
  async getSelectedImageUrls(): Promise<string[]> {
    const selectedUrls = []
    for (const index of this.selectedImages.keys()) {
      selectedUrls.push(this.urls[index])
    }
    return selectedUrls
  }

  toggleSelected(index: number) {
    if (this.selectedImages.has(index)) {
      this.selectedImages.delete(index)
    } else {
      this.selectedImages = this.selectedImages.add(index)
    }
    this.selectedImages = new Set(this.selectedImages)
  }

  render() {
    return (
      <div class={container}>
        {this.urls.map((url, i) => (
          <div key={url} class={imageContainer} onClick={() => this.toggleSelected(i)}>
            <selectable-checkmark class={check} selected={this.selectedImages.has(i)}></selectable-checkmark>
            <img class={image} src={url} />
          </div>
        ))}
      </div>
    )
  }
}

const container = css`
  display: flex;
  flex-wrap: wrap;
  place-items: center;
  place-content: center;
`
const imageContainer = css`
  display: inline-block;
  margin: 5px;
  position: relative;
  cursor: pointer;
`
const image = css`
  border-radius: 8px;
`
const check = css`
  position: absolute;
  left: 8px;
  top: 8px;
`
