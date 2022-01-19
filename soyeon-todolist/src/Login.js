import React, { useState, useCallback, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
//import TodoTemplateBlock from './components/TodoTemplate';
import { darken } from 'polished';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
  font-size: 20px; //왜 적용 안될까
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
  transform: translate(12%,50%); //왜 10%가 정중앙이 아니지
  font-size: 15px;
  border: 1px solid #ada7ab;
  border-radius: 10px;
  background: #e2e2e2;

  &:hover {
    background: ${darken(0.1, '#e2e2e2')};
  }
`;

function Login() {

  ///////////////////////////////////////////
  const [users, setUsers] = useState([]);

  async function fetchInitial() {
    try {
      const { data } = await axios.get("http://localhost:3001/sign")
      setUsers(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchInitial();
  }, []);

  useEffect(() => {
    return users;
  }, [users]);

  //////////////////
  async function haveUser(LoginInf) {
    try {
      await axios.post("http://localhost:3001/login/makejwt", LoginInf);
    } catch (err) {
      console.log(err);
    }
  }
  ////////////////////////

  const [userInf, setUserInf] = useState({
    ID: '',
    Password: ''
  });

  const { ID, Password } = userInf;

  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setUserInf({
        ...userInf,
        [name]: value
      });
    },
    [userInf]
  );

  let history = useHistory();

  const onSubmit = () => {
    const loginUser = {
      ID,
      Password
    };

    setUserInf({
      ID: '',
      Password: ''
    });

    //users에 있는 계정 정보와 겹치면 main 화면으로, 아니면 다시 로그인하도록 하기
    let didLogin = false;
    users.map(user =>
      (user.ID === loginUser.ID) && (user.Password === loginUser.Password) ? didLogin = true : '');

    /////////////////////////
    //haveLogin([didLogin,ID]);
    ///////////////////
    if (didLogin === true) {
      return history.replace("/");
    }
    else {
      alert("아이디 또는 비밀번호를 확인하세요.")
    }
    ////////////////
  };

  return (
    <>
      <LoginTemplate>
        <GlobalStyle />
        <LoginHeader>
          <h1>Login Page</h1>
        </LoginHeader>
        <LoginBody>
          <LoginForm>
            <h1>ID</h1>
            <LoginInput name="ID" onChange={onChange} value={ID} placeholder="ID를 입력해주세요" />
            <h1>Password</h1>
            <LoginInput name="Password" onChange={onChange} value={Password} type="password" placeholder="Password를 입력해주세요" />
          </LoginForm>
          <LoginButton onClick={onSubmit}>
            로그인
          </LoginButton>
        </LoginBody>
      </LoginTemplate>
    </>
  );
}

export default Login;