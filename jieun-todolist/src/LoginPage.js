import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './design/Button';
import Input from './design/Input';
import SmallBlock from './design/SmallBlock';

function LoginPage() {
    // 페이지 이동 준비
    let navigate = useNavigate();
    // 입력
    const [inputs, setInputs] = useState({
        id: '',
        password: ''
    });
    
    const [valid, setValid] = useState(false);
    useEffect(()=>{
        if(valid){
            navigate("/todolist");
        }
    }, [valid]);

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // express에 데이터 보내기. onSubmit에서 호출
    const fetchValid = async() =>{
        try{
            const res = await axios.post('http://localhost:3001/login', inputs);
            setValid(res.data);
            if(!res.data){
                alert('Wrong ID or PASSWORD'); 
            }
        } catch(err){
            console.log(err);
        } 
        setInputs({ id: '', password: '' });
    };

    const onInputKeyPress = (e) => {
        if (e.key == 'Enter') {
            fetchValid();
        }
    }

    return (
        <SmallBlock>
            <p>로그인</p>
            <Input name="id" placeholder="ID" onChange={onChange} value={inputs.id} />
            <Input name="password" placeholder="PASSWORD" onChange={onChange} value={inputs.password} onKeyPress={onInputKeyPress} />
            <div>
                <Button color='pink' style={{ marginRight: '40%' }} onClick={() => {navigate("/join")}}>회원가입</Button>
                <Button onClick={fetchValid}>로그인</Button>
            </div>
        </SmallBlock>
    )
}

export default LoginPage;