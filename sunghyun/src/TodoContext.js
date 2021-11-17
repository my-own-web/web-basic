import React, {createContext, useReducer, useContext, useRef} from "react";

const initialTodos=[
  {
    id:1,
    text:'프로젝트 생성',
    done:false
  },
  {
    id:2,
    text:'컴포넌트 스타일링',
    done:true
  },
  {
    id:3,
    text:'context 관리',
    done:false
  },
  {
    id:4,
    text:'리스트 기능 구현',
    done:true
  },
];

const todoReducer=(state, action)=>{
  switch(action.type){
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      //id 받아서 done 상태 반전
      return state.map(todo=>
        todo.id===action.id?{...todo, done:!todo.done}:todo
      );
    case 'REMOVE':
      return state.filter(todo=>todo.id!==action.id);
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

const TodoStateContext=createContext();
const TodoDispatchContext=createContext();
const TodoNextIDContext=createContext();

const TodoProvider=({children})=>{
  const [state, dispatch]=useReducer(todoReducer, initialTodos);
  const nextID=useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIDContext.Provider value={nextID}>
          {children}
        </TodoNextIDContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

const useTodoState=()=>{
  const context=useContext(TodoStateContext);
  if(!context){
    throw new Error(`Cannot find TodoStateProvider`);
  }
  return context;
}

const useTodoDispatch=()=>{
  const context=useContext(TodoDispatchContext);
  if(!context){
    throw new Error(`Cannot find TodoDispatchProvider`);
  }
  return context;
}

const useTodoNextID=()=>{
  const context=useContext(TodoNextIDContext);
  if(!context){
    throw new Error(`Cannot find TodoNextIDProvider`);
  }
  return context;
}

export {TodoProvider, useTodoState, useTodoDispatch, useTodoNextID};
