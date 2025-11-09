import type { Config } from '@greenwood/cli';
import { HtmlImportsResource } from './html-imports-plugin.ts';

export default {
  // TODO: prerender: true,
  plugins: [{
    type: 'resource',
    name: 'plugin-import-html:resource',
    provider: () => new HtmlImportsResource()
  }]
} satisfies Config;