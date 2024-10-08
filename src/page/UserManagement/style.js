import { css } from "@emotion/react";

export const layout = css`
  width: 700px;
  height: 700px;
  /* border: 1px solid gainsboro; */
  margin: 100px auto;
`

export const container = css`
  border: 1px solid black;
  position: relative;
  height: 560px;
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
  justify-content: space-between;

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
  padding: 0;
  border: 1px solid #c7c7c7;
  max-height: 400px; /* height 대신 max-height 사용 */
`

export const table = css`
  border-collapse: collapse;
  width: 100%; /* max-content 대신 전체 너비를 차지하도록 수정 */

  & td, & th {
    border: 1px solid #dbdbdb;
    padding: 10px; /* padding을 키워서 셀 간격 확보 */
    text-align: center; /* 전체적으로 텍스트 가운데 정렬 */
  }
  
  & td {
    font-size: 14px;
  }

  & > thead > tr {
    height: 10px;
  }

  & tr {
    height: 60px;
  }

  /* 선택 열 */
  & tr > td:nth-of-type(1),
  & tr > th:nth-of-type(1) {
    min-width: 50px;
    text-align: center;
  }

  /* 아이디 열 */
  & tr > th:nth-of-type(2),
  & tr > td:nth-of-type(2) {
    min-width: 100px;
    text-align: center;
  }

  /* 이름 열 */
  & tr > th:nth-of-type(3),
  & tr > td:nth-of-type(3) {
    min-width: 120px;
  }

  /* 성별 열 */
  & tr > th:nth-of-type(4),
  & tr > td:nth-of-type(4) {
      min-width: 50px;
      text-align: center;
  }

  /* 국가 열 */
  & tr > th:nth-of-type(5),
  & tr > td:nth-of-type(5) {
      min-width: 120px;
      text-align: center;
  }

  /* 도시 열 */
  & tr > th:nth-of-type(6),
  & tr > td:nth-of-type(6) {
      min-width: 120px;
      text-align: center;
  }
`

export const trRow = (gender) => css`
  background-color: ${gender === "남" ? "#b1bbf5" : "#fffae2"};
`

export const paging = css`
  position: absolute;
  bottom: 2px;
  right: 270px;
`;
