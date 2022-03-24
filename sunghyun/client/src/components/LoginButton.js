import styled, {css} from "styled-components";
import {darken} from "polished";

const LoginButton=styled.button`
  width:${props=>props.width};
  height:${props=>props.height};
  background: ${props=>props.background};
  color:${props=>props.color || 'white'};
  font-size:1.2rem;
  border-radius: 7px;
  border:none;
  margin:1rem;
  
  &:hover{
    ${props=>{return css`
        background:${darken(0.1, props.background)};
      `;}
    }
  }
`;

export default LoginButton;