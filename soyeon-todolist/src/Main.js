import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';
import Cookies from "universal-cookie";
import { TodoAPI } from './utils/axios';
import TodoNav from './components/TodoNav';
import Nav from './components/Nav';

const cookies = new Cookies();

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`; //글로벌 스타일을 추가하고 싶을 때

function Main() {
    const [currentId, setCurrentId] = useState();

    async function verifyToken() {
        try {
            const res = await TodoAPI.post("/sign/auth", null, {
                withCredentials: true
            });

            console.log(res.data); ////////

            setCurrentId(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (cookies.get('userInf') && cookies.get('userInf') !== "undefined")
            verifyToken();
    }, []);

    /*async function signOut() {
        try {
            const res = await TodoAPI.put("/sign/delete");
        } catch (err) {
            console.log(err);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    }*/

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