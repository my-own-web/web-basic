import React from "react";
import styled from 'styled-components';

const TodoListTemplateBlock=styled.div`
  width:512px;
  height:770px;
  
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  
  margin: 96px auto 32px auto;
  display:flex;
  flex-direction: column;
`;

const TodoListTemplate=({children})=>{
  return <TodoListTemplateBlock>{children}</TodoListTemplateBlock>;
}

export {TodoListTemplateBlock};

export default TodoListTemplate;