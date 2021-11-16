import React, {useReducer, useState} from "react";

function reducer(state, action){
  switch(action.type){
    case 'INCREMENT':
      return state+1;
    case 'DECREMENT':
      return state-1;
    default:
      return state;
  }
}

function Counter(){
  const [number, dispatch]=useReducer(reducer, 0);
  const onIncrease=()=>{
    dispatch({type:'INCREMENT'});
  }
  const onDecrease=()=>{
    dispatch({type:'DECREMENT'});
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>1 증가</button>
      <button onClick={onDecrease}>1 감소</button>
    </div>
  );
}

export default Counter;