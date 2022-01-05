import React, {useState} from 'react';
import {ColumnContainer} from "./Container";
import InputInfo from "./InputInfo";
import InputPositioner from "./InputPositioner";
import Input from "./Input";
import LoginButton from "./LoginButton";
import styled from "styled-components";
import axios from "axios";

const ConstraintInfo=styled.h5`
  margin:0;
`;

const SignUpInput=()=>{
  const [userSignUpInput, setUserSignUpInput]=useState({
    username:'',
    password:'',
    verifypassword:''
  });

  const onChange=(e)=>{
    const {name, value}=e.target;
    setUserSignUpInput({
      ...userSignUpInput,
      [name]: value
    });
  }

  const onSubmit=async ()=>{
    if(userSignUpInput.username==='' || userSignUpInput.password===''){
      alert('아이디와 비밀번호를 1자 이상 입력해 주세요.');
    }
    else if(userSignUpInput.username.length>10 || userSignUpInput.password.length>10){
      alert('아이디와 비밀번호는 10자 이하여야 합니다.');
    }
    else if(userSignUpInput.password!==userSignUpInput.verifypassword){
      alert('확인을 위해 입력한 비밀번호가 다릅니다.');
    }
    else{
      try{
        await axios.post("http://localhost:8000/signup", userSignUpInput);
        setUserSignUpInput({
          username:'',
          password:'',
          verifypassword:''
        })
      } catch(err){
        console.log(err);
      }
    }
  }

  return (
    <ColumnContainer>
      <InputInfo fontSize='1.5rem'>USERNAME</InputInfo>
      <InputPositioner>
        <Input name='username' onChange={onChange}/>
      </InputPositioner>
      <ConstraintInfo>유저네임은 10자 미만의 영어 소문자와 숫자로 이루어져야 합니다.</ConstraintInfo>
      <InputInfo fontSize='1.5rem'>PASSWORD</InputInfo>
      <InputPositioner>
        <Input type='password' name='password' onChange={onChange}/>
      </InputPositioner>
      <ConstraintInfo>비밀번호는 10자 미만의 영어 소문자와 숫자로 이루어져야 합니다.</ConstraintInfo>
      <InputInfo fontSize='1.5rem'>VERIFY PASSWORD</InputInfo>
      <InputPositioner>
        <Input type='password' name='verifypassword' onChange={onChange}/>
      </InputPositioner>
      <ConstraintInfo>패스워드를 한 번 더 입력해 주세요.</ConstraintInfo>
      <LoginButton width='8rem' height='3rem' background='#da77f2' onClick={onSubmit}>회원가입</LoginButton>
    </ColumnContainer>
  )
}

export default SignUpInput;