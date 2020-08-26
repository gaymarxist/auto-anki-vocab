import { Component, h, Method } from '@stencil/core'
import { css } from 'linaria'

@Component({ tag: 'language-select' })
export class LanguageSelect {
  static readonly STORAGE_KEY = 'lang_pref'
  selectEl: HTMLSelectElement

  @Method()
  async getValue() {
    return this.selectEl.value
  }

  handleChange() {
    localStorage.setItem(LanguageSelect.STORAGE_KEY, this.selectEl.value)
  }

  componentDidLoad() {
    this.selectEl.value = localStorage.getItem(LanguageSelect.STORAGE_KEY)
  }

  render() {
    return (
      <div class={container}>
        <label hidden htmlFor="custom-select">Select language</label>
        <select onChange={() => this.handleChange()}  class={selectStyles} name="custom-select" ref={el => this.selectEl = el}>
          <slot />
        </select>
      </div>
    )
  }
}

const container = css`
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  cursor: pointer;
  line-height: 1.1;
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;
  &::after {
    content: "";
    width: 0.6em;
    height: 0.3em;
    background-color: var(--select-arrow);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }
`
const selectStyles = css`
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  grid-area: select;
`
