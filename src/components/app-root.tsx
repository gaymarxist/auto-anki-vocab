import { Component, h } from '@stencil/core';
import { css } from 'linaria'

@Component({ tag: 'app-root' })
export class AppRoot {
  render() {
    return (
      <app-home class={lightTheme}></app-home>
    );
  }
}

const lightTheme = css`
  --accent-color: #724ef5;

  --text-color: #000;
  --accent-text-color: #fff;
  --low-contrast-color: #ccc;
  color: var(--text-color);

  --button-box-shadow: 0px 2px 10px -1px #0000006B;

  --select-border: #777;
  --select-focus: var(--accent-color);
  --select-arrow: var(--select-border);
`
