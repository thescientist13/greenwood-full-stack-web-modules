import fs from 'fs/promises';
import { ResourceInterface } from "@greenwood/cli/src/lib/resource-interface.js";

// Enables using ESM to import HTML files as an HTML <template> element
class ImportHtmlResource extends ResourceInterface {
  constructor(compilation, options) {
    super(compilation, options);
    this.extensions = ['html'];
    this.contentType = 'text/javascript';
  }

  async shouldServe(url, request) {
    const { pathname } = url;

    // TODO (nice to have) better way to test for import attributes via URL, e.g. force attributes as query params somehow?
    return pathname.endsWith(this.extensions[0]); // || (request.headers.get('Content-Type') || '').includes(this.contentType);
  }

  async serve(url) {
    const contents = await fs.readFile(url, 'utf-8');
    const htmlInJsBody = `
      const template = document.createElement('template');

      template.innerHTML = \`${contents.replace(/\r?\n|\r/g, ' ').replace(/\\/g, '\\\\')}\`;

      export default template;
    `;

    return new Response(htmlInJsBody, {
      headers: new Headers({
        'Content-Type': this.contentType
      })
    });
  }
}

export default {
  // TODO prerender: true,
  plugins: [{
    type: 'resource',
    name: 'plugin-import-html:resource',
    provider: (compilation) => new ImportHtmlResource(compilation)
  }]
}