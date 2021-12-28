import React, {useReducer, createContext, useContext, useRef, useEffect, useState} from "react";
import axios from "axios";

const initialTodos=[
  {
    id:1,
    text:'프로젝트 생성하기',
    done:true,
    editing:false
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true,
    editing:false
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false,
    editing:false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
    editing:false
  }
]

const todoListReducer=(state, action)=>{
  switch(action.type){
    case 'INIT':
      return action.data;
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
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
      const {data}=await axios.get("http://localhost:8000/");
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