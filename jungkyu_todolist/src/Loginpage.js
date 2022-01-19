import React, { useState, useEffect } from 'react';//app.js
import styled from 'styled-components';
import Button from './login_components/Button';
import Inputbox from './login_components/Inputbox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

function Loginpage() {
    let navi = useNavigate();
    const[input, setinput] = useState({id: '', password: ''});
    const[valid, setvalid] = useState(false);
    useEffect(()=>{
        if(valid){
            navi("/todo");
        }
    }, [valid]);
    const onChange = (e) =>{
        const {value, name} = e.target;
        setinput({...input, [name]: value});
    };
    const fetchvalid = async() =>{
        try{
            const res = await axios.post('http://localhost:3002/login',input);
            setvalid(res.data);
            if(!res.data){
                alert('Wrong');
            }

        }catch(err){
            console.log(err);
        }
        setinput({id: '', password: ''});
    };
    const onInput = (e) =>{
        if(e.key == 'Enter'){
            fetchvalid();
        }
    }

  return (
    <AppBlock>
        <div>
            <h1>로그인</h1>
            <Inputbox box="id" name="id" placeholder="id" onChange={onChange} value={input.id} />
            <Inputbox box="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={onChange} value={input.password} onKeyPress={onInput}/>
        </div>
        <Button onClick={()=>{navi("/signup")}}> 회원가입 </Button>
        <Button onClick={fetchvalid}>로그인</Button>
    </AppBlock>
    );
}

export default Loginpage;