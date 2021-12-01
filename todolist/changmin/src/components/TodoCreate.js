import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "./TodoContext";
import { useEffect } from "react";

const CircleButton = styled.button`
  background: #3a7;
  &:hover {
    background: #5c9;
  }
  /* 마우스를 올렸을 때 색 */
  &:active {
    background: #4b8;
  }
  /* 클릭했을 때 색 */

  z-index: 5;
  /* 가장 위에 올라오도록 순서를 결정 */

  cursor: pointer;
  width: 80px;
  height: 80px;
  font-size: 60px;

  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  /* 고정된 자리(아래 중간)에 위치 설정 */

  color: #012;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s;
  ${(props) =>
    props.open &&
    css`
      background: #d44;
      &:hover {
        background: #f66;
      }
      &:active {
        background: #e55;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #124;
  padding: 32px 32px 72px;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  color: #eee;
  background: #012;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #eee;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    if (value) {
      e.preventDefault(); // Enter 누를때 form 초기화 방지
      dispatch({
        type: "CREATE",
        todo: {
          id: nextId.current,
          text: value,
          done: false,
        },
      });
      setValue("");
      setOpen(false);
      nextId.current += 1;
    }
  };

  const toggleCreateOnKeyDown = (e) => {
    if (e.key === "Escape" || e.key === "ArrowDown") setOpen(false);
    if (e.key === "ArrowUp") setOpen(true);
  };
  useEffect(() => {
    document.addEventListener("keydown", toggleCreateOnKeyDown);
    return () => document.removeEventListener("keydown", toggleCreateOnKeyDown);
  }, []);

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후, Enter를 누르세요"
              onChange={onChange}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);
