# greenwood-full-stack-web-modules

## Overview

A Greenwood based demonstration repo showcase full-stack "web modules" (HTML / CSS / JS) using [Import Attributes](https://github.com/tc39/proposal-import-attributes).

## Setup

You will need at least Node >= 21.0.0 to run the demo.  If you are using **nvm**, you can just run `nvm use`.

1. Clone the repo
1. Run `npm ci`

To view the demo, run `npm start` and open `http://localhost:1984` in your browser.

## Overview

The Hero component defines all its assets in standalone files and uses `import` to pull them into the custom element definition using the attributes syntax.
  
```js
import sheet from './hero.css' with { type: "css" };
import template from "./hero.html" with { type: "html" };
import json from "./hero.json" with { type: "json" };

export default class HeroBanner extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
   
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }
}

customElements.define('app-hero', HeroBanner);
```

- CSS and JSON are leveraging web standard APIs.  In the case of CSS, using [Constructable Stylesheets](https://web.dev/articles/constructable-stylesheets)
- HTML is based on a [proposal being drafted for the W3C](https://github.com/w3c/webcomponents-cg/issues/80#issuecomment-1958513401) which would return a `<template>` element.

## Compatibility

Tracking various 

### Greenwood

With these patches up-streamed, Greenwood will be able to support CSS and JSON out of the box, and HTML through a plugin.  This includes rendering in the browser and on the server, e.g. NodeJS.

|      |  CSS  |   JSON  |  HTML  |
|------|-------|---------|--------|
|CSR   |  ✅   |    ✅   |   ✅   |
|SSR   |  ✅   |    ✅   |   ✅   |

### Browser Support (TODO)

A cross-section of where browsers stand on supporting these capabilities

|               |  CSS  |   JSON  |  HTML  |
|---------------|-------|---------|--------|
|Chrome         |       |         |   🚫   |
|FF             |       |         |   🚫   |
|Safari TP      |       |         |   🚫   |
|Safari 16.x    |       |         |   🚫   |
|Safari 16.x    |       |         |   🚫   |
