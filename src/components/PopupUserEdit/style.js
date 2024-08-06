import { css } from "@emotion/react";

export const modal = css`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #00000088;
`
export const modalLayout = css`
  box-sizing: border-box ;
  position: relative;
  padding: 30px;
  border: 3px solid #CAD8D8;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 500px;
  height: 350px;
  background-color: white;
`

export const modalBody = css`
  display: grid;
  justify-content: center;
  
  & > div {
    padding: 5px;
  }
  & > div > input[type="text"] {
    width: 150px;
    height: 20px;
    margin-right: 10px;
  }
  & > div:nth-of-type(3)> span {
    position: relative;
    right: -80px;
  }
  & > div > input::placeholder {
    text-align: center;
    margin: 0px 0px 0px 0px;
  }
  & > div > select {
    width: 158px;
    height: 26px;
  }
`;

export const modalButton = css`
  display: grid;
  justify-content: center;
  & > div {
    padding-top: 70px;
  }
  & > div > button {
    margin: 0 3px;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid gray;
  }

  & > div > button:hover {
    background-color: #dddddd;
  }

  & > div> button:active {
    background-color: #fcfcfc;
  }
`;