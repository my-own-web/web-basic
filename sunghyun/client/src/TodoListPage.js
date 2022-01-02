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
      setTodos(data);
      return data;
    }catch(err){
      console.log(err);
    }
  }

  const onRemove=async (id)=>{
    try{
      await axios.post("http://localhost:8000/todo/remove", {id:id});
      await fetchServerTodoList();
    } catch (err){
      console.log(err);
    }
  };

  const onToggle=async (id)=>{
    try{
      console.log(id);
      await axios.post("http://localhost:8000/todo/toggle", {id:id});
      await fetchServerTodoList();
    } catch (err){
      console.log(err);
    }
  }

  const onEdit=async (curTodo)=>{
    try{
      await axios.post("http://localhost:8000/todo/edit", curTodo);
      await fetchServerTodoList();
    } catch (err){
      console.log(err);
    }
  }

  const onCreate=async (newTodo)=>{
    try{
      await axios.post("http://localhost:8000/todo/create", newTodo);
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
      </PageTemplateBlock>
    </>
  );
}

export default TodoListPage;
