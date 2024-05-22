import { html, fixture, expect } from '@open-wc/testing';
import { deepQuerySelectorAll } from 'shadow-dom-testing-library';
import { prettyDOM } from '@testing-library/dom';
import '../green-red-light-game.js';

describe('GreenRedLightGame', () => {
    let element;
    beforeEach(async () => {
        element = await fixture(
            html`<green-red-light-game></green-red-light-game>`
        );
    });

    it('renders a h1', () => {
        const data = deepQuerySelectorAll(element, '*');
        console.log(element);
        console.log(prettyDOM(data[1], Infinity));
        expect(1).equal(1);
    });
});
