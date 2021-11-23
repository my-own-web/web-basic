import React from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.div`
  width: 600px;
  height: 800px;

  position: relative;
  background: #123;
  border-radius: 20px;
  box-shadow: 0 0 10px black;

  /* 위아래로 50px, 양옆으로 가운데 */
  margin: 50px auto;

  /* 안의 요소들을 열 방향으로 차곡차곡 쌓음 */
  display: flex;
  flex-direction: column;
`

function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;