import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todopage from './Todopage';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Loginpage from './Loginpage';
import Signuppage from './Signuppage';


ReactDOM.render(

  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Loginpage />} />
      <Route path = "/todo" element = {<Todopage />} />
      <Route path = "/signup" element = {<Signuppage />} />
    </Routes>
  </BrowserRouter>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
