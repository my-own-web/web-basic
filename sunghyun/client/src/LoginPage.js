import React from "react";
import {createGlobalStyle} from "styled-components";
import PageTemplateBlock from "./components/PageTemplate";
import LoginHeader from "./components/LoginHeader";
import LoginInput from "./components/LoginInput";
import LoginMenu from "./components/LoginMenu";

const GlobalStyle=createGlobalStyle`
  body{
    background: #f8f0fc;
  }
`;

const LoginPage=()=>{
  return (
    <PageTemplateBlock height='600px'>
      <GlobalStyle />
      <LoginHeader />
      <LoginInput />
      <LoginMenu />
    </PageTemplateBlock>
  )
}

export default LoginPage;