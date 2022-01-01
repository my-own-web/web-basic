import {useEffect, useReducer} from "react";

function useAsync(callbackPromise, deps, reducer){
  const [createState, dispatch]=useReducer(reducer, {
    loading: false,
    data:null,
    error:false
  });

  const fetchServerData=async ()=>{
    dispatch({type:'LOADING'});
    try{
      const data=await callbackPromise();
      dispatch({type:'SUCCESS', data});
      //콜백 함수의 리턴값을 state에 적당히 넣는다
    } catch(err){
      dispatch({type:'ERROR', error:err});
    }
  };

  useEffect(()=>{
    fetchServerData();
  }, deps);
  //deps가 변할 때 서버 데이터 긁어온다

  return [createState, fetchServerData];
}

export default useAsync;