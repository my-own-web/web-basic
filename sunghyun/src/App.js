import React, {useMemo, useRef, useState, useCallback, useReducer} from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users){
  console.log('활성 사용자 수 카운팅');
  return users.filter(user=>user.active).length;
}

const initialState={
  inputs:{
    username:'',
    email:''
  },
  users:[
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active:false
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active:true
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active:true
    }
  ]
};

function reducer(state, action){
  switch(action.type){
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs:{
          ...state.inputs,
          [action.name]:action.value
        }
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch]=useReducer(reducer, initialState);
  const {users}=state;
  const {username, email}=state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  return (
    <>
      <CreateUser username={username} email={email} />
      <UserList users={users} />
      <div>활성 사용자 수 : 0</div>
    </>
  );
}

export default App;
