import React from 'react';
import styled from 'styled-components';
import TodoListItem from "./TodoListItem";
import {useTodoListState} from "./TodoListContext";

const TodoListBlock=styled.div`
  flex:1;
  //가능한 영역 꽉 채우기
  padding:20px 32px;
  padding-bottom: 48px;
  overflow-y:auto;
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
      ))}
    </TodoListBlock>
  );
}

export default TodoList;