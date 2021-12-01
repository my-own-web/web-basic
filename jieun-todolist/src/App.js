import React from 'react';
import {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';

// createGlobalStyle: 글로벌 스타일

const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`
// body 태그에 CSS 적용. 배경색: 회색
// index.css에서도 가능.

function App(){
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

export default App;