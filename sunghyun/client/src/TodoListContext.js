import React, {useReducer, createContext, useContext, useRef, useEffect, useState} from "react";
import axios from "axios";

async function fetchServerTodoList(){
  //서버에서 데이터 받아 오기
  try{
    const {data}=await axios.get("http://localhost:8000/todo/all");
    console.log(data);
    return data;
  }
  catch(err){
    console.log(err);
  }
}

async function updateServerTodoList(actionType, updateData){
  switch(actionType){
    case 'CREATE':
      await axios.post("http://localhost:8000/todo/create", updateData);
      //새로 추가할 데이터를 전송한다
      const {data}=await axios.get("http://localhost:8000/todo/all");
      console.log(data);
      return data;
    case 'TOGGLE':
      await axios.post("http://localhost:8000/todo/toggle", updateData);
      return;
  }
}

const todoListReducer=(state, action)=>{
  switch(action.type){
    case 'UPDATE':
      return action.data;
    case 'CREATE':
      console.log(action.todo);
      const concatData=updateServerTodoList('CREATE', action.todo);
      return concatData;
    case 'TOGGLE':
      //updateServerTodoList(action.type, action.id);
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
  const nextId=useRef(7);

  async function updateTodoListFromServerData(){
    try{
      const data=await fetchServerTodoList();
      //서버에서 데이터를 받아 온다.
      setTodos(data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    updateTodoListFromServerData();
  }, []);

  useEffect(()=>{
    dispatch({type:'UPDATE', data:todos});
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
}

export {TodoListProvider, useTodoListState, useTodoListDispatch, useTodoListNextId};