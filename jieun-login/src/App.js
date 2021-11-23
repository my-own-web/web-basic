import logo from './logo.svg';
import './App.css';
import Login from './Login';
import {createGlobalStyle} from 'styled-components';

// createGlobalStyle: 글로벌 스타일
const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`
function App() {
  return (
    <>
    <GlobalStyle />
    <Login/>
    </>
  );
}

export default App;
