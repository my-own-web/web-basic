//import { render } from 'express/lib/response';
import React, {useReducer, createContext, useContext, useRef, useEffect, useState} from 'react';
import axios from 'axios';

async function updateDataToServer(actionType, data){
  if(actionType==="CREATE"){
    await axios.post("http://localhost:3002/todo",data);
  }
  else if(actionType==="TOGGLE"){
    await axios.post("http://localhost:3002/todo",data);
  }
  else if(actionType==="REMOVE"){
    await axios.post("http://localhost:3002/todo",data);
  }
  else if(actionType==="EDIT"){
    await axios.post("http://localhost:3002/todo",data);
  }
}
function todoReducer(state, action){
    switch (action.type){
      case "INITIALIZE":
        return action.data;
        case 'CREATE':
          updateDataToServer(action.type, state.concat(action.todo));
            return state.concat(action.todo);
        case 'TOGGLE':
          updateDataToServer(action.type, state.map(todo=>todo.id===action.id ? {...todo,done: !todo.done} : todo));
            return state.map(todo=>todo.id===action.id ? {...todo,done: !todo.done} : todo);
        case 'REMOVE':
          updateDataToServer(action.type, state.filter(todo=>todo.id!==action.id));
            return state.filter(todo=>todo.id!==action.id);
        case 'EDIT':
          updateDataToServer(action.type, state.map(todo=>todo.id===action.id ? {...todo, text:action.value} : todo));
            return state.map(todo=>todo.id===action.id ? {...todo, text:action.value} : todo);
        default:
            throw new Error('Unhandled action type: ${action.type}');

    }
}
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}){

  const [state, dispatch] = useReducer(todoReducer, []);
  const [initialTodo, setInitialTodo] = useState([]);
  let nextId = useRef(5);
  async function fetchInitialData(){
    try{
      const {data} = await axios.get("http://localhost:3002/todo")
      setInitialTodo(data);
      console.log(data);
      console.log(data.length);

    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchInitialData();

  }, []);
useEffect(()=>{
  dispatch({type:"INITIALIZE", data:initialTodo});
  nextId.current = initialTodo.length + 1;
},[initialTodo]);
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