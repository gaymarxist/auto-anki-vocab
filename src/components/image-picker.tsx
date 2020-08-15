import { Component, h, Prop, State, Method } from '@stencil/core'
import { css } from 'linaria'

@Component({ tag: 'image-picker' })
export class ImagePicker {
  @Prop() urls: string[] = []
  @State() selectedImages: Set<number> = new Set()

  @Method()
  async getSelectedImageUrls() {
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
        {this.urls.map((url, i) => {
          const selected = this.selectedImages.has(i)
          return (
            <div key={url} class={imageContainer} onClick={() => this.toggleSelected(i)}>
              <ion-icon class={[checkmark, selected ? selectedIcon : unselectedIcon].join(' ')} name={selected ? 'checkmark-circle' : 'checkmark-circle-outline'}></ion-icon>
              <img class={image} src={url} />
            </div>
          )
        })}
      </div>
    )
  }
}

const container = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
const checkmark = css`
  position: absolute;
  left: 8px;
  top: 8px;
  font-size: 20px;
`
const selectedIcon = css`
  color: lightseagreen;
`
const unselectedIcon = css`
  color: lightblue;
`
