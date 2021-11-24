import styled from "styled-components";

const LoginFormColumnContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    margin:5px;
    font-size:2.5rem;
  }
`;

const LoginFormRowContainer=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h1{
    margin:5px;
    font-size:2.5rem;
  }
`;

export {LoginFormRowContainer, LoginFormColumnContainer};