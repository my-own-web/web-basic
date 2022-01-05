import Main from "./Main";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import TodoTemplate from "./components/TodoTemplate";
import LoginForm from "./components/LoginForm";
import MenuTemplate from "./components/MenuTemplate";
import { TodoProvider } from "./components/TodoContext";
import { UserProvider } from "./components/UserContext";
import { useCookies, withCookies } from "react-cookie";
import { useEffect, useState } from "react";

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
  const [cookies, removeCookie] = useCookies(["user"]);
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    if (cookies.user && cookies.user !== "undefined") {
      setHasCookie(true);
    }
  }, [cookies]);

  return (
    <TodoProvider>
      <UserProvider>
        <GlobalStyle />
        <MenuTemplate>
          <Menu>
            <Link to="/" style={MenuStyle}>
              Home
            </Link>
          </Menu>
          <Menu>
            <Link to="/login" style={MenuStyle}>
              {hasCookie ? "Logout" : "Login"}
            </Link>
          </Menu>
        </MenuTemplate>
        <TodoTemplate>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/login"
              element={
                <LoginForm
                  setHasCookie={setHasCookie}
                  removeCookie={() => {
                    removeCookie("user");
                    setHasCookie(false);
                  }}
                />
              }
            />
          </Routes>
        </TodoTemplate>
      </UserProvider>
    </TodoProvider>
  );
};

export default withCookies(App);
