import React from "react";
import styled from "styled-components";
import TodoListItem from "./TodoListItem";

const TodoListBlock=styled.div`
  flex:1;
  padding:20px 32px 48px 32px;
  overflow-y: auto;
`;

const TodoList=({todos, onRemove, onToggle, onEdit})=>{
  //console.log(todos);
  return (
    <TodoListBlock>
      {todos.map(todo=>(
        <TodoListItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          editing={todo.editing}
          onRemove={onRemove}
          onToggle={onToggle}
          onEdit={onEdit}
        />
        )
      )}
    </TodoListBlock>
  )
}

export default TodoList;