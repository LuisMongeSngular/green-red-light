import { html, fixture } from '@open-wc/testing';
import { expect } from '@jest/globals';
import { deepQuerySelectorAll } from 'shadow-dom-testing-library';
import { prettyDOM } from '@testing-library/dom';
import '../game-over.component.js';

describe('Game Over Component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<game-over-component></game-over-component>`);
  });

  it('it exists', () => {
    const data = deepQuerySelectorAll(element, '*');
    expect(prettyDOM(data[0])).not.toBeNull();
  });
});
