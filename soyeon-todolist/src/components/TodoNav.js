import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const TodoNavBlock = styled.button`
  display: inline-flex;
  margin: 0px auto;
  width: 170.5px;
  position: relative;
  background: yellow;
  padding: 15px 30px;
  font-size: 20px;
  color: black;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  /*border: none;*/ /*테두리 없애기*/
`;

function TodoNav({ text }) {

  let history = useHistory();
  let load;
  if (text === '홈페이지')
    load = '/';
  else if (text === '회원가입')
    load = '/signup';
  else if (text === '로그인')
    load = '/login';
  else if (text === '회원탈퇴') {
    load = '/';
  }
  else if (text === '로그아웃')
    load = '/'

  return (
    <TodoNavBlock onClick={() => history.replace(`${load}`)}>
      {text}
    </TodoNavBlock>
  );
}

export default TodoNav;