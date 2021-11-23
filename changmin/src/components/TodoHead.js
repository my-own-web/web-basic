import React from "react";
import styled from "styled-components";

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
`

function TodoHead() {
  return (
    <TodoHeadBlock>
      <h1>2021년 11월 24일</h1>
      <div className="day">수요일</div>
      <div className="tasks-left">할 일 2개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead