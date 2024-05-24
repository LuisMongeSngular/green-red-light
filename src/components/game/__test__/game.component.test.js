import { html, fixture } from '@open-wc/testing';
import { expect } from '@jest/globals';
import { deepQuerySelectorAll } from 'shadow-dom-testing-library';
import { prettyDOM } from '@testing-library/dom';
import '../game.component.js';

describe('Game Component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<game-component></game-component>`);
  });

  it('it exists', () => {
    const data = deepQuerySelectorAll(element, '*');
    expect(prettyDOM(data[0])).not.toBeNull();
  });
});
