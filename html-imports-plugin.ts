import fs from 'node:fs/promises';

// Enables using ESM to import HTML files as an HTML <template> element
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
    const htmlInJsBody = `
      const template = document.createElement('template');

      template.innerHTML = \`${contents.replace(/\r?\n|\r/g, ' ').replace(/\\/g, '\\\\')}\`;
      template.replace = (key, contents) => template.innerHTML = template.innerHTML.replace(\`{{\${key}}}\`, contents);
      template.replaceAll = (key, contents) => template.innerHTML = template.innerHTML.replaceAll(\`{{\${key}}}\`, contents);

      export default template;
    `;

    return new Response(htmlInJsBody, {
      headers: new Headers({
        'Content-Type': this.contentType
      })
    });
  }
}

export { HtmlImportsResource };