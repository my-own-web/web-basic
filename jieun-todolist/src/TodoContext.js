import { TodoApi } from './utils/axios';
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

// state, dispatch 각각 다른 Context에 넣음. dispatch만 필요한 컴포넌트에서 불필요한 렌더링 방지 위함.
const UserIdContext = createContext();
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

// 상태 관리 컴포넌트 내보내기
export function TodoProvider({ children }) {
    const [userId, setUserId] = useState('unknown');
    const [todos, setTodos] = useState([]);
    const nextID = useRef(0);
    let navigate = useNavigate();

    const cookies = new Cookies();

    async function postTodos(action) {
        try {
            const { data } = await TodoApi.post('/todos', action, { withCredentials: true });
            setTodos(data.todos);
            nextID.current = data.nextID;
            setUserId(data.userId);
            console.log('response', data);
        } catch (error) {
            console.log(error);
            alert('로그인이 만료되었습니다.');
            cookies.remove('valid');
            navigate('/');
        }
    }

    // 한 번만 실행 -> 첫 렌더링에서만 실행(+f5)
    useEffect(() => {
        postTodos({ type: 'FETCH' });
    }, []);


    return (
        <UserIdContext.Provider value={userId}>
            <TodoStateContext.Provider value={todos}>
                <TodoDispatchContext.Provider value={postTodos}>
                    <TodoNextIdContext.Provider value={nextID}>
                        {children}
                    </TodoNextIdContext.Provider>
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </UserIdContext.Provider>
    );
}

// useContext를 사용하는 커스텀 Hook 생성해서 내보내기
// 이 Hook들을 사용하려면 TodoProvider 컴포넌트 내부에 렌더링 되어 있어야 함->감싸져 있지 않으면 에러 발생시키기
export function useUserId() {
    const context = useContext(UserIdContext);
    if (!context) {
        throw new Error(`Cannot find TodoProvider`);
    }
    return context;
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error(`Cannot find TodoProvider`);
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