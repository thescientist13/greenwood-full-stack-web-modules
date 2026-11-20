declare module "*.css" {
  const sheet: CSSStyleSheet;

  export default sheet;
}

declare module "*?type=html" {
  const template: HTMLTemplateElement;

  export default template;
}