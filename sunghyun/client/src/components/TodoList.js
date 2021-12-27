import React from "react";
import styled from "styled-components";
import TodoListItem from "./TodoListItem";
import {useTodoListState} from "../TodoListContext";

const TodoListBlock=styled.div`
  flex:1;
  padding:20px 32px 48px 32px;
  overflow-y: auto;
`;

const TodoList=()=>{
  const todos=useTodoListState();

  return (
    <TodoListBlock>
      {todos.map(todo=>(
        <TodoListItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          editing={todo.editing}
        />
        )
      )}
    </TodoListBlock>

  )
}

export default TodoList;