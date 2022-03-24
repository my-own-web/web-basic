import styled from "styled-components";

const ColumnContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    margin:5px;
    font-size:2.5rem;
  }
`;

const RowContainer=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h1{
    margin:5px;
    font-size:2.5rem;
  }
`;

export {RowContainer, ColumnContainer};