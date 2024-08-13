import { css } from "@emotion/react";

export const layout = css`
  width: 700px;
  height: 700px;
  /* border: 1px solid gainsboro; */
  margin: 100px auto;
`

export const container = css`
  border: 1px solid black;
`

export const inputLayout = css`
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid black;
`

export const inputText = css`
  padding: 5px 5px;
  display: flex;
  justify-content: space-between;

  & > input {
    width: 150px;
    height: 20px;
  }
`

export const inputRadio = css`
  padding: 5px 5px;
  display: flex;
  justify-content: flex-end;

`

export const selectBox = css`
  padding: 5px 5px;
  display: flex;
  justify-content: space-between;

  & > select {
    width: 158px;
    height: 26px;
  }
`


export const calendarBox = css`
  padding: 5px 5px;
  display: flex;
  justify-content: space-between;
  
  & > div > div > input {
    width: 150px;
    height: 20px;
  }
`



export const buttons = css`
  padding: 5px 25px;
  display: flex;
  justify-content: flex-end;

  & > button {
    margin: 0 3px;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid gray;
  }

  & > button:hover {
    background-color: #dddddd;
  }

  & > button:active {
    background-color: #fcfcfc;
  }
`

export const tableLayout = css`
  margin: 0px 5px 5px 5px;
  padding: 0px 0px;
  border: 1px solid #c7c7c7;
  height: 200px;
  overflow: auto;

  &::-webkit-scrollbar {
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    background-color: #fdfdfd;
  }

  &::-webkit-scrollbar-thumb {
    box-sizing: border-box;
    border: 1px solid #fdfdfd;
    background-color: #dbdbdb;
  }

`

export const table = css`
  /* position: relative; */
  border-collapse: collapse;
  width: max-content;

  & td, & th {
    border-bottom: 1px solid #dbdbdb;
    padding: 0px 5px;
  }
  
  & td {
    font-size: 14px;
  }


  & tr > td:nth-of-type(1),
  & tr > th:nth-of-type(1) {
    border-left: none;
    text-align: center;
    min-width: 10px;
  }

  & tr > th:nth-of-type(2),
  & tr > td:nth-of-type(2) {
    min-width: 80px;
  }
  & tr > td:nth-of-type(2) {
    text-align: right;
  }

  & tr > th:nth-of-type(3),
  & tr > td:nth-of-type(3) {
    min-width: 100px;
  }

  & tr > th:nth-of-type(4),
  & tr > td:nth-of-type(4) {
      min-width: 10px;
      text-align: center;
  }

  & tr > th:nth-of-type(5),
  & tr > td:nth-of-type(5) {
      min-width: 150px;
      text-align: center;
  }

  & tr > th:nth-of-type(6),
  & tr > td:nth-of-type(6) {
      min-width: 150px;
      text-align: center;
  }
`
export const trRow = (gender) => css`
  background-color: ${gender === "남" ? "#b1bbf5" : "#fffae2"};
`

export const theadTr = css`
  position: sticky;
  top: 0;
  background-color: #ffffff;
`

