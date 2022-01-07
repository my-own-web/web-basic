import React from 'react';
import styled from 'styled-components';

const TodoNavBlock = styled.div`
  display: inline-flex;
  margin: 0px auto;
  width: 110.5px;

  position: relative;
  background: yellow;
  padding: 15px 30px;
  font-size: 20px;
  color: black;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

function TodoNav() {
  return (
    <TodoNavBlock>
      <div></div>
    </TodoNavBlock>
  );
}

export default TodoNav;