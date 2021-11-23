import React, {useReducer, createContext, useContext, useRef} from 'react';

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
      },
      {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true
      },
      {
        id: 3,
        text: 'Context 만들기',
        done: false
      },
      {
        id: 4,
        text: '기능 구현하기',
        done: false
      }
];

function todoReducer(state, action){ 
    switch(action.type){
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo => todo.id === action.id? {...todo, done: !todo.done} : todo );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
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
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
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