import { LitElement, html } from 'lit';
import { navigate } from '../../services/navigation.service.js';
import {
  savePlayerInfo,
  getPlayerInfo,
} from '../../services/player.service.js';
import { gameStyles } from './game.style.js';

class GameComponent extends LitElement {
  static properties = {
    name: { type: String },
    score: { type: Number },
  };

  static get styles() {
    return [gameStyles];
  }

  constructor() {
    super();
    this.interval;
    this.score = 0;
    this.highestScore = getPlayerInfo(this.name)?.score;
    this.walk = true;
    this.lastStep = undefined;

    this.delay = this.getIntervalPeriod();
    this.intervalId;
  }
  connectedCallback() {
    super.connectedCallback();
    this.highestScore = getPlayerInfo(this.name)?.score ?? 0;
    this.intervalId = setInterval(() => {
      this.executeInterval();
    }, this.delay);
  }

  /**
   *
   * @param newDelay: New amount of time for the next interval
   * It cleans the previous interval and start a new one
   */
  updateDelay(newDelay) {
    this.delay = newDelay; // update the delay value
    clearInterval(this.intervalId); // cancel the current interval
    this.intervalId = setInterval(() => {
      this.executeInterval();
    }, this.delay); // create a new interval with the updated delay
  }

  /**
   * Executes the main code block after the interval ends and call
   * for reseting the timer
   */
  executeInterval() {
    this.intervalFunc();
    this.updateDelay(this.getIntervalPeriod());
  }

  disconnectedCallback() {
    clearInterval(this.intervalId);
    savePlayerInfo(this.name, this.score);
    super.disconnectedCallback();
  }

  /**
   * It changes the css values of the icon to show when to "walk" or not
   */
  intervalFunc = () => {
    this.walk = !this.walk;
    this.iconRef = this.shadowRoot.getElementById('custom-icon');
    this.iconRef.style.color = this.walk ? 'green' : 'red';
  };

  /**
   * It calculates the amount of time of the next interval
   * @returns The amount of milliseconds
   */
  getIntervalPeriod() {
    if (!this.walk) {
      return 3000;
    }
    const ms =
      Math.max(10000 - this.score * 100, 2000) + Math.random(-1500, 1500);
    return ms;
  }
  /**
   *
   * @param {*} side : It contains the button side clicked
   * It manages the logic behind each clicjk
   */
  handleStepClick(side) {
    if (!this.walk) {
      this.gameOver();
      return;
    }
    if (!this.lastStep) {
      this.lastStep = side;
      this.score++;
      return;
    }

    if (this.lastStep != side) {
      this.lastStep = side;
      this.score++;
      this.highestScore =
        this.score > this.highestScore ? this.score : this.highestScore;
    } else {
      this.score--;
    }
  }

  /**
   * Navigates to the home component
   */
  handleNavigationClick() {
    navigate(this, '/home');
  }

  /**
   * Saves the current player info and navigate to the
   * game over component
   */
  gameOver() {
    savePlayerInfo(this.name, this.highestScore);
    navigate(this, '/game-over');
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <div class="nav-bar">
        <span>Hello there ${this.name}</span>
        <button @click="${this.handleNavigationClick}">
          <span class="material-symbols-outlined">Logout</span>
        </button>
      </div>
      <div class="score-container">
        <div class="highest-score">
          <span>Highest Score: ${this.highestScore}</span>
        </div>
        <div class="icon">
          <span id="custom-icon" class="material-symbols-outlined custom"
            >Traffic</span
          >
        </div>
        <div class="current-score">
          <span>Score: ${this.score}</span>
        </div>
      </div>
      <div class="buttons-container">
        <button
          @click="${() => {
            this.handleStepClick('left');
          }}"
        >
          LEFT
        </button>
        <button
          @click="${() => {
            this.handleStepClick('right');
          }}"
        >
          RIGHT
        </button>
      </div>
    `;
  }
}

customElements.get('game-component') ||
  customElements.define('game-component', GameComponent);
