import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import TodoTemplate from "./components/TodoTemplate.js";
import TodoListHeader from "./components/TodoListHeader";
import TodoList from "./components/TodoList";
import TodoListAdd from "./components/TodoListAdd";
import {TodoProvider} from "./TodoContext";
import {Route, Routes, Link} from "react-router-dom";
import Home from "./Home";
import About from "./About";

const GlobalStyle=createGlobalStyle`
  body{
    background: #f8f0fc;
  }
`

const App=()=>{
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>메인 페이지</Link>
        </li>
        <li>
          <Link to='/about'>소개 페이지</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}


export default App;