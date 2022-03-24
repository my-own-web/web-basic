import React from "react";
import {RowContainer} from "./Container";
import LoginButton from "./LoginButton";
import {useNavigate} from "react-router-dom";

const LoginMenu=()=>{
  const navigate=useNavigate();

  const signupClick=()=>{
    navigate("/signup");
  }

  return (
    <RowContainer>
      <h2>아이디가 없으신가요?</h2>
      <LoginButton width='7rem' height='3rem' background='white' color='gray' onClick={signupClick}>회원가입</LoginButton>
    </RowContainer>
  );
}

export default LoginMenu;