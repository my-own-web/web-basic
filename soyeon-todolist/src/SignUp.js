import React, { useState, useCallback, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const SignUpBlock = styled.div`
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

const SignUpTemplate = ({ children }) => {
  return <SignUpBlock>{children}</SignUpBlock>;
}

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const SignUpHeader = styled.div`
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

const SignUpBody = styled.div`
  display: block;
  padding: 15px;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 20px;
`;


const SignUpForm = styled.form`
display: block;
padding: 5px;
h1{
  font-size: 20px;
  margin: 8px 15px;
  padding: 5px;
}
`;

const SignUpInput = styled.input`
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

const SignUpButton = styled.button`
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

function SignUp() {

  const [users, setUsers] = useState([]);

  async function fetchInitial() {
    try {
      const { data } = await axios.get("http://localhost:3001/sign");
      setUsers(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function postData(data) {
    await axios.post("http://localhost:3001/sign/account", data);
  }

  useEffect(() => {
    fetchInitial();
  }, []);

  useEffect(() => {
    return users;
  }, [users]);

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
    const SignUpUser = {
      ID,
      Password
    };

    setUserInf({
      ID: '',
      Password: ''
    });

    //users에 있는 계정 정보에 없으면 users에 계정 정보를 추가시킴
    let shouldSignUp = true;
    let sameId = false;
    users.map(user =>
      (user.ID === SignUpUser.ID) && (user.Password === SignUpUser.Password) ? shouldSignUp = false : '');
    if (shouldSignUp === true)
      users.map(user => user.ID === SignUpUser.ID ? sameId = true : '');

    if (sameId === true) {
      alert("동일한 아이디가 이미 존재합니다. 다른 아이디를 입력해 주십시오.")

      return history.replace("/signup");
    }
    else if (shouldSignUp === true) {
      alert("회원가입을 축하드립니다.")
      ////// users에 계정 정보 추가
      postData(SignUpUser);

      return history.replace("/");
    }
    else {
      alert("이미 존재하는 계정입니다. 다른 아이디와 비밀번호를 입력해 주십시오.")

      return history.replace("/signup");
    }
  };

  return (
    <>
      <SignUpTemplate>
        <GlobalStyle />
        <SignUpHeader>
          <h1>SignUp Page</h1>
        </SignUpHeader>
        <SignUpBody>
          <SignUpForm>
            <h1>ID</h1>
            <SignUpInput name="ID" onChange={onChange} value={ID} placeholder="ID를 입력해주세요" />
            <h1>Password</h1>
            <SignUpInput name="Password" onChange={onChange} value={Password} type="password" placeholder="Password를 입력해주세요" />
          </SignUpForm>
          <SignUpButton onClick={onSubmit}>
            회원가입
          </SignUpButton>
        </SignUpBody>
      </SignUpTemplate>
    </>
  );

}

export default SignUp;