import { css } from "@emotion/react";

export const select = css`
  width: fit-content;
  border: 1px solid #6b6b6b;
  overflow: hidden;
  font-size: 14px;
  padding: 3px 0 3px 5px;
  width: 150px;
`

export const ulContainer = css`
  list-style-type: none;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 14px;
  background-color: white;
  border: 1px solid #6b6b6b;
  /* display: none; */
  position: absolute;
  /* border-top: none; */
  z-index: 100;
  padding: 3px 0px 3px 5px;
  margin-top: 0px;
  width: 150px;
`

export const liContainer = css`
  width: 150px;
`