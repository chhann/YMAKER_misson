import { css } from "@emotion/react";

export const layout = css`
  width: 700px;
  height: 700px;
  margin: 100px auto;
`

export const container = css`
  border: 1px solid black;
  position: relative;
  height: 560px;
`

export const tableLayout = css`
  margin: 5px 5px 5px 5px;
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