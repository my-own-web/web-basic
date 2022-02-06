import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdEdit } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';
///import axios from 'axios';

const Remove = styled.div`
  display: flex;
  align-items: center; /*세로축-교차축*/
  justify-content: center; /*가로축-중심축*/
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0; //투명해짐
  &:hover {
    color: #ff6b6b;
  }
`;

const Edit = styled.div`
  align-items: center;
  display: inline-block;
  justify - content: center;
  color: #dee2e6;
  font-size: 20px;
  padding-top: 4px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      opacity: 1; //불투명해짐(눈에 보임)
    }
  }
`;
//TodoItemBlcok에는 Component Selector이라는 기능이 사용됨: TodoItemBlcok 위에 커서가 있을 때 Remove 컴포넌트를 보여주라는 의미

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
  display: inline-block;
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

  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  const doneEdit = (e) => {
    e.preventDefault();
    dispatch({ type: 'EDITDONE', id, text: changeText });
    setEdited(false);
  }

  const [edited, setEdited] = useState(false);
  const [changeText, setChangeText] = useState(text);

  const onEditInput = (e) => {
    setChangeText(e.target.value);
  }

  const onClickEdit = () => {
    setEdited(true);
  }

  /*const onClickDone = () => {
    setEdited(false);
  }*/

  /*const onArticle = (edited) => {
    return edited ? (<form onSubmit={doneEdit}><input autoFocus value={changeText} onChange={onEditInput} /></form>)
      : <Text done={done}>{changeText}</Text>;
  };*/

  const onArticle = (edited) => {
    return edited ? (<div><Edit><MdDone onClick={doneEdit} /></Edit><input autoFocus value={changeText} onChange={onEditInput} /></div>)
      : <div><Edit><MdEdit onClick={onClickEdit} /></Edit><Text done={done}>{changeText}</Text></div>;
  };

  /*const onFigure = (edited) => {
    return edited ? (<Edit>
      <MdDone onClick={onClickDone} />
    </Edit>) : (<Edit>
      <MdEdit onClick={onClickEdit} />
    </Edit>);
  };*/

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done ? <MdDone /> : ''}
      </CheckCircle>
      {onArticle(edited)}
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem); //TodoList에서 호출