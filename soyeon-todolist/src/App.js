import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { Route } from 'react-router-dom';
import Main from './Main';
import TodoNav from './components/TodoNav';
import Nav from './components/Nav';

function App() {

  return ( //완성하면 nav 부분 지우고 각각의 component에 작성하기
    <div>
      <Nav>
        <TodoNav text='홈페이지' />
        <TodoNav text='회원가입' />
        <TodoNav text='로그인' />
      </Nav>
      <Route path="/" exact={true} component={Main} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/signUp" exact={true} component={SignUp} />
    </div>
  ); //Nav 부분 각각 main과 signup component로 옮기기
}

export default App;