import React from "react";
import styled, {createGlobalStyle, css} from "styled-components";
import TodoListTemplate from "./components/TodoListTemplate";
import {darken} from "polished";

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
  type:${props=>props.type && 'text'};
`;

const LoginButton=styled.button`
  width:${props=>props.width};
  height:${props=>props.height};
  background: ${props=>props.background};
  color:white;
  font-size:1.5rem;
  border-radius: 7px;
  border:none;
  
  &:hover{
    ${props=>{
      return css`
        background:${darken(0.1, props.background)};
      `;
    }
    }
  }
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
        <LoginButton width='8rem' height='3rem' background='#e599fc'>로그인</LoginButton>
      </LoginFormContainer>
    </TodoListTemplate>
  )
}

export default LoginPage;