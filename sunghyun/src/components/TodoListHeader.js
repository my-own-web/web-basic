import React from 'react';
import styled from "styled-components";
import {useTodoState} from "../TodoContext";

const TodoListHeaderBlock=styled.div`
  padding:48px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
  
  h1{
    margin:0;
    font-size:36px;
    color:#343a40;
  }
  
  .day{
    margin-top: 4px;
    color:#868e96;
    font-size:21px;
  }
  
  .tasks-left{
    color:#be4bdb;
    font-size:18px;
    margin-top: 40px;
    font-weight: bold;
  }
`

const TodoListHeader=()=>{
  const todos=useTodoState();
  const leftTasks=todos.filter(todo=>!todo.done);
  const today=new Date();
  const dateStr=today.toLocaleDateString('ko-KR',{
    year:'numeric',
    month:'long',
    day:'numeric'
  });
  const dayName=today.toLocaleDateString('ko-KR', {weekday:`long`});

  return (
    <TodoListHeaderBlock>
      <h1>{dateStr}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">남은 할 일 {leftTasks.length}개</div>
    </TodoListHeaderBlock>
  )
}

export default TodoListHeader;