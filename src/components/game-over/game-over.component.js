import { LitElement, html } from 'lit';
import { navigate } from '../../services/navigation.service.js';
import { gameOverStyle } from './game-over.style.js';

class GameOverComponent extends LitElement {
  static properties = {
    name: { type: String },
    score: { type: Number },
  };

  static get styles() {
    return [gameOverStyle];
  }

  constructor() {
    super();
  }

  /**
   * Navigates to the home component
   */
  handleOnClick() {
    navigate(this, '/home');
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div class="container">
        <div class="icon">
          <span id="custom-icon" class="material-symbols-outlined custom"
            >Skull</span
          >
        </div>
        <span>Game Over ${this.name}</span>
        <span>Your best score is: ${this.score}</span>
        <button @click="${this.handleOnClick}">Try it again!</button>
      </div>
    `;
  }
}

customElements.get('game-over-component') ||
  customElements.define('game-over-component', GameOverComponent);
