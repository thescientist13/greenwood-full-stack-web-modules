declare module "*.css" {
  const sheet: CSSStyleSheet;

  export default sheet;
}

declare module "*.json" {
  const data: object;

  export default data;
}

declare module "*?type=html" {
  const template: HTMLTemplateElement;

  export default template;
}