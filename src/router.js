import { LitElement, html } from 'lit';
import { Routes } from '@lit-labs/router';
import './components/home/home.component.js';
import './components/game/game.component.js';
import './components/game-over/game-over.component.js';
import { getCurrentPlayer, getPlayerInfo } from './services/player.service.js';

const appRoutes = [
  {
    path: '/home',
    render: () => html` <home-component />`,
  },
  {
    path: '/game',
    render: () => {
      const playerName = getCurrentPlayer();

      return html`<game-component .name="${playerName}"></game-component>`;
    },
  },
  {
    path: '/game-over',
    render: () => {
      const playerName = getCurrentPlayer();
      const playerInfo = getPlayerInfo(playerName);

      return html`<game-over-component
        .name="${playerInfo.name}"
        .score="${playerInfo.score}"
      ></game-over-component>`;
    },
  },
  {
    path: '/*',
    render: () => html` <home-component />`,
  },
];

export class RouterElement extends LitElement {
  _navegateUrl(url) {
    const pathName = new URL(url).pathname;
    this._routes.goto(pathName);
    history.pushState({}, 'URL Rewrite by router: ', pathName);
  }
  _navegatePath(path) {
    this._routes.goto(path);
    history.pushState({}, 'URL Rewrite by router: ', path);
  }
  constructor() {
    super();
    this._routes = new Routes(this, appRoutes);
    this._routes.goto(window.location.pathname);

    this.addEventListener('router-navigate', e => {
      console.log('navegate to---', e.detail);
      this._navegatePath(e.detail);
    });
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', async () => {
      console.log('navegate to---', window.location.href);
      await this._routes.goto(window.location.pathname);
    });
  }

  render() {
    return html` <main>${this._routes.outlet()}</main> `;
  }
}

customElements.get('router-element') ||
  customElements.define('router-element', RouterElement);
