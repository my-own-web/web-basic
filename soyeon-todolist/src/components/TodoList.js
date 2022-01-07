import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
  flex: 1; /*flex-grow: 1 속성(container의 크기가 커질 때 flex item의 크기도 커짐)과 flex-shrink: 1 속성( flex container의 크기가 flex item의 크기보다 작아질 때 flex item의 크기가 flex container의 크기에 맞추어 줄어들음), flex-basis: 0 속성(flex container를 기준으로 felx item의 크기가 결정됨)을 줄인 표현*/
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto; /*y축, 즉 위에 아래의 내용이 넘칠 때*/
  /*부모요소의 범위를 넘어가는 자식요소의 부분이 있을 경우 해당 부분을 보이지 않도록 처리하고, 사용자가 해당 부분을 확인 할 수 있도록 스크롤바를 표시*/
`; //flex: 1=>자신이 차지할 수 있는 영역을 꽉 채우도록 설정함

function TodoList() {
  const todos = useTodoState(); //todos: state을 나타냄

  return <TodoListBlock>
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        text={todo.text}
        done={todo.done}
        todo={todo}
      />
    ))}
  </TodoListBlock>;
}

export default TodoList;
