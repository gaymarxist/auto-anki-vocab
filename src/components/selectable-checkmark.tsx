import { Component, h, Prop } from '@stencil/core'
import { css } from 'linaria'

@Component({ tag: 'selectable-checkmark' })
export class SelectableCheckmark {
  @Prop({ reflect: true }) selected = false
  render = () => <box-icon class={checkmark} color={this.selected ? 'lightseagreen' : '#7a7a7a'} name='check-circle' type={this.selected ? 'solid' : 'regular'}></box-icon>
}

const checkmark = css`
  background-color: #fffa;
  border-radius: 100px;
`
