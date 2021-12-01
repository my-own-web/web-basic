import React from "react";
import styled from "styled-components";

const MenuTemplateBlock = styled.div`
  width: 600px;
  height: 70px;

  position: relative;
  background: #123;
  border-radius: 20px;
  box-shadow: 0 0 10px black;

  /* 위아래로 30px, 양옆으로 가운데 */
  margin: 30px auto;

  /* 안의 요소들을 행 방향으로 차곡차곡 쌓음 */
  display: flex;
  flex-direction: row;
`;

function MenuTemplate({ children }) {
  return <MenuTemplateBlock>{children}</MenuTemplateBlock>;
}

export default MenuTemplate;
