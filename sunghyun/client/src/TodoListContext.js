import React, {useReducer, createContext, useContext, useRef, useEffect, useState} from "react";
import axios from "axios";

async function updateServerTodoList(actionType, data){
  switch(actionType){
    case 'CREATE':
      await axios.post("http://localhost:8000/todocreate", data);
      return;
    case 'TOGGLE':
      console.log(data);
      await axios.post("http://localhost:8000/todotoggle", data);
      return;
  }
}

const todoListReducer=(state, action)=>{
  switch(action.type){
    case 'INIT':
      return action.data;
    case 'CREATE':
      updateServerTodoList(action.type, action.todo);
      //새로운 투두리스트 데이터를 추가한다
      //updateServerTodoList의 인자로 추가할 데이터 하나를 받음
      return state.concat(action.todo);
    case 'TOGGLE':
      updateServerTodoList(action.type, action.id);
      return state.map(todo=>(
        todo.id===action.id?{...todo, done:!todo.done}: todo
      ));
    case 'REMOVE':
      return state.filter(todo=>todo.id!==action.id);
    case 'EDIT':
      return state.map(todo=>
        todo.id===action.id?{...todo, editing:!todo.editing}:todo
      );
    default:
      throw new Error(`unhandled action type : ${action.type}`);
  }
}

const TodoListStateContext=createContext();
const TodoListDispatchContext=createContext();
const TodoListNextIdContext=createContext();

const TodoListProvider=({children})=>{
  const [todos, setTodos]=useState([]);
  const [state, dispatch]=useReducer(todoListReducer, []);
  const nextId=useRef(5);

  async function fetchInitialTodoList(){
    try{
      const {data}=await axios.get("http://localhost:8000/todoall");
      setTodos(data);
      console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchInitialTodoList();
  }, []);

  useEffect(()=>{
    dispatch({type:"INIT", data:todos});
  }, [todos]);

  return (
    /* state를 쓰는 컨텍스트와 dispatch를 쓰는 컨텍스트를 분리 */
    <TodoListStateContext.Provider value={state}>
      <TodoListDispatchContext.Provider value={dispatch}>
        <TodoListNextIdContext.Provider value={nextId}>
          {children}
        </TodoListNextIdContext.Provider>
      </TodoListDispatchContext.Provider>
    </TodoListStateContext.Provider>
  )
}

const useTodoListState=()=>{
  const context=useContext(TodoListStateContext);
  if(!context){
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

const useTodoListDispatch=()=>{
  const context=useContext(TodoListDispatchContext);
  if(!context){
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

const useTodoListNextId=()=>{
  const context=useContext(TodoListNextIdContext);
  if(!context){
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export {TodoListProvider, useTodoListState, useTodoListDispatch, useTodoListNextId};