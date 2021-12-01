import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import styled, { css } from "styled-components";
const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
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
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

export default function TodoCreate(props) {
  // TodoCreate를 호출한 부모로부터 넘겨받은 prop(property)
  const { setData, lastId, setLastId } = props;

  // 상태(state) 및 상태를 update하는 변수
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  // input handling
  function handleClick() {
    setOpen((prev) => !prev);
  }
  function handleChange(e) {
    setInput(e.target.value);
  }
  function handleSubmit(e) {
    // 원래 Form은 enter를 누르면 새로고침이 됩니다
    // 새로고침을 방지하고 우리가 원하는 logic을 수행하도록
    // 아래 코드 추가
    e.preventDefault();

    // input 값이 비어있지 않은 경우에만
    if (input !== "") {
      setData((prev) => [
        ...prev,
        { id: lastId + 1, text: input, done: false },
      ]);
      setInput("");
      setLastId((prev) => ++prev);
      setOpen(false);
    }
  }

  // 아래는 Enter를 누르면 Input창이 열리고
  // Esc를 누르면 Input창이 닫히는 코드입니다
  function toggleCreateOnKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
    }
    if (e.key === "Enter") {
      setOpen(true);
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", toggleCreateOnKeyDown);
    return () => document.removeEventListener("keydown", toggleCreateOnKeyDown);
  }, []);
  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={handleSubmit}>
            <Input
              autoFocus
              placeholder="enter를 누르세요"
              value={input}
              onChange={handleChange}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={handleClick} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}
