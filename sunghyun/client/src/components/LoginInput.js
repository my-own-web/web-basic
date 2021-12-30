import Input from "./Input";
import {ColumnContainer} from "./Container";
import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import {useState} from "react";

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

const InputFormPositioner=styled.form`
  padding: 12px 0 12px 0;
  background: #f8f9fa;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

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
      <h1>ID</h1>
      <InputFormPositioner>
        <Input name='id' onChange={onChange}/>
      </InputFormPositioner>
      <h1>PASSWORD</h1>
      <InputFormPositioner>
        <Input type="password" name='password' onChange={onChange} />
      </InputFormPositioner>
      <LoginButton width='8rem' height='3rem' background='#da77f2' onClick={onSubmit}>로그인</LoginButton>
    </ColumnContainer>
  );
}

export default LoginInput;