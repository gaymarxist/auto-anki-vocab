import { Component, h, Prop } from '@stencil/core'
import { css } from 'linaria'

@Component({ tag: 'selectable-checkmark' })
export class SelectableCheckmark {
  @Prop() selected = false
  render = () => <ion-icon class={[checkmark, this.selected ? selectedIcon : unselectedIcon].join(' ')} name={this.selected ? 'checkmark-circle' : 'checkmark-circle-outline'}></ion-icon>
}

const checkmark = css`
  font-size: 20px;
`
const selectedIcon = css`
  color: lightseagreen;
`
const unselectedIcon = css`
  color: lightblue;
`
