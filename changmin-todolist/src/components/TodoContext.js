import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import UserContext from "../contexts/UserContext";

const todoList = [];

let username;

function todoReducer(state, action) {
  let newState = [];
  switch (action.type) {
    case "INIT":
      newState = action.todo.map(
        (todo) => (todo.done = { ...todo, done: !!todo.done })
      );
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
    await axios.post("http://localhost:3001/todo/edit", {
      username: username,
      action,
    });
  }
  if (action.type !== "INIT") sendTodo();
  return newState;
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, todoList);
  const nextId = useRef(0);

  const value = useContext(UserContext);

  async function getInitialTodo() {
    await axios
      .post("http://localhost:3001/todo/get", { username })
      .then((res) => {
        dispatch({ type: "INIT", todo: res.data });
        nextId.current = res.data.length
          ? res.data[res.data.length - 1].id + 1
          : 1;
      });
  }

  useEffect(() => {
    username = value.state.username;
    if (username) getInitialTodo();
  }, [value]);

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
