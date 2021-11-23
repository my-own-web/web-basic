import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1; /* 나머지 공간을 전부 채움 */
  overflow-y: auto; /* 내용이 많으면 스크롤바 생성 */
  padding: 20px 30px 50px;
`

function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem text="acxbfghbj" done={true} />
      <TodoItem text="ufghjifhgj jnhg fgdndf" done={false} />
      <TodoItem text="uf iogpo fogjdfjgwheq e" done={false} />
      <TodoItem text="bgujnfnjrgneb web qe" done={true} />
    </TodoListBlock>
  )
}

export default TodoList;