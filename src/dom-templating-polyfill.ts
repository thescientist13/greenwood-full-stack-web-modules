// TODO
// @ts-expect-error
HTMLTemplateElement.prototype.replace = function(key: string, contents: string): void {
  this.innerHTML = this.innerHTML.replace(`{{${key}}}`, contents);
}

// TODO
// @ts-expect-error
HTMLTemplateElement.prototype.replaceAll = function(key: string, contents: string): void {
  this.innerHTML = this.innerHTML.replaceAll(`{{${key}}}`, contents);
}