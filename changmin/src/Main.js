import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

const GlobalStyle = createGlobalStyle`
  body {
    background: #012;
  }
`;

function Main() {
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
      </TodoTemplate>
    </>
  );
}

export default Main;