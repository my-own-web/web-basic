import React, { useState } from 'react';
import TodoPage from './TodoPage';
import LoginPage from './LoginPage';


function App(){
  const [login, setLogin] = useState(false);
  return(
    <LoginPage />
  );
};

export default App;