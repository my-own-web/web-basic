import React, { useState } from 'react';
import TodoTemplate from './todolist/TodoTemplate';
import TodoHead from './todolist/TodoHead';
import TodoList from './todolist/TodoList';
import TodoCreate from './todolist/TodoCreate';
import { TodoProvider } from './TodoContext';
import {createGlobalStyle} from 'styled-components';

// createGlobalStyle: 글로벌 스타일

const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`
// body 태그에 CSS 적용. 배경색: 회색
// index.css에서도 가능.

function TodoPage(){
  return(
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
};

export default TodoPage;