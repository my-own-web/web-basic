import React from "react";
import {createGlobalStyle} from "styled-components";
import PageTemplateBlock from "./components/PageTemplate";
import LogoHeader from "./components/LogoHeader";
import {ColumnContainer, RowContainer} from "./components/Container";
import Input from "./components/Input";
import InputPositioner from "./components/InputPositioner";
import InputInfo from "./components/InputInfo";

const GlobalStyle=createGlobalStyle`
  body{
    background: #e5dbff;
  }
`;

const SignUpInput=()=>{
  return (
    <ColumnContainer>
      <RowContainer>
        <InputInfo>아이디</InputInfo>
        <InputPositioner>
          <Input name='id'/>
        </InputPositioner>
      </RowContainer>
      <RowContainer>
        <InputInfo>비밀번호</InputInfo>
        <InputPositioner>
          <Input name='id'/>
        </InputPositioner>
      </RowContainer>
      <RowContainer>
        <InputInfo>비밀번호 확인</InputInfo>
        <InputPositioner>
          <Input name='id'/>
        </InputPositioner>
      </RowContainer>
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