import React from "react";
import {RowContainer} from "./Container";
import LoginButton from "./LoginButton";

const LoginMenu=()=>{
  return (
    <RowContainer>
      <LoginButton width='7rem' height='3rem' background='white' color='gray'>아이디찾기</LoginButton>
      <LoginButton width='8rem' height='3rem' background='white' color='gray'>비밀번호찾기</LoginButton>
      <LoginButton width='7rem' height='3rem' background='white' color='gray'>회원가입</LoginButton>
    </RowContainer>
  );
}

export default LoginMenu;