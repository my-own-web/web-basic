import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

const todoList = [];

function todoReducer(state, action) {
  let newState;
  switch (action.type) {
    case "INIT":
      newState = action.todo;
      break;
    case "CREATE":
      newState = state.concat(action.todo);
      break;
    case "TOGGLE":
      newState = state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
      break;
    case "REMOVE":
      newState = state.filter((todo) => todo.id !== action.id);
      break;
    case "EDIT":
      newState = state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.editText } : todo
      );
      break;
    default:
      throw new Error(`Undefined Action: ${action.type}`);
  }
  async function sendTodo() {
    await axios.post("http://localhost:3001/api/todo", { todo: newState });
  }
  sendTodo();
  return newState;
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, todoList);

  useEffect(() => {
    async function getInitialTodo() {
      await axios.get("http://localhost:3001/api/todo").then((res) => {
        dispatch({ type: "INIT", todo: res.data });
      });
    }
    getInitialTodo();
  }, []);

  const nextId = useRef(todoList.length);

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
