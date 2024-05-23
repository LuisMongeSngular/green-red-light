import { css } from 'lit';

export const gameOverStyle = css`
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    .icon span {
      font-size: 10rem;
    }
    span {
      font-size: 2rem;
    }
    button {
      margin-top: 2rem;
      width: 8rem;
      height: 3rem;
      font-size: 1.3rem;
    }
  }
`;
