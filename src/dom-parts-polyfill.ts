/** A small DOM Parts-inspired prototype, not a complete standards polyfill. */
/**
 * A named, string-only part with staged values and explicit commits.
 * https://github.com/WICG/webcomponents/blob/gh-pages/proposals/DOM-Parts-Imperative.md#proposal
 */
export interface Part {
  /** Prototype metadata from the {{name}} marker, not a standardized property. */
  readonly name: string;
  value: string;
  commit(): void;
}

/**
 * Groups parts for committing together, following the proposal's explicit-group option.
 * https://github.com/WICG/webcomponents/blob/gh-pages/proposals/DOM-Parts-Imperative.md#option-1-partgroup
 */
export interface PartGroup {
  readonly parts: readonly Part[];
  commit(): void;
}

export interface NodeWithParts {
  node: DocumentFragment;
  partGroup: PartGroup;
}

export type TemplateWithParts = HTMLTemplateElement & {
  cloneWithParts(): NodeWithParts;
};

interface Binding {
  parts: Part[];
  commit(): void;
}

/**
 * Find {{name}} occurrences in one text node or attribute's original string.
 * Return one part per occurrence and a commit() that substitutes their values via write().
 * 
 * Names are our use of proposed metadata.
 * https://github.com/WICG/webcomponents/blob/gh-pages/proposals/DOM-Parts-Declarative-Template.md#metadata
 */
function bind(pattern: string, write: (value: string) => void): Binding | undefined {
  const matches = [...pattern.matchAll(/\{\{\s*([\w.-]+)\s*\}\}/g)];
  if (matches.length === 0) return;

  // Keep one committed value per match, in match order; untouched slots retain {{name}}.
  const committed = matches.map(match => match[0]);
  // Replace each marker in the original pattern with committed[0], committed[1], etc.
  // Reset the index for every call and send the resulting string to the DOM writer once.
  const render = () => {
    let index = 0;
    write(pattern.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, () => committed[index++]));
  };
  const parts = matches.map((match, index): Part => ({
    name: match[1],
    value: match[0],
    // Copy this part's value into its captured array slot, then rewrite the whole string.
    // Other slots keep their committed values, even if those parts have pending changes.
    commit() {
      committed[index] = String(this.value);
      render();
    }
  }));

  return {
    parts,
    // Copy every part.value into its matching slot, then write the combined string once.
    commit() {
      parts.forEach((part, index) => { committed[index] = String(part.value); });
      render();
    }
  };
}

/**
 * Walk the fragment and return bindings for text nodes and attributes containing markers.
 * Each binding closes over a "writer" for the exact nodeValue or attr.value in the clone.
 * 
 * This traversal is our implementation of marker discovery.
 * https://github.com/WICG/webcomponents/blob/gh-pages/proposals/DOM-Parts-Declarative-Template.md#proposal
 */
function collectBindings(root: DocumentFragment): Binding[] {
  const bindings: Binding[] = [];
  // Bind a text node, or bind an element's attributes before visiting its children.
  // Skip template, script, and style elements entirely, including their attributes.
  const visit = (node: Node) => {
    if (node.nodeType === node.TEXT_NODE) {
      const binding = bind(node.nodeValue ?? '', value => { node.nodeValue = value; });

      if (binding) bindings.push(binding);

      return;
    }

    if (node.nodeType === node.ELEMENT_NODE) {
      const element = node as Element;
      // Nested templates are separate blueprints. Script/style bodies aren't bindings.
      if (['template', 'script', 'style'].includes(element.localName)) return;

      for (const attr of Array.from(element.attributes)) {
        const binding = bind(attr.value, value => { attr.value = value; });

        if (binding) bindings.push(binding);
      }
    }

    for (const child of Array.from(node.childNodes)) visit(child);
  };

  visit(root);

  return bindings;
}

/**
 * Add cloneWithParts() to the supplied template and return that same template object.
 * Its content stays unchanged; each call to the added method creates new nodes and parts.
 * 
 * Uses the proposed return shape, but accepts no options and operates on templates.
 * https://github.com/WICG/webcomponents/blob/gh-pages/proposals/DOM-Parts-Imperative.md#option-1-clonewithpar
 */
export function withParts(template: HTMLTemplateElement): TemplateWithParts {
  // Augment only the module's template; do not patch global DOM APIs.
  return Object.assign(template, {
    cloneWithParts(): NodeWithParts {
      const node = template.content.cloneNode(true) as DocumentFragment;
      const bindings = collectBindings(node);
      const parts = Object.freeze(bindings.flatMap(binding => binding.parts));

      return {
        node,
        partGroup: {
          parts,
          // Commit each binding in order, writing each bound text node or attribute once.
          commit() {
            bindings.forEach(binding => binding.commit());
          }
        }
      };
    }
  });
}
