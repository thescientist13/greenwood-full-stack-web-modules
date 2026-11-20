import fs from 'node:fs/promises';

// Enables using ESM to import HTML files as an HTML <template> element
// have to use the `?type=html` query parameter to indicate that the file should be treated as an HTML template
// but vision is to be able to use import attributes: `import template from './template.html' with { type: 'html' };`
class HtmlImportsResource {
  extensions: string[];
  contentType: string;

  constructor() {
    this.extensions = ['html'];
    this.contentType = 'text/javascript';
  }

  async shouldServe(url: URL) {
    const { searchParams } = url;

    return searchParams.get('type') === this.extensions[0]
  }

  async serve(url: URL) {
    const contents = await fs.readFile(url, 'utf-8');
    const body = `
      const template = document.createElement('template');
      template.innerHTML = ${JSON.stringify(contents)};
      export default template;
    `;

    return new Response(body, {
      headers: new Headers({
        'Content-Type': this.contentType
      })
    });
  }
}

export { HtmlImportsResource };