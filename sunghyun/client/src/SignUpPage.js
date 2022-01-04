import React from "react";
import {createGlobalStyle} from "styled-components";
import PageTemplateBlock from "./components/PageTemplate";
import LogoHeader from "./components/LogoHeader";
import {ColumnContainer, RowContainer} from "./components/Container";
import Input from "./components/Input";
import InputPositioner from "./components/InputPositioner";
import InputInfo from "./components/InputInfo";
import styled from "styled-components";
import LoginButton from "./components/LoginButton";

const GlobalStyle=createGlobalStyle`
  body{
    background: #e5dbff;
  }
`;

const ConstraintInfo=styled.h5`
  margin:0;
`;

const SignUpInput=()=>{
  return (
    <ColumnContainer>
        <InputInfo fontSize='1.5rem'>USERNAME</InputInfo>
        <InputPositioner>
          <Input name='username'/>
        </InputPositioner>
      <ConstraintInfo>유저네임은 10자 미만의 영어 소문자와 숫자로 이루어져야 합니다.</ConstraintInfo>
        <InputInfo fontSize='1.5rem'>PASSWORD</InputInfo>
        <InputPositioner>
          <Input name='password'/>
        </InputPositioner>
      <ConstraintInfo>비밀번호는 10자 미만의 영어 소문자와 숫자로 이루어져야 합니다.</ConstraintInfo>
        <InputInfo fontSize='1.5rem'>VERIFY PASSWORD</InputInfo>
        <InputPositioner>
          <Input name='id'/>
        </InputPositioner>
      <ConstraintInfo>패스워드를 한 번 더 입력해 주세요.</ConstraintInfo>
      <LoginButton width='8rem' height='3rem' background='#da77f2'>회원가입</LoginButton>
    </ColumnContainer>
  )
}

const SignUpPage=()=>{
  return (
    <PageTemplateBlock height='700px'>
      <GlobalStyle />
      <LogoHeader text='회원가입'/>
      <SignUpInput />
    </PageTemplateBlock>
  );
};

export default SignUpPage;