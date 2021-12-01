import React from "react";
import styled from "styled-components";

const LoginHeaderBlock=styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: center;
  padding: 24px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
  h1{
    margin:20px 0;
    font-size:3.5rem;
    color:#862e9c
  }
`;

const LoginPageHeader=()=>{
  return (
    <LoginHeaderBlock>
      <h1>Witch's TodoList</h1>
    </LoginHeaderBlock>
  )
}

export default LoginPageHeader;