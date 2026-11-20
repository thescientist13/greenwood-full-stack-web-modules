import type { Config } from '@greenwood/cli';
import { HtmlImportsResource } from './html-imports-plugin.ts';

export default {
  // TODO: https://github.com/thescientist13/greenwood-full-stack-web-modules/issues/12
  // prerender: true,
  plugins: [{
    type: 'resource',
    name: 'plugin-import-html:resource',
    provider: (compilation) => new HtmlImportsResource(compilation)
  }]
} satisfies Config;