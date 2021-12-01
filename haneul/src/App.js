import React from 'react';
import { createGlobalStyle } from 'styled-components';
import LoginForm from './components/LoginForm';

const GlobalStyle = createGlobalStyle`
body {
  background: white;
}
`;

function App() {
     return(
       <>
         <GlobalStyle />
         <LoginForm></LoginForm>
       </>
     );
}

export default App;