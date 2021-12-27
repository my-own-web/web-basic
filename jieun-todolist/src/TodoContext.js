import axios from 'axios';
import React, {useReducer, createContext, useContext, useRef, useState, useEffect} from 'react';

async function sendTodos (todos) {
    console.log('post', todos);

    await axios({
        url: 'http://localhost:3001/todos/post',
        method: 'post',
        data: {
            newTodos: todos
        }
    });
}

// state: Todos 배열
function todoReducer(state, action){ 
    switch(action.type){
        case 'SET':
            console.log('setting newTodos'); // dbg
            return action.newTodos;
        case 'CREATE':
            return state.concat(action.todo)
        case 'TOGGLE':
            return state.map(todo => todo.id === action.id? {...todo, done: !todo.done} : todo )
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id)
        case 'EDIT':
            return state.map(todo => todo.id===action.id?{...todo, text: action.text} : todo)
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// state, dispatch 각각 다른 Context에 넣음. dispatch만 필요한 컴포넌트에서 불필요한 렌더링 방지 위함.
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

// 상태 관리 컴포넌트 내보내기
export function TodoProvider({children}){ 
    const [state, dispatch] = useReducer(todoReducer, []);
    
    async function fetchInitialTodos() {
        await axios.get('http://localhost:3001/todos')
        .then((res)=>{
            console.log('fetchInitialTodos: ', res.data);
            dispatch({
                type: 'SET',
                newTodos: res.data
            });
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    // 한 번만 실행 -> 첫 렌더링에서만 실행(+f5)
    useEffect(()=>{
        fetchInitialTodos();
    },[]);

    const [idx, setIdx] = useState(1); //dbg
    useEffect(()=>{
        console.log(idx, 'state: ', state);
        setIdx(idx+1);// dbg
        sendTodos(state);
    }, [state]);

    const nextID = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextID}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

// useContext를 사용하는 커스텀 Hook 생성해서 내보내기
// 이 Hook들을 사용하려면 TodoProvider 컴포넌트 내부에 렌더링 되어 있어야 함->감싸져 있지 않으면 에러 발생시키기
export function useTodoState(){
    const context =  useContext(TodoStateContext);
    if(!context){ 
        throw new Error(`Cannot find TodoProvider`);
    }
    return context;
}

export function useTodoDispatch(){
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