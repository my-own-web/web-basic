import React from 'react';
import {createGlobalStyle} from 'styled-components';
import PageTemplateBlock from "./components/PageTemplate";
import TodoListHeader from "./components/TodoListHeader";
import TodoList from "./components/TodoList";
import TodoListCreate from "./components/TodoListCreate";
import {TodoListProvider} from "./TodoListContext";

const GlobalStyle=createGlobalStyle`
  body{
    background: #e5dbff;
  }
`

function TodoListPage() {
  return (
    <TodoListProvider>
      <GlobalStyle />
      <PageTemplateBlock height='770px'>
        <TodoListHeader />
        <TodoList />
        <TodoListCreate />
      </PageTemplateBlock>
    </TodoListProvider>
  );
}

export default TodoListPage;
