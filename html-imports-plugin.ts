import type { Compilation } from '@greenwood/cli';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Enables using ESM to import HTML files as an HTML <template> element
// have to use the `?type=html` query parameter to indicate that the file should be treated as an HTML template
// but vision is to be able to use import attributes: `import template from './template.html' with { type: 'html' };`
class HtmlImportsResource {
  context: Compilation['context'];
  extensions: string[];
  contentType: string;

  constructor(compilation: Compilation) {
    this.context = compilation.context;
    this.extensions = ['html'];
    this.contentType = 'text/javascript';
  }

  async shouldServe(url: URL) {
    const { searchParams } = url;

    return searchParams.get('type') === this.extensions[0]
  }

  async serve(url: URL) {
    const contents = await fs.readFile(url, 'utf-8');
    const runtimePath = path.relative(
      path.dirname(fileURLToPath(url)),
      fileURLToPath(new URL('./dom-parts-polyfill.ts', this.context.userWorkspace))
    ).split(path.sep).join('/');
    const runtimeImport = runtimePath.startsWith('.') ? runtimePath : `./${runtimePath}`;
    const body = `
      import { withParts } from ${JSON.stringify(runtimeImport)};
      const template = document.createElement('template');
      template.innerHTML = ${JSON.stringify(contents)};
      export default withParts(template);
    `;

    return new Response(body, {
      headers: new Headers({
        'Content-Type': this.contentType
      })
    });
  }
}

export { HtmlImportsResource };