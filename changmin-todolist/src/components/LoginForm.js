import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Cookies from "universal-cookie";
import UserContext from "../contexts/UserContext";
import { TodoAPI } from "../utils/axios";

const cookies = new Cookies();

const LoginFormBlock = styled.form`
  flex: 1;
  text-align: center;
  font-size: 30px;
  color: #eee;

  h1 {
    font-size: 50px;
    color: #9ce;
    margin: 50px;
  }

  div {
    padding: 20px;

    display: flex;
    flex-direction: row;
  }

  button {
    background: #3a7;
    &:hover {
      background: #5c9;
    }
    /* 마우스를 올렸을 때 색 */
    &:active {
      background: #4b8;
    }
    /* 클릭했을 때 색 */

    cursor: pointer;
    font-size: 30px;
    font-weight: bold;

    padding: 5px 20px;
    margin: 30px;

    border-radius: 20px;
    border: none;
    outline: none;

    transition: 0.2s;
  }
`;

const Input = styled.input`
  color: #eee;
  background: rgba(0, 0, 0, 0);
  padding: 4px;
  margin: 0 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
`;

function LoginForm() {
  const { state, actions } = useContext(UserContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    passwordCheck: "",
  });
  const { username, password, passwordCheck } = inputs; // 입력받은 username / password / passwordCheck
  const usernameInput = useRef(); // Username 입력 focus 위해 사용
  const passwordInput = useRef(); // Password 입력 focus 위해 사용
  const passwordCheckInput = useRef(); // PasswordCheck 입력 focus 위해 사용
  const [passwordCheckDisplay, setPasswordCheckDisplay] = useState(false); // PasswordCheck 입력 표시 여부
  const navigate = useNavigate(); // 로그인 성공 후 navigate 위해 사용

  const setPasswordCheckInput = (node) => {
    if (node) passwordCheckInput.current = node;
    passwordCheckInput.current.focus();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Username을 입력해주세요.");
      usernameInput.current.focus();
      return;
    }
    if (!password) {
      alert("Password를 입력해주세요.");
      passwordInput.current.focus();
      return;
    }

    async function checkUser() {
      await TodoAPI
        .post("/user/login", inputs, {
          withCredentials: true,
        })
        .then((res) => {
          switch (res.data) {
            case "OK":
              actions.setUsername(username);
              alert(`성공적으로 로그인되었습니다. 안녕하세요, ${username}님!`);
              navigate("/");
              break;
            case "USER_NOT_FOUND":
              alert("Username 또는 Password가 올바르지 않습니다.");

              // password input field 초기화
              setInputs({ ...inputs, password: "" });

              // password field에 focus
              passwordInput.current.focus();
              break;
            default:
              alert("알 수 없는 오류가 발생했습니다.");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          alert("알 수 없는 오류가 발생했습니다.");
        });
    }
    checkUser();
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Username을 입력해주세요.");
      usernameInput.current.focus();
      return;
    }
    if (!password) {
      alert("Password를 입력해주세요.");
      passwordInput.current.focus();
      return;
    }

    if (username.length < 8 || username.length > 20) {
      alert("Username은 8~20글자만 가능합니다.");
      usernameInput.current.focus();
      return;
    }
    if (password.length < 8 || password.length > 20) {
      alert("Password는 8~20글자만 가능합니다.");
      passwordInput.current.focus();
      return;
    }

    if (!passwordCheckDisplay) {
      setPasswordCheckDisplay(true);
      return;
    }
    if (!passwordCheck) {
      alert("Password Check를 입력해주세요.");
      passwordCheckInput.current.focus();
      return;
    }
    if (password !== passwordCheck) {
      alert("Password와 Password Check이 다릅니다.");
      passwordCheckInput.current.focus();
      return;
    }

    async function checkUser() {
      await TodoAPI
        .post("/user/register", inputs)
        .then((res) => {
          switch (res.data) {
            case "OK":
              alert(
                `${username} 계정을 성공적으로 생성하였습니다. 다시 로그인해주세요.`
              );

              setInputs({ username: "", password: "", passwordCheck: "" });

              setPasswordCheckDisplay(false);
              usernameInput.current.focus();
              break;
            case "USER_EXISTS":
              alert(`${username} 계정이 이미 존재합니다.`);

              setInputs({ ...inputs, password: "", passwordCheck: "" });

              usernameInput.current.focus();
              break;
            default:
              alert("알 수 없는 오류가 발생했습니다.");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          alert("알 수 없는 오류가 발생했습니다.");
        });
    }
    checkUser();
  };

  const onLogout = (e) => {
    e.preventDefault();
    actions.setUsername(null);
    cookies.remove("user");

    alert("로그아웃되었습니다.");
    navigate("/");
  };

  const onUnregister = (e) => {
    e.preventDefault();
    async function checkUser() {
      await TodoAPI
        .post("/user/unregister", {
          username: state.username,
        })
        .then((res) => {
          switch (res.data) {
            case "OK":
              alert(`${state.username} 계정을 성공적으로 삭제하였습니다.`);
              navigate("/");
              break;
            default:
              alert("알 수 없는 오류가 발생했습니다.");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          alert("알 수 없는 오류가 발생했습니다.");
        });
      actions.setUsername(null);
      cookies.remove("user");
    }
    checkUser();
  };

  if (state.username) {
    // 로그인 된 화면
    return (
      <LoginFormBlock>
        <h1>안녕하세요, {state.username}님!</h1>
        <button onClick={onLogout}>로그아웃</button>
        <button onClick={onUnregister}>회원탈퇴</button>
      </LoginFormBlock>
    );
  }

  return (
    <LoginFormBlock>
      <h1>로그인</h1>
      <div>
        Username:{" "}
        <Input
          autoFocus
          name="username"
          value={username}
          onChange={onChange}
          placeholder="Username"
          ref={usernameInput}
        />
      </div>
      <div>
        Password:{" "}
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          ref={passwordInput}
        />
      </div>
      {passwordCheckDisplay && (
        <div>
          Password:{" "}
          <Input
            type="password"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChange}
            placeholder="Password Check"
            ref={setPasswordCheckInput}
          />
        </div>
      )}
      <button onClick={onLoginSubmit}>로그인</button>
      <button onClick={onRegisterSubmit}>회원가입</button>
    </LoginFormBlock>
  );
}

export default React.memo(LoginForm);
