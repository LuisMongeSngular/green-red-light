import { css } from 'lit';
export const homeStyle = css`
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
  .error {
    color: red;
    display: none;
  }
`;
