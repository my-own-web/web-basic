import React, {useRef, useReducer, useMemo, useCallback} from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import produce from 'immer';
import useInputs from "./hooks/useInputs";

function countActiveUsers(users){
  console.log("활성 사용자 수 카운팅");
  return users.filter(user=>user.active).length;
}

const initialState={
  users:[
    {
      id:1,
      username:'velopert',
      email:"velopert@gmail.com",
      active:true
    },
    {
      id:2,
      username:"tester",
      email:"test@test.com",
      active:false
    },
  ]
};

const reducer=(state, action)=>{
  switch (action.type){
    case 'CREATE_USER':
      return produce(state, draft=>{
        draft.users.push(action.user);
      })
    case 'TOGGLE_USER':
      return {
        ...state,
        users:state.users.map(user=>
          (user.id===action.id?{...user, active:!user.active}:user)
        )
      }

    case 'REMOVE_USER':
      return produce(state, draft=>{
        const index=draft.users.findIndex(user=>user.id===action.id);
        draft.users.splice(index,1);
        //index 부터 시작해서 하나의 요소 제거
      })
    default:
      return state;
  }
}

export const UserDispatch=React.createContext(null);

function UserInfo() {
  const [{username, email}, onChange, reset]=useInputs({
    username:'',
    email:''
  })
  const [state, dispatch]=useReducer(reducer, initialState);
  const nextID=useRef(3);
  const {users}=state;

  const onCreate=useCallback(()=>{
    dispatch({
      type:'CREATE_USER',
      user:{
        id:nextID.current,
        username,
        email
      }
    })
    reset();
    nextID.current+=1;
  }, [username, email, reset]);


  const count=useMemo(()=>countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList
        users={users}
      />
      <div>활성 사용자 수는 {count}</div>
    </UserDispatch.Provider>
  );
}

export default UserInfo;
