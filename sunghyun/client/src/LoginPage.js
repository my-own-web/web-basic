import React, {useEffect} from "react";
import {createGlobalStyle} from "styled-components";
import PageTemplateBlock from "./components/PageTemplate";
import LogoHeader from "./components/LogoHeader";
import LoginInput from "./components/LoginInput";
import LoginMenu from "./components/LoginMenu";

const GlobalStyle=createGlobalStyle`
  body{
    background: #e5dbff;
  }
`;

const LoginPage=()=>{
  /*const fetchData=async ()=>{
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
  }, []);*/

  return (
    <PageTemplateBlock height='650px'>
      <GlobalStyle />
      <LogoHeader text='로그인'/>
      <LoginInput />
      <LoginMenu />
    </PageTemplateBlock>
  )
}

export default LoginPage;