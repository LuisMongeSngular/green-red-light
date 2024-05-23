import { LitElement, html, css } from 'lit';

class HomeComponent extends LitElement {
  static properties = {
    header: { type: String },
  };

  static styles = css`
    .title {
      font-size: 32px;
    }
    .container {
      display: flex;
      justify-content: center;
      flex-direction: row;
      margin-top: 8rem;
    }
    .input-container {
      position: relative;
      padding: 1rem 2rem 1rem 2rem;
      label {
        position: absolute;
        top: 10px;
        left: 56px;
        z-index: 1;
        width: 60px;
        background-color: black;
        text-align: center;
      }

      input {
        position: relative;
        z-index: 0;
        background-color: black;
        border-color: #33ff00;
        width: 100%;
        height: 50px;
        color: white;
        font-size: 25px;
      }
      button {
        position: relative;
        width: 100%;
        height: 40px;
        margin-top: 2rem;
        background-color: #33ff00;
      }
    }
  `;

  #onClick() {
    console.log('click');
    const input = this.shadowRoot.getElementById('name');

    if (this.#isValidName(input.value)) {
      this.#naviagate();
    }
  }

  #isValidName(name) {
    const pattern = /^[a-z ,.'-]+$/i;
    const matches = pattern.exec(name);
    if (matches) return true;
    else return false;
  }
  #naviagate() {
    const options = {
      detail: '/game',
      bubbles: true,
      composed: true,
    };
    const navigateEvent = new CustomEvent('router-navigate', options);
    this.shadowRoot.dispatchEvent(navigateEvent);
  }

  render() {
    return html`
      <div class="container">
        <span class="title">Create new player</span>
      </div>

      <div class="input-container">
        <label class="main__label" for="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <button id="btn" @click=${this.#onClick}>JOIN</button>
      </div>
    `;
  }
}

customElements.get('home-component') ||
  customElements.define('home-component', HomeComponent);
