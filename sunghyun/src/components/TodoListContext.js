import React, {useReducer, createContext, useContext, useRef} from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true,
    editing: false
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true,
    editing: false
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false,
    editing: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
    editing: false
  }
];

function todoReducer(state, action){
  //리턴값이 새로운 상태가 된다
  switch(action.type){
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    case 'EDIT':
      return state.map(todo=>
        todo.id===action.id ? {...todo, editing: !todo.editing}: todo
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoListStateContext=createContext();
const TodoListDispatchContext=createContext();
const TodoListNextIdContext=createContext();

const TodoListProvider=({children})=>{
  //이 내부에서는 context에 있는거 다 사용 가능
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoListStateContext.Provider value={state}>
      <TodoListDispatchContext.Provider value={dispatch}>
        <TodoListNextIdContext.Provider value={nextId}>
          {children}
        </TodoListNextIdContext.Provider>
      </TodoListDispatchContext.Provider>
    </TodoListStateContext.Provider>
  );
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

