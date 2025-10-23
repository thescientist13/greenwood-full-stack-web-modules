type HTMLTemplateElementWithDOMParts = HTMLTemplateElement & {
  replace: (key: string, contents: string) => void;
}

declare module "*.css" {
  const sheet: CSSStyleSheet;

  export default sheet;
}

declare module "*?type=html" {
  const template: HTMLTemplateElementWithDOMParts;

  export default template;
}