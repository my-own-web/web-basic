import Input from "./Input";
import InputPositioner from "./InputPositioner";
import InputInfo from "./InputInfo";
import {ColumnContainer} from "./Container";
import React from "react";
import LoginButton from "./LoginButton";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {LoginAPI} from "../serverAPI";

const LoginInput=()=>{
  const navigate=useNavigate();

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
  }

  const onSubmit=async (e)=>{
    e.preventDefault();
    const {data:curUser}=await LoginAPI.post("/verify", userLoginInput);
    //만약 로그인 실패 시 curUser.id가 0으로 response 옴
    if(curUser.id){
      window.sessionStorage.setItem('curUserId', curUser.id);
      console.log(window.sessionStorage.getItem('curUserId'));
      alert("로그인 성공! todolist로 이동합니다.");
      setUserLoginInput({
        username:'',
        password: ''
      });
      navigate("/todo");
    }
    else{
      alert("로그인 실패! 다시 로그인을 시도하세요.");
      setUserLoginInput({
        username:'',
        password: ''
      });
      navigate("/");
    }
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