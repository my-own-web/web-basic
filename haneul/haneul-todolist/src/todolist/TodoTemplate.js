import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04),
  5px 5px rgba(170, 150, 218, 0.4), 
  10px 10px rgba(170, 150, 218, 0.3), 
  15px 15px rgba(170, 150, 218, 0.2), 
  20px 20px rgba(170, 150, 218, 0.1), 
  25px 25px rgba(170, 150, 218, 0.05);
  margin: 0 auto;

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`

function TodoTemplate({ children }){
    return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;