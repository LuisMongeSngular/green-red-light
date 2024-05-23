import { LitElement, html, css } from 'lit';
import { navigate } from '../../services/navigation.service.js';
import {
  savePlayerInfo,
  getPlayerInfo,
} from '../../services/player.service.js';

class GameComponent extends LitElement {
  static properties = {
    name: { type: String },
    score: { type: Number },
  };

  static styles = css`
    .nav-bar {
      background-color: #161518;
      width: 100%;
      height: 5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 25px;
      }
      button {
        height: 50px;
      }
    }

    .score-container {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin-top: 5rem;

      .highest-score {
        font-size: 2rem;
      }

      .current-score {
        font-size: 1.5rem;
      }

      .icon {
        .custom {
          color: green;
          font-size: 10rem;
        }
      }
    }
    .buttons-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: nowrap;
      margin-top: 1rem;
      button {
        width: 45%;
        height: 3rem;
        background-color: cornflowerblue;
        font-size: large;
        font-weight: lighter;
        border-radius: 15px;
      }
    }
  `;

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

  updateDelay(newDelay) {
    console.log('Update Delay');
    this.delay = newDelay; // update the delay value
    clearInterval(this.intervalId); // cancel the current interval
    this.intervalId = setInterval(() => {
      this.executeInterval();
    }, this.delay); // create a new interval with the updated delay
  }

  executeInterval() {
    this.intervalFunc();
    this.updateDelay(this.getIntervalPeriod());
  }

  disconnectedCallback() {
    clearInterval(this.interval);
    savePlayerInfo(this.name, this.score);
    super.disconnectedCallback();
  }

  intervalFunc = () => {
    this.walk = !this.walk;
    this.iconRef = this.shadowRoot.getElementById('custom-icon');
    this.iconRef.style.color = this.walk ? 'green' : 'red';
  };

  getIntervalPeriod() {
    if (!this.walk) {
      return 3000;
    }
    const ms =
      Math.max(10000 - this.score * 100, 2000) + Math.random(-1500, 1500);
    return ms;
  }

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

  handleNavigationClick() {
    navigate(this, '/home');
  }

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
