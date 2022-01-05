import Input from "./Input";
import InputPositioner from "./InputPositioner";
import InputInfo from "./InputInfo";
import {ColumnContainer} from "./Container";
import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import {useState} from "react";
import axios from "axios";

const userInfo=[
  {
    id:'witch',
    password:'witch'
  },
  {
    id:'sunghyun',
    password:'1234'
  },
  {
    id:'test',
    password:'1234'
  },
];

const validCheck=({id, password})=>{
  const userInputInfo=userInfo.find(info=>info.id===id);
  return userInputInfo && (userInputInfo.password === password);
}

const LoginInput=()=>{
  const [userLoginInput, setUserLoginInput]=useState({
    id:'',
    password:''
  });

  const onChange=(e)=>{
    const{name, value}=e.target;
    setUserLoginInput({
      ...userLoginInput,
      [name]: value
    });
    //console.log(userInput);
  }

  const onSubmit=()=>{
    validCheck(userLoginInput)?alert('로그인 성공!'):alert('로그인 실패...');
    setUserLoginInput({
      id:'',
      password: ''
    });
  };

  return (
    <ColumnContainer>
      <InputInfo>USERNAME</InputInfo>
      <InputPositioner>
        <Input name='id' onChange={onChange}/>
      </InputPositioner>
      <InputInfo>PASSWORD</InputInfo>
      <InputPositioner>
        <Input type="password" name='password' onChange={onChange} />
      </InputPositioner>
      <LoginButton width='8rem' height='3rem' background='#da77f2' onClick={onSubmit}>로그인</LoginButton>
    </ColumnContainer>
  );
}

export default LoginInput;