import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Nav from './components/Nav';
import TodoNav from './components/TodoNav';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`; //글로벌 스타일을 추가하고 싶을 때

function Main() {
    return (
        <>
            <TodoProvider>
                <GlobalStyle />
                <TodoTemplate>
                    <TodoHead />
                    <TodoList />
                    <TodoCreate />
                </TodoTemplate>
            </TodoProvider>
        </>
    );
}

export default Main;