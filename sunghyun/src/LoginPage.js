import React from "react";
import styled, {createGlobalStyle} from "styled-components";
import TodoListTemplate from "./components/TodoListTemplate";

const GlobalStyle=createGlobalStyle`
  body{
    background: #f8f0fc;
  }
`;

const LoginHeaderBlock=styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: center;
  padding: 32px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
  h1{
    font-size:3.5rem;
    color:#862e9c
  }
`;

const LoginFormContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    font-size:2.5rem;
  }
`;

const LoginInputForm=styled.input`
  width:20rem;
  height:2.5rem;
  font-size:2.5rem;
  type:${props=>props.type && 'text'}
`;

const LoginPage=()=>{
  return (
    <TodoListTemplate>
      <GlobalStyle />
      <LoginHeaderBlock>
        <h1>Witch's TodoList</h1>
      </LoginHeaderBlock>
      <LoginFormContainer>
        <h1>ID</h1>
        <LoginInputForm />
        <h1>PASSWORD</h1>
        <LoginInputForm type="password"/>
      </LoginFormContainer>
    </TodoListTemplate>
  )
}

export default LoginPage;