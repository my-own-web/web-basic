import React, {useState} from 'react';

function Login() {
    const [inputs, setInputs]=useState({
        id: '',
        password: ''
    });
    const {id, password}=inputs;

    const onChange =(e)=>{
        const {value, name}=e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    return (
        <>
            <input name="id" placeholder="ID" onChange={onChange} value={id}/>
            <input name="password" placeholder="PASSWORD" onChange={onChange} value={password}/>
            <button onClick={}>확인</button>
            <div><b>ID:{id}</b></div>
            <div><b>PASSWORD:{password}</b></div>
        </>
    )
}

export default Login;