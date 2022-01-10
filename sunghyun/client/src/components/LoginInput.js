import Input from "./Input";
import InputPositioner from "./InputPositioner";
import InputInfo from "./InputInfo";
import {ColumnContainer} from "./Container";
import React from "react";
import LoginButton from "./LoginButton";
import {useState} from "react";
import axios from "axios";

const LoginInput=()=>{
  const [userLoginInput, setUserLoginInput]=useState({
    username:'',
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

  const onSubmit=async (e)=>{
    e.preventDefault();
    const {data:curUser}=await axios.post("http://localhost:8000/login/verify", userLoginInput);
    console.log(curUser);
    if(curUser.id){
      window.sessionStorage.setItem('curUserId', curUser.id);
      console.log(window.sessionStorage.getItem('curUserId'));
      alert("로그인 성공!");
    }
    else{
      alert("로그인 실패...");
    }
    setUserLoginInput({
      username:'',
      password: ''
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <ColumnContainer>
        <InputInfo>USERNAME</InputInfo>
        <InputPositioner>
          <Input name='username' value={userLoginInput.username} onChange={onChange}/>
        </InputPositioner>
        <InputInfo>PASSWORD</InputInfo>
        <InputPositioner>
          <Input type="password" name='password' value={userLoginInput.password} onChange={onChange} />
        </InputPositioner>
        <LoginButton width='8rem' height='3rem' background='#da77f2'>로그인</LoginButton>
      </ColumnContainer>
    </form>
  );
}

export default LoginInput;