import React from "react";
import styled, {createGlobalStyle, css} from "styled-components";
import {darken} from "polished";
import {Input} from "./components/TodoListCreate";
import PageTemplateBlock from "./components/PageTemplate";

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

const LoginFormColumnContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    margin:5px;
    font-size:2.5rem;
  }
`;

const LoginFormRowContainer=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h1{
    margin:5px;
    font-size:2.5rem;
  }
`;

const InputFormPositioner=styled.form`
  padding: 0 0 25px 0;
  background: #f8f9fa;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const LoginButton=styled.button`
  width:${props=>props.width};
  height:${props=>props.height};
  background: ${props=>props.background};
  color:${props=>props.color || 'white'};
  font-size:1.2rem;
  border-radius: 7px;
  border:none;
  margin:1rem;
  
  &:hover{
    ${props=>{
      return css`
        background:${darken(0.1, props.background)};
      `;
    }
    }
  }
`;

const LoginPageTemplate=({children})=>{
  return <PageTemplateBlock height='650px'>{children}</PageTemplateBlock>;
}

const LoginPage=()=>{
  return (
    <LoginPageTemplate>
      <GlobalStyle />
      <LoginHeaderBlock>
        <h1>Witch's TodoList</h1>
      </LoginHeaderBlock>
      <LoginFormColumnContainer>
        <h1>ID</h1>
        <InputFormPositioner>
          <Input />
        </InputFormPositioner>
        <h1>PASSWORD</h1>
        <InputFormPositioner>
          <Input type="password" />
        </InputFormPositioner>
        <LoginButton width='8rem' height='3rem' background='#e599fc'>로그인</LoginButton>
      </LoginFormColumnContainer>
      <LoginFormRowContainer>
        <LoginButton width='7rem' height='3rem' background='white' color='gray'>아이디찾기</LoginButton>
        <LoginButton width='8rem' height='3rem' background='white' color='gray'>비밀번호찾기</LoginButton>
        <LoginButton width='7rem' height='3rem' background='white' color='gray'>회원가입</LoginButton>
      </LoginFormRowContainer>
    </LoginPageTemplate>
  )
}

export default LoginPage;