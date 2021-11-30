// 할 일 항목 보여줌
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdEdit } from 'react-icons/md';
import { BiXCircle } from 'react-icons/bi';
import { useTodoDispatch } from '../TodoContext';

const QuitEdit = styled.div`
  display: flex;
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
  &:hover { // 커서가 위에 있을 때 Remove 컴포넌트 보임.
    ${Remove} {
      display: initial; // initial: 브라우저가 지정한 속성의 초기값 적용
    }
    ${QuitEdit}{
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

const EditInput = styled.input`
  padding: 10px;
  margin-right:10px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 80%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`

function TodoItem({ id, done, text }) {
  const [input, setInput] = useState(text);
  const onChange = e => {
    return setInput(e.target.value);
  };

  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  const onEdit = () => {
    dispatch({
      type: 'EDIT',
      id,
      text: input
    });
  };

  const [edit, setEdit] = useState(false);
  const onStartEdit = () => {
    return (
      setEdit(!edit)
    );
  };

  const onKeyPress=(e)=>{
    if(e.key=='Enter'){
      onEdit();
      onStartEdit();
    }
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>{done && <MdDone />}</CheckCircle>
      {edit? 
      <>
      <EditInput value={input} onChange={onChange} onKeyPress={onKeyPress}/>
       <QuitEdit onClick={onStartEdit}>
        <BiXCircle />
      </QuitEdit>
      </>
      : <>
      <Text done={done} onClick={onStartEdit}>{text}</Text>
            <Remove onClick={onRemove}>
        <MdDelete /> {/** 쓰레기통 아이콘 */}
      </Remove>
      </>
      }     
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
// 다른 항목이 업데이트 될 때 불필요한 리렌더링 방지