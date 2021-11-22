import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import TodoListTemplate from "./components/TodoListTemplate";
import TodoListHeader from "./components/TodoListHeader";
import TodoList from "./components/TodoList";
import TodoListCreate from "./components/TodoListCreate";
import {TodoListProvider} from "./components/TodoListContext";

const GlobalStyle=createGlobalStyle`
  body{
    background: #f8f0fc;
  }
`;

const App=()=>{
  return (
    <TodoListProvider>
      <GlobalStyle />
      <TodoListTemplate>
        <TodoListHeader/>
        <TodoList />
        <TodoListCreate />
      </TodoListTemplate>
    </TodoListProvider>
  );
}


export default App;