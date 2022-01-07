import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { Route } from 'react-router-dom';
import Main from './Main';

function App() {
  /*return (
    <div>
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
      <Route path="/Login" exact={true} component={Login} />
    </div>
  );*/
  return (
    <div>
      <Route path="/" exact={true} component={Main} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/signUp" exact={true} component={SignUp} />
    </div>
  );
}

export default App;