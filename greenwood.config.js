import { HtmlImportsResource } from './html-imports-plugin.js';

export default {
  prerender: true,
  plugins: [{
    type: 'resource',
    name: 'plugin-import-html:resource',
    provider: (compilation) => new HtmlImportsResource(compilation)
  }]
}