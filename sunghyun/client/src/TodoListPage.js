import React, {useState, useEffect} from 'react';
import {createGlobalStyle} from 'styled-components';
import PageTemplateBlock from "./components/PageTemplate";
import TodoListHeader from "./components/TodoListHeader";
import TodoList from "./components/TodoList";
import TodoListCreate from "./components/TodoListCreate";
import axios from "axios";

const GlobalStyle=createGlobalStyle`
  body{
    background: #e5dbff;
  }
`

function TodoListPage() {
  const [todos, setTodos]=useState([]);

  const fetchServerTodoList=async ()=>{
    try{
      const {data}=await axios.get("http://localhost:8000/todo/all");
      console.log(data);
      setTodos(data);
      return data;
    }catch(err){
      console.log(err);
    }
  }

  const onRemove=async (id)=>{
    setTodos(todos.filter(todo=>todo.id!==id));

  };

  const onToggle=(id)=>{
    setTodos(todos.map(todo=>todo.id===id?{...todo, done:!todo.done}:todo));
  }

  const onCreate=async (todo)=>{
    try{
      await axios.post("http://localhost:8000/todo/create", todo);
      const {data}=await axios.get("http://localhost:8000/todo/all");
      console.log(data);
      setTodos(data);
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
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
        <TodoListCreate onCreate={onCreate}/>
      </PageTemplateBlock>
    </>
  );
}

export default TodoListPage;
