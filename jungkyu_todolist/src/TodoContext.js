//import { render } from 'express/lib/response';
import React, {useReducer, createContext, useContext, useRef, useEffect, useState} from 'react';
import axios from 'axios';

async function updateDataToServer(action){
  try{
      await axios.post("http://localhost:3002/todo",action);
  }catch(err){
    console.error(err);
  }
}
function todoReducer(state, action){
  let newlist;
    switch (action.type){
      case "INITIALIZE":
        return action.data;
        case 'CREATE':
          newlist = state.concat(action.todo);
          break;
        case 'TOGGLE':
          newlist = state.map(todo=>todo.id===action.id ? {...todo,done: !todo.done} : todo);
          break;
        case 'REMOVE':
          newlist = state.filter(todo=>todo.id!==action.id);
          break;
        case 'EDIT':
          newlist = state.map(todo=>todo.id===action.id ? {...todo, text:action.value} : todo);
          break;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
    updateDataToServer(action);
    return newlist;
}
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}){

  const [state, dispatch] = useReducer(todoReducer, []);
  //const [initialTodo, setInitialTodo] = useState([]);
  const nextId = useRef(5);
  async function fetchInitialData(){
    try{
      const {data} = await axios.get("http://localhost:3002/todo")
      //setInitialTodo(data);
      console.log(data);
      console.log(data.nextId);
      dispatch({type:"INITIALIZE", data: data});

      nextId.current = data[data.length - 1].id + 1;

    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchInitialData();
  }, []);
/*
useEffect(()=>{
  dispatch({type:"INITIALIZE", data:initialTodo});
  //nextId.current = initialTodo.nextId + 1;
},[initialTodo]);
*/
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value = {dispatch}>
                <TodoNextIdContext.Provider value = {nextId}>
                {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
        );
}
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }
  
  export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }
  
  export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }