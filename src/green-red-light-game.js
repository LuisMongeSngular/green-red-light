import { LitElement, html, css } from 'lit';

class GreenRedLightGame extends LitElement {
    static properties = {
        header: { type: String },
    };

    static styles = css``;

    render() {
        return html`
      <div>
        <p class="prueba">
          <a>Hola Mundo</a>
        </p>
      </div>

      <p class="prueba2">Adios Mundo</p>
    `;
    }
}

customElements.define('green-red-light-game', GreenRedLightGame);
