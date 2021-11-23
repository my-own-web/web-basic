import React, {useState} from 'react';
import styled from 'styled-components';

// (dbg) example info
const info = [{
    id: 'id',
    password: 'password'
},
{
    id: 'jieun',
    password: 'kwon'
},
{
    id: 'a',
    password:'b'
}];

// info 배열에 id, password가 존재하면 true
// 없으면 false 반환
function isValid({id, password}){
    const index = info.find((element)=>element.id===id);
    if(index && index.password===password) return true;
    else return false; 
}

function Login() {
    // 입력
    const [inputs, setInputs]=useState({
        id: '',
        password: ''
    });
    // 제출한 id, password
    const [submits, setSubmits]=useState({
        id:'',
        password:''
    });
    // 제출한 id, password가 info 배열에 존재하면 true
    const [valid, setValid]=useState(false);

    const onChange =(e)=>{
        const {value, name}=e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // 로그인 버튼 누르면 그때까지 입력받은 id, password를 제출, validity check
    const onSubmit= ()=>{
        setSubmits({id:inputs.id, password:inputs.password});
        setValid(isValid(inputs));
        setInputs({id:'', password:''});
    };

    return (
        <>
            <input name="id" placeholder="ID" onChange={onChange} value={inputs.id}/>
            <input name="password" placeholder="PASSWORD" onChange={onChange} value={inputs.password}/>
            <button onClick={onSubmit}>로그인</button>
            <div><b>ID:</b> {submits.id}</div>
            <div><b>PASSWORD:</b> {submits.password}</div>
            <div style={{color: valid? "green":
        "red"}}>{valid? 'valid':'Invalid'}</div>

        {/*dbg*/}
        <p style={{color:"blue"}}>
        <div><b>info 배열: id password</b></div>
        <div>a b</div>
        <div>jieun kwon</div>
        <div>id password</div>
        </p>
        </>
    )
}

export default Login;