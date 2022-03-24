import React from "react";
import {createGlobalStyle} from "styled-components";
import PageTemplateBlock from "./components/PageTemplate";
import LogoHeader from "./components/LogoHeader";
import SignUpInput from "./components/SignUpInput";

const GlobalStyle=createGlobalStyle`
  body{
    background: #e5dbff;
  }
`;

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