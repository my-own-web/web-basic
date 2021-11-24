import React from 'react';
import Login from './Login';
import { Route } from 'react-router-dom';
import Main from './Main';

function App() {

  return (
    <div>
      <Route path="/" exact={true} component={Main} />
      <Route path="/Login" exact={true} component={Login} />
    </div>
  );
}

export default App;