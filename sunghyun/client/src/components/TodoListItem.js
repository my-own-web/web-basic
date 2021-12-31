import React from "react";
import styled, {css} from "styled-components";
import {MdDone, MdDelete, MdEdit, MdSave} from "react-icons/md";
import {useTodoListDispatch} from "../TodoListContext";

const RemoveButton=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color:#dee2e6;
  font-size:24px;
  cursor: pointer;
  &:hover{
    color:#ff6b6b;
  }
`;

const EditButton=styled.div`
  display:flex;
  align-items:center;
  justify-content: center;
  color:#dee2e6;
  font-size: 24px;
  cursor:pointer;
  &:hover{
    color:#cc5de8;
  }
`;

const TodoListItemBlock=styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  &:hover{
    ${RemoveButton}{
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
  props.done &&
  css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

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

const TodoListItem=({id, done, text, editing})=>{
  const dispatch=useTodoListDispatch();
  const onToggle=()=>dispatch({type:'TOGGLE', id});
  const onRemove=()=>dispatch({type:'REMOVE', id});
  const onEdit=()=>dispatch({type:'EDIT', id});

  return (
    <TodoListItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done ? <MdDone />:''}
      </CheckCircle>
      <Text contentEditable={editing} done={done}>{text}</Text>
      <EditButton onClick={onEdit}>
        {editing?<MdSave />:<MdEdit />}
      </EditButton>
      <RemoveButton onClick={onRemove}>
        <MdDelete />
      </RemoveButton>
    </TodoListItemBlock>
  )
}

export default React.memo(TodoListItem);