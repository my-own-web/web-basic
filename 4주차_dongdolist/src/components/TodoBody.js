import { useState } from "react";
import styled from "styled-components";
import TodoCreate from "./TodoCreate";
import TodoItem from "./TodoItem";

const TodoBodyWrap = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;
const initialData = [
  { id: 1, text: "남문 통과하기", done: true },
  { id: 2, text: "외판원 순회 문제 해결하기", done: false },
];
export default function TodoBody() {
  // todoList element를 저장
  // initialData를 초기 data로 갖도록 설정
  const [data, setData] = useState(initialData);
  // 제일 마지막으로 element에 할당한 id를 저장
  const [lastId, setLastId] = useState(initialData.length);
  const TodoItemLists = () =>
    data.map((elem) => {
      return (
        <TodoItem
          id={elem.id}
          text={elem.text}
          done={elem.done}
          // TodoItem 내부에서도 data를 변경할 수 있도록 setData함수를 넘겨줌
          setData={setData}
        />
      );
    });
  return (
    <TodoBodyWrap>
      <TodoItemLists />
      {/* or {data.map(elem => <TodoItem {...elem} setData={setData} />)} */}
      <TodoCreate setData={setData} lastId={lastId} setLastId={setLastId} />
    </TodoBodyWrap>
  );
}
