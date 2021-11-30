import Input from "./Input";
import {LoginFormColumnContainer} from "./LoginPageContainer";
import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginPageButton";

const InputFormPositioner=styled.form`
  padding: 12px 0 12px 0;
  background: #f8f9fa;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const LoginPageInput=()=>{
  return (
    <LoginFormColumnContainer>
      <h1>ID</h1>
      <InputFormPositioner>
        <Input />
      </InputFormPositioner>
      <h1>PASSWORD</h1>
      <InputFormPositioner>
        <Input type="password" />
      </InputFormPositioner>
      <LoginButton width='8rem' height='3rem' background='#da77f2'>로그인</LoginButton>
    </LoginFormColumnContainer>
  );
}

export default LoginPageInput;