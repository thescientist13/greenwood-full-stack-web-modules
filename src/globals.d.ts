declare module "*.css" {
  const sheet: CSSStyleSheet;

  export default sheet;
}

declare module "*?type=html" {
  const template: import('./dom-parts-polyfill.ts').TemplateWithParts;

  export default template;
}