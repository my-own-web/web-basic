import React from "react";
import {createGlobalStyle} from "styled-components";
import PageTemplateBlock from "./components/PageTemplate";
import LogoHeader from "./components/LogoHeader";

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
    </PageTemplateBlock>
  );
};

export default SignUpPage;