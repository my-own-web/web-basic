import React, {useEffect} from "react";
import {createGlobalStyle} from "styled-components";
import PageTemplateBlock from "./components/PageTemplate";
import LoginHeader from "./components/LoginHeader";
import LoginInput from "./components/LoginInput";
import LoginMenu from "./components/LoginMenu";
import axios from "axios";

const GlobalStyle=createGlobalStyle`
  body{
    background: #f8f0fc;
  }
`;

const LoginPage=()=>{
  const fetchData=async ()=>{
    try{
      const res=await axios.get('http://localhost:8000');
      //서버에서 데이터 가져올땐 async/await 사용 필수
      console.log(res.data);
    }
    catch(err){
      //에러 핸들링 필수
      console.log(err);
    }

  }
  useEffect(()=>{
    fetchData();
  }, []);

  return (
    <PageTemplateBlock height='600px'>
      <GlobalStyle />
      <LoginHeader />
      <LoginInput />
      <LoginMenu />
    </PageTemplateBlock>
  )
}

export default LoginPage;