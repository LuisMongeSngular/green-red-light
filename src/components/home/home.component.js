import { LitElement, html } from 'lit';
import { isValidName } from '../../services/player.service.js';
import { navigate } from '../../services/navigation.service.js';
import {
  setCurrentPlayer,
  savePlayerInfo,
} from '../../services/player.service.js';
import { homeStyle } from './home.style.js';
class HomeComponent extends LitElement {
  static get styles() {
    return [homeStyle];
  }

  /**
   * Checks if the name introduced is valid
   * and navigates to the game component
   */
  onClick() {
    const input = this.shadowRoot.getElementById('name');
    const error = this.shadowRoot.querySelector('.error');
    if (isValidName(input.value)) {
      savePlayerInfo(input.value);
      setCurrentPlayer(input.value);
      error.style.display = 'none';
      navigate(this, '/game');
    } else {
      console.log('error ', error);
      console.log('error ', error.style);
      error.style.display = 'block';
    }
  }

  render() {
    return html`
      <div class="container">
        <span class="title">Create new player</span>
      </div>

      <div class="input-container">
        <label class="main__label" for="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <span class="error">Incorrect name</span>
        <button id="btn" @click=${this.onClick}>JOIN</button>
      </div>
    `;
  }
}

customElements.get('home-component') ||
  customElements.define('home-component', HomeComponent);
