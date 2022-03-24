import React from "react";
import {createGlobalStyle} from "styled-components";
import PageTemplateBlock from "./components/PageTemplate";
import LogoHeader from "./components/LogoHeader";
import LoginInput from "./components/LoginInput";
import LoginMenu from "./components/LoginMenu";

const GlobalStyle=createGlobalStyle`
  body{
    background: #e5dbff;
  }
`;

const LoginPage=()=>{
  console.log(process.env.REACT_APP_NODE_ENV);
  return (
    <PageTemplateBlock height='650px'>
      <GlobalStyle />
      <LogoHeader text='로그인'/>
      <LoginInput />
      <LoginMenu />
    </PageTemplateBlock>
  )
}

export default LoginPage;