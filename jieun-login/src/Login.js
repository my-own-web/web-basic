import React, {useState} from 'react';
import styled from 'styled-components';

// dbg example info
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

function isValid({id, password}){
    const index = info.find((element)=>element.id===id);
    if(index && index.password===password) return true;
    else return false; 
}

function Login() {
    const [inputs, setInputs]=useState({
        id: '',
        password: ''
    });
    const [submits, setSubmits]=useState({
        id:'',
        password:''
    });
    const [valid, setValid]=useState(false);

    const onChange =(e)=>{
        const {value, name}=e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onSubmit= (e)=>{
        setSubmits({id:inputs.id, password:inputs.password});
        // setValid(info.find((element)=>{return element.id === submits.id && element.password === submits.password}));
        setValid(isValid(submits));
        setInputs({id:'', password:''});
    };

    return (
        <>
            <input name="id" placeholder="ID" onChange={onChange} value={inputs.id}/>
            <input name="password" placeholder="PASSWORD" onChange={onChange} value={inputs.password}/>
            <button onClick={onSubmit}>확인</button>
            <div><b>ID:</b> {submits.id}</div>
            <div><b>PASSWORD:</b> {submits.password}</div>
            <div style={{color: valid? "green":
        "red"}}>{valid? 'valid':'Invalid'}</div>
        </>
    )
}

export default Login;