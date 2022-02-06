import React, { useEffect, useReducer, createContext, useContext, useRef, useState } from 'react';
import { TodoAPI } from './utils/axios';

async function updateDataToServer(actionType, data) {
    if (actionType === 'CREATE') {
        await axios.TodoAPI("h/todo/create", data);
    }
    else if (actionType === 'TOGGLE') {
        await axios.TodoAPI("/todo/toggle", data);
    }
    else if (actionType === 'REMOVE') {
        await axios.TodoAPI("/todo/remove", data);
    }
    else if (actionType === 'EDITDONE') {
        await axios.TodoAPI("/todo/edit", data);
    }
}

function todoReducer(state, action) {

    switch (action.type) {
        case 'INITIALIZE':
            return action.data;
        case 'CREATE':
            //updateDataToServer(action.type, state.concat(action.todo));
            //return state.concat(action.todo);
            updateDataToServer(action.type, action.todo);
            return state.concat(action.todo);
        case 'TOGGLE':
            /*state = state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
            updateDataToServer(action.type, state);
            return state;*/
            updateDataToServer(action.type, action);
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        ///////////////////////////////////////////////
        case 'EDITDONE':
            /*state = state.map(todo => todo.id === action.id ? { ...todo, text: action.text } : todo)
            updateDataToServer(action.type, state);
            return state;*/
            updateDataToServer(action.type, action);
            return state.map(todo => todo.id === action.id ? { ...todo, text: action.text } : todo)

        ///////////////////////////////////////////
        case 'REMOVE':
            /*state = state.filter(todo => todo.id !== action.id);
            updateDataToServer(action.type, state);
            return state;*/
            updateDataToServer(action.type, action);
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
    const [initialTodo, setInitialTodo] = useState([]);
    const [state, dispatch] = useReducer(todoReducer, []);
    const nextId = useRef(0);

    async function fetchInitialData() {
        try {
            const { data } = await TodoAPI.get("/todo")
            const len = data.length;
            nextId.current = data[len - 1].id + 1;
            setInitialTodo(data);
            //skeleton을 이용하면 깜박거리는 현상을 없앨 수 있음
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchInitialData();
    }, []);
    useEffect(() => {
        dispatch({ type: 'INITIALIZE', data: initialTodo });
    }, [initialTodo]);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
} //Context에서 사용할 값을 지정할 때에는 위와 같이 Provider 컴포넌트를 렌더링하고 value를 설정해주면 됨

export function useTodoState() { //useContext를 사용하는 커스텀 Hook을 만들어서 내보내주기
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() { //useContext를 사용하는 커스텀 Hook을 만들어서 내보내주기
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() { //useContext를 사용하는 커스텀 Hook을 만들어서 내보내주기
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
