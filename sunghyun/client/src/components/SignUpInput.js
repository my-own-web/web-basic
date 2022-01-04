import React from 'react';
import {ColumnContainer} from "./Container";
import InputInfo from "./InputInfo";
import InputPositioner from "./InputPositioner";
import Input from "./Input";
import LoginButton from "./LoginButton";
import styled from "styled-components";

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
        <Input type='password' name='password'/>
      </InputPositioner>
      <ConstraintInfo>비밀번호는 10자 미만의 영어 소문자와 숫자로 이루어져야 합니다.</ConstraintInfo>
      <InputInfo fontSize='1.5rem'>VERIFY PASSWORD</InputInfo>
      <InputPositioner>
        <Input type='password' name='check'/>
      </InputPositioner>
      <ConstraintInfo>패스워드를 한 번 더 입력해 주세요.</ConstraintInfo>
      <LoginButton width='8rem' height='3rem' background='#da77f2'>회원가입</LoginButton>
    </ColumnContainer>
  )
}

export default SignUpInput;