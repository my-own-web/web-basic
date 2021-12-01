import React from "react";
import styled from "styled-components";
import { useTodoState } from "./TodoContext";

const TodoHeadBlock = styled.div`
  padding: 40px 60px 30px;
  border-bottom: 1px solid #eee;

  h1 {
    margin: 0;
    color: #8ce;
    font-size: 40px;
  }

  .day {
    margin-top: 5px;
    color: #ccc;
    font-size: 25px;
  }

  .tasks-left {
    margin-top: 40px;
    color: #8ec;
    font-size: 20px;
    font-weight: bold;
  }
`;

function TodoHead() {
  const todos = useTodoState();
  const undoneCount = todos.filter((todo) => !todo.done).length;

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneCount}개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
