import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import {serverCreateReducer} from "../TodoListContext";
import Input from "./Input";
import useAsync from "./useAsync";
import axios from "axios";

const CircleButton=styled.button`
  background: #38d9a9;
  &:hover{
    background: #63e6be;
  }
  &:active{
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;

  transition: 0.125s all ease-in;
  ${props =>
          props.open &&
          css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner=styled.div`
  width:100%;
  bottom:0;
  left:0;
  position: absolute;
`;

const InsertForm=styled.form`
  background: #f8f9fa;
  padding: 32px 32px 72px 32px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const TodoListCreate=({onCreate})=>{
  const [open, setOpen]=useState(false);
  const [value, setValue]=useState('');

  const onToggle=()=>setOpen(!open);
  const onChange=(e)=>setValue(e.target.value);
  const onSubmit=(e)=>{
    e.preventDefault();
    onCreate({
      text:value,
      done:false,
      editing:false
    })
    setValue('');
    setOpen(false);
  }

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후 엔터키를 누르세요"
              onChange={onChange}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
        )
      }
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  )
}

export default React.memo(TodoListCreate);