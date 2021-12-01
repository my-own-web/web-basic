import React, { createContext, useContext, useReducer, useRef } from "react";

const initialTodos = [
  {
    id: 0,
    text: "투두리스트 틀 만들기",
    done: true,
    edit: false,
  },
  {
    id: 1,
    text: "투두리스트 기능 구현하기",
    done: true,
    edit: false,
  },
  {
    id: 2,
    text: "로그인 구현하기",
    done: false,
    edit: false,
  },
  {
    id: 3,
    text: "투두리스트 수정기능 만들기",
    done: true,
    edit: false,
  },
  {
    id: 4,
    text: "서버와 연결하기",
    done: false,
    edit: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.editText } : todo
      );
    default:
      throw new Error(`Undefined Action: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(initialTodos.length);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}
