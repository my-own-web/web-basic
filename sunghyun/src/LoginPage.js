import React from "react";
import {createGlobalStyle} from "styled-components";
import PageTemplateBlock from "./components/PageTemplate";
import LoginPageHeader from "./components/LoginPageHeader";
import LoginPageInput from "./components/LoginPageInput";
import LoginPageMenu from "./components/LoginPageMenu";

const GlobalStyle=createGlobalStyle`
  body{
    background: #f8f0fc;
  }
`;

const LoginPageTemplate=({children})=>{
  return <PageTemplateBlock height='600px'>{children}</PageTemplateBlock>;
}

const LoginPage=()=>{
  return (
    <LoginPageTemplate>
      <GlobalStyle />
      <LoginPageHeader />
      <LoginPageInput />
      <LoginPageMenu />
    </LoginPageTemplate>
  )
}

export default LoginPage;