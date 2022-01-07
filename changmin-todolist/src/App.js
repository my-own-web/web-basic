import Main from "./Main";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import TodoTemplate from "./components/TodoTemplate";
import Login from "./Login";
import MenuTemplate from "./components/MenuTemplate";
import { TodoProvider } from "./components/TodoContext";
import { AccountProvider } from "./components/AccountContext";

const GlobalStyle = createGlobalStyle`
  body {
    background: #012;
    color: #eee;
  }
`;

const Menu = styled.nav`
  color: #eee;
  text-align: center;
  padding: 10px 0;
  flex: 1;
`;

const MenuStyle = {
  textDecoration: "none",
  color: "#eee",
  margin: "0",
  fontSize: "30px",
  fontWeight: "bold",
};

//const LogoutButton = styled.button``;

const App = () => {
  /*
  const account = useAccountCurrent();
  const onLogout = () => {
    account.current = undefined;
  };
  */
  return (
    <TodoProvider>
      <AccountProvider>
        <GlobalStyle />
        <MenuTemplate>
          <Menu>
            <Link to="/" style={MenuStyle}>
              Home
            </Link>
          </Menu>
          <Menu>
            {/*!!account && !!account.current ? (
              <LogoutButton onClick={onLogout} style={MenuStyle}>
                Logout
              </LogoutButton>
            ) : (
              <Link to="/login" style={MenuStyle}>
                Login
              </Link>
            )
            동작 안해서 로그아웃 메뉴 관련은 임시로 주석 처리
            */}
            <Link to="/login" style={MenuStyle}>
              Login
            </Link>
          </Menu>
        </MenuTemplate>
        <TodoTemplate>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </TodoTemplate>
      </AccountProvider>
    </TodoProvider>
  );
};

export default App;
