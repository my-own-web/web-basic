import React, {useReducer, createContext, useContext, useRef, useEffect, useState} from "react";
import axios from "axios";
import useAsync from "./components/useAsync";

function serverFetchReducer(state, action){
  // 서버에 한 요청이 어떤 상태인지를 나타낸다
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        //새로운 데이터
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function serverCreateReducer(state, action){
  // 서버에 한 요청이 어떤 상태인지를 나타낸다
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        //새로운 데이터
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function serverToggleReducer(state, action){
  // 서버에 한 요청이 어떤 상태인지를 나타낸다
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        //새로운 데이터
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function serverRemoveReducer(state, action){
  // 서버에 한 요청이 어떤 상태인지를 나타낸다
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        //새로운 데이터
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function serverEditReducer(state, action){
  // 서버에 한 요청이 어떤 상태인지를 나타낸다
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        //새로운 데이터
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

/*function todoListReducer(state, action){
  switch(action.type){
    case 'UPDATE':
      const [fetchState, fetchDispatch]=useAsync(
        axios.get("http://localhost:8000/todo/all"),
        [],
        serverCreateReducer
      );
      return fetchState.data;
    case 'CREATE':
      const [createState, createDispatch]=useAsync(
        axios.post("http://localhost:8000/todo/create", action.todo),
        [],
        serverCreateReducer
      );
      return createState.data;
    case 'TOGGLE':
      const [toggleState, toggleDispatch]=useAsync(
        axios.post("http://localhost:8000/todo/toggle", action.id),
        [],
        serverCreateReducer
      );
      //updateServerTodoList(action.type, action.id);
      return toggleState.data;
    case 'REMOVE':
      return state.filter(todo=>todo.id!==action.id);
    case 'EDIT':
      return state.map(todo=>
        todo.id===action.id?{...todo, editing:!todo.editing}:todo
      );
    default:
      throw new Error(`unhandled action type : ${action.type}`);
  }
}*/

/*const TodoListStateContext=createContext();
const TodoListDispatchContext=createContext();
const TodoListNextIdContext=createContext();

const TodoListProvider=({children})=>{
  const [todos, setTodos]=useState([]);
  const [state, dispatch]=useReducer(todoListReducer, []);
  const nextId=useRef(7);

  return (
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
    throw new Error('Cannot find TodoList State Provider');
  }
  return context;
}

const useTodoListDispatch=()=>{
  const context=useContext(TodoListDispatchContext);
  if(!context){
    throw new Error('Cannot find TodoList Dispatch Provider');
  }
  return context;
}

const useTodoListNextId=()=>{
  const context=useContext(TodoListNextIdContext);
  if(!context){
    throw new Error('Cannot find TodoList nextID Provider');
  }
  return context;
}*/

export {serverFetchReducer, serverCreateReducer, serverEditReducer, serverRemoveReducer, serverToggleReducer};