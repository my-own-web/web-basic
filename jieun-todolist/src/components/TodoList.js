// 할 일 항목 리스트로 보여줌
import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto; // 내용 넘칠 때
  background: #FBEFFB; /* 사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

function TodoList() {
  const todos = useTodoState();

  return <TodoListBlock>
     {todos.map(todo => (
       <TodoItem
        key={todo.id}
        id={todo.id}
        text={todo.text}
        done={todo.done}
       />
     ))}
  </TodoListBlock>;
}

export default TodoList;