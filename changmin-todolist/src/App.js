import Main from "./Main";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import TodoTemplate from "./components/TodoTemplate";
import LoginForm from "./components/LoginForm";
import MenuTemplate from "./components/MenuTemplate";
import { TodoProvider } from "./components/TodoContext";
import { useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import UserContext from "./contexts/UserContext";
import { TodoAPI } from "./utils/axios";
import Page from "./Page";

const cookies = new Cookies();

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

const App = () => {
  const { state, actions } = useContext(UserContext);

  async function verifyToken() {
    await TodoAPI.post("/user/auth", null, {
      withCredentials: true,
    })
      .then((res) => {
        actions.setUsername(res.data);
      })
      .catch((err) => {
        console.log("Invalid token, removing the cookie");
        actions.setUsername(null);
        cookies.remove("user");
      });
  }

  useEffect(() => {
    if (cookies.get("user") && cookies.get("user") !== "undefined")
      verifyToken();
    else actions.setUsername(null);
  }, [state]);

  return (
    <TodoProvider>
      <GlobalStyle />
      <MenuTemplate>
        <Menu>
          <Link to="/" style={MenuStyle}>
            Home
          </Link>
        </Menu>
        <Menu>
          <Link to="/login" style={MenuStyle}>
            {!state.username ? "Login" : state.username}
          </Link>
        </Menu>
      </MenuTemplate>
      <TodoTemplate>
        <Routes>
          <Route
            path="/"
            element={
              state.username !== null ? (
                <Page>
                  <Main />
                </Page>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              state.username !== null ? (
                <Page title="User Info">
                  <LoginForm />
                </Page>
              ) : (
                <Page title="Login">
                  <LoginForm />
                </Page>
              )
            }
          />
        </Routes>
      </TodoTemplate>
    </TodoProvider>
  );
};

export default App;
