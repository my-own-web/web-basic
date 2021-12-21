import React, { useState } from 'react';
import TodoPage from './TodoPage';
import LoginPage from './LoginPage';

// not using.

function App(){
  const [login, setLogin] = useState(false);
  return(
    <LoginPage />
    // <TodoPage />
  );
};

export default App;