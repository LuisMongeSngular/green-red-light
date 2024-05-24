import { html, fixture } from '@open-wc/testing';
import { expect } from '@jest/globals';
import { deepQuerySelectorAll } from 'shadow-dom-testing-library';
import { prettyDOM } from '@testing-library/dom';
import '../home.component.js';

describe('Home Component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<home-component></home-component>`);
  });

  it('it exists', () => {
    const data = deepQuerySelectorAll(element, '*');
    expect(prettyDOM(data[0])).not.toBeNull();
  });
});
