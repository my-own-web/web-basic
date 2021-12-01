import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdEdit } from "react-icons/md";
import { useTodoDispatch } from "./TodoContext";
import { useState } from "react";
import { useEffect } from "react";

const Remove = styled.div`
  display: flex;
  align-items: center; /* 내부 요소들이 세로로 가운데 정렬 */
  justify-content: center; /* 내부 요소들이 가로로 가운데 정렬 */
  color: #ddd;
  font-size: 24px;
  padding: 5px;
  cursor: pointer; /* 마우스가 클릭하는 표시로 됨 */
  &:hover {
    color: #f53;
  }
  /* 마우스를 올렸을 때(&:hover) 색이 변함 */
  opacity: 0; /* 기본값으로 삭제 버튼은 보이지 않음 */
  transition: 0.1s linear;
`;

const Edit = styled.div`
  display: flex;
  align-items: center; /* 내부 요소들이 세로로 가운데 정렬 */
  justify-content: center; /* 내부 요소들이 가로로 가운데 정렬 */
  color: #ddd;
  font-size: 24px;
  padding: 5px;
  cursor: pointer; /* 마우스가 클릭하는 표시로 됨 */
  &:hover {
    color: #3f5;
  }
  /* 마우스를 올렸을 때(&:hover) 색이 변함 */
  opacity: 0; /* 기본값으로 편집 버튼은 보이지 않음 */
  transition: 0.1s linear;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
    ${Edit} {
      opacity: 1;
    }
  }
  /* 마우스를 올렸을 때(&:hover) 삭제/편집 버튼을 보여줌 */
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
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #5ea;
      color: #5ea;
    `}/* props.done이 true면 뒤의 css로 스타일 변경 */
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #eee;
  ${(props) =>
    props.done &&
    css`
      color: #555;
    `}/* props.done이 true면 뒤의 css로 스타일 변경 */
`;

const EditForm = styled.form`
  background: rgba(0, 0, 0, 0);
  flex: 1;
`;

const Input = styled.input`
  color: #eee;
  background: rgba(0, 0, 0, 0);
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #eee;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
`;

function TodoItem({ id, done, text }) {
  const [edit, setEdit] = useState(false);
  const [editText, setText] = useState(text);

  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: "TOGGLE", id });
  const onRemove = () => dispatch({ type: "REMOVE", id });
  const onEditToggle = () => setEdit(!edit);
  const onEdit = (e) => {
    e.preventDefault();
    dispatch({ type: "EDIT", id, editText });
    setEdit(false);
  };
  const onChange = (e) => setText(e.target.value);

  const toggleEditOnKeyDown = (e) => {
    if (e.key === "Escape") setEdit(false);
  };
  useEffect(() => {
    document.addEventListener("keydown", toggleEditOnKeyDown);
    return () => document.removeEventListener("keydown", toggleEditOnKeyDown);
  }, []);

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      {edit ? (
        <EditForm onSubmit={onEdit}>
          <Input
            autoFocus
            value={editText}
            onChange={onChange}
            placeholder="수정할 내용 입력 후, Enter를 누르세요"
          />
        </EditForm>
      ) : (
        <Text done={done}>{text}</Text>
      )}
      <Edit onClick={onEditToggle}>
        <MdEdit />
      </Edit>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
