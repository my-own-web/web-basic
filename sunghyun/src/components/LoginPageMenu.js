import React from "react";
import {LoginFormRowContainer} from "./LoginPageContainer";
import LoginButton from "./LoginPageButton";

const LoginPageMenu=()=>{
  return (
    <LoginFormRowContainer>
      <LoginButton width='7rem' height='3rem' background='white' color='gray'>아이디찾기</LoginButton>
      <LoginButton width='8rem' height='3rem' background='white' color='gray'>비밀번호찾기</LoginButton>
      <LoginButton width='7rem' height='3rem' background='white' color='gray'>회원가입</LoginButton>
    </LoginFormRowContainer>
  );
}

export default LoginPageMenu;