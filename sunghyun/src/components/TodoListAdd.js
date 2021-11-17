import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {MdAdd} from 'react-icons/md';
import {useTodoDispatch, useTodoNextID} from "../TodoContext";

const CircleButton=styled.button`
  background: #38d9a9;
  &:hover{
    background: #63e6be;
  }
  &:active{
    background: #20c997;
  }
  
  cursor:pointer;
  width:80px;
  height:80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:60px;
  position: absolute;
  left:50%;
  bottom:0px;
  transform: translate(-50%, 50%);
  color:white;
  border:none;
  outline: none;
  
  transition:0.1s all ease-in;
  
  ${props=>
    props.open&&
    css`
      background: #ff6b6b;
      &:hover{
        background: #ff8787;
      }
      &:active{
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `
  }
`;

const InsertFormPositioner=styled.div`
  width:100%;
  bottom:0;
  left:0;
  position:absolute;
`;

const InsertForm=styled.form`
  background: #f8f9fa;
  padding: 32px 32px 72px 32px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input=styled.input`
  padding:12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width:100%;
  outline:none;
  font-size: 18px;
  box-sizing: border-box;
`;

const TodoListAdd=()=>{
  //새로운 아이템을 추가하는 창
  const [open, setOpen]=useState(false);
  const [value, setValue]=useState('');

  const dispatch=useTodoDispatch();
  const nextID=useTodoNextID();

  const onToggle=()=>setOpen(!open);
  const onChange=(e)=>setValue(e.target.value);
  const onSubmit=(e)=>{
    e.preventDefault();
    dispatch({
      type:"CREATE",
      todo:{
        id:nextID.current,
        text:value,
        done:false
      }
    })
    setValue('');
    setOpen(false);
    nextID.current+=1;
  }

  return (
    <>
      {open&&(
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="새로운 할 일을 입력 후 Enter를 누르기"
              onChange={onChange}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>

  )
}

export default React.memo(TodoListAdd);