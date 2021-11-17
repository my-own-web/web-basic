import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import {useTodoDispatch} from "../TodoContext";

const RemoveButton=styled.div`
  display:flex;
  align-items:center;
  justify-content: center;
  color:#dee2e6;
  font-size: 24px;
  cursor:pointer;
  opacity: 0;
  &:hover{
    color:#ff6b6b;
  }
`;

const TodoItemBlock=styled.div`
  display: flex;
  align-items:center;
  padding-top:12px;
  padding-bottom:12px;
  &:hover{
    ${RemoveButton}{
      opacity: 1;
    }
  }
`;

const CheckCircle=styled.div`
  width:32px;
  height:32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size:24px;
  display:flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  //만약 done 상태면 끝났다는 상태를 보여주도록 css 설정
  ${props =>
          props.done &&
          css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
  props.done &&
  css`
      color: #ced4da;
    `}
`;

const TodoListItem=({id, done, text})=>{
  const dispatch=useTodoDispatch();
  const onToggle=()=>dispatch({type:"TOGGLE", id});
  const onRemove=()=>dispatch({type:"REMOVE", id});

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone/>}
      </CheckCircle>
      {/* done 상태일 때만 MdDone 을 표시해 준다 */}
      <Text done={done}>{text}</Text>
      <RemoveButton onClick={onRemove}>
        <MdDelete />
      </RemoveButton>
    </TodoItemBlock>
  )
}

export default React.memo(TodoListItem);