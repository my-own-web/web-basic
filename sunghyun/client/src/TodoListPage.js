import React, {useState, useEffect} from 'react';
import {createGlobalStyle} from 'styled-components';
import PageTemplateBlock from "./components/PageTemplate";
import TodoListHeader from "./components/TodoListHeader";
import TodoList from "./components/TodoList";
import TodoListCreate from "./components/TodoListCreate";
import LoginButton from "./components/LoginButton";
import {useNavigate} from "react-router-dom";
import {TodoAPI} from "./serverAPI";

const GlobalStyle=createGlobalStyle`
  body{
    background: #e5dbff;
  }
`

function TodoListPage() {
  const navigate=useNavigate();

  const [todos, setTodos]=useState([]);

  const fetchServerTodoList=async ()=>{
    console.log(sessionStorage.getItem('curUserId'));
    try{
      const curUserId=sessionStorage.getItem('curUserId');
      //만약 세션 스토리지에 그런 아이템이 없다면 null 을 리턴한다
      if(curUserId){
        const {data}=await TodoAPI.get(`/all?user=${curUserId}`);
        setTodos(data);
        return data;
      }
      else{
        //로그인된 회원이 아닐 경우
        const data=[];
        setTodos(data);
        return data;
      }
    }catch(err){
      console.log(err);
    }
  }

  const onRemove=async (id)=>{
    try{
      await TodoAPI.post("/remove", {id:id});
      //todolist 항목들은 다 고유 id가 있으므로 id만 보내줘도 된다
      await fetchServerTodoList();
    } catch (err){
      console.log(err);
    }
  };

  const onToggle=async (id)=>{
    /*for (let i = 0; i < sessionStorage.length; i++) {
      console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");
    }*/
    try{
      await TodoAPI.post("/toggle", {id:id});
      await fetchServerTodoList();
    } catch (err){
      console.log(err);
    }
  }

  const onEdit=async (curTodo)=>{
    try{
      await TodoAPI.post("/edit", curTodo);
      await fetchServerTodoList();
    } catch (err){
      console.log(err);
    }
  }

  const onCreate=async (newTodo)=>{
    try{
      const curUserId=sessionStorage.getItem('curUserId');
      await TodoAPI.post("/create", {todo:newTodo, userid:curUserId});
      await fetchServerTodoList();
    } catch (err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchServerTodoList();
  }, []);

  return (
    <>
      <GlobalStyle />
      <PageTemplateBlock height='770px'>
        <TodoListHeader todos={todos}/>
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} onEdit={onEdit}/>
        <TodoListCreate onCreate={onCreate}/>
        <LoginButton
          width='15rem'
          height='3rem'
          background='#da77f2'
          onClick={()=>{navigate("/");}}
        >
          다른 아이디로 로그인하기
        </LoginButton>
      </PageTemplateBlock>
    </>
  );
}

export default TodoListPage;
