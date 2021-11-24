import About from './About';
import Main from './Main';
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, Link } from 'react-router-dom';
import TodoTemplate from "./components/TodoTemplate";

const GlobalStyle = createGlobalStyle`
  body {
    background: #012;
    color: #eee;
  }
`;

const Menu = styled.nav`

`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Menu>
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
      </Menu>
      <TodoTemplate>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </TodoTemplate>
    </>
  );
}

export default App;
