import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
//import TodoTemplateBlock from './components/TodoTemplate';
import { darken } from 'polished';

/*const LoginBlock = styled(TodoTemplateBlock)`
  height: 550px;
`;

const LoginTemplate = ({ children }) => {
  return <LoginBlock>{children}</LoginBlock>;
}*/

const LoginBlock = styled.div`
  width: 512px;
  height: 550px;
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px; /*둥그란 정도*/
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex; /*요소들을 자유자제로 위치시키는 속성, block처럼 container 수직 쌓임*/
  flex-direction: column; //Item의 주 축이 수직
`;

const LoginTemplate = ({ children }) => {
  return <LoginBlock>{children}</LoginBlock>;
}

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const LoginHeader = styled.div`
  padding: 40px 32px 40px 24px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 40px;
    color: #343a40;
  }
`;

const LoginBody = styled.div`
  display: block;
  padding: 15px;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 20px;
`;


const LoginForm = styled.form`
display: block;
padding: 5px;
h1{
  font-size: 20px;
  margin: 8px 15px;
  padding: 5px;
}
`;

const LoginInput = styled.input`
  border-radius: 8px;
  border: 1px solid #ada7ab;
  width: 90%;
  height: 45px;
  align-items: center;
  justify-content: center;
  margin: 5px 20px;
  font-size: 8px;
`;

const LoginButton = styled.button`
  width: 80%;
  height: 55px;
  justify-content: center;
  align-items: center;
  transform: translate(12%,50%); //왜 10%면 정중앙이 아닐까
  font-size: 15px;
  border: 1px solid #ada7ab;
  border-radius: 10px;
  background: #e2e2e2;

  &:hover {
    background: ${darken(0.1, '#e2e2e2')};
  }
`;

const Login = () => {

  return (
    <LoginTemplate>
      <GlobalStyle />
      <LoginHeader>
        <h1>Login Page</h1>
      </LoginHeader>
      <LoginBody>
        <LoginForm>
          <h1>ID</h1>
          <LoginInput placeholder="ID를 입력해주세요" />
          <h1>Password</h1>
          <LoginInput placeholder="Password를 입력해주세요" />
        </LoginForm>
        <LoginButton>
          로그인
        </LoginButton>
      </LoginBody>
    </LoginTemplate>
  );
}

export default Login;
