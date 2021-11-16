import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { darken, lighten } from 'polished';

const StyledButton=styled.button`
  display:inline-flex;
  outline: none;
  border:none;
  border-radius: 4px;
  color:white;
  font-weight: bold;
  cursor:pointer;
  padding-left:1rem;
  padding-right: 1rem;
  
  height:2.5rem;
  font-size:1rem;

  background: pink;
  &:hover {
    background: ${lighten(0.1, 'pink')};
  }
  &:active {
    background: ${darken(0.1, 'pink')};
  }
  
  & + & {
    margin-left: 1rem;
  }
  
`;

function App(){
  return <StyledButton>BUTTON</StyledButton>
}

export default App;