import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {MdDone, MdDelete, MdOutlineBorderColor} from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';
import {InsertFormPositioner, InsertForm, Input, CircleButton} from './TodoCreate';

const Edit = styled.div`
display: flex;
align-items: center;
justify-content: center;
color: #dee2e6;
font-size: 24px;
cursor: pointer;
&:hover {
  color: #ff6b6b;
}
display: none;
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
    ${Edit}{
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

function TodoItem({ id, done, text }) {
    const dispatch = useTodoDispatch();

    const onToggle = () => dispatch({type: 'TOGGLE', id});
    const onRemove = () => dispatch({type: 'REMOVE', id});

    const [open, setOpen] = useState(false);
    const[value, setValue] =useState('');

    const editToggle = () => setOpen(!open);
    const editChange = e => setValue(e.target.value);

    const onEdit = e =>{
         dispatch({type: 'EDIT', id, value});
      setValue('');
      setOpen(false);
    }

    
  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>{done && <MdDone />}</CheckCircle>
      <Text done={done}>{text}</Text>

      <Edit onClick = {editToggle} open = {open}>
          <MdOutlineBorderColor/>
      </Edit>

      {open&&(
          <InsertFormPositioner>
          <InsertForm onSubmit = {onEdit}>
            <Input autoFocus placeholder="수정할 내용을 입력 후, Enter 를 누르세요"
             onChange={editChange} value = {value}/>
          </InsertForm>
        </InsertFormPositioner>
      )}
      

      <Remove onClick = {onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);