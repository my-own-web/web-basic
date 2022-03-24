import React from "react";
import styled from "styled-components";
import {ColumnContainer} from "./Container";

const LogoHeaderBlock=styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: center;
  padding: 24px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
  h1{
    margin:20px 0 0 0;
    font-size:3.5rem;
    color:#ae3ec9
  }
  h3{
    margin:10px 0 0 0;
    font-size:1.5rem;
    color:#495057
  }
`;

const LogoHeader=({text})=>{
  return (
    <LogoHeaderBlock>
      <ColumnContainer>
        <h1>Witch's TodoList</h1>
        <h3>{text}</h3>
      </ColumnContainer>
    </LogoHeaderBlock>
  )
}

export default LogoHeader;