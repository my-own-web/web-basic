import React from "react";
import Hello from "./Hello";
import Wrapper from "./Wrapper"
import './App.css';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="aqua"/>
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
