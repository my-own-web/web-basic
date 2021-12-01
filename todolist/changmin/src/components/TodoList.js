import React from "react";
import styled from "styled-components";
import { useTodoState } from "./TodoContext";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1; /* 나머지 공간을 전부 채움 */
  overflow-y: auto; /* 내용이 많으면 스크롤바 생성 */
  padding: 20px 30px 50px;
`;

function TodoList() {
  const todos = useTodoState();

  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
