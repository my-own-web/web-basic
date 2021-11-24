import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from 'react-icons/md';

const Remove = styled.div`
  display: flex;
  align-items: center; /* 내부 요소들이 세로로 가운데 정렬 */
  justify-content: center; /* 내부 요소들이 가로로 가운데 정렬 */
  color: #ddd;
  font-size: 24px;
  cursor: pointer; /* 마우스가 클릭하는 표시로 됨 */
  &:hover {
    color: #f53;
  }
  /* 마우스를 올렸을 때(&:hover) 색이 빨갛게 변함 */
  opacity: 0; /* 기본값으로 삭제 버튼은 보이지 않음 */
  transition: 0.1s linear
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
  /* 마우스를 올렸을 때(&:hover) 삭제 버튼을 보여줌 */
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ddd;
  font-size: 24px;
  /* font-size는 체크마크 크기 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #5ea;
      color: #5ea;
    `}
  /* props.done이 true면 뒤의 css로 스타일 변경 */
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #eee;
  ${props =>
    props.done &&
    css`
      color: #555;
    `}
  /* props.done이 true면 뒤의 css로 스타일 변경 */
`;

function TodoItem({ id, done, text }) {
  return (
    <TodoItemBlock>
      <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;