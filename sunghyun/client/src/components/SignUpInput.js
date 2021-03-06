import React, {useState} from 'react';
import {ColumnContainer} from "./Container";
import InputInfo from "./InputInfo";
import InputPositioner from "./InputPositioner";
import Input from "./Input";
import LoginButton from "./LoginButton";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {LoginAPI} from "../serverAPI";

const ConstraintInfo=styled.h5`
  margin:0;
`;

const SignUpInput=()=>{
  const navigate=useNavigate();

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
        const {data}=await LoginAPI.post("/signup", userSignUpInput);
        console.log(data);
        if(data.length){
          //중복된 아이디가 존재
          alert('중복된 아이디입니다. 다른 아이디를 입력해 주세요.');
          setUserSignUpInput({
            username:'',
            password:'',
            verifypassword:''
          })
          navigate("/signup");
        }
        else{
          alert('회원가입이 성공하였습니다. 로그인 페이지로 이동합니다.');
          setUserSignUpInput({
            username:'',
            password:'',
            verifypassword:''
          })
          navigate("/");
        }

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