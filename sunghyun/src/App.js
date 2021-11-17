import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Route, Routes, Link} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Profiles from "./Profiles";

const GlobalStyle=createGlobalStyle`
  body{
    background: #f8f0fc;
  }
`;

const App=()=>{
  return (
    <div>
      <GlobalStyle/>
      <ul>
        <li>
          <Link to='/'>메인 페이지</Link>
        </li>
        <li>
          <Link to='/about'>소개 페이지</Link>
        </li>
        <li>
          <Link to='/profiles'>프로필 목록</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />} />
        <Route path='/profiles' element={<Profiles />} />
      </Routes>
    </div>
  );
}


export default App;