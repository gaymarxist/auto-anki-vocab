import { Config } from '@stencil/core';
import linaria from 'linaria/rollup'
import css from 'rollup-plugin-css-only'

export const config: Config = {
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  taskQueue: 'async',
  devServer: {
    port: 3000,
    reloadStrategy: 'pageReload'
  },
  outputTargets: [{
    type: 'www',
    serviceWorker: null
  }],
  rollupPlugins: {
    after: [
      linaria(),
      css({ output: 'www/build/bundle.css' })
    ]
  }
};
