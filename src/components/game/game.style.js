import { css } from 'lit';
export const gameStyles = css`
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
